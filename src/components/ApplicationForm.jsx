"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Paperclip, X } from "lucide-react";
import { submitApplication } from "@/app/careers/actions";
import { ROLES, AVAILABILITY, RESUME_MAX_BYTES, RESUME_MAX_LABEL } from "@/lib/careers";
import { ScallopMark } from "./Logo";

const field =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-ink placeholder:text-ink/35 " +
  "transition-colors focus:border-brand focus:outline-none focus-visible:outline-none " +
  "aria-[invalid=true]:border-red-700/60";

function Field({ label, error, hint, children, required, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-1 text-brass" aria-hidden>*</span>}
        {!required && <span className="ml-2 text-xs font-normal text-ink/70">optional</span>}
      </label>
      {hint && <p className="mt-1 text-xs text-ink/70">{hint}</p>}
      <div className="mt-2">{children}</div>
      {error && (
        <p role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-800">
          <AlertCircle size={14} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3.5 text-[12px] font-medium tracking-[0.18em] text-cream uppercase transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send application"}
    </button>
  );
}

export default function ApplicationForm({ configured, careersEmail, phone }) {
  const [state, formAction] = useActionState(submitApplication, { status: "idle", fieldErrors: {} });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState(null);
  const fileRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const id = useId();

  const err = (k) => state.fieldErrors?.[k]?.[0];
  const v = state.values ?? {};
  const resumeName = resumeFile?.name ?? null;

  /*
   * React 19 resets a <form action> once the action settles, wiping what the
   * applicant typed. Inputs, textareas and checkboxes restore themselves from
   * defaultValue/defaultChecked, because React writes those through to the
   * value/checked *attributes* that form.reset() reads.
   *
   * <select> is not one of them — React sets option.selected rather than
   * defaultSelected — so restore it here, keyed on `state` ALONE. Tying this to
   * resumeFile would re-stamp the echoed value over a choice the applicant made
   * after the error, every time they touched the file input.
   */
  useEffect(() => {
    const form = formRef.current;
    const vals = state.values;
    if (!form || !vals) return;
    if (vals.role) form.elements.role.value = vals.role;
    if (vals.availability) form.elements.availability.value = vals.availability;
  }, [state]);

  // A FileList cannot be restored by any default prop, so put the chosen file
  // back by hand after the reset.
  useEffect(() => {
    const el = fileRef.current;
    if (!el || !resumeFile || el.files?.length) return;
    const dt = new DataTransfer();
    dt.items.add(resumeFile);
    el.files = dt.files;
  }, [state, resumeFile]);

  // The form unmounts on success, taking focus with it. Move focus to the
  // confirmation so keyboard and screen-reader users are not left in the void.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-ink/10 bg-sand/30 p-12 text-center"
      >
        <CheckCircle2 className="mx-auto text-brand" size={40} aria-hidden />
        <h2 ref={successRef} tabIndex={-1} className="font-display mt-6 text-3xl">
          Thank you &mdash; it&rsquo;s with us
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink/70 text-pretty">
          We read every application. If it looks like a fit, someone from the tavern will be in
          touch within a week or so.
        </p>
        <ScallopMark className="mx-auto mt-8 h-8 w-8 text-brand/30" />
      </div>
    );
  }

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setResumeError(null);
    if (!f) return setResumeFile(null);
    if (f.size > RESUME_MAX_BYTES) {
      setResumeError(`That file is over ${RESUME_MAX_LABEL}.`);
      e.target.value = "";
      return setResumeFile(null);
    }
    if (f.type !== "application/pdf") {
      setResumeError("Please attach a PDF.");
      e.target.value = "";
      return setResumeFile(null);
    }
    setResumeFile(f);
  };

  const clearFile = () => {
    if (fileRef.current) fileRef.current.value = "";
    setResumeFile(null);
    setResumeError(null);
  };

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-8">
      {!configured && (
        <p className="rounded-xl border border-brass/40 bg-brass/10 px-5 py-4 text-sm leading-relaxed text-ink/80">
          <strong className="font-medium">Not connected yet.</strong> Set{" "}
          <code className="rounded bg-ink/8 px-1 py-0.5 text-[13px]">RESEND_API_KEY</code> to receive
          applications by email. Until then, please write to{" "}
          <a href={`mailto:${careersEmail}`} className="underline underline-offset-2">
            {careersEmail}
          </a>{" "}
          or call {phone}.
        </p>
      )}

      {(state.status === "error" || state.status === "unconfigured") && state.message && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-800/25 bg-red-800/5 px-5 py-4 text-sm text-red-900"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
          {state.message}
        </p>
      )}

      {/* Honeypot — hidden from people, irresistible to bots. Not named
          "website": autofill would fill it and bin a real application. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor={`${id}-gotcha`}>Leave this field empty</label>
        <input id={`${id}-gotcha`} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" required htmlFor={`${id}-name`} error={err("name")}>
          <input
            id={`${id}-name`} name="name" type="text" required autoComplete="name" defaultValue={v.name ?? ""}
            aria-invalid={Boolean(err("name"))} className={field} placeholder="Maria Alexopoulos"
          />
        </Field>

        <Field label="Email" required htmlFor={`${id}-email`} error={err("email")}>
          <input
            id={`${id}-email`} name="email" type="email" required autoComplete="email" defaultValue={v.email ?? ""}
            aria-invalid={Boolean(err("email"))} className={field} placeholder="you@example.com"
          />
        </Field>

        <Field label="Phone" required htmlFor={`${id}-phone`} error={err("phone")}>
          <input
            id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" defaultValue={v.phone ?? ""}
            aria-invalid={Boolean(err("phone"))} className={field} placeholder="(401) 555-0100"
          />
        </Field>

        <Field label="Can start" htmlFor={`${id}-start`} error={err("start")}>
          <input
            id={`${id}-start`} name="start" type="text" defaultValue={v.start ?? ""} className={field}
            placeholder="Immediately, or a date"
          />
        </Field>

        <Field label="Role" required htmlFor={`${id}-role`} error={err("role")}>
          <select id={`${id}-role`} name="role" required defaultValue={v.role ?? ""}
            aria-invalid={Boolean(err("role"))} className={field}>
            <option value="" disabled>Choose a role…</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>

        <Field label="Availability" required htmlFor={`${id}-availability`} error={err("availability")}>
          <select id={`${id}-availability`} name="availability" required defaultValue={v.availability ?? ""}
            aria-invalid={Boolean(err("availability"))} className={field}>
            <option value="" disabled>Choose…</option>
            {AVAILABILITY.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </Field>
      </div>

      <Field
        label="A link" htmlFor={`${id}-link`} error={err("link")}
        hint="LinkedIn, Indeed, a portfolio — anywhere we can read more."
      >
        <input
          id={`${id}-link`} name="link" type="url" inputMode="url" defaultValue={v.link ?? ""}
          aria-invalid={Boolean(err("link"))} className={field} placeholder="https://"
        />
      </Field>

      <Field
        label="Tell us about yourself" required htmlFor={`${id}-message`} error={err("message")}
        hint="Where you've cooked or served, what you're looking for, why here."
      >
        <textarea
          id={`${id}-message`} name="message" required rows={6} defaultValue={v.message ?? ""}
          aria-invalid={Boolean(err("message"))} className={`${field} resize-y`}
          placeholder="I spent three summers on the line at…"
        />
      </Field>

      <Field
        label="Résumé" htmlFor={`${id}-resume`} error={resumeError ?? err("resume")}
        hint={`PDF, up to ${RESUME_MAX_LABEL}.`}
      >
        {resumeName ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-ink/15 bg-cream px-4 py-3">
            <span className="flex min-w-0 items-center gap-2 text-sm text-ink/75">
              <Paperclip size={15} className="shrink-0 text-brand" aria-hidden />
              <span className="truncate">{resumeName}</span>
            </span>
            <button
              type="button" onClick={clearFile}
              className="shrink-0 rounded-full p-1 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              aria-label={`Remove ${resumeName}`}
            >
              <X size={16} />
            </button>
          </div>
        ) : null}
        <input
          ref={fileRef} id={`${id}-resume`} name="resume" type="file"
          accept="application/pdf,.pdf" onChange={onFile}
          aria-invalid={Boolean(resumeError)}
          className={`${resumeName ? "sr-only" : ""} w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-5 file:py-2.5 file:text-[12px] file:font-medium file:tracking-[0.14em] file:text-brand file:uppercase hover:file:bg-brand/15`}
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
          <input
            type="checkbox" name="consent" required defaultChecked={Boolean(v.consent)}
            className="mt-1 size-4 shrink-0 rounded border-ink/30 text-brand focus:ring-brand"
          />
          <span>
            I agree that Tavern by the Sea may store this application in order to consider me for
            work.
            {err("consent") && (
              <span role="alert" className="mt-1 block text-red-800">{err("consent")}</span>
            )}
          </span>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <SubmitButton />
        <p className="text-sm text-ink/70">
          Or email{" "}
          <a href={`mailto:${careersEmail}`} className="underline underline-offset-2 hover:text-brand">
            {careersEmail}
          </a>
        </p>
      </div>
    </form>
  );
}
