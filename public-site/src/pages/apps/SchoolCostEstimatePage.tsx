/* eslint-disable tailwindcss/no-custom-classname -- a handful of dedicated
   "p-*" classnames mark up the generated quote for the print stylesheet (see
   PRINT_CSS); they only take effect inside the print pop-up, never on-page. */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../../lib/useSeo";

/**
 * School Program Cost Estimator — "On-Campus Workshops & Cost Generator".
 *
 * A live two-panel estimator schools (and partner sites) use to model program
 * hours and cost. Left panel is the input form; the right panel regenerates the
 * outline + quote on every change. Copy-to-clipboard and Print/Save-PDF export.
 *
 * Styled with the same Tailwind utilities used across the rest of the site.
 * The generated quote also carries a few "p-*" classnames used only by the
 * dedicated PRINT_CSS stylesheet injected into the print pop-up window, since
 * that window never loads the site's compiled Tailwind CSS.
 */

interface Workshop {
  name: string;
  desc: string;
  grades: string;
  /** Per-student materials fee at the Intro (K–6) level. */
  introFee: number;
  /** Per-student materials fee at the Advanced (7–12) level. */
  advFee: number;
}

// Workshop catalog (ARCC program model).
const MODS: Workshop[] = [
  {
    name: "3D Printing",
    desc: "Design, slice, and 3D-print real take-home objects.",
    grades: "1–8",
    introFee: 10,
    advFee: 18,
  },
  {
    name: "3D Modeling & Design (CAD)",
    desc: "Design on screen in Tinkercad/Fusion — spatial reasoning, measurement, iteration.",
    grades: "3–12",
    introFee: 4,
    advFee: 8,
  },
  {
    name: "Robotics & Maker Capstone",
    desc: "Build and control robots, ending in a student-choice capstone.",
    grades: "3–12",
    introFee: 12,
    advFee: 25,
  },
  {
    name: "Model Rocketry",
    desc: "Forces, aerodynamics, build and a supervised launch.",
    grades: "3–12",
    introFee: 12,
    advFee: 20,
  },
  {
    name: "Coding",
    desc: "Block-based to text coding through games and logic (Code.org).",
    grades: "1–8",
    introFee: 5,
    advFee: 8,
  },
  {
    name: "Electrical Engineering",
    desc: "Build real circuits — a touch alarm, night light, or motor fan.",
    grades: "4–12",
    introFee: 12,
    advFee: 20,
  },
  {
    name: "RC Trucks / Cars",
    desc: "Build, customize, and drive RC vehicles — motors and gearing.",
    grades: "3–12",
    introFee: 10,
    advFee: 20,
  },
  {
    name: "Cosplay & Prop Design",
    desc: "Design and fabricate props and wearables (3D print, foam).",
    grades: "4–12",
    introFee: 10,
    advFee: 18,
  },
  {
    name: "Maker & Science",
    desc: "Circuits, hands-on science, and design challenges.",
    grades: "1–8",
    introFee: 5,
    advFee: 10,
  },
];

/** Add-on classes taught back-to-back the same day are ⅓ off instruction. */
const DISC = 1 / 3;
const SETUP_FEE = 300;

// Grade bands — indexed so the two Intro / two Advanced options stay distinct in
// the <select> (the original HTML reused the same value for both, which a
// controlled React select can't represent). `adv` is derived from the index.
const BANDS = [
  "Grades K–3 (Intro)",
  "Grades 4–6 (Intro)",
  "Grades 7–8 (Advanced)",
  "Grades 9–12 (Advanced)",
];

// Shared field styling, matching the form treatment used across the site
// (e.g. SponsorPage's contact form).
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";
const labelClass = "mb-1.5 block text-sm font-semibold text-gray-700";
const checkRowClass =
  "flex cursor-pointer items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 transition-colors hover:border-blue-200 hover:bg-blue-50";
const checkboxClass =
  "mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500";

// CSS for the standalone print pop-up only — the generated quote is written into
// a blank window that has no access to the site's compiled Tailwind stylesheet,
// so it needs its own minimal, self-contained styling.
const PRINT_CSS = `
body { margin: 0; padding: 24px; background: #fff; font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #111827; }
.p-doc { max-width: 800px; margin: 0 auto; }
.p-card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px 22px; margin-bottom: 16px; }
.p-card-title { margin: 0 0 4px; font-size: 18px; font-weight: 700; color: #111827; }
.p-sub { margin: 0 0 12px; font-size: 12px; color: #6b7280; }
.p-meta-row { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; margin: 4px 0; }
.p-meta-label { min-width: 130px; font-weight: 600; color: #4b5563; }
.p-mod { font-size: 13px; margin: 6px 0; }
.p-callout { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; border-radius: 10px; padding: 10px 12px; font-size: 13px; margin-top: 10px; }
.p-note { font-size: 12px; color: #6b7280; font-style: italic; margin-top: 8px; }
.p-table { width: 100%; border-collapse: collapse; margin: 8px 0 4px; font-size: 13px; }
.p-th { text-align: left; padding: 6px; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: #6b7280; border-bottom: 1px solid #e5e7eb; }
.p-th.p-th-num, .p-td.p-td-num { text-align: right; font-variant-numeric: tabular-nums; }
.p-td { padding: 6px; border-bottom: 1px solid #f3f4f6; }
.p-sav { color: #059669; font-weight: 600; }
.p-total-row { font-weight: 800; border-top: 2px solid #111827; border-bottom: none; font-size: 14px; }
.p-badge { display: inline-block; background: #ecfdf5; color: #047857; padding: 8px 12px; border-radius: 8px; font-size: 13px; font-weight: 700; margin-top: 8px; }
.p-flag { background: #fef2f2; color: #b91c1c; padding: 8px 12px; border-radius: 8px; font-size: 12px; margin-top: 8px; }
@page { margin: 14mm; }
`;

const num = (v: string): number => Number(v) || 0;
const money = (n: number): string =>
  "$" + Math.round(n).toLocaleString("en-US");
const money2 = (n: number): string =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

interface FormState {
  org: string;
  poc: string;
  band: string; // BANDS index as string
  sched: string;
  daysWk: string;
  weeks: string;
  hrs: string;
  students: string;
  addl: string;
  rate: string;
  travel: string;
  returning: boolean;
  selected: boolean[];
}

const INITIAL: FormState = {
  org: "",
  poc: "",
  band: "0",
  sched: "",
  daysWk: "1",
  weeks: "23",
  hrs: "1",
  students: "20",
  addl: "0",
  rate: "325",
  travel: "0",
  returning: false,
  selected: MODS.map((_, i) => i === 0),
};

function compute(s: FormState) {
  const org = s.org.trim() || "[School]";
  const poc = s.poc.trim() || "[Point of contact]";
  const sched = s.sched.trim() || "[Schedule]";
  const adv = num(s.band) >= 2;
  const daysWk = num(s.daysWk);
  const weeks = num(s.weeks);
  const hrs = num(s.hrs);
  const students = num(s.students);
  const rate = num(s.rate);
  const travel = num(s.travel);
  const addl = Math.max(0, num(s.addl));
  const returning = s.returning;
  const sel = MODS.filter((_, i) => s.selected[i]);

  const sessions = daysWk * weeks;
  const classHr = rate * hrs; // one class, one session
  const addlHrEach = classHr * (1 - DISC); // each add-on class (⅓ off)
  const classes = 1 + addl;
  const instrSession = classHr + addl * addlHrEach;
  const fullPriceSession = classHr * classes; // if add-ons were full price
  const addonSavingsSession = fullPriceSession - instrSession;
  const totalStudents = students * classes;
  const matPerStudent = sel.reduce(
    (acc, m) => acc + (adv ? m.advFee : m.introFee),
    0,
  );
  const materials = matPerStudent * totalStudents;
  const instruction = instrSession * sessions;
  const addonSavings = addonSavingsSession * sessions;
  const travelTot = travel * sessions;
  const setup = returning ? 0 : SETUP_FEE;
  const total = instruction + materials + travelTot + setup;
  const perStudent = totalStudents ? total / totalStudents : 0;
  const perStudentSession =
    totalStudents && sessions ? total / totalStudents / sessions : 0;

  return {
    org,
    poc,
    sched,
    adv,
    daysWk,
    weeks,
    hrs,
    students,
    rate,
    travel,
    addl,
    returning,
    sel,
    sessions,
    classHr,
    addlHrEach,
    classes,
    instrSession,
    addonSavingsSession,
    totalStudents,
    matPerStudent,
    materials,
    instruction,
    addonSavings,
    travelTot,
    setup,
    total,
    perStudent,
    perStudentSession,
  };
}

type Quote = ReturnType<typeof compute>;

function buildText(d: Quote): string {
  const addonLine =
    d.addl > 0
      ? `Add-on classes: ${d.addl} back-to-back @ 1/3 off — saves ${money(
          d.addonSavings,
        )} over the program.\n`
      : "";
  return `${d.org} — On-Campus Workshops & Estimate (FundedYouth)
Contact: ${d.poc}
Schedule: ${d.sched}
Visits: ${d.daysWk} day/wk x ${d.weeks} wks = ${d.sessions}; ${
    d.classes
  } class(es)/visit x ${d.hrs}h; ${d.totalStudents} students total
Workshops: ${d.sel.map((m) => m.name).join(", ") || "(none selected)"}
${addonLine}Instruction: ${money(d.instruction)} | Materials: ${money(
    d.materials,
  )} | Travel: ${money(d.travelTot)} | Setup: ${money(d.setup)}
TOTAL: ${money(d.total)}  (~${money2(
    d.perStudentSession,
  )}/student/class; ${money2(d.perStudent)}/student for the program)
Every class: screened instructor + all curriculum/tools/materials + family showcase + free student memberships.
FundedYouth · info@fundedyouth.org · 501(c)(3) EIN 93-4090260`;
}

export function SchoolCostEstimatePage() {
  const [state, setState] = useState<FormState>(INITIAL);
  const [copyLabel, setCopyLabel] = useState("Copy outline");
  const outlineRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

  useSeo({
    title: "School Program Cost Estimator — FundedYouth",
    description:
      "Model on-campus STEAM workshop hours, groups, and cost for your school or partner site. Pick workshops and the outline and quote build automatically.",
    url: "https://fundedyouth.org/apps/school-cost-estimate",
  });

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const d = useMemo(() => compute(state), [state]);
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function toggleMod(i: number) {
    setState((prev) => {
      const selected = [...prev.selected];
      selected[i] = !selected[i];
      return { ...prev, selected };
    });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildText(d));
      setCopyLabel("Copied ✓");
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopyLabel("Copy outline"), 1500);
    } catch {
      alert("Copy failed — select the text manually.");
    }
  }

  function handlePrint() {
    const node = outlineRef.current;
    if (!node) return;
    const win = window.open("", "_blank");
    if (!win) {
      alert("Please allow pop-ups for this page to print the estimate.");
      return;
    }
    win.document.write(
      '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
        "<title>FundedYouth — On-Campus Workshops Estimate</title>" +
        "<style>" +
        PRINT_CSS +
        '</style></head><body><div class="p-doc">' +
        node.outerHTML +
        "</div></body></html>",
    );
    win.document.close();
    win.focus();

    let printed = false;
    const doPrint = () => {
      if (printed) return;
      printed = true;
      win.print();
    };
    win.onload = doPrint;
    setTimeout(doPrint, 500);
  }

  const classesLbl =
    d.classes > 1
      ? `${d.classes} classes/day (${d.students} students each = ${d.totalStudents})`
      : `${d.students} students`;

  return (
    <main>
      {/* Styles for the print pop-up only (see PRINT_CSS above). */}
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 md:py-16">
        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <Link
            to="/apps"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Apps
          </Link>
          <div className="mt-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 shadow-sm backdrop-blur">
              For Schools
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            On-Campus Workshops &amp; Cost Generator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            We bring the whole makerspace to your campus. Pick your workshops,
            hours, and groups — the outline and cost build automatically.
          </p>
        </div>
      </section>

      {/* Form + generated quote */}
      <section className="bg-white py-10 md:py-14">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            {/* ---- Input form ---- */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Your school &amp; schedule
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <label className={labelClass}>School / organization</label>
                  <input
                    className={inputClass}
                    value={state.org}
                    onChange={(e) => set("org", e.target.value)}
                    placeholder="e.g., Alpine Homeschool Co-op"
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Point of contact{" "}
                    <span className="font-normal text-gray-400">
                      (name, title, email)
                    </span>
                  </label>
                  <input
                    className={inputClass}
                    value={state.poc}
                    onChange={(e) => set("poc", e.target.value)}
                    placeholder="e.g., Jane Smith, Director — jane@school.org"
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Grade band{" "}
                    <span className="font-normal text-gray-400">
                      (sets the materials level)
                    </span>
                  </label>
                  <select
                    className={inputClass}
                    value={state.band}
                    onChange={(e) => set("band", e.target.value)}
                  >
                    {BANDS.map((label, i) => (
                      <option key={i} value={String(i)}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 space-y-4 border-t border-dashed border-gray-200 pt-5">
                <div>
                  <label className={labelClass}>
                    Schedule{" "}
                    <span className="font-normal text-gray-400">
                      (free text — appears in the outline)
                    </span>
                  </label>
                  <textarea
                    className={`${inputClass} min-h-[52px] resize-y`}
                    value={state.sched}
                    onChange={(e) => set("sched", e.target.value)}
                    placeholder="e.g., Fridays, Sept 2026 – Mar 2027"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Days on site / week</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      className={inputClass}
                      value={state.daysWk}
                      onChange={(e) => set("daysWk", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Program weeks</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      className={inputClass}
                      value={state.weeks}
                      onChange={(e) => set("weeks", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Hours / class</label>
                    <select
                      className={inputClass}
                      value={state.hrs}
                      onChange={(e) => set("hrs", e.target.value)}
                    >
                      <option value="1">1.0</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2.0</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Students / class</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      className={inputClass}
                      value={state.students}
                      onChange={(e) => set("students", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-dashed border-gray-200 pt-5">
                <label className={labelClass}>
                  Workshops offered{" "}
                  <span className="font-normal text-gray-400">
                    (run one, rotate several, or sequence a pathway)
                  </span>
                </label>
                <div className="mt-2 grid gap-2">
                  {MODS.map((m, i) => (
                    <label className={checkRowClass} key={m.name}>
                      <input
                        type="checkbox"
                        checked={state.selected[i]}
                        onChange={() => toggleMod(i)}
                        className={checkboxClass}
                      />
                      <span className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">
                          {m.name}
                        </span>{" "}
                        <span className="text-gray-400">(gr {m.grades})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-dashed border-gray-200 pt-5">
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="text-sm font-bold text-gray-900">
                    ➕ Add-on classes (same day, back-to-back)
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    Because our instructor and equipment are already on campus,
                    each additional class taught right after the first — for a
                    different age group or topic — is <b>⅓ off</b> the
                    instruction rate.
                  </p>
                  <label className={`${labelClass} mt-3`}>
                    How many additional back-to-back classes?
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className={inputClass}
                    value={state.addl}
                    onChange={(e) => set("addl", e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-5 border-t border-dashed border-gray-200 pt-5">
                <label className={labelClass}>Rate &amp; extras</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Instruction / hour
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="5"
                      className={inputClass}
                      value={state.rate}
                      onChange={(e) => set("rate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Travel surcharge / day
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="5"
                      className={inputClass}
                      value={state.travel}
                      onChange={(e) => set("travel", e.target.value)}
                    />
                  </div>
                </div>
                <label className={`${checkRowClass} mt-3 items-center`}>
                  <input
                    type="checkbox"
                    checked={state.returning}
                    onChange={(e) => set("returning", e.target.checked)}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-gray-700">
                    Returning / multi-site partner — waive setup fee
                  </span>
                </label>
              </div>
            </div>

            {/* ---- Generated outline & quote ---- */}
            <div className="lg:sticky lg:top-24">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Generated workshops &amp; quote
              </h2>

              <div ref={outlineRef} className="p-doc mt-5 space-y-4">
                <div className="p-card rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="p-card-title text-lg font-bold text-gray-900">
                    {d.org} — On-Campus Workshops &amp; Estimate
                  </h3>
                  <p className="p-sub mt-0.5 text-xs text-gray-500">
                    Prepared by FundedYouth · {today}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <div className="p-meta-row flex justify-between gap-3 text-sm">
                      <span className="p-meta-label font-semibold text-gray-500">
                        Point of contact
                      </span>
                      <span className="text-right text-gray-900">{d.poc}</span>
                    </div>
                    <div className="p-meta-row flex justify-between gap-3 text-sm">
                      <span className="p-meta-label font-semibold text-gray-500">
                        Schedule
                      </span>
                      <span className="text-right text-gray-900">
                        {d.sched}
                      </span>
                    </div>
                    <div className="p-meta-row flex justify-between gap-3 text-sm">
                      <span className="p-meta-label font-semibold text-gray-500">
                        Sessions
                      </span>
                      <span className="text-right text-gray-900">
                        {d.daysWk} day/wk × {d.weeks} wks ={" "}
                        <b>{d.sessions} visits</b>
                      </span>
                    </div>
                    <div className="p-meta-row flex justify-between gap-3 text-sm">
                      <span className="p-meta-label font-semibold text-gray-500">
                        Each visit
                      </span>
                      <span className="text-right text-gray-900">
                        {d.classes} class(es), {d.hrs} hour(s) each
                      </span>
                    </div>
                    <div className="p-meta-row flex justify-between gap-3 text-sm">
                      <span className="p-meta-label font-semibold text-gray-500">
                        Students
                      </span>
                      <span className="text-right text-gray-900">
                        {classesLbl}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-card rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="p-card-title text-base font-bold text-gray-900">
                    Workshops selected
                  </h3>
                  <p className="p-sub mt-0.5 text-xs text-gray-500">
                    Every class is hands-on and project-based; we bring all
                    curriculum, tools, and materials. Students leave with
                    finished projects.
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {d.sel.length ? (
                      d.sel.map((m) => (
                        <div
                          className="p-mod text-sm text-gray-700"
                          key={m.name}
                        >
                          •{" "}
                          <span className="font-semibold text-gray-900">
                            {m.name}
                          </span>{" "}
                          — {m.desc}
                        </div>
                      ))
                    ) : (
                      <div className="p-mod text-sm font-medium text-red-600">
                        Select at least one workshop.
                      </div>
                    )}
                  </div>
                  {d.addl > 0 ? (
                    <div className="p-callout mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                      ➕ {d.addl} add-on class(es) stacked back-to-back —
                      perfect for teaching a different age group the same day,
                      at ⅓ off instruction. You save{" "}
                      <b>{money(d.addonSavings)}</b> over the program.
                    </div>
                  ) : (
                    <p className="p-note mt-3 text-xs italic text-gray-500">
                      Tip: add a second class right after the first (a different
                      grade level or topic) and each add-on is ⅓ off — one
                      campus visit, twice the students.
                    </p>
                  )}
                  <h3 className="p-card-title mt-4 text-sm font-bold text-gray-900">
                    Every class includes
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-600">
                    A screened FundedYouth instructor · all curriculum, tools
                    &amp; equipment · consumable materials · low 1:4–1:8
                    hands-on ratios · an end-of-run family showcase · a free
                    FundedYouth membership for every enrolled student.
                  </p>
                </div>

                <div className="p-card rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="p-card-title text-base font-bold text-gray-900">
                    Investment
                  </h3>
                  <table className="p-table mt-2 w-full text-sm">
                    <tbody>
                      <tr>
                        <th className="p-th border-b border-gray-200 pb-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Line item
                        </th>
                        <th className="p-th p-th-num border-b border-gray-200 pb-2 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Total
                        </th>
                      </tr>
                      <tr>
                        <td className="p-td border-b border-gray-100 py-2 text-gray-700">
                          Instruction ({money(d.rate)}/hr × {d.hrs}h ×{" "}
                          {d.sessions} visits
                          {d.classes > 1 ? `, ${d.classes} classes/day` : ""})
                        </td>
                        <td className="p-td p-td-num border-b border-gray-100 py-2 text-right tabular-nums text-gray-900">
                          {money(d.instruction)}
                        </td>
                      </tr>
                      {d.addl > 0 && (
                        <tr>
                          <td className="p-td border-b border-gray-100 py-2 pl-4 text-xs text-gray-500">
                            ↳ includes {d.addl} add-on class(es) @ ⅓ off (
                            {money(d.addlHrEach)}/class vs {money(d.classHr)})
                          </td>
                          <td className="p-td p-td-num border-b border-gray-100 py-2"></td>
                        </tr>
                      )}
                      {d.addl > 0 && (
                        <tr>
                          <td className="p-td p-sav border-b border-gray-100 py-2 font-semibold text-emerald-600">
                            Add-on savings vs. full price
                          </td>
                          <td className="p-td p-td-num p-sav border-b border-gray-100 py-2 text-right font-semibold tabular-nums text-emerald-600">
                            −{money(d.addonSavings)}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="p-td border-b border-gray-100 py-2 text-gray-700">
                          Materials ({money2(d.matPerStudent)}/student ×{" "}
                          {d.totalStudents})
                        </td>
                        <td className="p-td p-td-num border-b border-gray-100 py-2 text-right tabular-nums text-gray-900">
                          {money(d.materials)}
                        </td>
                      </tr>
                      {d.travel > 0 && (
                        <tr>
                          <td className="p-td border-b border-gray-100 py-2 text-gray-700">
                            Travel ({money(d.travel)} × {d.sessions} days)
                          </td>
                          <td className="p-td p-td-num border-b border-gray-100 py-2 text-right tabular-nums text-gray-900">
                            {money(d.travelTot)}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="p-td border-b border-gray-100 py-2 text-gray-700">
                          Setup / curriculum fee
                          {d.returning && (
                            <span className="text-xs text-gray-400">
                              {" "}
                              (returning-partner courtesy)
                            </span>
                          )}
                        </td>
                        <td className="p-td p-td-num border-b border-gray-100 py-2 text-right tabular-nums text-gray-900">
                          {d.setup > 0 ? money(d.setup) : "$0"}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-td p-total-row border-t-2 border-gray-900 py-2.5 text-base font-extrabold text-gray-900">
                          Total program
                        </td>
                        <td className="p-td p-td-num p-total-row border-t-2 border-gray-900 py-2.5 text-right text-base font-extrabold tabular-nums text-gray-900">
                          {money(d.total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-badge mt-3 inline-block rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                    About {money2(d.perStudentSession)} / student / class
                    &nbsp;·&nbsp; {money2(d.perStudent)} / student for the
                    program
                  </div>
                  <p className="p-sub mt-2 text-xs text-gray-500">
                    Comparable enrichment programs typically run ~$25–30 per
                    student per session at retail. Materials may be billed to
                    the school or collected from families at registration —
                    whichever is simpler.
                  </p>
                  {d.sel.length === 0 && (
                    <div className="p-flag mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                      Add at least one workshop to see materials and cost.
                    </div>
                  )}
                </div>

                <div className="p-card rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="p-card-title text-base font-bold text-gray-900">
                    Next steps
                  </h3>
                  <div className="mt-2 space-y-2 text-sm text-gray-700">
                    <p>
                      1 · A quick call to confirm workshops, dates, group sizes,
                      and classroom space (tables + outlets).
                    </p>
                    <p>
                      2 · We complete any site-required instructor clearances
                      (background check / Safe Environment).
                    </p>
                    <p>
                      3 · Countersign the scope; we schedule the instructor and
                      open family enrollment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export & share */}
      <section className="bg-gray-50 py-10 md:py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-center text-xs font-bold uppercase tracking-wider text-blue-700">
            Share this quote
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
              >
                {copyLabel}
              </button>
              <p className="mt-3 text-sm text-gray-600">
                Copies a plain-text summary of this quote to your clipboard —
                paste it into an email, Slack message, or text.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                Print / Save PDF
              </button>
              <p className="mt-3 text-sm text-gray-600">
                Opens the formatted quote in a new tab, ready to print or save
                as a PDF to send or hand to the school.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fine print */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="text-xs leading-relaxed text-gray-500">
            Instruction is a flat hourly rate (standard $325/hr, up to ~20
            students per class).{" "}
            <b className="font-semibold text-gray-700">
              Add-on classes taught back-to-back the same day are ⅓ off
            </b>{" "}
            — ideal for serving different grade levels in one visit. Materials
            are a per-student fee that varies by workshop and level; travel is
            included within the San Diego service area. This estimate is for
            planning; rates are a standard starting point — multi-site,
            full-year, and nonprofit-partner commitments are negotiable. Final
            quotes are confirmed in a short scoping call. FundedYouth is a
            501(c)(3) nonprofit (EIN 93-4090260). Generated {today}.
          </p>
        </div>
      </section>
    </main>
  );
}
