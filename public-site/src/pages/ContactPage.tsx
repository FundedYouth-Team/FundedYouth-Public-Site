import { Link } from "react-router-dom";
import { useSeo } from "../lib/useSeo";

const PAGE_TITLE =
  "Contact FundedYouth — Visit, Call, Email | El Cajon, CA";
const PAGE_DESC =
  "Reach FundedYouth — call (619) 728-5002, email us, or visit our makerspace at 415 Parkway Plaza, El Cajon, CA. Open weekdays 2:30–7:30 PM and weekends for STEAM camps.";
const PAGE_URL = "https://fundedyouth.org/contact";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      isPartOf: { "@id": "https://fundedyouth.org/#website" },
      about: { "@id": "https://fundedyouth.org/#organization" },
    },
    // Augments the Organization defined in index.html with address, phone,
    // and opening hours so search engines have rich local-business data.
    {
      "@type": "Organization",
      "@id": "https://fundedyouth.org/#organization",
      telephone: "+1-619-728-5002",
      address: {
        "@type": "PostalAddress",
        streetAddress: "415 Parkway Plaza, Suite 519",
        addressLocality: "El Cajon",
        addressRegion: "CA",
        postalCode: "92020",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "14:30",
          closes: "19:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "13:00",
          closes: "17:00",
        },
      ],
    },
  ],
};

const MAPS_URL = "https://maps.app.goo.gl/tbi3qfSUmKoK3Yf26";

export function ContactPage() {
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
            Contact
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Get in touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Drop by the makerspace, give us a call, or send an email — we love
            meeting students, parents, schools, and potential partners.
          </p>
        </div>
      </section>

      {/* Three contact cards */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Call */}
            <a
              href="tel:+16197285002"
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Call or text
              </p>
              <h2 className="mt-1 text-lg font-bold text-gray-900">
                +1 (619) 728-5002
              </h2>
              <p className="mt-2 flex-1 text-sm text-gray-600">
                We&apos;re a small team — leave a voicemail if we miss you and
                we&apos;ll get back the same day.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                Call now
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>

            {/* Email */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Email
              </p>
              {/* Email rendered as an image for spam protection */}
              <img
                src="https://ps-cdn.fundedyouth.org/assets/images/email-address.png"
                alt="FundedYouth email address"
                className="mt-1 h-6 w-auto self-start"
              />
              <p className="mt-3 flex-1 text-sm text-gray-600">
                Good for partnership inquiries, school outreach, and general
                questions. Usually replied to within a business day.
              </p>
            </div>

            {/* Visit */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Visit the makerspace
              </p>
              <h2 className="mt-1 text-lg font-bold text-gray-900">
                FundedYouth
              </h2>
              <address className="mt-1 not-italic text-sm text-gray-700">
                415 Parkway Plaza, Suite 519
                <br />
                El Cajon, CA 92020
              </address>
              <p className="mt-3 flex-1 text-xs text-gray-500">
                Near the Dick&apos;s Sporting Goods mall entrance and TheGym,
                near the Kidzone Mall Entrance.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-600 transition-colors group-hover:text-purple-700">
                Open in Maps
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Hours of operation
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              When to find us
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-base text-gray-600">
              Call ahead before stopping by — small team, occasionally
              on-site at schools.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                    Weekdays
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    Monday – Friday
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-gray-700">
                Open Labs &amp; Special Events
              </p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                2:30 PM – 7:30 PM
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Weekends
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    Saturday &amp; Sunday
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-gray-700">
                STEAM Camps &amp; Classes
              </p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                1:00 PM – 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
                Newsletter
              </span>
              <h2 className="mt-3 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Stay in the loop
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Occasional updates on new courses, upcoming sessions, and what
                students are building. No spam.
              </p>
            </div>

            {/* Zeffy newsletter iframe — preserved from old page */}
            <div
              className="mt-6"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "185px",
              }}
            >
              <iframe
                title="Sign up for our newsletter"
                style={{
                  position: "absolute",
                  border: 0,
                  top: "-50px",
                  left: 0,
                  width: "100%",
                  height: "calc(100% + 40px)",
                }}
                src="https://www.zeffy.com/en-US/embed/newsletter-form/sign-up-for-our-newsletter-2996"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help links */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-10 md:py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Looking for help?
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              Common questions are usually answered here
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://portal.fundedyouth.org/#watch-and-learn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
              >
                Setup guide
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                FAQs
              </Link>
              <a
                href="https://portal.fundedyouth.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                Open Portal
              </a>
            </div>
          </div>

          {/* Org / tax-status panel */}
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 text-sm shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <div>
                <p className="font-bold text-gray-900">
                  FundedYouth · 501(c)(3) Nonprofit
                </p>
                <p className="mt-0.5 text-xs text-gray-600">
                  EIN{" "}
                  <span className="font-mono font-semibold text-gray-800">
                    93-4090260
                  </span>
                  <span className="mx-1.5" aria-hidden="true">
                    ·
                  </span>
                  Donations may be tax-deductible to the fullest extent of the law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
