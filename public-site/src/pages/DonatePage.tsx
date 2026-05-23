import { type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSeo } from "../lib/useSeo";

const PAGE_TITLE =
  "Donate — FundedYouth | Fund STEAM Education in San Diego";
const PAGE_DESC =
  "Donate to FundedYouth and fund hands-on STEAM education for students in San Diego County. Tax-deductible 501(c)(3) — EIN 93-4090260. One-time gifts via Square or Zeffy, or monthly recurring donations.";
const PAGE_URL = "https://fundedyouth.org/donate";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      isPartOf: { "@id": "https://fundedyouth.org/#website" },
    },
    {
      "@type": "DonateAction",
      name: "Donate to FundedYouth",
      description:
        "Tax-deductible donations supporting STEAM education and on-demand manufacturing for K-12 students.",
      recipient: { "@id": "https://fundedyouth.org/#organization" },
    },
  ],
};

const ZEFFY_ONETIME_URL =
  "https://www.zeffy.com/en-US/donation-form/one-time-donation-33";
const ZEFFY_MONTHLY_URL =
  "https://www.zeffy.com/en-US/donation-form/sponsor-a-student-22";

interface DonorPerk {
  title: string;
  subtitle: string;
  color: string;
}

const donorPerks: DonorPerk[] = [
  {
    title: "Monthly Newsletter",
    subtitle: "Updates delivered to your inbox",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Progress Reports",
    subtitle: "See student growth and milestones",
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Student Stories",
    subtitle: "Real impact and positive outcomes",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "School Partnerships",
    subtitle: "New connections in the community",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "New Programs",
    subtitle: "Be first to know what's launching",
    color: "bg-teal-100 text-teal-700",
  },
  {
    title: "Programs in Development",
    subtitle: "Sneak peeks at what's coming next",
    color: "bg-amber-100 text-amber-700",
  },
];

interface PaymentMethod {
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  note?: string;
  cta: string;
  ctaColor: string;
  href: string;
  iconBg: string;
  icon: ReactNode;
  cardClass: string;
  recommended?: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    badge: "One-Time",
    badgeColor: "bg-gray-100 text-gray-700",
    title: "Give via Zeffy",
    description:
      "100% of your donation goes to FundedYouth — Zeffy charges no platform fees.",
    note: 'Tip: select "Other" and enter $0 at checkout to skip the optional Zeffy tip.',
    cta: "Donate with Zeffy",
    ctaColor: "bg-blue-600 hover:bg-blue-700",
    href: ZEFFY_ONETIME_URL,
    iconBg: "bg-blue-600",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          fill="none"
          stroke="currentColor"
        />
      </>
    ),
    cardClass: "border-gray-200 hover:border-blue-500",
  },
  {
    badge: "Monthly",
    badgeColor: "bg-orange-500 text-white",
    title: "Monthly via Zeffy",
    description:
      "Choose any amount. Small monthly gifts create big, lasting impact. 100% goes to FundedYouth.",
    note: "Cancel anytime",
    cta: "Start Giving Monthly",
    ctaColor:
      "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
    href: ZEFFY_MONTHLY_URL,
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
    icon: (
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    ),
    cardClass: "border-orange-300 bg-orange-50 hover:border-orange-400",
    recommended: true,
  },
];

export function DonatePage() {
  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    schema: SCHEMA,
  });

  const [searchParams] = useSearchParams();
  const canceled = searchParams.get("canceled");

  return (
    <main>
      {/* Canceled Payment Notice — preserved from old page */}
      {canceled && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-3">
          <div className="mx-auto flex max-w-4xl items-center justify-center gap-2 text-amber-800">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-sm font-medium">
              Payment was canceled. No charges were made. Feel free to try
              again when you&apos;re ready.
            </span>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(249,115,22,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(249,115,22,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"
        />

        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Copy column */}
            <div className="space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 shadow-sm backdrop-blur">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                501(c)(3) Tax-Deductible · EIN{" "}
                <span className="font-mono">93-4090260</span>
              </span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Sponsor a student&apos;s{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  future in making
                </span>
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:mx-0">
                Your donation funds courses, printer time, equipment, and
                competition teams for students who&apos;d otherwise never
                touch the tools. Every dollar reinvests directly into
                programs.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#give"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-orange-500/40"
                >
                  See ways to give
                  <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <a
                  href={ZEFFY_MONTHLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all hover:border-orange-600 hover:text-orange-700"
                >
                  Start giving monthly
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-sm text-gray-500 lg:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Zeffy option available
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancel monthly anytime
                </span>
              </div>
            </div>

            {/* Visual column */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-500/20 via-amber-400/10 to-transparent blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                <img
                  src="https://ps-cdn.fundedyouth.org/assets/images/3Kids-Looking-at-3D-Pencil-Holding-Monster-1024x683.png"
                  alt="Students proudly holding their 3D-printed pencil monster"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-lg backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                  </span>
                  Funded by donors like you
                </div>
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  Tax-deductible
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What donors receive */}
      <section className="border-b border-gray-100 bg-gray-50 py-14">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              What You&apos;ll Receive
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Stay connected to your impact
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {donorPerks.map((perk) => (
              <div
                key={perk.title}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${perk.color}`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{perk.title}</p>
                  <p className="text-sm text-gray-600">{perk.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zeffy 100% donation tip */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <img
                src="https://ps-cdn.fundedyouth.org/assets/images/zeffy-100-percent-donation.png"
                alt="Zeffy donation summary showing the 'Other' option to ensure 100% goes to FundedYouth"
                className="w-full max-w-xs shrink-0 rounded-lg border border-gray-200 shadow-sm md:max-w-[260px]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Want 100% to go to FundedYouth?
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Zeffy is free for nonprofits and funded by optional donor
                  contributions. At checkout, you&apos;ll see a{" "}
                  <strong>Summary</strong> section with a suggested
                  contribution to Zeffy.
                </p>
                <p className="mt-3 text-sm font-semibold text-gray-900">
                  To send your entire donation to FundedYouth, select{" "}
                  <strong>&ldquo;Other&rdquo;</strong> from the dropdown and
                  enter <strong>$0</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to give */}
      <section id="give" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              Ways to Give
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pick a way to support
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Every gift — one-time or monthly — helps a student discover what
              they can create.
            </p>
          </div>

          {/* Shared donor benefits row */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-700">
            {[
              "Listed on Donors Page",
              "Monthly Donors Newsletter",
              "Discounts on Services & Products",
            ].map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-1.5"
              >
                <svg
                  className="h-4 w-4 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {benefit}
              </span>
            ))}
          </div>

          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {paymentMethods.map((m) => (
              <div
                key={m.title}
                className={`relative flex flex-col rounded-2xl border-2 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-7 ${m.cardClass}`}
              >
                {m.recommended && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-orange-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                    Recommended
                  </span>
                )}
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${m.badgeColor}`}
                >
                  {m.badge}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${m.iconBg}`}
                  >
                    <svg
                      className="h-5 w-5 text-white"
                      fill={m.title === "Monthly via Zeffy" ? "currentColor" : "none"}
                      stroke={m.title === "Give via Zeffy" ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                    >
                      {m.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {m.title}
                  </h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                  {m.description}
                </p>
                {m.note && (
                  <p
                    className={`mt-2 text-xs font-medium ${
                      m.recommended ? "text-orange-700" : "text-blue-700"
                    }`}
                  >
                    {m.note}
                  </p>
                )}
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-lg transition-all ${m.ctaColor}`}
                >
                  {m.cta}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-8 shadow-sm sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl"
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
                  Your impact
                </span>
                <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                  Be the reason a student discovers{" "}
                  <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    what they can create
                  </span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                  Your support gives a student hands-on time to learn, create,
                  and grow — building skills that last a lifetime.
                </p>
                <a
                  href="#give"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-amber-600"
                >
                  Support a student today
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
                  <img
                    src="https://ps-cdn.fundedyouth.org/assets/images/classroom-tutoring-v1.png"
                    alt="Instructor mentoring a student at FundedYouth"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <h3 className="text-lg font-bold text-gray-900">
              Questions about donating?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;re here to help — reach out anytime.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="tel:+16197285002"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (619) 728-5002
              </a>
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:donate@fundedyouth.org"
                  className="font-semibold text-gray-700 hover:text-blue-600"
                >
                  donate@fundedyouth.org
                </a>
              </span>
            </div>
            <p className="mt-5 text-xs text-gray-500">
              FundedYouth · 501(c)(3) Nonprofit · EIN{" "}
              <span className="font-mono">93-4090260</span>
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
              <Link
                to="/sponsor"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Corporate sponsorship →
              </Link>
              <span className="text-gray-300">·</span>
              <Link
                to="/impact"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Our impact →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
