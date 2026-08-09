import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../../lib/useSeo";

/**
 * Reverse Tax Calculator.
 *
 * A standard estimator starts from a pre-tax price and adds tax on top. This
 * tool runs backward: given a tax rate and the exact total the customer
 * should pay, it finds the pre-tax amount to ring up so the taxed total
 * lands on that number exactly — useful for cash sales where you want a
 * clean total like $7.00 rather than whatever the tax happens to add up to.
 *
 * Naively dividing target / (1 + rate) and rounding to the cent doesn't
 * always round-trip back to the target once the register re-applies and
 * rounds the tax (rounding isn't always invertible). `findCharge` searches
 * the handful of cent values nearest that estimate for one that taxes back
 * to the exact target, and reports honestly if no exact match exists.
 */

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";
const labelClass = "mb-1.5 block text-sm font-semibold text-gray-700";

interface ReverseTaxResult {
  exact: boolean;
  chargeCents: number;
  taxCents: number;
  totalCents: number;
  targetCents: number;
}

/** Search the cent values nearest the naive estimate for one that taxes
 *  (and rounds) back to exactly `targetCents`. Falls back to the naive
 *  estimate — flagged as inexact — if nothing within the window matches. */
function findCharge(targetCents: number, rate: number): ReverseTaxResult {
  const estimate = Math.max(1, Math.round(targetCents / (1 + rate)));
  const searchOrder = [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5];

  let chargeCents = estimate;
  let totalCents = Math.round(chargeCents * (1 + rate));

  for (const delta of searchOrder) {
    const candidate = estimate + delta;
    if (candidate <= 0) continue;
    const candidateTotal = Math.round(candidate * (1 + rate));
    if (candidateTotal === targetCents) {
      chargeCents = candidate;
      totalCents = candidateTotal;
      break;
    }
  }

  return {
    exact: totalCents === targetCents,
    chargeCents,
    taxCents: totalCents - chargeCents,
    totalCents,
    targetCents,
  };
}

function computeReverseTax(
  targetStr: string,
  taxRateStr: string,
): ReverseTaxResult | null {
  const target = Number(targetStr);
  const ratePercent = Math.max(0, Number(taxRateStr) || 0);
  const targetCents = Math.round(target * 100);
  if (!Number.isFinite(target) || targetCents <= 0) return null;
  return findCharge(targetCents, ratePercent / 100);
}

function money(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function buildSummaryText(r: ReverseTaxResult, ratePercent: string): string {
  return `Charge: ${money(r.chargeCents)}
Tax (${ratePercent}%): ${money(r.taxCents)}
Customer total: ${money(r.totalCents)}`;
}

export function ReverseTaxCalculatorPage() {
  const [taxRate, setTaxRate] = useState("8.25");
  const [targetTotal, setTargetTotal] = useState("7.00");
  const [copyLabel, setCopyLabel] = useState("Copy summary");
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

  useSeo({
    title: "Reverse Tax Calculator — FundedYouth",
    description:
      "Set a tax rate and the total you want the customer to pay — get the exact pre-tax amount to charge so their total comes out exact.",
    url: "https://fundedyouth.org/apps/reverse-tax-calculator",
  });

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const result = computeReverseTax(targetTotal, taxRate);

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(buildSummaryText(result, taxRate));
      setCopyLabel("Copied ✓");
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopyLabel("Copy summary"), 1500);
    } catch {
      alert("Copy failed — select the text manually.");
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50 py-12 md:py-16">
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
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 shadow-sm backdrop-blur">
              Internal Tool
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Reverse Tax Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Set the tax rate and the total you want the customer to pay — this
            works backward to the exact price to ring up so their total lands on
            that number.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-white py-10 md:py-14">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Enter the details
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tax rate</label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    className={`${inputClass} pr-8`}
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    placeholder="e.g., 8.25"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    %
                  </span>
                </div>
              </div>
              <div>
                <label className={labelClass}>Customer total (with tax)</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    className={`${inputClass} pl-7`}
                    value={targetTotal}
                    onChange={(e) => setTargetTotal(e.target.value)}
                    placeholder="e.g., 7.00"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-dashed border-gray-200 pt-6">
              {result ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Charge the customer</span>
                      <span className="text-base font-bold text-gray-900">
                        {money(result.chargeCents)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Tax ({taxRate || 0}%)
                      </span>
                      <span className="font-medium text-gray-700">
                        {money(result.taxCents)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t-2 border-gray-900 pt-2 text-sm">
                      <span className="font-semibold text-gray-900">
                        Customer total
                      </span>
                      <span className="text-base font-extrabold text-gray-900">
                        {money(result.totalCents)}
                      </span>
                    </div>
                  </div>

                  {result.exact ? (
                    <div className="mt-3 inline-block rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                      Charging {money(result.chargeCents)} totals exactly{" "}
                      {money(result.targetCents)}.
                    </div>
                  ) : (
                    <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                      No exact match rounds to {money(result.targetCents)} at
                      this rate. {money(result.chargeCents)} gets closest, for
                      an actual total of {money(result.totalCents)}.
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
                  >
                    {copyLabel}
                  </button>
                  <p className="mt-2 text-xs text-gray-500">
                    Copies the charge, tax, and total as plain text — paste it
                    into a note or receipt.
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  Enter a customer total above to see what to charge.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Fine print */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto max-w-2xl px-4">
          <p className="text-xs leading-relaxed text-gray-500">
            Assumes tax is calculated on the pre-tax price and rounded to the
            nearest cent at checkout, same as a standard register. Because
            rounding isn&apos;t always exactly reversible, this checks nearby
            cent amounts for one that taxes back to your exact target instead of
            just dividing by the tax rate — if no cent amount lands exactly on
            the target, it says so rather than showing a total that&apos;s
            quietly off by a penny.
          </p>
        </div>
      </section>
    </main>
  );
}
