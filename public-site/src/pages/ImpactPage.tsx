import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { useSeo } from "../lib/useSeo";

const PAGE_TITLE =
  "Our Mission & Impact — FundedYouth | 501(c)(3) STEAM Nonprofit";
const PAGE_DESC =
  "FundedYouth's mission, values, and goals. A 501(c)(3) nonprofit (EIN 93-4090260) empowering San Diego County students with hands-on STEAM education, 3D printing, CAD, coding, and on-demand manufacturing.";
const PAGE_URL = "https://fundedyouth.org/impact";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      isPartOf: { "@id": "https://fundedyouth.org/#website" },
      about: { "@id": "https://fundedyouth.org/#organization" },
    },
  ],
};

interface CoreValue {
  title: string;
  description: string;
  color: string;
  icon: ReactNode;
}

const coreValues: CoreValue[] = [
  {
    title: "Innovation",
    description:
      "Embracing new technologies and creative approaches to education and manufacturing.",
    color: "bg-blue-100 text-blue-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
  },
  {
    title: "Accessibility",
    description:
      "Making STEAM education and industrial tools available to everyone, regardless of background.",
    color: "bg-emerald-100 text-emerald-700",
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
    title: "Community",
    description:
      "Building connections between students, educators, mentors, and local businesses.",
    color: "bg-purple-100 text-purple-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    ),
  },
  {
    title: "Empowerment",
    description:
      "Giving youth the skills and confidence to become creators, not just consumers.",
    color: "bg-amber-100 text-amber-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
];

interface Goal {
  title: string;
  description: string;
}

const organizationalGoals: Goal[] = [
  {
    title: "Expand Access to STEAM Education",
    description:
      "Partner with schools across the region to bring hands-on maker education to every student, regardless of their school's budget or resources.",
  },
  {
    title: "Democratize On-Demand Manufacturing",
    description:
      "Make 3D printing, laser cutting, and rapid prototyping accessible to individuals, small businesses, and entrepreneurs in our community.",
  },
  {
    title: "Bring Manufacturing Home",
    description:
      "Revitalize local manufacturing by empowering community members with the skills and tools to create products locally.",
  },
  {
    title: "Create a Replicable Model",
    description:
      "Develop a community makerspace model that can be replicated in other cities, spreading access to maker education nationwide.",
  },
  {
    title: "Launch Youth Entrepreneurs",
    description:
      "Provide pathways for young makers to turn their creations into real businesses, from prototype to product.",
  },
];

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  accent: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "FundedYouth transformed our classroom. Students who struggled with traditional learning are now leading 3D printing projects and mentoring their peers.",
    author: "Maria Rodriguez",
    role: "STEM Coordinator, Taft Middle School",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    quote:
      "The hands-on approach makes all the difference. My son went from being intimidated by technology to designing his own prototypes.",
    author: "James Chen",
    role: "Parent",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    quote:
      "Having a makerspace in our community means kids have access to tools they'd never see otherwise. It's changing what they believe is possible.",
    author: "Sarah Johnson",
    role: "Community Center Director",
    accent: "from-purple-500 to-fuchsia-500",
  },
];

interface ImpactSlide {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  title: string;
}

const impactImages: ImpactSlide[] = [
  {
    before:
      "https://ps-cdn.fundedyouth.org/assets/images/impact/PreOculusQuestNASASimulation.jpg",
    after:
      "https://ps-cdn.fundedyouth.org/assets/images/impact/OculusQuestNASASimulation.png",
    beforeLabel: "Before",
    afterLabel: "After",
    title: "Classroom Transformation",
  },
  {
    before:
      "https://ps-cdn.fundedyouth.org/assets/images/impact/PreTaftMiddleSchool.jpg",
    after:
      "https://ps-cdn.fundedyouth.org/assets/images/impact/TaftMiddleSchool.png",
    beforeLabel: "Learning",
    afterLabel: "Creating",
    title: "Student Growth",
  },
];

interface StorefrontFeature {
  title: string;
  description: string;
  icon: ReactNode;
}

const storefrontFeatures: StorefrontFeature[] = [
  {
    title: "Open Makerspace Hours",
    description:
      "Member access to professional-grade equipment for personal projects.",
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
    title: "Weekend Workshops",
    description:
      "Family-friendly classes that bring parents and kids together to learn new skills.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
  },
  {
    title: "Engineering Team Support",
    description:
      "Home base for local FIRST Tech Challenge teams like Rusteze Robotics and our NASA Student Launch team.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    ),
  },
];

interface ManufacturingPillar {
  title: string;
  description: string;
  icon: ReactNode;
}

const manufacturingPillars: ManufacturingPillar[] = [
  {
    title: "Rapid Prototyping",
    description: "Turn ideas into physical prototypes in hours, not weeks.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    title: "Local Production",
    description:
      "Create products right here in our community, for our community.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
  },
  {
    title: "Economic Opportunity",
    description: "Empower entrepreneurs and small businesses to compete.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

export function ImpactPage() {
  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    schema: SCHEMA,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % impactImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + impactImages.length) % impactImages.length
    );

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://ps-cdn.fundedyouth.org/assets/images/classroom-tutoring-v1.png')",
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-blue-700/90" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            Who We Are
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our mission &amp;{" "}
            <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              impact
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
            A 501(c)(3) nonprofit empowering youth with access to industrial
            manufacturing tools, STEAM education, and the skills to become
            tomorrow&apos;s creators and innovators.
          </p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            EIN <span className="font-mono">93-4090260</span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
              Our Mission
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why we exist
            </h2>
          </div>

          <blockquote className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8 sm:p-12">
            <span
              aria-hidden="true"
              className="absolute left-4 top-2 font-serif text-7xl leading-none text-indigo-200"
            >
              &ldquo;
            </span>
            <p className="px-4 text-center text-xl italic leading-relaxed text-gray-800 sm:px-8 sm:text-2xl">
              Our mission at FundedYouth is to solve for limited resources in
              education by empowering our youth with access to industrial
              manufacturing tools, STEAM educational services, and on-demand
              manufacturing certification programs.
            </p>
            <span
              aria-hidden="true"
              className="absolute bottom-2 right-4 font-serif text-7xl leading-none text-indigo-200"
            >
              &rdquo;
            </span>
          </blockquote>

          <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-gray-600">
            Every young person deserves access to the tools and skills that
            will shape the future. By bridging the gap between classroom
            learning and real-world manufacturing, we&apos;re preparing the
            next generation to become creators, innovators, and
            problem-solvers.
          </p>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              What Drives Us
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Core values
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg ${v.color}`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {v.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline banner 1 (inlined — used to be TaglineBanner component) */}
      <section
        className="relative overflow-hidden py-14"
        style={{
          backgroundImage:
            "url('https://ps-cdn.fundedyouth.org/assets/images/tagline-bg-3dprinting.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(37, 99, 235, 0.85)" }}
        />
        <div className="container relative mx-auto max-w-4xl px-4 text-center text-white">
          <p className="text-2xl font-semibold leading-snug sm:text-3xl">
            Every student deserves access to the{" "}
            <span className="font-extrabold">tools and skills</span> that will
            shape their future.
          </p>
        </div>
      </section>

      {/* Impact slider */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700">
              School Partnerships
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Transforming local education
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Drag the slider to see the transformation our programs create in
              classrooms.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 -ml-6 items-center justify-center rounded-full bg-white/95 shadow-lg text-gray-700 transition-colors hover:bg-white hover:text-teal-600 lg:-ml-8"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 -mr-6 items-center justify-center rounded-full bg-white/95 shadow-lg text-gray-700 transition-colors hover:bg-white hover:text-teal-600 lg:-mr-8"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
              <BeforeAfterSlider
                beforeImage={impactImages[currentSlide].before}
                afterImage={impactImages[currentSlide].after}
                beforeLabel={impactImages[currentSlide].beforeLabel}
                afterLabel={impactImages[currentSlide].afterLabel}
                className="aspect-[16/9] md:aspect-[21/9]"
              />
              <div className="p-5 sm:p-6">
                <h3 className="text-center text-xl font-bold text-gray-900">
                  {impactImages[currentSlide].title}
                </h3>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {impactImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-teal-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Our Goals
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What we&apos;re working toward
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Five ambitious goals guide everything we do at FundedYouth.
            </p>
          </div>

          <div className="space-y-4">
            {organizationalGoals.map((goal, index) => (
              <div
                key={goal.title}
                className="flex items-start gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {goal.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:text-base">
                    {goal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              Our Vision
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Where we&apos;re headed
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 text-white lg:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur sm:p-8">
              <h3 className="text-2xl font-bold sm:text-3xl">
                For our local community
              </h3>
              <p className="mt-4 text-base leading-relaxed text-teal-100">
                A San Diego where every neighborhood has access to maker
                education — where students from any background can walk into a
                makerspace, learn to design and 3D print, and discover their
                potential as creators.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Partner with every school district in the region",
                  "Open satellite makerspaces in underserved communities",
                  "Provide free after-school programs for low-income families",
                  "Connect local businesses with young talent",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-teal-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur sm:p-8">
              <h3 className="text-2xl font-bold sm:text-3xl">
                For all communities
              </h3>
              <p className="mt-4 text-base leading-relaxed text-teal-100">
                Beyond San Diego — a model that can be replicated anywhere. A
                blueprint for community makerspaces that empower youth and
                revitalize local manufacturing.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Create open-source curriculum for maker education",
                  "Share our operational model with communities nationwide",
                  "Build a network of FundedYouth-inspired makerspaces",
                  "Advocate for maker education in public policy",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-teal-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Storefront / Community hub */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700">
                Community Hub
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our storefront impact
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                Our retail location isn&apos;t just a store — it&apos;s a
                community makerspace where anyone can learn, create, and
                innovate. From weekend workshops to competition team support,
                we make STEAM education accessible to everyone.
              </p>

              <div className="mt-6 space-y-3">
                {storefrontFeatures.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {f.icon}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-500/20 via-amber-400/10 to-transparent blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
                <img
                  src="https://ps-cdn.fundedyouth.org/assets/images/storefront-back-with-people.png"
                  alt="Rusteze Robotics team at FundedYouth makerspace"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 inline-flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg sm:-left-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Community first
                  </p>
                  <p className="text-xs text-gray-500">
                    Building futures together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* On-Demand Manufacturing */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-500/20 via-blue-400/10 to-transparent blur-2xl"
                />
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
                  <img
                    src="https://ps-cdn.fundedyouth.org/assets/images/impact/CampusLabConcept.png"
                    alt="3D print lab concept"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-4 inline-flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg sm:-right-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Made locally
                    </p>
                    <p className="text-xs text-gray-500">
                      On-demand production
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700">
                Our Belief
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Bringing on-demand manufacturing home
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                For too long, manufacturing has been outsourced overseas,
                taking jobs and opportunities away from our communities. We
                believe it&apos;s time to bring manufacturing back — and
                on-demand technology makes it possible.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                With 3D printing, laser cutting, and rapid prototyping, anyone
                can go from idea to product without massive factory
                investments. We&apos;re training the next generation to lead
                this manufacturing revolution.
              </p>

              <div className="mt-6 space-y-3">
                {manufacturingPillars.map((p) => (
                  <div
                    key={p.title}
                    className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {p.icon}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {p.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline banner 2 (inlined) */}
      <section
        className="relative overflow-hidden py-14"
        style={{
          backgroundImage:
            "url('https://ps-cdn.fundedyouth.org/assets/images/tagline-bg-soldering.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 150, 137, 0.85)" }}
        />
        <div className="container relative mx-auto max-w-4xl px-4 text-center text-white">
          <p className="text-2xl font-semibold italic leading-snug sm:text-3xl">
            The future of manufacturing is{" "}
            <span className="font-extrabold not-italic">
              local, accessible, and youth-driven.
            </span>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Voices from our community
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Teachers, parents, and community leaders who&apos;ve seen
              FundedYouth&apos;s impact firsthand.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <article
                key={t.author}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.accent}`}
                />
                <svg
                  className="h-8 w-8 shrink-0 text-blue-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.17 17.17c-1.62-1.61-2.59-3.79-2.59-6.17 0-3.94 3.21-7.15 7.15-7.15v2.86c-2.37 0-4.29 1.92-4.29 4.29 0 .15.01.3.03.45.74-.36 1.57-.57 2.46-.57 1.58 0 2.86 1.28 2.86 2.86 0 1.58-1.28 2.86-2.86 2.86-1.27 0-2.36-.83-2.76-1.43zm10 0c-1.62-1.61-2.59-3.79-2.59-6.17 0-3.94 3.21-7.15 7.15-7.15v2.86c-2.37 0-4.29 1.92-4.29 4.29 0 .15.01.3.03.45.74-.36 1.57-.57 2.46-.57 1.58 0 2.86 1.28 2.86 2.86 0 1.58-1.28 2.86-2.86 2.86-1.27 0-2.36-.83-2.76-1.43z" />
                </svg>
                <p className="mt-4 flex-1 text-base leading-relaxed text-gray-800">
                  {t.quote}
                </p>
                <footer className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.accent} text-sm font-bold text-white shadow-sm`}
                    aria-hidden="true"
                  >
                    {t.author
                      .split(" ")
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {t.author}
                    </p>
                    <p className="text-xs text-gray-600">{t.role}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Join our mission
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
            Whether you want to volunteer, donate, partner with us, or bring
            FundedYouth to your community — we&apos;d love to hear from you.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/volunteer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700"
            >
              Volunteer &amp; mentor
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
            <Link
              to="/donate"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600"
            >
              Donate
            </Link>
            <Link
              to="/teachers"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all hover:border-emerald-600 hover:text-emerald-700"
            >
              Partner with us
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="inline-flex items-center gap-2">
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
              <span className="font-medium text-gray-700">
                info@fundedyouth.org
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
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
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>415 Parkway Plaza, Suite 519, El Cajon, CA</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
