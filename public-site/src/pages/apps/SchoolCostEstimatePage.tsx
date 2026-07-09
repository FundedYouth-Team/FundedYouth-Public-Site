/* eslint-disable tailwindcss/no-custom-classname -- this tool uses its own scoped
   brand CSS (see SCHOOL_CSS) rather than Tailwind utilities. */
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
 * Ported verbatim (behaviour + look) from a standalone HTML tool into a scoped
 * React component. Its navy/red/gold brand palette lives in SCHOOL_CSS, fully
 * namespaced under `.fy-sce-app` so it neither leaks into nor inherits from the
 * surrounding site chrome.
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

const SCHOOL_CSS = `
.fy-sce-app {
  --navy:#1E2A47; --red:#B5432F; --gold:#D99B32; --cream:#F6ECDA;
  --ink:#25324f; --line:#e2dac8; --soft:#faf6ec; --green:#2f6f4f;
  font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
  color:var(--ink);
  background:#eef0f4;
}
.fy-sce-app * { box-sizing:border-box; }

.fy-sce-app .sce-backbar {
  background:#fff;
  border-bottom:1px solid var(--line);
  padding:12px 28px;
}
.fy-sce-app .back-link {
  display:inline-flex; align-items:center; gap:6px;
  font-size:14px; font-weight:600; color:var(--red); text-decoration:none;
}
.fy-sce-app .back-link:hover { text-decoration:underline; }

.fy-sce-app header { background:var(--navy); color:#fff; padding:18px 28px; }
.fy-sce-app header h1 { margin:0; font-size:20px; }
.fy-sce-app header p { margin:4px 0 0; opacity:.85; font-size:13px; }

.fy-sce-app .wrap { display:flex; flex-wrap:wrap; max-width:1200px; margin:0 auto; }
.fy-sce-app .panel { flex:1 1 380px; padding:22px 26px; }
.fy-sce-app .form { background:#fff; border-right:1px solid var(--line); }
.fy-sce-app .out { background:var(--soft); }

.fy-sce-app h2 {
  font-size:12px; text-transform:uppercase; letter-spacing:.8px;
  color:var(--red); margin:0 0 12px;
}
.fy-sce-app label { display:block; font-size:13px; font-weight:600; margin:12px 0 5px; }
.fy-sce-app .hint { font-weight:400; color:#8a93a3; font-size:12px; }

.fy-sce-app input, .fy-sce-app textarea, .fy-sce-app select {
  width:100%; padding:9px 11px; border:1px solid var(--line);
  border-radius:7px; font-size:14px; font-family:inherit; background:#fff;
}
.fy-sce-app input:focus, .fy-sce-app textarea:focus, .fy-sce-app select:focus {
  outline:none; border-color:var(--gold); box-shadow:0 0 0 3px rgba(217,155,50,.18);
}
.fy-sce-app textarea { resize:vertical; min-height:52px; }
.fy-sce-app .row { display:flex; gap:12px; }
.fy-sce-app .row > div { flex:1; }
.fy-sce-app .checks { display:grid; grid-template-columns:1fr; gap:6px; margin:6px 0 2px; }
.fy-sce-app .chk { display:flex; align-items:center; gap:8px; font-weight:500; font-size:13px; margin:0; }
.fy-sce-app .chk input { width:auto; padding:0; }

.fy-sce-app .grp { margin-top:16px; padding-top:14px; border-top:1px dashed var(--line); }
.fy-sce-app .grp:first-of-type { border-top:none; margin-top:0; padding-top:0; }

.fy-sce-app .addbox {
  background:var(--cream); border:1px solid var(--gold);
  border-radius:9px; padding:12px 14px; margin-top:6px;
}
.fy-sce-app .addbox .t { font-weight:700; color:var(--navy); font-size:13px; margin-bottom:2px; }

.fy-sce-app .btns { margin-top:18px; display:flex; gap:10px; }
.fy-sce-app button {
  flex:1; padding:11px; border:none; border-radius:8px;
  font-size:14px; font-weight:700; cursor:pointer;
}
.fy-sce-app button.copy { background:var(--red); color:#fff; }
.fy-sce-app button.copy:hover { background:#9a3826; }
.fy-sce-app button.print { background:#fff; color:var(--navy); border:1px solid var(--line); }
.fy-sce-app button.print:hover { background:var(--cream); }

.fy-sce-app .card {
  background:#fff; border:1px solid var(--line); border-radius:10px;
  padding:20px 22px; margin-bottom:15px;
}
.fy-sce-app .card h3 { margin:0 0 4px; font-size:18px; color:var(--navy); }
.fy-sce-app .card .sub { color:#8a93a3; font-size:12px; margin:0 0 12px; }

.fy-sce-app .meta div { font-size:13px; margin:3px 0; }
.fy-sce-app .meta b { display:inline-block; min-width:150px; color:#52606d; }
.fy-sce-app .mod { font-size:13px; margin:6px 0; }
.fy-sce-app .mod b { color:var(--navy); }

.fy-sce-app table { width:100%; border-collapse:collapse; margin:6px 0 4px; }
.fy-sce-app th, .fy-sce-app td {
  text-align:left; padding:8px 8px; font-size:13px; border-bottom:1px solid var(--line);
}
.fy-sce-app th { color:#52606d; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:.5px; }
.fy-sce-app td.num, .fy-sce-app th.num { text-align:right; font-variant-numeric:tabular-nums; }
.fy-sce-app .sav td { color:var(--green); font-weight:600; }
.fy-sce-app .total td { font-weight:800; border-top:2px solid var(--navy); border-bottom:none; font-size:15px; }

.fy-sce-app .badge {
  display:inline-block; background:rgba(58,125,93,.12); color:var(--green);
  padding:7px 11px; border-radius:7px; font-size:13px; font-weight:700; margin-top:10px;
}
.fy-sce-app .savecall {
  background:rgba(217,155,50,.15); border:1px solid var(--gold); color:#7a5a12;
  padding:9px 12px; border-radius:8px; font-size:13px; font-weight:600; margin-top:10px;
}
.fy-sce-app .flag {
  background:rgba(181,67,47,.09); color:#9a3826;
  padding:8px 11px; border-radius:7px; font-size:12px; margin-top:10px;
}
.fy-sce-app footer {
  max-width:1200px; margin:0 auto; padding:14px 28px 30px;
  color:#8a93a3; font-size:12px;
}
`;

// Extra CSS used only inside the print window — white background, no side padding.
const PRINT_CSS = `
body { margin:0; background:#fff; }
.fy-sce-app { background:#fff; }
.fy-sce-app .out { background:#fff; }
.fy-sce-app .panel { padding:0; }
@page { margin:14mm; }
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
        SCHOOL_CSS +
        PRINT_CSS +
        '</style></head><body><div class="fy-sce-app">' +
        '<section class="panel out">' +
        node.outerHTML +
        "</section></div></body></html>",
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
    <main className="bg-background">
      {/* Scoped brand styles for this tool. */}
      <style dangerouslySetInnerHTML={{ __html: SCHOOL_CSS }} />

      <div className="fy-sce-app">
        <div className="sce-backbar">
          <Link to="/apps" className="back-link">
            ← Apps
          </Link>
        </div>

        <header>
          <h1>FundedYouth — On-Campus Workshops &amp; Cost Generator</h1>
          <p>
            We bring the whole makerspace to your campus. Pick your workshops,
            hours, and groups — the outline and cost build automatically.
          </p>
        </header>

        <div className="wrap">
          {/* ---- Input form ---- */}
          <section className="panel form">
            <h2>Your school &amp; schedule</h2>

            <div className="grp">
              <label>School / organization</label>
              <input
                value={state.org}
                onChange={(e) => set("org", e.target.value)}
                placeholder="e.g., Alpine Homeschool Co-op"
              />
              <label>
                Point of contact{" "}
                <span className="hint">(name, title, email)</span>
              </label>
              <input
                value={state.poc}
                onChange={(e) => set("poc", e.target.value)}
                placeholder="e.g., Jane Smith, Director — jane@school.org"
              />
              <label>
                Grade band{" "}
                <span className="hint">(sets the materials level)</span>
              </label>
              <select
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

            <div className="grp">
              <label>
                Schedule{" "}
                <span className="hint">
                  (free text — appears in the outline)
                </span>
              </label>
              <textarea
                value={state.sched}
                onChange={(e) => set("sched", e.target.value)}
                placeholder="e.g., Fridays, Sept 2026 – Mar 2027"
              />
              <div className="row">
                <div>
                  <label>Days on site / week</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={state.daysWk}
                    onChange={(e) => set("daysWk", e.target.value)}
                  />
                </div>
                <div>
                  <label>Program weeks</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={state.weeks}
                    onChange={(e) => set("weeks", e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label>Hours / class</label>
                  <select
                    value={state.hrs}
                    onChange={(e) => set("hrs", e.target.value)}
                  >
                    <option value="1">1.0</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2.0</option>
                  </select>
                </div>
                <div>
                  <label>Students / class</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={state.students}
                    onChange={(e) => set("students", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grp">
              <label>
                Workshops offered{" "}
                <span className="hint">
                  (run one, rotate several, or sequence a pathway)
                </span>
              </label>
              <div className="checks">
                {MODS.map((m, i) => (
                  <label className="chk" key={m.name}>
                    <input
                      type="checkbox"
                      checked={state.selected[i]}
                      onChange={() => toggleMod(i)}
                    />{" "}
                    {m.name} <span className="hint">(gr {m.grades})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grp">
              <div className="addbox">
                <div className="t">
                  ➕ Add-on classes (same day, back-to-back)
                </div>
                <div className="hint" style={{ marginBottom: 8 }}>
                  Because our instructor and equipment are already on campus,
                  each additional class taught right after the first — for a
                  different age group or topic — is <b>⅓ off</b> the instruction
                  rate.
                </div>
                <label>How many additional back-to-back classes?</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={state.addl}
                  onChange={(e) => set("addl", e.target.value)}
                />
              </div>
            </div>

            <div className="grp">
              <label>Rate &amp; extras</label>
              <div className="row">
                <div>
                  <label className="hint">Instruction / hour</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={state.rate}
                    onChange={(e) => set("rate", e.target.value)}
                  />
                </div>
                <div>
                  <label className="hint">Travel surcharge / day</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={state.travel}
                    onChange={(e) => set("travel", e.target.value)}
                  />
                </div>
              </div>
              <label className="chk" style={{ marginTop: 10 }}>
                <input
                  type="checkbox"
                  checked={state.returning}
                  onChange={(e) => set("returning", e.target.checked)}
                />{" "}
                Returning / multi-site partner — waive setup fee
              </label>
            </div>

            <div className="btns">
              <button type="button" className="copy" onClick={handleCopy}>
                {copyLabel}
              </button>
              <button type="button" className="print" onClick={handlePrint}>
                Print / Save PDF
              </button>
            </div>
          </section>

          {/* ---- Generated outline & quote ---- */}
          <section className="panel out">
            <h2>Generated workshops &amp; quote</h2>
            <div ref={outlineRef}>
              <div className="card">
                <h3>{d.org} — On-Campus Workshops &amp; Estimate</h3>
                <p className="sub">Prepared by FundedYouth · {today}</p>
                <div className="meta">
                  <div>
                    <b>Point of contact</b>
                    {d.poc}
                  </div>
                  <div>
                    <b>Schedule</b>
                    {d.sched}
                  </div>
                  <div>
                    <b>Sessions</b>
                    {d.daysWk} day/wk × {d.weeks} wks ={" "}
                    <b style={{ minWidth: 0 }}>{d.sessions} visits</b>
                  </div>
                  <div>
                    <b>Each visit</b>
                    {d.classes} class(es), {d.hrs} hour(s) each
                  </div>
                  <div>
                    <b>Students</b>
                    {classesLbl}
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: 15 }}>Workshops selected</h3>
                <p className="sub">
                  Every class is hands-on and project-based; we bring all
                  curriculum, tools, and materials. Students leave with finished
                  projects.
                </p>
                {d.sel.length ? (
                  d.sel.map((m) => (
                    <div className="mod" key={m.name}>
                      • <b>{m.name}</b> — {m.desc}
                    </div>
                  ))
                ) : (
                  <div className="mod" style={{ color: "#b5432f" }}>
                    Select at least one workshop.
                  </div>
                )}
                {d.addl > 0 ? (
                  <div className="savecall">
                    ➕ {d.addl} add-on class(es) stacked back-to-back — perfect
                    for teaching a different age group the same day, at ⅓ off
                    instruction. You save <b>{money(d.addonSavings)}</b> over
                    the program.
                  </div>
                ) : (
                  <div className="sub" style={{ marginTop: 8 }}>
                    Tip: add a second class right after the first (a different
                    grade level or topic) and each add-on is ⅓ off — one campus
                    visit, twice the students.
                  </div>
                )}
                <h3 style={{ fontSize: 14, marginTop: 14 }}>
                  Every class includes
                </h3>
                <div className="meta">
                  <div>
                    A screened FundedYouth instructor · all curriculum, tools
                    &amp; equipment · consumable materials · low 1:4–1:8
                    hands-on ratios · an end-of-run family showcase · a free
                    FundedYouth membership for every enrolled student.
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: 15 }}>Investment</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Line item</th>
                      <th className="num">Total</th>
                    </tr>
                    <tr>
                      <td>
                        Instruction ({money(d.rate)}/hr × {d.hrs}h ×{" "}
                        {d.sessions} visits
                        {d.classes > 1 ? `, ${d.classes} classes/day` : ""})
                      </td>
                      <td className="num">{money(d.instruction)}</td>
                    </tr>
                    {d.addl > 0 && (
                      <tr>
                        <td>
                          &nbsp;&nbsp;↳ includes {d.addl} add-on class(es) @ ⅓
                          off ({money(d.addlHrEach)}/class vs {money(d.classHr)}
                          )
                        </td>
                        <td className="num"></td>
                      </tr>
                    )}
                    {d.addl > 0 && (
                      <tr className="sav">
                        <td>Add-on savings vs. full price</td>
                        <td className="num">−{money(d.addonSavings)}</td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        Materials ({money2(d.matPerStudent)}/student ×{" "}
                        {d.totalStudents})
                      </td>
                      <td className="num">{money(d.materials)}</td>
                    </tr>
                    {d.travel > 0 && (
                      <tr>
                        <td>
                          Travel ({money(d.travel)} × {d.sessions} days)
                        </td>
                        <td className="num">{money(d.travelTot)}</td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        Setup / curriculum fee
                        {d.returning && (
                          <span className="hint">
                            {" "}
                            (returning-partner courtesy)
                          </span>
                        )}
                      </td>
                      <td className="num">
                        {d.setup > 0 ? money(d.setup) : "$0"}
                      </td>
                    </tr>
                    <tr className="total">
                      <td>Total program</td>
                      <td className="num">{money(d.total)}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="badge">
                  About {money2(d.perStudentSession)} / student / class
                  &nbsp;·&nbsp; {money2(d.perStudent)} / student for the program
                </div>
                <div className="sub" style={{ marginTop: 8 }}>
                  Comparable enrichment programs typically run ~$25–30 per
                  student per session at retail. Materials may be billed to the
                  school or collected from families at registration — whichever
                  is simpler.
                </div>
                {d.sel.length === 0 && (
                  <div className="flag">
                    Add at least one workshop to see materials and cost.
                  </div>
                )}
              </div>

              <div className="card">
                <h3 style={{ fontSize: 15 }}>Next steps</h3>
                <div className="meta">
                  <div>
                    1 · A quick call to confirm workshops, dates, group sizes,
                    and classroom space (tables + outlets).
                  </div>
                  <div>
                    2 · We complete any site-required instructor clearances
                    (background check / Safe Environment).
                  </div>
                  <div>
                    3 · Countersign the scope; we schedule the instructor and
                    open family enrollment.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer>
          Instruction is a flat hourly rate (standard $325/hr, up to ~20
          students per class).{" "}
          <b>Add-on classes taught back-to-back the same day are ⅓ off</b> —
          ideal for serving different grade levels in one visit. Materials are a
          per-student fee that varies by workshop and level; travel is included
          within the San Diego service area. This estimate is for planning;
          rates are a standard starting point — multi-site, full-year, and
          nonprofit-partner commitments are negotiable. Final quotes are
          confirmed in a short scoping call. FundedYouth is a 501(c)(3)
          nonprofit (EIN 93-4090260). Generated {today}.
        </footer>
      </div>
    </main>
  );
}
