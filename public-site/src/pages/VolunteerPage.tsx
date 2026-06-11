import { Link } from "react-router-dom";
import { type ReactNode } from "react";
import { useSeo } from "../lib/useSeo";

const PAGE_TITLE =
  "Volunteer & Mentor — FundedYouth | Teach Real STEAM Skills";
const PAGE_DESC =
  "Volunteer at FundedYouth as a mentor, instructor, or makerspace helper. Free training in 3D printing, CAD, coding, electronics, and robotics. Build real STEAM teaching experience with K-12 students in San Diego County.";
const PAGE_URL = "https://fundedyouth.org/volunteer";

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
      "@type": "VolunteerAction",
      name: "Volunteer at FundedYouth",
      description:
        "Mentor students, support competition teams, and assist in the makerspace. Free training, community service hours, and printing credits in return.",
      agent: { "@id": "https://fundedyouth.org/#organization" },
      location: {
        "@type": "Place",
        name: "FundedYouth Makerspace",
        address: {
          "@type": "PostalAddress",
          streetAddress: "415 Parkway Plaza, Suite 519",
          addressLocality: "El Cajon",
          addressRegion: "CA",
          postalCode: "92020",
          addressCountry: "US",
        },
      },
    },
  ],
};

const PORTAL_URL = "https://portal.fundedyouth.org/";

interface JourneyStep {
  number: string;
  title: string;
  description: string;
}

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Sign Up",
    description:
      "Create a free account on the FundedYouth portal and sign the Volunteer Agreement. Once you sign, a team member will follow up to schedule an in-person interview.",
  },
  {
    number: "02",
    title: "Get Trained",
    description:
      "Complete free intro training in our core skills — 3D Printing, 3D Modeling, and Coding — so you have the confidence to teach others.",
  },
  {
    number: "03",
    title: "Volunteer",
    description:
      "Help at sessions, support the makerspace, and assist learners — work alongside students and mentors.",
  },
  {
    number: "04",
    title: "Lead & Teach",
    description:
      "Once approved by a board member, lead your own classes and inspire new makers in the community.",
  },
];

interface Benefit {
  title: string;
  description: string;
  highlight?: string;
  color: string;
  icon: ReactNode;
}

const benefits: Benefit[] = [
  {
    title: "FYBIT Credits",
    description:
      "Active volunteers can opt in to receive FYBIT credits as a thank-you. Volunteering isn't transactional — credits are a perk, not a wage.",
    highlight: "Optional · opt in any time",
    color: "bg-amber-100 text-amber-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: "Free Training & Certification",
    description:
      "Free access to our intro courses and instructional materials — taught by FundedYouth instructors.",
    color: "bg-blue-100 text-blue-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    ),
  },
  {
    title: "Community Service Hours",
    description:
      "Volunteer time counts toward community service and outreach requirements — great for students, professionals, and anyone giving back.",
    color: "bg-emerald-100 text-emerald-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: "Hands-On Experience",
    description:
      "Work with cutting-edge 3D printing, CAD, and fabrication tools while building real-world teaching and technical skills.",
    color: "bg-purple-100 text-purple-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
      />
    ),
  },
  {
    title: "Networking & Mentorship",
    description:
      "Connect with industry professionals, educators, and local businesses invested in STEM education and manufacturing.",
    color: "bg-cyan-100 text-cyan-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
  },
  {
    title: "Resume & Career Boost",
    description:
      "Develop marketable skills in a growing industry while making a positive community impact. Great for portfolios.",
    color: "bg-orange-100 text-orange-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
  },
];

interface Audience {
  title: string;
  desc: string;
  examples: string;
  accent: string;
}

const audiences: Audience[] = [
  {
    title: "Industry Mentors",
    desc: "Engineers, makers, and technologists with skills to share. Help shape design reviews, builds, and competition coaching.",
    examples: "Software · Mechanical · Electrical · Aerospace",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    title: "Educators",
    desc: "Teachers and curriculum designers — help develop or co-teach STEAM lessons that students actually want to take.",
    examples: "STEAM teachers · Tutors · After-school staff",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Students & Community",
    desc: "High-schoolers, college students, and community members earning service hours or building their portfolio.",
    examples: "Service hours · Portfolio · Mentorship",
    accent: "from-purple-500 to-fuchsia-500",
  },
];

export function VolunteerPage() {
  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    schema: SCHEMA,
  });

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 shadow-sm backdrop-blur">
                Volunteer &amp; Mentor
              </span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Mentor the next wave of{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  student engineers
                </span>
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:mx-0">
                Help teach 3D printing, CAD, coding, electronics, and
                robotics — or support competition teams and the makerspace.
                Create a free portal account and sign the Volunteer Agreement,
                then a team member will follow up to schedule an in-person
                interview.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700"
                >
                  Create a Free Account
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#benefits"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all hover:border-emerald-600 hover:text-emerald-700"
                >
                  See the perks
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-600/20 via-teal-400/10 to-transparent blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                <img
                  src="https://ps-cdn.fundedyouth.org/assets/images/storefront-back-with-people.png"
                  alt="Volunteers and students at the FundedYouth makerspace"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where you fit */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Where You Fit
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Three ways people show up
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Most volunteers fall into one of three buckets. Pick the one that
              sounds like you — the sign-up process is the same for all.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`h-1.5 bg-gradient-to-r ${a.accent}`} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-gray-900">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                    {a.desc}
                  </p>
                  <p className="mt-4 text-xs font-medium text-gray-500">
                    {a.examples}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your journey */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Your Journey
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Sign Up → Train → Volunteer → Lead
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              From your first account to leading your own classes — here&apos;s
              the path.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-emerald-200 via-teal-300 to-emerald-200 lg:block"
            />
            <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {journeySteps.map((step, i) => (
                <li
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg ring-4 ring-gray-50">
                    <span className="text-lg font-bold">{step.number}</span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                  {i < journeySteps.length - 1 && (
                    <svg
                      aria-hidden="true"
                      className="my-2 h-5 w-5 text-gray-300 lg:hidden"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Storefront feature image */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
            <img
              src="https://ps-cdn.fundedyouth.org/assets/images/storefront-with-people.png"
              alt="Volunteers helping at the FundedYouth storefront"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              Perks &amp; Benefits
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What you get back
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Volunteering isn&apos;t a one-way street — your time earns
              tangible benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${b.color}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {b.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  {b.description}
                </p>
                {b.highlight && (
                  <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    {b.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Org info + EIN */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-3 md:gap-8">
              <div className="md:col-span-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  501(c)(3) Nonprofit
                </span>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  Our mission
                </h2>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  FundedYouth is a registered 501(c)(3) nonprofit dedicated to
                  STEAM education and on-demand manufacturing. We make
                  hands-on, high-tech learning accessible to our community
                  through 3D printing, CAD design, coding, and rapid
                  prototyping.
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Parkway Plaza, El Cajon, CA
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  EIN Number
                </p>
                <p className="mt-2 font-mono text-3xl font-extrabold text-emerald-700">
                  93-4090260
                </p>
                <p className="mt-3 text-xs text-gray-600">
                  Your contributions and volunteer time may be tax-deductible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-800 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to make a difference?
          </h2>
          <p className="mt-3 text-lg text-emerald-100">
            Create a free portal account and sign the Volunteer Agreement —
            a team member will follow up to schedule your in-person interview.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-bold text-emerald-700 shadow-xl shadow-black/20 transition-all hover:bg-emerald-50"
            >
              Create a Free Account
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Talk to us first
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
