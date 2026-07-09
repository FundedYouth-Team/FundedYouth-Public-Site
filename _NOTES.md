# NOTES

## Custom Scheduling Request Form — Implementation Plan

A public form on the public site for students who can't attend the standard weekly
blocked hours. It collects a custom scheduling **request** (not a live booking) and
emails it to `info@FundedYouth.org`. A team member confirms instructor availability
manually and follows up — nothing is auto-booked, no times are guaranteed.

### Decisions locked
- **Where:** public site (`public-site/`). No login required.
- **Persistence:** none — no database. v1 emails the request only.
- **Spam protection:** Cloudflare Turnstile (server-verified). The existing
  `PuzzleCaptcha.tsx` is client-only and is NOT a substitute.
- **Email:** Resend, called via its REST API with `fetch` (no `resend` npm dependency,
  matching the dependency-free style of the existing calendar Pages Function).

### Files to add
| File | Purpose |
|------|---------|
| `src/pages/CustomSchedulePage.tsx` | The form page (route `/schedule/custom`) |
| `src/config/scheduling.ts` | Static knobs (lead days, weekdays, time windows) |
| `src/lib/scheduling.ts` | Pure logic: sum durations, derive valid start times |
| `src/lib/scheduling.test.ts` | Vitest tests for the start-time math |
| `functions/api/scheduling/index.ts` | Pages Function: verify Turnstile -> validate -> send via Resend |
| `.env.example` | Documents env vars (per CLAUDE.md rule) |

### Files to edit
- `src/App.tsx` — import the page + add `<Route path="/schedule/custom" ...>`.
- An entry-point link (Schedule page CTA, Learn page, etc.) — placement TBD.

### Config knobs (one file, easy to tune)
```
MIN_LEAD_DAYS = 3            // must book at least N days out
ALLOWED_WEEKDAYS = [1,2,3,4] // Mon–Thu (0 = Sun)
MAX_FUTURE_DAYS = 60         // how far the calendar opens
TIME_WINDOWS = [             // start-time windows
  { start: "10:00", end: "12:00" },
  { start: "15:00", end: "17:00" },
]
MAX_DATE_OPTIONS = 3
RECIPIENT = "info@FundedYouth.org"
```

### Form flow (single page, progressive reveal)
1. **Select course** — dropdown of `course` titles (value = `id`), loaded from
   `public/data/courses.json`. On select -> show `description`.
2. **Select classes** — checkbox list of that course's classes, each showing its
   `length` ("1 Hour"). A live **total-hours counter** sums the actual `length`
   values (works when a 2-hour class is added later).
3. **Series vs. separate** — radio with clear copy:
   - "Take these back-to-back in one sitting" (e.g. a 2-hour block)
   - "Spread across different days, one hour at a time"
4. **Date + start-time options (up to 3)** — each row: a date picker (disables past,
   anything under `MIN_LEAD_DAYS`, and non-allowed weekdays) + a start-time dropdown
   showing only the start times that fit (see logic below). Notice: "There's no
   guarantee the instructor can make a specific date — please choose more than one."
5. **Contact** — name, email, phone (all required, validated).
6. **Turnstile** widget + submit.
7. **Closing notice:** "These times are not guaranteed. A team member will reach out
   once we've confirmed an instructor is available and confirm your dates and times."

### Start-time logic (the part to get right)
Duration `D` used for filtering depends on mode: **series** -> total of all checked
classes; **separate** -> 1 hour (one class per visit). For each window, a start time
is valid only if `start + D <= window.end`. Example: D = 2h -> morning shows only
**10 AM**, afternoon shows **3 PM & 4 PM**. If `D` exceeds the largest window, no
start fits -> show a message to use *separate* mode or split across date options.

### The Pages Function (`/api/scheduling`)
POST handler that: (a) verifies the Turnstile token server-side against Cloudflare's
siteverify, (b) re-validates everything server-side (course/classes exist, dates pass
weekday + lead-day rules, start times fit, contact fields present, strips
newline/header-injection), (c) sends via Resend REST API, (d) returns JSON. CORS
headers matching the existing calendar function.

### Email
- **Subject:** `Custom Scheduling Request — {courseTitle} — {studentName}`
- **Body:** contact info; course; selected classes + each length; total hours;
  series/separate; the up-to-3 proposed date/times; the "not guaranteed / we'll
  confirm" note. `Reply-To` set to the student's email so staff can reply directly.

### Secrets to set in dashboards (manual, outside the codebase)
- **Resend:** verify the sending domain (SPF/DKIM DNS records); create an API key.
- **Cloudflare Pages env vars:** `RESEND_API_KEY` (secret),
  `TURNSTILE_SECRET_KEY` (secret), `VITE_TURNSTILE_SITE_KEY` (public, browser-exposed).
  Turnstile site + secret keys come from the Cloudflare Turnstile dashboard.

### Open design call (default chosen)
The **3 date rows are alternative options in both modes** — the mode only changes the
duration used to filter start times and the explanatory copy. A human confirms the
real schedule from the email. If *separate* mode should instead mean "one required
session per row," revisit this.

### Local testing note
Pages Functions don't run under `pnpm dev` (Vite). Test the email path with
`wrangler pages dev`; otherwise the form works in dev with submit stubbed so it
doesn't error without secrets.

### Future (phase 2, only if needed)
If true date-locking + a confirm/deny workflow is ever wanted: the same endpoint also
writes to a Cloudflare datastore (KV or D1), and a staff confirmation UI lives in the
Portal/Admin app. The public form stays put — no rewrite.
