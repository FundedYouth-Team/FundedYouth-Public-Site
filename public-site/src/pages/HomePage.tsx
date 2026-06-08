import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { VideoCard } from '../components/VideoCard'
import { VideoPlayer } from '../components/VideoPlayer'
import { useSeo } from '../lib/useSeo'

// Selectable walkthrough videos shown as cards beneath the player. Clicking a
// card swaps the video above so it can be played in place.
const WALKTHROUGH_VIDEOS = [
  {
    label: 'Class Schedule',
    title: 'View Upcoming Classes while Logged Out',
    desc: 'Browse upcoming classes',
    videoId: 'E8rDILmQb6M',
    color: 'text-blue-600 bg-blue-50',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
  },
  {
    label: 'FYBIT Credits',
    title: 'FundedYouth uses FYBIT Credits. What are they?',
    desc: 'Credit system',
    videoId: 'vX0kfwLYDLs',
    color: 'text-amber-600 bg-amber-50',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 8h6m-5 0a3 3 0 110 6H7l3 3m1-12a9 9 0 100 18 9 9 0 000-18z"
      />
    ),
  },
  {
    label: 'Membership',
    title: 'Active Membership (required) to Register for Classes',
    desc: 'Plans & benefits',
    videoId: '6pSzWO95yYU',
    color: 'text-purple-600 bg-purple-50',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-5.13a4 4 0 11-8 0 4 4 0 018 0zm6 3a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
  },
  {
    label: 'Join a Class',
    title: 'Register for a Class on the FundedYouth Portal',
    desc: 'Sign up in minutes',
    videoId: '7AnXTBO4Iv4',
    color: 'text-green-600 bg-green-50',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
      />
    ),
  },
] as const;

const walkthroughVideoUrl = (videoId: string) =>
  `https://www.youtube.com/watch?v=${videoId}`

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://fundedyouth.org/#webpage',
      url: 'https://fundedyouth.org/',
      name: 'FundedYouth — Hands-On STEAM Education in San Diego County',
      description:
        'A modern STEAM education platform for students in San Diego County. Hands-on 3D printing, CAD design, coding, and manufacturing classes powered by FYBITS credits.',
      isPartOf: { '@id': 'https://fundedyouth.org/#website' },
      about: { '@id': 'https://fundedyouth.org/#organization' },
    },
    {
      '@type': 'ItemList',
      name: 'Featured FundedYouth Courses',
      itemListElement: [
        {
          '@type': 'Course',
          name: 'Cura Slicer Basics',
          courseCode: '3DP1',
          description:
            'Slice STL models with Cura and run your first FDM prints from start to finish.',
          provider: { '@id': 'https://fundedyouth.org/#organization' },
          url: 'https://docs.fundedyouth.org/courses/3dp1-cura-slicer-basics/',
        },
        {
          '@type': 'Course',
          name: 'Bambu Studio Basics',
          courseCode: '3DP2',
          description:
            'Master MakerWorld, printer setup, and multi-plate slicing in Bambu Studio.',
          provider: { '@id': 'https://fundedyouth.org/#organization' },
          url: 'https://docs.fundedyouth.org/courses/3dp2-bambu-studio/',
        },
        {
          '@type': 'Course',
          name: 'TinkerCAD 3D Modeling',
          courseCode: '3DM1',
          description:
            'Design your first 3D models, align parts, and export print-ready STL files.',
          provider: { '@id': 'https://fundedyouth.org/#organization' },
          url: 'https://docs.fundedyouth.org/courses/3dm1-tinkercad-modeling/',
        },
        {
          '@type': 'Course',
          name: 'Sprite Lab Coding',
          courseCode: 'CDE1',
          description:
            'Build playable mini-games while learning variables, events, and game logic.',
          provider: { '@id': 'https://fundedyouth.org/#organization' },
          url: 'https://docs.fundedyouth.org/courses/cde1-sprite-lab-coding/',
        },
      ],
    },
  ],
}

export function HomePage() {
  useSeo({
    title:
      'FundedYouth — Hands-On STEAM Education in San Diego County',
    description:
      'A modern STEAM education platform for students in San Diego County. Hands-on 3D printing, CAD design, coding, and manufacturing classes — powered by FYBITS credits and a Basic Membership.',
    url: 'https://fundedyouth.org/',
    schema: HOME_SCHEMA,
  })
  const [walkthroughOpen, setWalkthroughOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<{
    videoUrl: string
    thumbnailUrl?: string
    title: string
  }>({
    videoUrl: walkthroughVideoUrl(WALKTHROUGH_VIDEOS[0].videoId),
    thumbnailUrl: undefined,
    title: WALKTHROUGH_VIDEOS[0].title,
  })

  const activeVideoIndex = Math.max(
    0,
    WALKTHROUGH_VIDEOS.findIndex(
      (v) => walkthroughVideoUrl(v.videoId) === activeVideo.videoUrl,
    ),
  )

  const selectWalkthroughVideo = (index: number) => {
    const total = WALKTHROUGH_VIDEOS.length
    const item = WALKTHROUGH_VIDEOS[((index % total) + total) % total]
    setActiveVideo({
      videoUrl: walkthroughVideoUrl(item.videoId),
      thumbnailUrl: undefined,
      title: item.title,
    })
  }

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
         SUMMER SCHEDULE HIGHLIGHT
         Announcement bar linking to the Schedule page. Sits directly
         below the nav so visitors see it immediately.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
        <div className="container mx-auto max-w-7xl px-4 py-5 sm:py-6">
          <Link
            to="/schedule"
            className="group flex flex-col items-center justify-center gap-3 text-center lg:flex-row lg:gap-6"
          >
            <img
              src="https://ps-cdn.fundedyouth.org/assets/images/Hello-Summer-Schedule-Calendar-Graphic.png"
              alt="Hello Summer — Schedule"
              className="h-12 w-auto transition-transform group-hover:scale-105 sm:h-14"
            />
            <p className="text-sm font-semibold text-gray-900 sm:text-base">
              Our Summer Schedule is here — explore upcoming sessions and reserve
              your spot.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 transition-colors group-hover:text-orange-700">
              View Schedule
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         SECTION 1 — HERO
         Static split layout. No background video, no floating cards.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Subtle grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Soft accent blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"
        />

        <div className="container relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Copy column */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                STEAM Education Platform
              </span>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Learn Real STEAM Skills Through{' '}
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Hands-On Projects
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:mx-0">
                3D Printing, CAD Design, Coding, and Manufacturing
                Education for Students in San Diego County.
              </p>

              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="https://portal.fundedyouth.org"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40"
                >
                  Start Learning
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                <a
                  href="#memberships"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600"
                >
                  View Memberships
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-sm text-gray-500 lg:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  San Diego County
                </span>
                <span className="inline-flex items-center gap-1.5">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Project-based learning
                </span>
                <span className="inline-flex items-center gap-1.5">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Beginner to advanced
                </span>
              </div>
            </div>

            {/* Visual column */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-600/20 via-blue-400/10 to-transparent blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                <img
                  src="https://ps-cdn.fundedyouth.org/assets/images/tagline-bg-soldering.png"
                  alt="Student working on a hands-on STEAM electronics project"
                  className="aspect-[4/3] w-full object-cover"
                />
                {/* Live indicator */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-lg backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Live makerspace
                </div>
                {/* FYBITS chip */}
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Earn FYBITS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         SECTION 2 — VIDEO WALKTHROUGH
         Embedded portal walkthrough. Intentional, conversion-focused.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-white py-20 sm:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Product Walkthrough
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              See How the FundedYouth Portal Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Watch a quick walkthrough of memberships, FYBITS, courses, and
              learning pathways.
            </p>
          </div>

          {/* Video card with subtle frame + prev/next arrows */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-cyan-400/20 blur-2xl"
            />
            <div className="relative">
              <VideoCard
                key={activeVideo.videoUrl}
                videoUrl={activeVideo.videoUrl}
                thumbnailUrl={activeVideo.thumbnailUrl}
                title={activeVideo.title}
                playButtonColor="bg-[rgb(33,150,243)] hover:bg-[rgb(30,136,229)]"
                onPlayClick={() => setWalkthroughOpen(true)}
                className="border border-gray-200"
              />

              <button
                type="button"
                onClick={() => selectWalkthroughVideo(activeVideoIndex - 1)}
                aria-label="Previous video"
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg backdrop-blur transition-all hover:bg-white hover:scale-105 sm:left-3 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => selectWalkthroughVideo(activeVideoIndex + 1)}
                aria-label="Next video"
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg backdrop-blur transition-all hover:bg-white hover:scale-105 sm:right-3 sm:h-12 sm:w-12"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Selectable walkthrough videos — clicking swaps the video above */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {WALKTHROUGH_VIDEOS.map((item, index) => {
              const videoUrl = walkthroughVideoUrl(item.videoId)
              const isActive = activeVideo.videoUrl === videoUrl
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectWalkthroughVideo(index)}
                  className={`flex items-center gap-3 rounded-xl border bg-white p-3 text-left shadow-sm transition-all hover:shadow-md sm:p-4 ${
                    isActive
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.label}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Create a new account — links to the portal walkthrough */}
          <div className="mt-8 text-center">
            <a
              href="https://portal.fundedyouth.org/#watch-and-learn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              Create a New Account
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         SECTION 3 — HOW FYBITS WORK
         5-step flow + FYBITS unlock benefits panel.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gray-50 py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              How It Works
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              From Sign-Up to Skill-Up in 5 Steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              FYBITS are credits you buy on the portal and spend across the
              platform — for membership, courses, sessions, and lab time.
            </p>
          </div>

          {/* 5-step process */}
          <div className="relative">
            {/* Desktop connector line behind the step badges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-blue-200 via-amber-300 to-blue-200 lg:block"
            />

            <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {[
                {
                  num: '01',
                  title: 'Create a Portal Account',
                  desc: 'Sign up free on portal.fundedyouth.org to get started.',
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  ),
                },
                {
                  num: '02',
                  title: 'Buy FYBIT Credit Packs',
                  desc: 'Purchase packs securely on the portal — FYBITS power everything.',
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
                  num: '03',
                  title: 'Activate Membership',
                  desc: '10 FYBITS/month unlocks 4 free courses and included printer access.',
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  ),
                },
                {
                  num: '04',
                  title: 'Join Your First Course',
                  desc: 'Start with the 4 free courses or spend FYBITS on any class.',
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
                  num: '05',
                  title: 'Register for Sessions & Lab Time',
                  desc: 'Use FYBITS for workshops, lab access, and printer time.',
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  ),
                },
              ].map((step, i) => (
                <li
                  key={step.num}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg ring-4 ring-gray-50">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {step.icon}
                    </svg>
                    <span className="absolute -bottom-1.5 -right-1.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-400 px-1.5 text-[10px] font-bold text-gray-900 shadow">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-gray-600">
                    {step.desc}
                  </p>
                  {/* Mobile connector chevron */}
                  {i < 4 && (
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

          {/* Trust strip: COPPA + secure purchases */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-600 shadow-sm sm:text-sm">
            <span className="inline-flex items-center gap-2 font-semibold text-gray-800">
              <svg
                className="h-4 w-4 text-green-600"
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
              COPPA compliant
            </span>
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure portal checkout
            </span>
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              We never store card information
            </span>
          </div>

          {/* FYBITS unlock panel */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-sm">
            <div className="grid items-start gap-8 p-6 sm:p-10 lg:grid-cols-3 lg:gap-10">
              <div className="lg:col-span-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  FYBITS
                </div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                  What FYBITS pay for
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  Buy credits in packs, then spend them where you need them
                  most across the FundedYouth platform.
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-2">
                {[
                  'Monthly membership (10 FYBITS)',
                  'Additional courses & workshops',
                  'Sovol & Bambu printer time',
                  'Optional add-ons (filament, perks)',
                  'Sessions and 1-on-1 mentoring',
                ].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 rounded-lg border border-amber-100 bg-white/70 p-3 backdrop-blur"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
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
                    <span className="pt-0.5 text-sm font-medium text-gray-800">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         SECTION 4 — MEMBERSHIP
         ───────────────────────────────────────────────────────────── */}
      <section
        id="memberships"
        className="relative scroll-mt-24 bg-white py-20 sm:py-24"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Memberships
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              One simple subscription
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Get 10 FYBIT credits delivered every month — spend them across the
              platform on courses, sessions, and printer time.
            </p>
          </div>

          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-gray-900">
                    10 FYBIT Credits | Monthly
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    (No bonus credits) This is a non-refundable purchase.
                    Credits cannot be exchanged for cash or real currency.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between border-t border-gray-100 pt-4">
                <div>
                  <span className="text-3xl font-extrabold text-blue-600">
                    $10.00
                  </span>
                  <span className="text-sm font-medium text-gray-500">/mo</span>
                </div>
                <p className="text-base font-bold text-amber-600">
                  10 credits/mo
                </p>
              </div>
              <a
                href="https://portal.fundedyouth.org"
                className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 text-base font-semibold text-white shadow-md transition-all hover:from-amber-500 hover:to-orange-600"
              >
                Subscribe
              </a>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Card information is securely stored by Stripe
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         SECTION 5 — LEARNING PATHWAYS
         Skill-tree style: linear progression with locked advanced nodes.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 sm:py-24">
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
                name: '3D Printer Pro',
                accent: 'blue',
                badge: 'bg-blue-600',
                ring: 'ring-blue-100',
                border: 'border-blue-100',
                soft: 'bg-blue-50',
                accentText: 'text-blue-700',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-1.586a1 1 0 00-.707.293l-1.121 1.121A2 2 0 0114.172 19H9.828a2 2 0 01-1.414-.586l-1.121-1.121A1 1 0 006.586 17H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2"
                  />
                ),
                courses: [
                  { code: '3DP1', name: 'Cura Slicer Basics', state: 'available' },
                  { code: '3DP2', name: 'Bambu Studio', state: 'available' },
                  { code: 'Soon', name: 'Advanced Slicing', state: 'locked' },
                  { code: 'Soon', name: 'Print Farm Ops', state: 'locked' },
                ],
                skills: [
                  'Cura',
                  'Bambu Studio',
                  'Slicing',
                  'Supports',
                  'Filament',
                  'Print workflows',
                ],
              },
            ].map((path) => (
              <div
                key={path.name}
                className={`overflow-hidden rounded-2xl border ${path.border} bg-white shadow-sm transition-shadow hover:shadow-md`}
              >
                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-8">
                  {/* Pathway header */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${path.badge} text-white shadow-md`}
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {path.icon}
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {path.name}
                        </h3>
                        <p
                          className={`text-xs font-semibold uppercase tracking-wider ${path.accentText}`}
                        >
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

                  {/* Course node chain */}
                  <div className="lg:col-span-8">
                    <div className="flex items-stretch gap-2 overflow-x-auto pb-2 lg:gap-3">
                      {path.courses.map((c, i) => (
                        <div key={c.code + i} className="flex items-stretch">
                          {/* Course node */}
                          <div
                            className={`flex min-w-[8.5rem] flex-col rounded-xl border-2 p-3 sm:min-w-[10rem] sm:p-4 ${
                              c.state === 'locked'
                                ? 'border-dashed border-gray-300 bg-gray-50'
                                : `border-solid ${path.border} bg-white ring-4 ${path.ring}`
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`font-mono text-[11px] font-bold ${
                                  c.state === 'locked'
                                    ? 'text-gray-400'
                                    : path.accentText
                                }`}
                              >
                                {c.code}
                              </span>
                              {c.state === 'locked' ? (
                                <svg
                                  className="h-3.5 w-3.5 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                  />
                                </svg>
                              ) : (
                                <span
                                  className={`flex h-4 w-4 items-center justify-center rounded-full ${path.badge}`}
                                >
                                  <svg
                                    className="h-2.5 w-2.5 text-white"
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
                                </span>
                              )}
                            </div>
                            <p
                              className={`mt-1.5 text-sm font-semibold leading-tight ${
                                c.state === 'locked'
                                  ? 'text-gray-400'
                                  : 'text-gray-900'
                              }`}
                            >
                              {c.name}
                            </p>
                            <p
                              className={`mt-auto pt-2 text-[10px] font-semibold uppercase tracking-wider ${
                                c.state === 'locked'
                                  ? 'text-gray-400'
                                  : 'text-green-600'
                              }`}
                            >
                              {c.state === 'locked'
                                ? 'Coming soon'
                                : 'Available'}
                            </p>
                          </div>

                          {/* Connector arrow */}
                          {i < path.courses.length - 1 && (
                            <div
                              aria-hidden="true"
                              className="flex items-center px-1"
                            >
                              <svg
                                className="h-5 w-5 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M9 5l7 7-7 7"
                                />
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

          {/* More pathways callout */}
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-5 text-center">
            <p className="text-sm font-semibold text-gray-900">
              More pathways are in development
            </p>
            <p className="mt-1 text-sm text-gray-600">
              CAD & Product Design, Coding & Logic, and more — we&apos;re
              building out the full skill tree.
            </p>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              Available now
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              In development
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         SECTION 6 — FEATURED COURSES
         Course cards: code, title, pathway, duration, difficulty, topics.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-white py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
                Featured Courses
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Hands-on, project-driven classes
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-gray-600">
                Each course teaches a real tool used by makers and engineers.
                Spend FYBITS to enroll.
              </p>
            </div>
            <Link
              to="/learn#courses"
              className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600 sm:inline-flex"
            >
              Browse all
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
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                code: '3DP1',
                title: 'Cura Slicer Basics',
                pathway: '3D Printing',
                pathwayColor:
                  'bg-blue-50 text-blue-700 border-blue-100',
                accent: 'from-blue-500 to-cyan-500',
                sessions: '2 sessions · 1 hr each',
                difficulty: 'Beginner',
                summary:
                  'Slice STL models with Cura and run your first FDM prints from start to finish.',
                topics: ['Cura', 'Supports', 'Adhesion', 'G-Code'],
                detailsUrl:
                  'https://docs.fundedyouth.org/courses/3dp1-cura-slicer-basics/',
              },
              {
                code: '3DP2',
                title: 'Bambu Studio Basics',
                pathway: '3D Printing',
                pathwayColor:
                  'bg-blue-50 text-blue-700 border-blue-100',
                accent: 'from-blue-500 to-cyan-500',
                sessions: '2 sessions · 1 hr each',
                difficulty: 'Beginner',
                summary:
                  'Master MakerWorld, printer setup, and multi-plate slicing in Bambu Studio.',
                topics: [
                  'MakerWorld',
                  'Printer setup',
                  'Filament',
                  'Multi-plate',
                ],
                detailsUrl:
                  'https://docs.fundedyouth.org/courses/3dp2-bambu-studio/',
              },
              {
                code: '3DM1',
                title: 'TinkerCAD Basics',
                pathway: 'CAD & Product Design',
                pathwayColor:
                  'bg-orange-50 text-orange-700 border-orange-100',
                accent: 'from-orange-400 to-amber-500',
                sessions: '2 sessions · 1 hr each',
                difficulty: 'Beginner',
                summary:
                  'Design your first 3D models, align parts, and export print-ready STL files.',
                topics: [
                  'CAD basics',
                  'Shapes',
                  'Alignment',
                  'STL export',
                ],
                detailsUrl:
                  'https://docs.fundedyouth.org/courses/3dm1-tinkercad-modeling/',
              },
              {
                code: 'CDE1',
                title: 'Sprite Lab Coding',
                pathway: 'Coding & Logic',
                pathwayColor:
                  'bg-purple-50 text-purple-700 border-purple-100',
                accent: 'from-purple-500 to-fuchsia-500',
                sessions: '3 sessions · 1 hr each',
                difficulty: 'Beginner',
                summary:
                  'Build playable mini-games while learning variables, events, and game logic.',
                topics: [
                  'Variables',
                  'Events',
                  'IF statements',
                  'Functions',
                ],
                detailsUrl:
                  'https://docs.fundedyouth.org/courses/cde1-sprite-lab-coding/',
              },
            ].map((c) => (
              <article
                key={c.code}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* Accent bar */}
                <div
                  className={`h-1.5 bg-gradient-to-r ${c.accent}`}
                />
                <div className="flex flex-1 flex-col p-5">
                  {/* Header row */}
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

                  {/* Topics */}
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

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
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
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile browse all */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/learn#courses"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900"
            >
              Browse all courses
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
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         SECTION 7 — STUDENT PROJECTS
         "Students actually build things here." Bento gallery.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gray-50 py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
              Student Projects
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Students actually build things here
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              3D prints, CAD models, working code, robotics rigs — every
              course ends with a real project.
            </p>
          </div>

          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
            {[
              {
                src: 'https://ps-cdn.fundedyouth.org/assets/images/3Kids-Looking-at-3D-Pencil-Holding-Monster-1024x683.png',
                title: 'Pencil-Holding Monster',
                tag: '3D Printing',
                tagColor: 'bg-blue-600',
                span: 'col-span-2 row-span-2',
              },
              {
                src: 'https://ps-cdn.fundedyouth.org/assets/images/making-a-sword-video-cover.png',
                title: 'Mini-Dummy Sword',
                tag: 'MVP1-3 Project',
                tagColor: 'bg-orange-500',
                span: 'col-span-2 row-span-1 lg:col-span-2',
              },
              {
                src: 'https://ps-cdn.fundedyouth.org/assets/images/countdown-video-cover.png',
                title: 'Countdown Game',
                tag: 'Coding',
                tagColor: 'bg-purple-600',
                span: 'col-span-1 row-span-1',
              },
              {
                src: 'https://ps-cdn.fundedyouth.org/assets/images/rusteze-robotics-2025-26.png',
                title: 'Rusteze Robotics',
                tag: 'FTC Team',
                tagColor: 'bg-red-600',
                span: 'col-span-1 row-span-1',
              },
              {
                src: 'https://ps-cdn.fundedyouth.org/assets/images/tagline-bg-3dprinting.png',
                title: 'Print Farm in Action',
                tag: 'Makerspace',
                tagColor: 'bg-cyan-600',
                span: 'col-span-2 row-span-1 lg:col-span-2',
              },
              {
                src: 'https://ps-cdn.fundedyouth.org/assets/images/stem-classroom-v2.png',
                title: 'STEAM Lab',
                tag: 'In Class',
                tagColor: 'bg-teal-600',
                span: 'col-span-2 row-span-1 lg:col-span-2',
              },
            ].map((p) => (
              <figure
                key={p.title}
                className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${p.span}`}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
                  <p className="text-sm font-bold text-white drop-shadow-md sm:text-base">
                    {p.title}
                  </p>
                  <span
                    className={`inline-flex shrink-0 rounded-full ${p.tagColor} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm`}
                  >
                    {p.tag}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         SECTION 8 — FOR SCHOOLS & BOOTCAMPS
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-24 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl"
        />
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-teal-500/20 to-blue-500/10 blur-2xl"
                />
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
                  <img
                    src="https://ps-cdn.fundedyouth.org/assets/images/tagline-bg-classroom.png"
                    alt="FundedYouth instructor leading a classroom workshop"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Copy + features */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700">
                For Schools & Bootcamps
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Bring FundedYouth to your school
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We partner with schools, after-school programs, and community
                organizations to deliver real STEAM education — without
                burdening your teachers.
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'After-school programs',
                  'STEAM partnerships',
                  'Classroom integration',
                  'Mobile workshops',
                  'Teacher support',
                  'Bootcamps',
                  'Certification tracks',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                      <svg
                        className="h-3.5 w-3.5"
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
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/teachers"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700"
                >
                  Partner With Us
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
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 transition-colors hover:border-teal-600 hover:text-teal-700"
                >
                  Talk to our team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS_START — hidden until real quotes are supplied.
          See public-site/CONTENT-TODOS.md for enable + swap instructions. */}
      {/*
      <section className="relative bg-gradient-to-b from-white to-blue-50 py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Stories
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Hear from our community
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Real quotes from students, parents, and teachers across San
              Diego County.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                // SAMPLE — replace with a real student testimonial
                quote:
                  "I came in not knowing what a slicer was. Two classes later I had a printed Pencil Holding Monster sitting on my desk. The instructors actually let you mess things up and learn from it.",
                name: "Maya R.",
                role: "Grade 7 student",
                context: "3DP1 graduate",
                accent: "from-blue-500 to-cyan-500",
              },
              {
                // SAMPLE — replace with a real parent testimonial
                quote:
                  "Signing up two kids on one email took five minutes thanks to the +trick. The portal is secure and COPPA-compliant, which mattered to me. My kids actually look forward to going.",
                name: "Jen K.",
                role: "Parent of two",
                context: "Vista, CA",
                accent: "from-orange-400 to-amber-500",
              },
              {
                // SAMPLE — replace with a real educator testimonial
                quote:
                  "FundedYouth filled a gap in our STEAM offerings without burdening our teachers. They handle the instruction, the certifications, and the equipment. We just bring the students.",
                name: "Mr. Alvarez",
                role: "Middle-school STEAM lead",
                context: "Local school partner",
                accent: "from-emerald-500 to-teal-500",
              },
            ].map((t) => (
              <article
                key={t.name}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.accent}`} />
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
                    {t.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-600">
                      {t.role}
                      {t.context ? ` · ${t.context}` : ""}
                    </p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
      */}
      {/* TESTIMONIALS_END */}

      {/* ─────────────────────────────────────────────────────────────
         SECTION 9 — FINAL CTA
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 py-20 sm:py-24">
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
        />

        <div className="container relative mx-auto max-w-5xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Enrollment Open
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Start Your Learning Journey Today
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100 sm:text-xl">
            Four steps stand between you and your first project. Let&apos;s
            build something.
          </p>

          {/* Steps row */}
          <ol className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 text-left sm:grid-cols-4">
            {[
              'Buy FYBITS',
              'Activate Membership (10 FYBITS/mo)',
              'Join a Course',
              'Register for a Session',
            ].map((label, i) => (
              <li
                key={label}
                className="flex flex-col gap-2 rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-gray-900 shadow">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-white">
                  {label}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://portal.fundedyouth.org"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-bold text-blue-700 shadow-xl shadow-black/20 transition-all hover:bg-blue-50"
            >
              Register on the Portal
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <span className="text-sm text-blue-200">
              Free to create an account
            </span>
          </div>
        </div>
      </section>

      <VideoPlayer
        videoUrl={activeVideo.videoUrl}
        isOpen={walkthroughOpen}
        onClose={() => setWalkthroughOpen(false)}
      />
    </>
  )
}
