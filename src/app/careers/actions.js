"use server";

import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { ROLES, AVAILABILITY, RESUME_MAX_BYTES, RESUME_MAX_LABEL } from "@/lib/careers";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(100),
  email: z.email("That email address does not look right.").max(200),
  phone: z.string().trim().min(7, "Please leave a phone number.").max(40),
  role: z.enum(ROLES, { message: "Pick a role." }),
  availability: z.enum(
    AVAILABILITY.map((a) => a.value),
    { message: "Pick your availability." },
  ),
  start: z.string().trim().max(60).optional(),
  link: z.union([z.literal(""), z.url("That link does not look right.").max(300)]).optional(),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two, please — tell us about yourself.")
    .max(4000, "Please keep this under 4000 characters."),
  consent: z.literal("on", { message: "Please agree before sending." }),
});

/** Escape anything that lands inside the notification email's HTML body. */
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

/**
 * Validate the résumé. `file.type` is attacker-controlled, so we also check the
 * PDF magic number. Returns { error } or { attachment | null }.
 */
async function readResume(file) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return { attachment: null };
  }
  if (file.size > RESUME_MAX_BYTES) {
    return { error: `That file is over ${RESUME_MAX_LABEL}. Please send a smaller PDF.` };
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") {
    return { error: "Please attach a PDF." };
  }
  return {
    attachment: {
      filename: `resume-${file.name.replace(/[^\w.-]/g, "_")}`.slice(0, 120),
      content: bytes,
    },
  };
}

export async function submitApplication(_prevState, formData) {
  // Honeypot: a real person never fills a hidden field. Report success so bots
  // do not learn what tripped them. Deliberately NOT named "website"/"url" —
  // browser autofill happily fills those, which would silently bin a real
  // applicant.
  if (formData.get("_gotcha")) {
    return { status: "success", fieldErrors: {} };
  }

  const raw = (k) => String(formData.get(k) ?? "").slice(0, 5000);
  const input = {
    name: raw("name"),
    email: raw("email"),
    phone: raw("phone"),
    role: raw("role"),
    availability: raw("availability"),
    start: raw("start"),
    link: raw("link"),
    message: raw("message"),
    consent: raw("consent"),
  };

  // React 19 resets a <form action> once the action settles, so anything we do
  // not hand back here is erased from under the applicant.
  const values = { ...input, consent: input.consent === "on" };

  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const resume = await readResume(formData.get("resume"));
  if (resume.error) {
    return {
      status: "error",
      message: resume.error,
      fieldErrors: { resume: [resume.error] },
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "unconfigured",
      message: `Applications are not connected yet. Please email ${site.careersEmail} or call ${site.phone}.`,
      fieldErrors: {},
      values,
    };
  }

  const d = parsed.data;
  const rows = [
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Role", d.role],
    ["Availability", AVAILABILITY.find((a) => a.value === d.availability)?.label ?? d.availability],
    ["Can start", d.start || "—"],
    ["Link", d.link || "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#667;">${esc(k)}</td><td style="padding:4px 0;">${esc(v)}</td></tr>`,
    )
    .join("");

  try {
    const resend = new Resend(apiKey);
    // zod's .trim() leaves interior control characters alone; keep CR/LF out of
    // the subject so it can never be used to smuggle a header.
    const subjectName = d.name.replace(/[\r\n\t\p{Cc}]+/gu, " ").trim().slice(0, 80);
    const { error } = await resend.emails.send({
      from: process.env.CAREERS_FROM ?? `Tavern Careers <careers@tavernbytheseari.com>`,
      to: [process.env.CAREERS_TO ?? site.careersEmail],
      replyTo: d.email,
      subject: `Application — ${d.role} — ${subjectName}`,
      html: `<div style="font-family:system-ui,sans-serif;color:#0b2e33;">
        <h2 style="font-weight:500;">New application</h2>
        <table style="border-collapse:collapse;font-size:14px;">${rows}</table>
        <h3 style="font-weight:500;margin-top:24px;">About them</h3>
        <p style="white-space:pre-wrap;line-height:1.6;">${esc(d.message)}</p>
        <p style="color:#667;font-size:12px;margin-top:24px;">
          ${resume.attachment ? "Résumé attached." : "No résumé attached."}
        </p>
      </div>`,
      attachments: resume.attachment ? [resume.attachment] : undefined,
    });

    if (error) throw new Error(error.message ?? "send failed");
  } catch (err) {
    // Never surface provider internals to the applicant.
    console.error("[careers] failed to send application:", err);
    return {
      status: "error",
      message: `Something went wrong on our end. Please email ${site.careersEmail} and we will pick it up.`,
      fieldErrors: {},
      values,
    };
  }

  return { status: "success", fieldErrors: {} };
}
