import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/useSeo";

const LEARN_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://fundedyouth.org/learn#webpage",
      url: "https://fundedyouth.org/learn",
      name: "Learn — Hands-On STEAM Courses at FundedYouth",
      description:
        "Browse FundedYouth STEAM courses: 3D printing with Cura and Bambu Studio, CAD design with TinkerCAD, and coding with Sprite Lab. Designed for beginners in San Diego County.",
      isPartOf: { "@id": "https://fundedyouth.org/#website" },
    },
    {
      "@type": "ItemList",
      name: "FundedYouth Courses",
      itemListElement: [
        {
          "@type": "Course",
          name: "Cura Slicer Basics",
          courseCode: "3DP1",
          description:
            "Slice STL models with Cura and run your first FDM prints from start to finish.",
          educationalLevel: "Beginner",
          provider: { "@id": "https://fundedyouth.org/#organization" },
          url: "https://docs.fundedyouth.org/courses/3dp1-cura-slicer-basics/",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Onsite",
            courseWorkload: "PT2H",
          },
        },
        {
          "@type": "Course",
          name: "Bambu Studio Basics",
          courseCode: "3DP2",
          description:
            "Master MakerWorld, printer setup, and multi-plate slicing in Bambu Studio.",
          educationalLevel: "Beginner",
          provider: { "@id": "https://fundedyouth.org/#organization" },
          url: "https://docs.fundedyouth.org/courses/3dp2-bambu-studio/",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Onsite",
            courseWorkload: "PT2H",
          },
        },
        {
          "@type": "Course",
          name: "TinkerCAD 3D Modeling Basics",
          courseCode: "3DM1",
          description:
            "Design your first 3D models, align parts, and export print-ready STL files.",
          educationalLevel: "Beginner",
          provider: { "@id": "https://fundedyouth.org/#organization" },
          url: "https://docs.fundedyouth.org/courses/3dm1-tinkercad-modeling/",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Onsite",
            courseWorkload: "PT2H",
          },
        },
        {
          "@type": "Course",
          name: "Coding Basics with Sprite Lab",
          courseCode: "CDE1",
          description:
            "Build playable mini-games while learning variables, events, and game logic.",
          educationalLevel: "Beginner",
          provider: { "@id": "https://fundedyouth.org/#organization" },
          url: "https://docs.fundedyouth.org/courses/cde1-sprite-lab-coding/",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Onsite",
            courseWorkload: "PT3H",
          },
        },
      ],
    },
  ],
};

export function LearnPage() {
  useSeo({
    title: "Learn — Hands-On STEAM Courses at FundedYouth",
    description:
      "Browse FundedYouth STEAM courses: 3D printing with Cura and Bambu Studio, CAD design with TinkerCAD, and coding with Sprite Lab. Designed for beginners in San Diego County.",
    url: "https://fundedyouth.org/learn",
    schema: LEARN_SCHEMA,
  });
  const [showDarkPreview, setShowDarkPreview] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDarkPreview((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://ps-cdn.fundedyouth.org/assets/images/stem-classroom-v2.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-blue-600/85"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-white/90 text-sm font-semibold tracking-wider uppercase mb-4">
            Classes & Learning
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Learn to Create, Build & Innovate
          </h1>

          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Browse our hands-on STEAM courses, see how they sequence into
            pathways, and create a portal account to enroll.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#courses"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Browse Courses
            </a>
            <a
              href="#pathways"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 border-2 border-emerald-600 hover:border-emerald-700"
            >
              See Pathways
            </a>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section
        id="courses"
        className="scroll-mt-24 relative bg-white py-20 sm:py-24"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Courses
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Hands-on, project-driven classes
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Each course teaches a real tool used by makers and engineers.
              Spend FYBITS to enroll — or get the first four free with an
              active membership.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                code: "3DP1",
                title: "Cura Slicer Basics",
                pathway: "3D Printing",
                pathwayColor: "bg-blue-50 text-blue-700 border-blue-100",
                accent: "from-blue-500 to-cyan-500",
                sessions: "2 sessions · 1 hr each",
                difficulty: "Beginner",
                summary:
                  "Slice STL models with Cura and run your first FDM prints from start to finish.",
                topics: ["Cura", "Supports", "Adhesion", "G-Code"],
                detailsUrl:
                  "https://docs.fundedyouth.org/courses/3dp1-cura-slicer-basics/",
              },
              {
                code: "3DP2",
                title: "Bambu Studio Basics",
                pathway: "3D Printing",
                pathwayColor: "bg-blue-50 text-blue-700 border-blue-100",
                accent: "from-blue-500 to-cyan-500",
                sessions: "2 sessions · 1 hr each",
                difficulty: "Beginner",
                summary:
                  "Master MakerWorld, printer setup, and multi-plate slicing in Bambu Studio.",
                topics: ["MakerWorld", "Printer setup", "Filament", "Multi-plate"],
                detailsUrl:
                  "https://docs.fundedyouth.org/courses/3dp2-bambu-studio/",
              },
              {
                code: "3DM1",
                title: "TinkerCAD Basics",
                pathway: "CAD & Product Design",
                pathwayColor: "bg-orange-50 text-orange-700 border-orange-100",
                accent: "from-orange-400 to-amber-500",
                sessions: "2 sessions · 1 hr each",
                difficulty: "Beginner",
                summary:
                  "Design your first 3D models, align parts, and export print-ready STL files.",
                topics: ["CAD basics", "Shapes", "Alignment", "STL export"],
                detailsUrl:
                  "https://docs.fundedyouth.org/courses/3dm1-tinkercad-modeling/",
              },
              {
                code: "CDE1",
                title: "Sprite Lab Coding",
                pathway: "Coding & Logic",
                pathwayColor: "bg-purple-50 text-purple-700 border-purple-100",
                accent: "from-purple-500 to-fuchsia-500",
                sessions: "3 sessions · 1 hr each",
                difficulty: "Beginner",
                summary:
                  "Build playable mini-games while learning variables, events, and game logic.",
                topics: ["Variables", "Events", "IF statements", "Functions"],
                detailsUrl:
                  "https://docs.fundedyouth.org/courses/cde1-sprite-lab-coding/",
              },
            ].map((c) => (
              <article
                key={c.code}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className={`h-1.5 bg-gradient-to-r ${c.accent}`} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold tracking-wider text-gray-900">
                      {c.code}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                      {c.difficulty}
                    </span>
                  </div>
                  <span
                    className={`mt-3 inline-flex w-fit items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${c.pathwayColor}`}
                  >
                    {c.pathway}
                  </span>
                  <h3 className="mt-3 text-lg font-bold leading-tight text-gray-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {c.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.topics.map((t) => (
                      <span
                        key={t}
                        className="inline-flex rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {c.sessions}
                    </span>
                    <div className="flex shrink-0 items-center gap-3">
                      <a
                        href={c.detailsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
                      >
                        Details
                      </a>
                      <a
                        href="https://portal.fundedyouth.org"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                      >
                        Enroll
                        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Pathways */}
      <section
        id="pathways"
        className="scroll-mt-24 relative bg-gradient-to-b from-gray-50 to-white py-20 sm:py-24"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700">
              Learning Pathways
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Follow a track.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Pathways are a recommended order to take courses in — finish one
              and the next builds on it. Here&apos;s our first track.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                name: "3D Printer Pro",
                badge: "bg-blue-600",
                ring: "ring-blue-100",
                border: "border-blue-100",
                soft: "bg-blue-50",
                accentText: "text-blue-700",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-1.586a1 1 0 00-.707.293l-1.121 1.121A2 2 0 0114.172 19H9.828a2 2 0 01-1.414-.586l-1.121-1.121A1 1 0 006.586 17H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2"
                  />
                ),
                courses: [
                  { code: "3DP1", name: "Cura Slicer Basics", state: "available" },
                  { code: "3DP2", name: "Bambu Studio", state: "available" },
                  { code: "Soon", name: "Advanced Slicing", state: "locked" },
                  { code: "Soon", name: "Print Farm Ops", state: "locked" },
                ],
                skills: ["Cura", "Bambu Studio", "Slicing", "Supports", "Filament", "Print workflows"],
              },
            ].map((path) => (
              <div
                key={path.name}
                className={`overflow-hidden rounded-2xl border ${path.border} bg-white shadow-sm transition-shadow hover:shadow-md`}
              >
                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-8">
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${path.badge} text-white shadow-md`}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {path.icon}
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{path.name}</h3>
                        <p className={`text-xs font-semibold uppercase tracking-wider ${path.accentText}`}>
                          Pathway
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {path.skills.map((s) => (
                        <span
                          key={s}
                          className={`inline-flex rounded-full ${path.soft} ${path.accentText} px-2.5 py-1 text-[11px] font-medium`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="flex items-stretch gap-2 overflow-x-auto pb-2 lg:gap-3">
                      {path.courses.map((c, i) => (
                        <div key={c.code + i} className="flex items-stretch">
                          <div
                            className={`flex min-w-[8.5rem] flex-col rounded-xl border-2 p-3 sm:min-w-[10rem] sm:p-4 ${
                              c.state === "locked"
                                ? "border-dashed border-gray-300 bg-gray-50"
                                : `border-solid ${path.border} bg-white ring-4 ${path.ring}`
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`font-mono text-[11px] font-bold ${c.state === "locked" ? "text-gray-400" : path.accentText}`}>
                                {c.code}
                              </span>
                              {c.state === "locked" ? (
                                <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              ) : (
                                <span className={`flex h-4 w-4 items-center justify-center rounded-full ${path.badge}`}>
                                  <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              )}
                            </div>
                            <p className={`mt-1.5 text-sm font-semibold leading-tight ${c.state === "locked" ? "text-gray-400" : "text-gray-900"}`}>
                              {c.name}
                            </p>
                            <p className={`mt-auto pt-2 text-[10px] font-semibold uppercase tracking-wider ${c.state === "locked" ? "text-gray-400" : "text-green-600"}`}>
                              {c.state === "locked" ? "Coming soon" : "Available"}
                            </p>
                          </div>

                          {i < path.courses.length - 1 && (
                            <div aria-hidden="true" className="flex items-center px-1">
                              <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-5 text-center">
            <p className="text-sm font-semibold text-gray-900">
              More pathways are in development
            </p>
            <p className="mt-1 text-sm text-gray-600">
              CAD &amp; Product Design, Coding &amp; Logic, and more — we&apos;re
              building out the full skill tree.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              Available now
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              In development
            </span>
          </div>
        </div>
      </section>

      {/* FundedYouth Portal Section */}
      <section id="portal" className="scroll-mt-24 py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-3">
              Join the Portal
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Create a Free Account Today
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Empowering the Next Generation
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Where <span className="text-blue-600">Youth</span>
                <br />
                Meets <span className="text-orange-500">Opportunity</span>
                <span className="text-gray-900">.</span>
              </h2>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                A community-driven platform for young innovators. Earn credits,
                join world-class courses, and build the future together with
                FundedYouth.
              </p>

              <a
                href="https://portal.fundedyouth.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Login / Sign Up
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://portal.fundedyouth.org/assets/user-portal-light.png"
                  alt="FundedYouth Portal dashboard preview"
                  className={`w-full h-auto transition-opacity duration-1000 ${showDarkPreview ? "opacity-0" : "opacity-100"}`}
                />
                <img
                  src="https://portal.fundedyouth.org/assets/user-portal-dark.png"
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${showDarkPreview ? "opacity-100" : "opacity-0"}`}
                />
              </div>

              <div className="hidden sm:flex absolute -top-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-4 items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-sm mb-1">Top Innovator</div>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-emerald-500 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white"></div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl p-4 items-center gap-3 border border-gray-100 max-w-xs">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-sm">Robotics 101</div>
                  <div className="text-gray-500 text-xs mt-0.5">Next session starts in 2 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions callout */}
      <section className="bg-white pt-12 md:pt-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  See what&apos;s upcoming
                </p>
                <h3 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
                  View the Schedule
                </h3>
                <p className="mt-2 text-gray-600">
                  Browse upcoming STEAM classes, workshops, events, and
                  bootcamps in a calendar or list view.
                </p>
              </div>
              <Link
                to="/schedule"
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 whitespace-nowrap"
              >
                Open Schedule
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Guide callout */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  New to FundedYouth?
                </p>
                <h3 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
                  Set up your account in 9 quick steps
                </h3>
                <p className="mt-2 text-gray-600">
                  Our setup guide walks you through registration, FYBITS,
                  membership, and your first class. Includes a +trick for
                  parents signing up multiple kids.
                </p>
              </div>
              <a
                href="https://portal.fundedyouth.org/#/watch-and-learn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 whitespace-nowrap"
              >
                See setup guide
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
