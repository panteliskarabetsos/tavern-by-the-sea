// Shared by the form (client) and the server action, so the <select> options and
// the validation schema can never drift apart.

export const ROLES = [
  "Server",
  "Bartender",
  "Host",
  "Line Cook",
  "Prep Cook",
  "Dishwasher",
  "Busser",
  "Manager",
  "Something else",
];

export const AVAILABILITY = [
  { value: "full-time", label: "Full time" },
  { value: "part-time", label: "Part time" },
  { value: "seasonal", label: "Seasonal / summer" },
  { value: "either", label: "Either — I'm flexible" },
];

export const RESUME_MAX_BYTES = 4 * 1024 * 1024; // 4MB
export const RESUME_MAX_LABEL = "4MB";
