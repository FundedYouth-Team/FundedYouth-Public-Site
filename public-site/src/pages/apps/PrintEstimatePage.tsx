/* eslint-disable tailwindcss/no-custom-classname -- this ported tool uses its own
   scoped CSS (see ESTIMATE_CSS) rather than Tailwind utilities. */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../../lib/useSeo";

/**
 * 3D Print Cost & Sales Calculator.
 *
 * Ported from the original standalone HTML tool. The styling is kept faithful to
 * that tool and scoped under `.fy-estimate-app` so it doesn't collide with the
 * site's Tailwind/shadcn tokens.
 */

// Filament library — edit this list to add/remove colors. Only name + type needed.
const MATERIALS: Array<{ name: string; type: string }> = [
  { name: "Basic Red", type: "PLA" },
  { name: "Basic Blue", type: "PLA" },
  { name: "Basic Green", type: "PLA" },
  { name: "Silk Shiny Gold", type: "PLA" },
  { name: "Glow in Dark", type: "PLA" },
  { name: "Clear", type: "PETG" },
  { name: "Black Heavy Duty", type: "PETG" },
];

// Unique types (e.g. PLA, PETG), in the order they first appear.
const FILAMENT_TYPES = [...new Set(MATERIALS.map((m) => m.type))];

const MARKUP_OPTIONS = [
  { value: "1.0", label: "Break Even (1.0x) — No Profit" },
  { value: "1.2", label: "Friend Discount (1.2x) — Small Profit" },
  { value: "1.5", label: "School Store Standard (1.5x) — Good Profit" },
  { value: "2.0", label: "Standard Retail (2.0x) — Double the Cost" },
  { value: "3.0", label: "Premium Rush (3.0x) — Triple the Cost" },
];

const SERVICE_OPTIONS = ["Support Removal", "Sanding", "Assembly", "Painting"];

type Printer = "sovol" | "bambu";

interface Filament {
  type: string;
  material: string;
}

function firstMaterialOfType(type: string): string {
  return MATERIALS.find((m) => m.type === type)?.name ?? "";
}

function defaultFilament(): Filament {
  const type = FILAMENT_TYPES[0];
  return { type, material: firstMaterialOfType(type) };
}

const ESTIMATE_CSS = `
.fy-estimate-app {
  --primary: #4a90e2;
  --primary-dark: #357abd;
  --secondary: #2ecc71;
  --bg-color: #f5f7fa;
  --card-bg: #ffffff;
  --text-main: #333333;
  --text-muted: #777777;
  --border-color: #dddddd;
  --sovol-active-bg: #dbeafe;
  --sovol-active-text: #1e40af;
  --bambu-active-bg: #dcfce7;
  --bambu-active-text: #14532d;

  background-color: var(--bg-color);
  color: var(--text-main);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
}

.fy-estimate-app * {
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}

.fy-estimate-app .container {
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 25px;
  margin-bottom: 40px;
}

@media (max-width: 900px) {
  .fy-estimate-app .container {
    grid-template-columns: 1fr;
  }
}

.fy-estimate-app .card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
}

.fy-estimate-app h1,
.fy-estimate-app h2,
.fy-estimate-app h3 {
  margin-bottom: 15px;
  color: #2c3e50;
  line-height: 1.2;
}

.fy-estimate-app .card:not(.invoice) h2 {
  margin-top: 30px;
  padding-top: 25px;
  border-top: 2px solid var(--border-color);
}

.fy-estimate-app .card:not(.invoice) h2:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.fy-estimate-app h1 {
  font-size: 24px;
  text-align: center;
  grid-column: 1 / -1;
  margin-bottom: 10px;
  background: linear-gradient(135deg, var(--primary), #9b59b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.fy-estimate-app .subtitle {
  text-align: center;
  grid-column: 1 / -1;
  margin-bottom: 20px;
  color: var(--text-muted);
  font-size: 14px;
}

.fy-estimate-app .form-group {
  margin-bottom: 20px;
}

.fy-estimate-app label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
  color: #34495e;
}

.fy-estimate-app .label-desc {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: normal;
  margin-top: -4px;
  margin-bottom: 6px;
}

.fy-estimate-app .checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 0;
  cursor: pointer;
  color: var(--text-main);
}

.fy-estimate-app .checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
  cursor: pointer;
}

.fy-estimate-app .service-checks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
}

.fy-estimate-app .service-checks .checkbox-label {
  margin-top: 0;
}

.fy-estimate-app .form-group.inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.fy-estimate-app .form-group.inline .field-text {
  flex: 1;
  min-width: 0;
}

.fy-estimate-app .form-group.inline label,
.fy-estimate-app .form-group.inline .label-desc {
  margin-bottom: 0;
}

.fy-estimate-app .form-group.inline label {
  margin-bottom: 4px;
}

.fy-estimate-app input[type="number"]::-webkit-inner-spin-button,
.fy-estimate-app input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.fy-estimate-app input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.fy-estimate-app .number-stepper {
  display: flex;
  align-items: stretch;
  width: 120px;
  flex-shrink: 0;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.2s;
}

.fy-estimate-app .number-stepper:focus-within {
  border-color: var(--primary);
}

.fy-estimate-app .number-stepper input[type="number"] {
  border: none;
  border-radius: 0;
  width: 100%;
  min-width: 0;
  text-align: center;
  padding: 12px 6px;
}

.fy-estimate-app .number-stepper input[type="number"]:focus {
  border: none;
}

.fy-estimate-app .stepper-btns {
  display: flex;
  flex-direction: column;
  border-left: 2px solid var(--border-color);
}

.fy-estimate-app .stepper-btns button {
  flex: 1;
  width: 30px;
  border: none;
  background: #f1f5f9;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 11px;
  line-height: 1;
  padding: 0;
  transition: background 0.15s, color 0.15s;
}

.fy-estimate-app .stepper-btns button:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

.fy-estimate-app .stepper-btns button:active {
  background: var(--primary);
  color: #fff;
}

.fy-estimate-app .stepper-btns button:first-child {
  border-bottom: 1px solid var(--border-color);
}

.fy-estimate-app input[type="text"],
.fy-estimate-app input[type="number"],
.fy-estimate-app select {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 15px;
  transition: border-color 0.2s;
  outline: none;
}

.fy-estimate-app input:focus,
.fy-estimate-app select:focus {
  border-color: var(--primary);
}

.fy-estimate-app .toggle-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.fy-estimate-app .toggle-btn {
  padding: 20px;
  border: 2px solid var(--border-color);
  background: #ffffff;
  border-radius: 14px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.2s ease-in-out;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--text-main);
}

.fy-estimate-app .toggle-btn .price-tag {
  font-size: 13px;
  font-weight: normal;
  color: var(--text-muted);
}

.fy-estimate-app .toggle-btn.btn-sovol.active {
  background-color: var(--sovol-active-bg);
  color: var(--sovol-active-text);
  border-color: #93c5fd;
}
.fy-estimate-app .toggle-btn.btn-sovol.active .price-tag {
  color: #2563eb;
}

.fy-estimate-app .toggle-btn.btn-bambu.active {
  background-color: var(--bambu-active-bg);
  color: var(--bambu-active-text);
  border-color: #86efac;
}
.fy-estimate-app .toggle-btn.btn-bambu.active .price-tag {
  color: #16a34a;
}

.fy-estimate-app .filament-row {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 12px;
}

.fy-estimate-app .filament-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #475569;
}

.fy-estimate-app .filament-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.fy-estimate-app .filament-grid label {
  font-size: 12px;
  margin-bottom: 4px;
}

.fy-estimate-app .full-width {
  grid-column: 1 / -1;
}

.fy-estimate-app .preview-container {
  position: sticky;
  top: 20px;
}

.fy-estimate-app #invoice-capture {
  padding: 12px;
}

.fy-estimate-app .invoice {
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 36px;
  border-radius: 12px;
  box-shadow: none;
}

.fy-estimate-app .invoice-header {
  text-align: center;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 18px;
  margin-bottom: 8px;
}

.fy-estimate-app .invoice-header h2 {
  font-size: 26px;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  color: #1e293b;
}

.fy-estimate-app .invoice-eyebrow {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 6px;
}

.fy-estimate-app .invoice-sub {
  font-size: 13px;
  color: var(--text-muted);
}

.fy-estimate-app .invoice-section-label {
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 700;
  margin: 22px 0 10px;
}

.fy-estimate-app .invoice-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.fy-estimate-app .invoice-row.total-row {
  border-top: 2px solid #e2e8f0;
  padding-top: 15px;
  margin-top: 15px;
  font-size: 17px;
  font-weight: bold;
  color: #1e293b;
}

.fy-estimate-app .invoice-row.grand-total {
  background: #e0f2fe;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 19px;
  font-weight: bold;
  color: #0369a1;
  margin-top: 16px;
}

.fy-estimate-app .invoice-row.breakdown,
.fy-estimate-app .invoice-row.services {
  font-size: 13px;
  color: var(--text-muted);
  padding-left: 10px;
}

.fy-estimate-app .btn-action {
  display: block;
  width: 100%;
  background: var(--secondary);
  color: white;
  border: none;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2);
  transition: all 0.2s;
  text-align: center;
}

.fy-estimate-app .btn-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(46, 204, 113, 0.3);
}

.fy-estimate-app .back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  grid-column: 1 / -1;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
}
.fy-estimate-app .back-link:hover {
  text-decoration: underline;
}
`;

function formatMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function PrintEstimatePage() {
  const [customerName, setCustomerName] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [projectName, setProjectName] = useState("");

  const [printer, setPrinter] = useState<Printer>("sovol");
  const [bambuColors, setBambuColors] = useState(1);
  const [filaments, setFilaments] = useState<Filament[]>([defaultFilament()]);

  const [printTime, setPrintTime] = useState("1");
  const [laborCost, setLaborCost] = useState("0");
  const [services, setServices] = useState<string[]>([]);
  const [markup, setMarkup] = useState("1.0");

  const invoiceRef = useRef<HTMLDivElement>(null);

  useSeo({
    title: "3D Print Estimate — FundedYouth",
    description:
      "Build a custom 3D print cost estimate and print or save a job receipt for the customer.",
    url: "https://fundedyouth.org/apps/3d-print-estimate",
  });

  // Number of filament rows: one for Sovol, one-per-color for Bambu.
  const numRows = printer === "bambu" ? bambuColors : 1;

  // Keep the filament list in sync with the required number of rows.
  useEffect(() => {
    setFilaments((prev) => {
      if (prev.length === numRows) return prev;
      if (prev.length < numRows) {
        const additions = Array.from({ length: numRows - prev.length }, () =>
          defaultFilament(),
        );
        return [...prev, ...additions];
      }
      return prev.slice(0, numRows);
    });
  }, [numRows]);

  function setFilamentType(index: number, type: string) {
    setFilaments((prev) =>
      prev.map((f, i) =>
        i === index ? { type, material: firstMaterialOfType(type) } : f,
      ),
    );
  }

  function setFilamentMaterial(index: number, material: string) {
    setFilaments((prev) =>
      prev.map((f, i) => (i === index ? { ...f, material } : f)),
    );
  }

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  }

  // Step a numeric string field, respecting its min/step.
  function step(
    setter: (v: string) => void,
    value: string,
    direction: number,
    stepSize: number,
    min: number,
  ) {
    let next = (parseFloat(value) || 0) + direction * stepSize;
    if (next < min) next = min;
    next = Math.round(next * 100) / 100;
    setter(String(next));
  }

  // ---- Derived invoice values ------------------------------------------------
  const printTimeNum = parseInt(printTime, 10) || 0;
  const laborNum = parseFloat(laborCost) || 0;
  const markupMultiplier = parseFloat(markup) || 1.0;

  const hourlyRate = printer === "sovol" ? 1.0 : 2.0;
  const machineFee = printTimeNum * hourlyRate;
  const inHouseTotal = machineFee;
  const markedUpPrice = inHouseTotal * markupMultiplier;
  const grandTotal = markedUpPrice + laborNum;

  const printerName = printer === "sovol" ? "Sovol" : "Bambu";

  const customerDisplay = useMemo(() => {
    const raw = customerName.trim();
    if (raw) return raw + (isInstructor ? " (Instructor)" : "");
    return isInstructor ? "Instructor" : "-";
  }, [customerName, isInstructor]);

  const businessDisplay = businessName.trim();
  const projectDisplay = projectName || "-";

  const estimateDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function handlePrint() {
    const node = invoiceRef.current;
    if (!node) return;

    const fileName = `3D_Print_Estimate_${(customerName || "customer").replace(
      /\s+/g,
      "_",
    )}`;
    const receiptHTML = node.outerHTML;

    const win = window.open("", "_blank");
    if (!win) {
      alert("Please allow pop-ups for this page to preview the PDF.");
      return;
    }

    win.document.write(
      '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
        "<title>" +
        fileName +
        "</title>" +
        "<style>" +
        ESTIMATE_CSS +
        ".fy-estimate-app{display:block;background:#fff;padding:0;min-height:0;}" +
        "body{display:block;background:#fff;padding:0;margin:0;}" +
        "@page{size:A4;margin:18mm;}" +
        '</style></head><body><div class="fy-estimate-app">' +
        receiptHTML +
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

  return (
    <main className="bg-background">
      {/* Scoped styles for the calculator (kept faithful to the original tool). */}
      <style dangerouslySetInnerHTML={{ __html: ESTIMATE_CSS }} />

      <div className="fy-estimate-app">
        <div style={{ width: "100%", maxWidth: "1100px", display: "grid" }}>
          <Link to="/apps" className="back-link">
            ← Back to Apps
          </Link>
          <h1>🖨️ 3D Print Cost &amp; Sales Calculator</h1>
          <p className="subtitle">
            Enter your design info below to calculate your costs and print an
            estimate receipt!
          </p>

          <div className="container">
            {/* ---- Form ------------------------------------------------------ */}
            <div className="card">
              <h2>1. Project Details</h2>

              <div className="form-group">
                <label htmlFor="customerName">👤 Customer Name</label>
                <input
                  type="text"
                  id="customerName"
                  placeholder="Who is this estimate for?"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isInstructor}
                    onChange={(e) => setIsInstructor(e.target.checked)}
                  />
                  This customer is an instructor
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="businessName">
                  🏢 Business / Company Name / Your Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  placeholder="Optional — company or organization"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectName">🚀 Project Name</label>
                <input
                  type="text"
                  id="projectName"
                  placeholder="What are you printing?"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <h2>2. Select Printer</h2>
              <div className="form-group">
                <div className="toggle-group">
                  <div
                    className={`toggle-btn btn-sovol${
                      printer === "sovol" ? " active" : ""
                    }`}
                    onClick={() => setPrinter("sovol")}
                  >
                    <span>Sovol</span>
                    <span className="price-tag">$1.00 / hour</span>
                  </div>
                  <div
                    className={`toggle-btn btn-bambu${
                      printer === "bambu" ? " active" : ""
                    }`}
                    onClick={() => setPrinter("bambu")}
                  >
                    <span>Bambu (Multi-Color)</span>
                    <span className="price-tag">$2.00 / hour</span>
                  </div>
                </div>
              </div>

              {printer === "bambu" && (
                <div className="form-group">
                  <label htmlFor="bambuColors">
                    🎨 How many colors are you using?
                  </label>
                  <select
                    id="bambuColors"
                    value={bambuColors}
                    onChange={(e) =>
                      setBambuColors(parseInt(e.target.value, 10))
                    }
                  >
                    <option value="1">1 Color</option>
                    <option value="2">2 Colors</option>
                    <option value="3">3 Colors</option>
                    <option value="4">4 Colors</option>
                  </select>
                </div>
              )}

              <h2>3. Filament Details</h2>
              <div>
                {filaments.map((fil, i) => {
                  const options = MATERIALS.filter((m) => m.type === fil.type);
                  return (
                    <div className="filament-row" key={i}>
                      <div className="filament-title">
                        Material / Color #{i + 1}
                      </div>
                      <div className="filament-grid">
                        <div>
                          <label>Type</label>
                          <select
                            value={fil.type}
                            onChange={(e) => setFilamentType(i, e.target.value)}
                          >
                            {FILAMENT_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label>Exact Color / Option</label>
                          <select
                            value={fil.material}
                            onChange={(e) =>
                              setFilamentMaterial(i, e.target.value)
                            }
                          >
                            {options.map((opt) => (
                              <option key={opt.name} value={opt.name}>
                                {opt.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <h2>4. Time &amp; Extras</h2>
              <div className="form-group inline">
                <div className="field-text">
                  <label htmlFor="printTime">⏱️ Print Time (Hours)</label>
                  <div className="label-desc">
                    Look at your slicer software to find the total hours
                  </div>
                </div>
                <div className="number-stepper">
                  <input
                    type="number"
                    id="printTime"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={printTime}
                    onKeyDown={(e) => {
                      if ([".", "e", "E", "+", "-"].includes(e.key))
                        e.preventDefault();
                    }}
                    onChange={(e) =>
                      setPrintTime(e.target.value.replace(/\D/g, ""))
                    }
                  />
                  <div className="stepper-btns">
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={() => step(setPrintTime, printTime, 1, 1, 1)}
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => step(setPrintTime, printTime, -1, 1, 1)}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group inline">
                <div className="field-text">
                  <label htmlFor="laborCost">
                    🛠️ Additional Services / Manual Labor ($)
                  </label>
                  <div className="label-desc">
                    Total cost for the services checked below
                  </div>
                </div>
                <div className="number-stepper">
                  <input
                    type="number"
                    id="laborCost"
                    min="0"
                    step="0.5"
                    value={laborCost}
                    onChange={(e) => setLaborCost(e.target.value)}
                  />
                  <div className="stepper-btns">
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={() => step(setLaborCost, laborCost, 1, 0.5, 0)}
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => step(setLaborCost, laborCost, -1, 0.5, 0)}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="label-desc" style={{ marginTop: "-6px" }}>
                  Check the services included in this price (shown on the
                  receipt):
                </div>
                <div className="service-checks">
                  {SERVICE_OPTIONS.map((service) => (
                    <label className="checkbox-label" key={service}>
                      <input
                        type="checkbox"
                        checked={services.includes(service)}
                        onChange={() => toggleService(service)}
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </div>

              <h2>5. Pricing Strategy (Markup)</h2>
              <div className="form-group">
                <label htmlFor="markup">💰 Customer Price Rule</label>
                <div className="label-desc">
                  Choose how much extra to charge the customer to make a profit
                </div>
                <select
                  id="markup"
                  value={markup}
                  onChange={(e) => setMarkup(e.target.value)}
                >
                  {MARKUP_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ---- Invoice preview ------------------------------------------ */}
            <div className="preview-container">
              <div id="invoice-capture">
                <div className="card invoice" ref={invoiceRef}>
                  <div className="invoice-header">
                    <div className="invoice-eyebrow">3D Printing Service</div>
                    <h2>Job Estimate</h2>
                    <p className="invoice-sub">Estimate Date: {estimateDate}</p>
                  </div>

                  <div className="invoice-section-label">Estimate For</div>
                  <div className="invoice-row">
                    <strong>Customer:</strong>
                    <span>{customerDisplay}</span>
                  </div>
                  {businessDisplay && (
                    <div className="invoice-row">
                      <strong>Business:</strong>
                      <span>{businessDisplay}</span>
                    </div>
                  )}
                  <div className="invoice-row">
                    <strong>Project:</strong>
                    <span>{projectDisplay}</span>
                  </div>

                  <div className="invoice-section-label">Charges</div>
                  <div className="invoice-row">
                    <span>Printer Base Machine Fee ({printerName}):</span>
                    <span>{formatMoney(machineFee)}</span>
                  </div>

                  {filaments.map((fil, i) => (
                    <div className="invoice-row breakdown" key={i}>
                      <span>• Color #{i + 1}:</span>
                      <span>
                        {fil.material} ({fil.type})
                      </span>
                    </div>
                  ))}

                  <div className="invoice-row total-row">
                    <span>Subtotal (Base Cost):</span>
                    <span>{formatMoney(inHouseTotal)}</span>
                  </div>

                  <div className="invoice-row" style={{ marginTop: "15px" }}>
                    <span>Price with Markup ({markupMultiplier}x):</span>
                    <span>{formatMoney(markedUpPrice)}</span>
                  </div>

                  <div className="invoice-row">
                    <span>+ Extra Services / Labor:</span>
                    <span>{formatMoney(laborNum)}</span>
                  </div>

                  {services.length > 0 && (
                    <div className="invoice-row services">
                      <span>Includes:</span>
                      <span style={{ textAlign: "right" }}>
                        {services.join(", ")}
                      </span>
                    </div>
                  )}

                  <div className="invoice-row grand-total">
                    <span>Final Customer Price:</span>
                    <span>{formatMoney(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <button className="btn-action" onClick={handlePrint}>
                🖨️ Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
