import { Link } from "react-router-dom";
import { useSeo } from "../../lib/useSeo";

const PAGE_TITLE = "Legal & Policies — FundedYouth";
const PAGE_DESC =
  "FundedYouth legal policies and documentation. Privacy policy, terms of service, code of conduct, and other policies live on our public docs site. Liability waiver available locally.";
const PAGE_URL = "https://fundedyouth.org/legal";

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
  ],
};

const DOCS_BASE = "https://docs.fundedyouth.org/legal";

const docsPolicies = [
  {
    title: "Privacy Policy",
    description:
      "How we collect, use, and protect personal information — CCPA and COPPA compliance.",
    href: `${DOCS_BASE}/privacy-policy/`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ),
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Terms of Service",
    description:
      "Terms and conditions governing the use of FundedYouth services and programs.",
    href: `${DOCS_BASE}/terms-of-service/`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Code of Conduct",
    description:
      "Expected behavior and guidelines for participants, volunteers, and staff.",
    href: `${DOCS_BASE}/code-of-conduct/`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Makerspace Use Agreement",
    description:
      "Safety rules, equipment use, and supervision expectations for the physical Makerspace.",
    href: `${DOCS_BASE}/makerspace-use-agreement/`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Photo & Media Release",
    description:
      "How we use photos and video featuring participants, with minor-specific safeguards.",
    href: `${DOCS_BASE}/photo-media-release/`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    color: "bg-pink-100 text-pink-700",
  },
];

export function LegalIndexPage() {
  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    schema: SCHEMA,
  });

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 md:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur">
            Legal &amp; Policies
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Documentation &amp; agreements
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Our policies — Privacy Policy, Terms of Service, Code of Conduct,
            and more — live on our public documentation site.
          </p>
        </div>
      </section>

      {/* Docs reference panel */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Public docs site
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  All our policies live on docs.fundedyouth.org
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Privacy, Terms, Code of Conduct, Makerspace and media
                  agreements — one source of truth, always up to date. Pick a
                  document below.
                </p>
              </div>
            </div>
          </div>

          {/* Quick links to specific policies */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docsPolicies.map((doc) => (
              <a
                key={doc.title}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${doc.color}`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {doc.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">
                  {doc.title}
                </h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">
                  {doc.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                  Read on docs
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Local agreements (Waiver) */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              Participant Forms
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Agreements you may need
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-base text-gray-600">
              Local forms that participants and parents review and sign for
              FundedYouth programs.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <Link
              to="/legal/waiver"
              className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      General Release Agreement
                    </h3>
                    <span className="inline-flex rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                      Active
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-gray-600">
                    Waiver and consent form required for all participants in
                    FundedYouth programs and activities.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 transition-colors group-hover:text-amber-800">
                    View document
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-gray-900">
              Questions about a policy?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              If you can&apos;t find what you need on the docs site, reach
              out and we&apos;ll help.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
              >
                Contact us
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
              </Link>
              <a
                href="tel:+16197285002"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                (619) 728-5002
              </a>
            </div>
            <p className="mt-5 text-xs text-gray-500">
              FundedYouth · 501(c)(3) Nonprofit · EIN{" "}
              <span className="font-mono">93-4090260</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
