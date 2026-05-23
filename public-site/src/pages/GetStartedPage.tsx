import { useSeo } from "../lib/useSeo";

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Create Your Account",
    description:
      "Sign up with your name, email, grade, and password. Pick a username or let us make one for you. If you are under 13, use a parent or guardian's email and add an emergency contact phone number.",
    image:
      "https://cdn.fundedyouth.org/public-site/user-portal-simple-sign-up-form-coppa-compliant.png",
    imageAlt: "user portal simple sign up form",
  },
  {
    title: "Verify Your Email",
    description:
      "Check your inbox for an email from us. Click the link inside to turn on your account.",
    image:
      "https://cdn.fundedyouth.org/public-site/user-portal-email-confirmation-v2.png",
    imageAlt: "user portal confirm email",
  },
  {
    title: "Parental Consent",
    description:
      "If you are under 13, your parent or guardian will get an extra email. They must click the link to turn on your account. This keeps you safe and follows COPPA rules.",
    image:
      "https://cdn.fundedyouth.org/public-site/user-portal-email-parental-consent-v2.png",
    imageAlt: "email parental consent for user under 13 years of age",
  },
  {
    title: "Sign in and Sign Portal Agreements",
    description:
      "After you log in, you will see the Agreements Menu. Click the `Available` tab, then read and sign the agreements. A few are required to use the portal. If you are under 13, both you and your parent or guardian must sign each one. Only sign the agreements for the services you plan to use.",
    image: "https://cdn.fundedyouth.org/public-site/user-portal-read-review-and-sign-agreements-v1.png",
    imageAlt: "Sign Agreements to Use Portal Features"
  },
  {
    title: "Fybit Credits + Subscription & Credit Plan Agreement",
    description:
      "Sign the `Subscription & Credit Plan Agreement`. Then buy Fybit Credits under `Credit Packs`. Credits are used for classes, registrations, memberships, and more.",
    image: "https://cdn.fundedyouth.org/public-site/user-portal-subscription-purchase-credits-v1.png",
    imageAlt: "Fybit Credits are used for everything",
  },
  {
    title: "Become a Member",
    description:
      "Go to Subscriptions → Plans and subscribe to the Basic Membership with your credits. Some memberships come with free add-ons. You need an active membership to spend credits on anything besides memberships.",
    image: "https://cdn.fundedyouth.org/public-site/user-portal-membership-plan-v1.png",
    imageAlt: "Subscribe to Basic Membershp",
  },
  {
    title: "Enroll as a Student",
    description:
      "Sign the student agreement, then go to Student → My Courses → Browse. Pick a class, course, or workshop and click `Enroll`. Some events need prerequisites first. Your event will be added to `My Courses`, where you can track your progress.",
    image:
      "https://cdn.fundedyouth.org/public-site/user-portal-enroll-in-an-event-v1.png",
    imageAlt: "Enroll in an Event",
  },
  {
    title: "Register for a Session",
    description:
      "Open Sessions in the sidebar and pick a class, bootcamp, or workshop. Spend credits to save your spot. Read the cancellation notice — if you cancel late, you may lose your credits. Read the description too. Some classes are split into parts, and the instructor may only cover lessons 1 and 2.",
    image:
      "https://cdn.fundedyouth.org/public-site/user-portal-register-for-session-v1.png",
    imageAlt: "Regiser for session",
  },
  {
    title: "Attending a Session",
    description:
      "To move forward in a class, attend the session and finish your assignments. An instructor will then update your account. This is done by hand, so it can take about a day to reflect in the portal.",
    image:
      "https://cdn.fundedyouth.org/public-site/user-portal-instructor-assinging-passing-grade-v1.png",
    imageAlt: "Instructor assigning a passing grade for student",
  },
];

const GET_STARTED_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://fundedyouth.org/get-started#webpage",
      url: "https://fundedyouth.org/get-started",
      name: "Get Started with FundedYouth — Portal Setup Guide",
      description:
        "A step-by-step walkthrough for creating a portal account, activating membership, and registering for your first FundedYouth class. Includes a guide for parents signing up multiple kids.",
      isPartOf: { "@id": "https://fundedyouth.org/#website" },
    },
    {
      "@type": "HowTo",
      name: "How to Get Started with FundedYouth",
      description:
        "Create your portal account, activate a Basic Membership, and register for your first hands-on STEAM class.",
      step: onboardingSteps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.description,
        ...(step.image ? { image: step.image } : {}),
      })),
    },
  ],
};

export function GetStartedPage() {
  useSeo({
    title: "Get Started with FundedYouth — Portal Setup Guide",
    description:
      "A step-by-step walkthrough for creating a portal account, activating membership, and registering for your first FundedYouth class. Includes a guide for parents signing up multiple kids.",
    url: "https://fundedyouth.org/get-started",
    schema: GET_STARTED_SCHEMA,
  });
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 md:py-20">
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
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Setup Guide
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Get Started with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              FundedYouth
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 sm:text-xl">
            A walkthrough for creating your portal account, activating
            membership, and registering for your first class. Plus a tip for
            parents signing up more than one kid.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://portal.fundedyouth.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700"
            >
              Go to Portal
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#parent-guide"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600"
            >
              Parents: sign up multiple kids
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* How to Get Started — vertical step-by-step flow */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-3">
              Getting Started
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How to Begin Your Journey
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A step-by-step guide to set up your account, pick a membership,
              and register for your first session.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-500 to-emerald-500"></div>

            <ol className="space-y-8 md:space-y-12">
              {onboardingSteps.map((step, idx) => (
                <li key={step.title} className="relative flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 text-white font-bold text-xl md:text-2xl flex items-center justify-center shadow-lg ring-4 ring-white relative z-10">
                    {idx + 1}
                  </div>

                  <div className="flex-grow bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-5">{step.description}</p>

                    {/* Parent tip: surfaced inline at account creation */}
                    {idx === 0 && (
                      <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-5.13a4 4 0 11-8 0 4 4 0 018 0zm6 3a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-bold text-blue-900">
                              Parent signing up more than one child?
                            </p>
                            <p className="mt-1 text-sm text-blue-800">
                              You can register all your kids using one email inbox — no extra accounts to manage.
                            </p>
                            <a
                              href="#parent-guide"
                              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900"
                            >
                              See the +trick
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.image ? (
                      <img
                        src={step.image}
                        alt={step.imageAlt || `${step.title} screenshot`}
                        className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
                      />
                    ) : (
                      <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-300">
                        <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-medium uppercase tracking-wider">
                          Screenshot placeholder
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="text-center mt-12 md:mt-16">
            <a
              href="https://portal.fundedyouth.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-2xl transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started in the Portal
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Parent Guide — Two Kids, One Email */}
      <section
        id="parent-guide"
        className="scroll-mt-24 bg-gradient-to-b from-white to-blue-50 py-16 md:py-24"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3">
              For Parents
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              One Inbox, Multiple Kids
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Sign up more than one child on FundedYouth using a single email
              inbox — no extra accounts to manage, no juggling.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 text-white shadow-xl mb-8">
            <div aria-hidden="true" className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden="true" className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-400/15 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                The +Trick
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold">
                Add a &ldquo;+name&rdquo; to your email
              </h3>
              <p className="mt-3 max-w-2xl text-blue-100">
                Most email providers ignore everything between the{" "}
                <span className="font-mono font-bold text-white">+</span> and the{" "}
                <span className="font-mono font-bold text-white">@</span>. Messages
                still land in your real inbox — but the FundedYouth portal treats
                each variation as a completely separate account.
              </p>
              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {[
                  { label: "Your real inbox", email: "mom@gmail.com", tag: "Receives every message" },
                  { label: "Ada's account", email: "mom+ada@gmail.com", tag: "Separate portal account" },
                  { label: "Leo's account", email: "mom+leo@gmail.com", tag: "Separate portal account" },
                ].map((it) => (
                  <div key={it.email} className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">{it.label}</p>
                    <p className="mt-2 font-mono text-sm font-semibold break-all">{it.email}</p>
                    <p className="mt-1 text-xs text-blue-100">{it.tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Works with most email providers
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Gmail", "iCloud", "Outlook / Hotmail", "Yahoo", "Most school & work email"].map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
                  <svg className="h-3.5 w-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Step-by-step: signing up Ada and Leo
              </h3>
              <ol className="space-y-4">
                {[
                  {
                    title: "Sign up Ada first",
                    body: (
                      <>
                        Use email{" "}
                        <span className="font-mono bg-blue-50 px-1.5 py-0.5 rounded text-blue-700">
                          mom+ada@gmail.com
                        </span>{" "}
                        and pick a password just for Ada.
                      </>
                    ),
                  },
                  {
                    title: "Verify in your real inbox",
                    body: (
                      <>
                        Open <span className="font-mono">mom@gmail.com</span> and click the
                        verification link. If Ada is in grades K–7, also click the
                        &ldquo;Parental Consent Needed&rdquo; email.
                      </>
                    ),
                  },
                  {
                    title: "Log out, then sign up Leo",
                    body: (
                      <>
                        Repeat with{" "}
                        <span className="font-mono bg-blue-50 px-1.5 py-0.5 rounded text-blue-700">
                          mom+leo@gmail.com
                        </span>{" "}
                        and Leo&apos;s own password. Verify and consent the same way.
                      </>
                    ),
                  },
                ].map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="flex-grow text-sm text-gray-700">
                      <p className="font-semibold text-gray-900">{s.title}</p>
                      <p className="mt-1">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How each kid logs in later
              </h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <tr>
                      <th className="px-3 py-2">Child</th>
                      <th className="px-3 py-2">Login email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-3 py-2 font-medium text-gray-900">Ada</td>
                      <td className="px-3 py-2 font-mono text-gray-700 text-xs sm:text-sm break-all">
                        mom+ada@gmail.com
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-gray-900">Leo</td>
                      <td className="px-3 py-2 font-mono text-gray-700 text-xs sm:text-sm break-all">
                        mom+leo@gmail.com
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Each child has their own unique password. If a username was
                assigned at registration, they can use that instead of the email.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Formatting rules for the +suffix
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-bold text-green-700 mb-3 flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Good
                </p>
                <ul className="space-y-1.5 text-sm">
                  <li className="font-mono text-gray-700">+ada</li>
                  <li className="font-mono text-gray-700">+leo</li>
                  <li className="font-mono text-gray-700">+kid1</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                  Letters and numbers only. Each kid needs a unique suffix.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-red-700 mb-3 flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Avoid
                </p>
                <ul className="space-y-1.5 text-sm">
                  <li className="font-mono text-gray-700">+little ada</li>
                  <li className="font-mono text-gray-700">+ada!</li>
                  <li className="font-mono text-gray-700">Same suffix twice</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                  No spaces, no special symbols, no duplicates.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              If something goes wrong
            </h3>
            <div className="space-y-3">
              {[
                {
                  problem: "The site says this email is already taken",
                  answer:
                    "You likely used the same suffix for both kids. Change +ada to a different suffix like +leo or +kid2 for the second account.",
                },
                {
                  problem: "I didn't get the confirmation email",
                  answer:
                    "Check your Spam or Junk folder. Double-check spelling — make sure there are no spaces anywhere (e.g. mom+ada@gmail.com, not mom +ada@gmail.com).",
                },
                {
                  problem: "My email provider doesn't support the +trick",
                  answer:
                    "Most do, but a few small providers don't. If yours errors out, create a free secondary inbox (like Gmail) and use that for the second child.",
                },
              ].map(({ problem, answer }) => (
                <details key={problem} className="group border border-gray-200 rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-lg list-none">
                    <span>{problem}</span>
                    <svg className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-4 pb-4 text-sm text-gray-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-4">
              Quick cheat sheet
            </p>
            <ul className="space-y-3 text-gray-800">
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-sm font-semibold text-gray-700 sm:w-32 shrink-0">Your inbox:</span>
                <code className="font-mono bg-white border border-emerald-200 px-3 py-1.5 rounded text-sm break-all">
                  mom@gmail.com
                </code>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-sm font-semibold text-gray-700 sm:w-32 shrink-0">Kid 1 sign-up:</span>
                <code className="font-mono bg-white border border-emerald-200 px-3 py-1.5 rounded text-sm break-all">
                  mom+kidname1@gmail.com
                </code>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-sm font-semibold text-gray-700 sm:w-32 shrink-0">Kid 2 sign-up:</span>
                <code className="font-mono bg-white border border-emerald-200 px-3 py-1.5 rounded text-sm break-all">
                  mom+kidname2@gmail.com
                </code>
              </li>
            </ul>
            <div className="mt-5 flex items-start gap-2 rounded-lg bg-white/70 border border-emerald-200 px-4 py-3">
              <svg className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-emerald-900">
                One inbox to manage — separate, COPPA-safe accounts for each kid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-3">
            What&apos;s next
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Ready to learn?
          </h2>
          <p className="text-gray-600 mb-6">
            Once your account is set up, head to the portal to browse sessions
            and register for your first class.
          </p>
          <a
            href="https://portal.fundedyouth.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700"
          >
            Browse sessions in the Portal
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
