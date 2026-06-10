import { Link } from "react-router-dom";
import { useSeo } from "../lib/useSeo";

const PAGE_TITLE = "For Schools & Teachers — FundedYouth Partnerships";
const PAGE_DESC =
  "Bring FundedYouth to your school. On-site STEAM instruction, two-week professional development for your teachers, optional add-ons (curriculum license, virtual coaching, student certification), and hardware procurement support for K-12 schools in San Diego County.";
const PAGE_URL = "https://fundedyouth.org/teachers";

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
      "@type": "Service",
      name: "FundedYouth School & Bootcamp Partnerships",
      description:
        "STEAM education services for K-12 schools: on-site instruction, professional development for teachers, curriculum licensing, virtual coaching, and student certification.",
      provider: { "@id": "https://fundedyouth.org/#organization" },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "San Diego County, California",
      },
      serviceType: "STEAM education partnership",
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "teacher",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Partnership options",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Students Come to FundedYouth",
              description:
                "Bring students to our makerspace for hands-on STEM instruction. Up to 10 students per class.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "We Come to Your School",
              description:
                "On-site instruction for 10-20 students plus a two-week professional development program for teaching staff.",
            },
          },
        ],
      },
    },
  ],
};

const MAPS_URL = "https://maps.app.goo.gl/tbi3qfSUmKoK3Yf26";
const HARDWARE_MAILTO =
  "mailto:info@fundedyouth.org?subject=Hardware%20%26%20Resources%20Inquiry";
const PARTNER_MAILTO =
  "mailto:info@fundedyouth.org?subject=Partner%20With%20Us";

export function TeachersPage() {
  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    schema: SCHEMA,
  });

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 shadow-sm backdrop-blur">
            For Schools &amp; Educators
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            STEAM instruction &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              teacher development
            </span>{" "}
            for your school
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            FundedYouth delivers hands-on STEAM programs for K-12 students and
            two-week professional development for the teachers who&apos;ll
            carry the program after we&apos;re gone.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#options"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700"
            >
              See partnership options
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all hover:border-emerald-600 hover:text-emerald-700"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      {/* Two partnership options */}
      <section id="options" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Flexible Options
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Two ways to partner with us
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Bring your students to the makerspace, or we&apos;ll bring the
              makerspace to you — including a full PD track for your teachers.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Option 1 */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                    Option 1
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">
                  Students come to FundedYouth
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Instruction only
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Bring your class to our fully-equipped makerspace for
                  hands-on STEAM instruction in a professional learning
                  environment.
                </p>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {[
                    "Onsite classroom seats up to 10 students",
                    "Access to professional-grade equipment and tools",
                    "Ideal for smaller groups and field-trip experiences",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Option 2 */}
            <article className="flex flex-col overflow-hidden rounded-2xl border-2 border-emerald-200 bg-white shadow-md ring-2 ring-emerald-100 transition-shadow hover:shadow-lg">
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Option 2 · Most schools choose
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">
                  We come to your school
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Instruction + Professional Development
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Our instructors travel to your school for onsite instruction
                  AND a two-week PD track that builds your teaching
                  staff&apos;s long-term capacity to run the program
                  themselves.
                </p>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {[
                    "Onsite instruction for classes of 10–20 students",
                    "Two-week professional development for your instructors",
                    "Curriculum modeling, live coaching, and Q&A sessions",
                    "Builds long-term teaching capacity for your staff",
                    "Available as an ongoing service — recurring on-site teaching",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Optional Add-Ons */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700">
              Optional Add-Ons
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Enhance your program
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-base text-gray-600">
              Layer on extra resources and follow-through support beyond the
              core instruction.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Curriculum License",
                desc: "Full curriculum materials your teachers can keep using in the classroom.",
                color: "bg-purple-100 text-purple-700",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                ),
              },
              {
                title: "Virtual Coaching",
                desc: "Follow-up video coaching for your instructors after the on-site PD ends.",
                color: "bg-orange-100 text-orange-700",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                ),
              },
              {
                title: "Student Certification",
                desc: "Completion assessments and printable certificates for participating students.",
                color: "bg-blue-100 text-blue-700",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                ),
              },
            ].map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${a.color}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {a.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware & Resources */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
                Hardware &amp; Resources
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Build a real STEAM lab — or extend the one you have
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Beyond instruction, FundedYouth helps schools build long-term
                STEM capacity through equipment procurement and lab
                development. We help you identify the right tools and
                resources for your specific programs and budget.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                Starting from scratch or expanding an existing program — we
                guide selection, sourcing, and setup.
              </p>
              <a
                href={HARDWARE_MAILTO}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
              >
                Discuss your hardware needs
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            <div className="space-y-3 lg:col-span-7">
              {[
                {
                  title: "3D Printers & Fabrication",
                  desc: "FDM and resin printers, laser cutters, and CNC machines for hands-on manufacturing education.",
                  color: "bg-blue-100 text-blue-700",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  ),
                },
                {
                  title: "Robotics & Electronics Kits",
                  desc: "Microcontrollers, sensors, motors, and complete robotics platforms for coding and engineering projects.",
                  color: "bg-emerald-100 text-emerald-700",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  ),
                },
                {
                  title: "Workstations & Software",
                  desc: "Computer setups with CAD software, dev environments, and design tools for your lab.",
                  color: "bg-purple-100 text-purple-700",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  ),
                },
                {
                  title: "Consumables & Materials",
                  desc: "Ongoing supply of filaments, components, raw materials, and project supplies to keep your lab running.",
                  color: "bg-orange-100 text-orange-700",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  ),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-emerald-700 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            Why FundedYouth
          </span>
          <h2 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
            We don&apos;t just teach &mdash; we leave your teachers ready to
            teach it themselves.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100 sm:text-lg">
            FundedYouth is committed to delivering high-quality STEM educational
            experiences while empowering your instructors. As a 501(c)(3)
            educational nonprofit, every partnership reinvests directly into
            student programs.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Ready to partner?
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Let&apos;s design a program that fits your school
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              Tell us about your students, your goals, and your budget. We
              build customized programs that work with what you have.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href={PARTNER_MAILTO}
                className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Email us
                  </p>
                  <p className="mt-0.5 font-semibold text-gray-900">
                    info@fundedyouth.org
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    Subject line: &quot;Partner With Us&quot;
                  </p>
                </div>
              </a>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-blue-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Visit the makerspace
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    415 Parkway Plaza, Suite 519
                  </p>
                  <p className="text-[11px] text-gray-500">El Cajon, CA 92020</p>
                </div>
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-5 text-sm">
              <span className="text-gray-600">Also helpful:</span>
              <Link
                to="/learn"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                What we teach →
              </Link>
              <Link
                to="/faq"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
