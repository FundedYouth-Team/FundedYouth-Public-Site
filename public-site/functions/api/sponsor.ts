// Cloudflare Pages Function — sponsor application handler
// POST /api/sponsor → validates the submission and emails it to info@fundedyouth.org.
//
// Required Pages secret (Settings → Environment variables → Encrypt):
//   RESEND_API_KEY  — Resend API key for the verified fundedyouth.org domain
// Optional Pages vars:
//   SPONSOR_TO      — recipient        (default: info@fundedyouth.org)
//   SPONSOR_FROM    — verified sender  (default: noreply@fundedyouth.org)

interface Env {
  RESEND_API_KEY: string;
  SPONSOR_TO?: string;
  SPONSOR_FROM?: string;
}

interface SponsorSubmission {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  industry?: string;
  sponsorshipLevel?: string;
  interests?: string[];
  message?: string;
  captchaToken?: string;
  honeypot?: string;
}

const TO_DEFAULT = "info@fundedyouth.org";
const FROM_DEFAULT = "FundedYouth Website <noreply@fundedyouth.org>";

// Must match PuzzleCaptcha.tsx: the token is base64("<unix-ts>:<hash(ts + secret)>").
// The secret ships in the client bundle, so this deters scripted posts but is not
// real bot protection — see README note about moving to Cloudflare Turnstile.
const CAPTCHA_SECRET = "fundedyouth-puzzle-captcha-2024";
const CAPTCHA_MAX_AGE = 30 * 60; // seconds
const CLOCK_SKEW = 300; // seconds

const REQUIRED_FIELDS = [
  "companyName",
  "firstName",
  "lastName",
  "email",
  "jobTitle",
  "industry",
  "sponsorshipLevel",
] as const;

const MAX_FIELD_LENGTH = 5000;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

/** Mirrors the hash in PuzzleCaptcha.tsx. Keep the two in sync. */
function hashCode(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

function captchaIsValid(token: string | undefined): boolean {
  if (!token) return false;

  let decoded: string;
  try {
    decoded = atob(token);
  } catch {
    return false;
  }

  const [timestamp, hash] = decoded.split(":");
  if (!timestamp || !hash) return false;
  if (hashCode(timestamp + CAPTCHA_SECRET) !== hash) return false;

  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (!Number.isFinite(age)) return false;
  return age >= -CLOCK_SKEW && age <= CAPTCHA_MAX_AGE;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Trims, caps length, and coerces away non-strings from untrusted JSON. */
function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Reject cross-site posts. Comparing against the request's own host keeps
  // *.pages.dev preview deploys working without an explicit allowlist.
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ success: false, message: "Invalid request origin." }, 403);
  }

  let submission: SponsorSubmission;
  try {
    submission = await request.json();
  } catch {
    return json({ success: false, message: "Invalid request body." }, 400);
  }

  // Honeypot: a real user never fills this hidden field. Answer 200 so bots
  // can't distinguish a rejection from a success.
  if (clean(submission.honeypot)) {
    return json({ success: true, message: "Thank you! Your application has been submitted." });
  }

  if (!captchaIsValid(submission.captchaToken)) {
    return json(
      { success: false, message: "Verification expired. Please solve the puzzle again." },
      400
    );
  }

  const fields = {
    companyName: clean(submission.companyName),
    firstName: clean(submission.firstName),
    lastName: clean(submission.lastName),
    email: clean(submission.email),
    phone: clean(submission.phone),
    jobTitle: clean(submission.jobTitle),
    industry: clean(submission.industry),
    sponsorshipLevel: clean(submission.sponsorshipLevel),
    message: clean(submission.message),
  };

  const missing = REQUIRED_FIELDS.filter((field) => !fields[field]);
  if (missing.length > 0) {
    return json({ success: false, message: "Please complete all required fields." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return json({ success: false, message: "Please enter a valid email address." }, 400);
  }

  const interests = Array.isArray(submission.interests)
    ? submission.interests.map(clean).filter(Boolean).slice(0, 25)
    : [];

  if (!env.RESEND_API_KEY) {
    console.error("sponsor: RESEND_API_KEY is not configured");
    return json(
      { success: false, message: "We couldn't submit your application. Please email info@fundedyouth.org." },
      500
    );
  }

  const rows: [string, string][] = [
    ["Company", fields.companyName],
    ["Contact", `${fields.firstName} ${fields.lastName}`],
    ["Job title", fields.jobTitle],
    ["Email", fields.email],
    ["Phone", fields.phone || "—"],
    ["Industry", fields.industry],
    ["Sponsorship level", fields.sponsorshipLevel],
    ["Interests", interests.length ? interests.join(", ") : "—"],
    ["Message", fields.message || "—"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<h2>New sponsor application</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="border:1px solid #ddd"><strong>${escapeHtml(label)}</strong></td>` +
        `<td style="border:1px solid #ddd">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("")}</table>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.SPONSOR_FROM || FROM_DEFAULT,
      to: [env.SPONSOR_TO || TO_DEFAULT],
      reply_to: fields.email,
      subject: `Sponsor application — ${fields.companyName} (${fields.sponsorshipLevel})`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    // Log the upstream reason; never leak provider details to the browser.
    console.error("sponsor: Resend rejected the send", response.status, await response.text());
    return json(
      { success: false, message: "We couldn't submit your application. Please email info@fundedyouth.org." },
      502
    );
  }

  return json({
    success: true,
    message: "Thank you! Your application has been submitted. Our team will contact you soon.",
  });
};
