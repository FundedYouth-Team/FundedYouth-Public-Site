/* eslint-disable tailwindcss/no-custom-classname -- this tool uses its own scoped
   CSS (see ESTIMATE_CSS) rather than Tailwind utilities. */
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../../lib/useSeo";

/**
 * 3D Modeling Estimate.
 *
 * Adapted from the 3D Print estimate tool. Captures the customer/project info,
 * an editable list of included services (with suggestions), and a pricing model
 * (hourly or set price). Everything shows in the live preview and the PDF.
 */

// Suggested services — edit this list to change the quick-add chips.
const SUGGESTED_SERVICES = [
  "2 Changes Included",
  "Drafting Included",
  "Source Files Included",
  "STL Export for 3D Printing",
  "STEP / CAD File Export",
  "Dimensioned Technical Drawing",
  "1 Revision Round",
  "Print-Ready File Prep",
];

type PricingModel = "hourly" | "fixed";

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

.fy-estimate-app input[type="number"]::-webkit-inner-spin-button,
.fy-estimate-app input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.fy-estimate-app input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
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

.fy-estimate-app .toggle-btn.btn-mode.active {
  background-color: var(--sovol-active-bg);
  color: var(--sovol-active-text);
  border-color: #93c5fd;
}
.fy-estimate-app .toggle-btn.btn-mode.active .price-tag {
  color: #2563eb;
}

/* Editable service list (add / remove / suggested) */
.fy-estimate-app .service-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.fy-estimate-app .service-item input[type="text"] {
  flex: 1;
}

.fy-estimate-app .btn-remove {
  flex-shrink: 0;
  width: 44px;
  height: 46px;
  border: 2px solid var(--border-color);
  background: #fff;
  border-radius: 10px;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: all 0.15s;
}

.fy-estimate-app .btn-remove:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: #fef2f2;
}

.fy-estimate-app .btn-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  padding: 10px 16px;
  border: 2px dashed var(--primary);
  background: #fff;
  color: var(--primary);
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.fy-estimate-app .btn-add:hover {
  background: var(--sovol-active-bg);
}

.fy-estimate-app .suggest-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.fy-estimate-app .chip {
  border: 1px solid var(--border-color);
  background: #f8fafc;
  color: var(--text-main);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}

.fy-estimate-app .chip:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: #fff;
}

.fy-estimate-app .empty-note {
  font-size: 13px;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 6px;
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

export function ModelingEstimatePage() {
  const [customerName, setCustomerName] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [projectName, setProjectName] = useState("");

  const [services, setServices] = useState<string[]>([]);

  const [pricingModel, setPricingModel] = useState<PricingModel>("hourly");
  const [hourlyRate, setHourlyRate] = useState("0");
  const [hours, setHours] = useState("1");
  const [fixedPrice, setFixedPrice] = useState("0");

  const invoiceRef = useRef<HTMLDivElement>(null);

  useSeo({
    title: "3D Modeling Estimate — FundedYouth",
    description:
      "Build a custom 3D modeling work estimate and print or save a job receipt for the customer.",
    url: "https://fundedyouth.org/apps/3d-modeling-estimate",
  });

  // ---- Service list handlers -------------------------------------------------
  function addService(value = "") {
    setServices((prev) => [...prev, value]);
  }

  function updateService(index: number, value: string) {
    setServices((prev) => prev.map((s, i) => (i === index ? value : s)));
  }

  function removeService(index: number) {
    setServices((prev) => prev.filter((_, i) => i !== index));
  }

  // ---- Derived invoice values ------------------------------------------------
  const hourlyRateNum = parseFloat(hourlyRate) || 0;
  const hoursNum = parseFloat(hours) || 0;
  const fixedPriceNum = parseFloat(fixedPrice) || 0;

  const hourlyTotal = hourlyRateNum * hoursNum;
  const grandTotal = pricingModel === "hourly" ? hourlyTotal : fixedPriceNum;

  const customerDisplay = useMemo(() => {
    const raw = customerName.trim();
    if (raw) return raw + (isInstructor ? " (Instructor)" : "");
    return isInstructor ? "Instructor" : "-";
  }, [customerName, isInstructor]);

  const businessDisplay = businessName.trim();
  const projectDisplay = projectName || "-";
  const listedServices = services.map((s) => s.trim()).filter(Boolean);

  const estimateDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function handlePrint() {
    const node = invoiceRef.current;
    if (!node) return;

    const fileName = `3D_Modeling_Estimate_${(
      customerName || "customer"
    ).replace(/\s+/g, "_")}`;
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
      {/* Scoped styles shared with the other estimate tools. */}
      <style dangerouslySetInnerHTML={{ __html: ESTIMATE_CSS }} />

      <div className="fy-estimate-app">
        <div style={{ width: "100%", maxWidth: "1100px", display: "grid" }}>
          <Link to="/apps" className="back-link">
            ← Back to Apps
          </Link>
          <h1>🧊 3D Modeling Estimate</h1>
          <p className="subtitle">
            Enter the project details and services, set your pricing, then print
            an estimate receipt!
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
                  placeholder="What are you modeling?"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <h2>2. Services Included</h2>
              <div className="form-group">
                <div className="label-desc" style={{ marginTop: "-6px" }}>
                  List everything included in this estimate. Add as many as
                  agreed upon with the customer.
                </div>

                {services.length === 0 && (
                  <p className="empty-note">
                    No services added yet. Add a blank one or pick a suggestion
                    below.
                  </p>
                )}

                {services.map((service, i) => (
                  <div className="service-item" key={i}>
                    <input
                      type="text"
                      placeholder={`Service #${i + 1}`}
                      value={service}
                      onChange={(e) => updateService(i, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn-remove"
                      aria-label={`Remove service ${i + 1}`}
                      onClick={() => removeService(i)}
                    >
                      ×
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn-add"
                  onClick={() => addService("")}
                >
                  + New Service
                </button>

                <div className="suggest-chips">
                  {SUGGESTED_SERVICES.map((suggestion) => (
                    <button
                      type="button"
                      className="chip"
                      key={suggestion}
                      onClick={() => addService(suggestion)}
                    >
                      + {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <h2>3. Pricing</h2>
              <div className="form-group">
                <label>💰 Select Pricing Model</label>
                <div className="toggle-group">
                  <div
                    className={`toggle-btn btn-mode${
                      pricingModel === "hourly" ? " active" : ""
                    }`}
                    onClick={() => setPricingModel("hourly")}
                  >
                    <span>Hourly</span>
                    <span className="price-tag">Rate × hours</span>
                  </div>
                  <div
                    className={`toggle-btn btn-mode${
                      pricingModel === "fixed" ? " active" : ""
                    }`}
                    onClick={() => setPricingModel("fixed")}
                  >
                    <span>Set Price</span>
                    <span className="price-tag">One agreed total</span>
                  </div>
                </div>
              </div>

              {pricingModel === "hourly" ? (
                <>
                  <div className="form-group">
                    <label htmlFor="hourlyRate">⏱️ Hourly Price ($)</label>
                    <input
                      type="number"
                      id="hourlyRate"
                      min="0"
                      step="1"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="hours">🕐 Total Hours Expected</label>
                    <input
                      type="number"
                      id="hours"
                      min="0"
                      step="0.5"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label htmlFor="fixedPrice">
                    💵 Agreed Project Price ($)
                  </label>
                  <input
                    type="number"
                    id="fixedPrice"
                    min="0"
                    step="1"
                    value={fixedPrice}
                    onChange={(e) => setFixedPrice(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* ---- Invoice preview ------------------------------------------ */}
            <div className="preview-container">
              <div id="invoice-capture">
                <div className="card invoice" ref={invoiceRef}>
                  <div className="invoice-header">
                    <div className="invoice-eyebrow">3D Modeling Service</div>
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

                  <div className="invoice-section-label">Services Included</div>
                  {listedServices.length > 0 ? (
                    listedServices.map((service, i) => (
                      <div className="invoice-row breakdown" key={i}>
                        <span>• {service}</span>
                      </div>
                    ))
                  ) : (
                    <div className="invoice-row breakdown">
                      <span>—</span>
                    </div>
                  )}

                  <div className="invoice-section-label">Pricing</div>
                  {pricingModel === "hourly" ? (
                    <>
                      <div className="invoice-row">
                        <span>Hourly Rate:</span>
                        <span>{formatMoney(hourlyRateNum)} / hr</span>
                      </div>
                      <div className="invoice-row">
                        <span>Estimated Hours:</span>
                        <span>{hoursNum}</span>
                      </div>
                      <div className="invoice-row total-row">
                        <span>Estimated Total:</span>
                        <span>{formatMoney(hourlyTotal)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="invoice-row total-row">
                      <span>Agreed Project Price:</span>
                      <span>{formatMoney(fixedPriceNum)}</span>
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
