import { Link } from "react-router-dom";
import { useSeo } from "../lib/useSeo";

const PAGE_TITLE =
  "Engineering Competitions — FundedYouth | FIRST Tech Challenge & NASA Student Launch";
const PAGE_DESC =
  "FundedYouth supports collegiate-style engineering competitions for students. Meet our Rusteze Robotics FIRST Tech Challenge team and NASA Student Launch rocketry team in San Diego County.";
const PAGE_URL = "https://fundedyouth.org/competitions";

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
      "@type": "ItemList",
      name: "FundedYouth Competition Teams",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SportsTeam",
            name: "Rusteze Robotics",
            sport: "FIRST Tech Challenge robotics",
            memberOf: {
              "@type": "Organization",
              name: "FIRST Inspires",
              url: "https://www.firstinspires.org/",
            },
            location: {
              "@type": "Place",
              name: "FundedYouth Makerspace",
              address: {
                "@type": "PostalAddress",
                addressRegion: "CA",
                addressCountry: "US",
              },
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SportsTeam",
            name: "FundedYouth NASA Student Launch Team",
            sport: "High-powered rocketry — NASA Student Launch",
            memberOf: {
              "@type": "Organization",
              name: "NASA",
              url: "https://www.nasa.gov/learning-resources/nasa-student-launch/",
            },
            location: {
              "@type": "Place",
              name: "FundedYouth Makerspace",
              address: {
                "@type": "PostalAddress",
                addressRegion: "CA",
                addressCountry: "US",
              },
            },
          },
        },
      ],
    },
  ],
};

export function CompetitionsPage() {
  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    schema: SCHEMA,
  });

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700 shadow-sm backdrop-blur">
                Engineering Competitions
              </span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Where students become{" "}
                <span className="bg-gradient-to-r from-purple-600 to-[#eb25ad] bg-clip-text text-transparent">
                  engineers
                </span>
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:mx-0">
                Collegiate-style engineering teams that FundedYouth
                supports — from FIRST Tech Challenge robots to NASA
                student-launch rockets.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#teams"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-purple-600/25 transition-all hover:bg-purple-700"
                >
                  Meet the teams
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <Link
                  to="/volunteer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all hover:border-purple-600 hover:text-purple-700"
                >
                  Mentor a team
                </Link>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-600/20 via-blue-400/10 to-transparent blur-2xl"
              />
              <div className="relative">
                <img
                  src="https://cdn.fundedyouth.org/public-site/competitions-ftc-and-nasa-v2.png"
                  alt="FundedYouth competition teams — FIRST Tech Challenge robotics and NASA Student Launch rocketry"
                  className="aspect-[4/3] w-full object-contain"
                />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-purple-700 shadow-lg backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-600 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-600" />
                  </span>
                  Active competition season
                </div>
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-[#eb25ad] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  Robotics · Rocketry
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why competition teams matter */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Why teams matter
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Real engineering. Real stakes. Real portfolios.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Competition teams put students through the same design and
              review process used in industry — and the result is a
              portfolio that colleges and employers actually recognize.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Real-world engineering",
                desc: "Teams work to professional design-review standards, not classroom projects.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                ),
                color: "bg-purple-100 text-purple-700",
              },
              {
                title: "Career-grade portfolio",
                desc: "Design reviews, technical documentation, and competition results that admissions and employers take seriously.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                ),
                color: "bg-blue-100 text-blue-700",
              },
              {
                title: "Pro-grade tools",
                desc: "Bambu and Sovol printers, CAD workstations, fabrication tools — the full makerspace, season-round.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                ),
                color: "bg-emerald-100 text-emerald-700",
              },
              {
                title: "Mentorship that scales",
                desc: "Industry mentors, alumni network, and coaching that follow students from rookie season to college.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-5.13a4 4 0 11-8 0 4 4 0 018 0zm6 3a3 3 0 11-6 0 3 3 0 016 0z" />
                ),
                color: "bg-amber-100 text-amber-700",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${b.color}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {b.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams */}
      <section id="teams" className="scroll-mt-24 bg-gradient-to-b from-gray-50 to-white py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700">
              Featured Teams
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              The competitions we support
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Two flagship programs, both nationally recognized — and both
              run out of the FundedYouth makerspace.
            </p>
          </div>

          <div className="space-y-8">
            {/* FIRST Tech Challenge */}
            <article className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">
              <div className="h-1.5 bg-gradient-to-r from-red-500 to-orange-500" />
              <div className="grid gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-10">
                <div className="relative overflow-hidden rounded-xl">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                    Robotics
                  </span>
                  <img
                    src="https://ps-cdn.fundedyouth.org/assets/images/rusteze-robotics-2025-26.png"
                    alt="Rusteze Robotics FIRST Tech Challenge team"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
                    FIRST Inspires · Member team
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                    FIRST Tech Challenge
                  </h3>
                  <p className="mt-1 text-base font-semibold text-gray-700">
                    Rusteze Robotics
                  </p>
                  <img
                    src="https://ps-cdn.fundedyouth.org/assets/images/FIRST_Horz_RGB.png"
                    alt="FIRST Inspires"
                    className="mt-4 h-7 w-auto self-start"
                  />
                  <p className="mt-4 text-base leading-relaxed text-gray-600">
                    FundedYouth is a proud supporter of the FIRST® Tech
                    Challenge, hosting Rusteze Robotics out of our makerspace.
                    Students design, build, and code competition robots from
                    season kickoff through regional tournaments — with full
                    access to 3D printing, fabrication tools, and team coaching.
                  </p>
                  <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
                    {[
                      "Robot design & build",
                      "CAD + 3D printing",
                      "Programming",
                      "Drive practice",
                    ].map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded bg-red-50 px-2.5 py-1 text-[12px] font-medium text-red-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <a
                      href="https://www.firstinspires.org/robotics/ftc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
                    >
                      Learn about FIRST Tech Challenge
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* NASA Student Launch */}
            <article className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
              <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
              <div className="grid gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-10">
                <div className="md:order-2">
                  <div className="relative overflow-hidden rounded-xl">
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                      Rocketry
                    </span>
                    <img
                      src="https://cdn.fundedyouth.org/public-site/nasa-student-launch-2026.png"
                      alt="Students working on a high-powered rocket"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:order-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    NASA · 9-month program
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                    NASA Student Launch
                  </h3>
                  <p className="mt-1 text-base font-semibold text-gray-700">
                    High-powered rocketry challenge
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">
                    Our team designs, builds, and tests high-powered rockets
                    carrying scientific or engineering payloads. The program
                    runs students through NASA&apos;s real engineering
                    lifecycle — design reviews mirror live aerospace projects —
                    and culminates in a final launch at Marshall Space Flight
                    Center in Huntsville, Alabama.
                  </p>
                  <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
                    {[
                      "Vehicle design",
                      "Payload engineering",
                      "NASA design reviews",
                      "Launch operations",
                    ].map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded bg-blue-50 px-2.5 py-1 text-[12px] font-medium text-blue-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <a
                      href="https://www.nasa.gov/learning-resources/nasa-student-launch/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Explore NASA Student Launch
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* What we provide */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              How we support teams
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The infrastructure behind every competition
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              FundedYouth provides the workspace, equipment, and coaching
              competition teams need to focus on building.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              "Makerspace access",
              "3D printer time",
              "CAD workstations",
              "Fabrication tools",
              "Industry mentors",
              "Competition logistics",
              "Equipment & materials",
              "Coaching & reviews",
              "Build-season storage",
              "Travel coordination",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Get Involved
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Three ways to join the program
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: "Students",
                desc: "Interested in joining a competition team? Stop by the makerspace or call us — team slots fill quickly each season.",
                action: "Talk to our team",
                href: "tel:+16197285002",
                isPhone: true,
                color: "bg-blue-600 hover:bg-blue-700",
              },
              {
                title: "Mentors",
                desc: "Engineers, makers, and educators — your industry experience plugs into design reviews, builds, and competition coaching.",
                action: "Become a mentor",
                href: "/volunteer",
                isPhone: false,
                color: "bg-purple-600 hover:bg-purple-700",
              },
              {
                title: "Sponsors",
                desc: "Sponsor a season, fund a build, or contribute materials. Every dollar goes directly toward students competing nationally.",
                action: "Support the teams",
                href: "/donate",
                isPhone: false,
                color: "bg-emerald-600 hover:bg-emerald-700",
              },
            ].map((c) => {
              const className = `mt-4 inline-flex items-center gap-2 rounded-lg ${c.color} px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors`;
              const inner = (
                <>
                  {c.action}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              );
              return (
                <div
                  key={c.title}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                    {c.desc}
                  </p>
                  {c.isPhone ? (
                    <a href={c.href} className={className}>
                      {inner}
                    </a>
                  ) : (
                    <Link to={c.href} className={className}>
                      {inner}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Visit info */}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Or visit in person
            </p>
            <p className="mt-2 text-base text-gray-700">
              Stop by our makerspace — we&apos;d love to meet you.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="tel:+16197285002"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (619) 728-5002
              </a>
              <a
                href="https://maps.app.goo.gl/tbi3qfSUmKoK3Yf26"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Visit the makerspace
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
