import { useSearchParams } from "react-router-dom";

export function DonatePage() {
  const [searchParams] = useSearchParams();
  const canceled = searchParams.get("canceled");

  return (
    <main>
      {/* Canceled Payment Notice */}
      {canceled && (
        <div className="bg-amber-50 border-b border-amber-200 py-3 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-amber-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-sm font-medium">
              Payment was canceled. No charges were made. Feel free to try again when you're
              ready.
            </span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/3Kids-Looking-at-3D-Pencil-Holding-Monster-1024x683.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-900/85"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-lg">
            501(c)(3) Tax-Deductible
          </p>
          <div className="mb-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
              Sponsor a Child's
              <br />
              <span className="text-orange-400 inline-block mt-2">Future in Making</span>
            </h1>
          </div>
          <div className="mb-8">
            <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
              Your donation gives kids hands-on learning opportunities—following a
              single pathway, mixing multiple tracks, or exploring them all.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#monthly"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Giving Monthly
            </a>

          </div>
          <p className="text-white/90 text-sm mt-6 drop-shadow-md">
            <span className="text-orange-300 font-bold">Every dollar</span> goes directly to supporting a student's future
          </p>
        </div>
      </section>

      {/* What Donors Receive */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-2">
            What You'll Receive
          </p>
          <h3 className="text-center text-xl font-bold text-gray-900 mb-8">
            Stay Connected to Your Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Monthly Newsletter", subtitle: "Updates delivered to your inbox", color: "blue" },
              { title: "Progress Reports", subtitle: "See student growth and milestones", color: "orange" },
              { title: "Student Stories", subtitle: "Real impact and positive outcomes", color: "green" },
              { title: "School Partnerships", subtitle: "New connections in the community", color: "purple" },
              { title: "New Programs", subtitle: "Be first to know what's launching", color: "teal" },
              { title: "Programs in Development", subtitle: "Sneak peeks at what's coming next", color: "amber" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <svg className={`w-5 h-5 text-${item.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donor Tip: 100% Donation */}
      <section className="py-10 bg-blue-50 border-y border-blue-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0">
              <img
                src="/assets/images/zeffy-100-percent-donation.png"
                alt="Zeffy donation summary showing the 'Other' option to ensure 100% goes to FundedYouth"
                className="rounded-lg border border-gray-200 shadow-sm w-full md:w-64"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="size-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">
                  Want 100% of Your Donation to Go to FundedYouth?
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Our donation platform, Zeffy, is 100% free for nonprofits and
                funded by optional donor contributions. During checkout,
                you&apos;ll see a <strong>Summary</strong> section with a
                suggested contribution to Zeffy.
              </p>
              <p className="text-gray-800 text-sm font-medium">
                To ensure your <em>entire</em> donation goes to FundedYouth,
                select <strong>&ldquo;Other&rdquo;</strong> from the dropdown
                and enter <strong>$0</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donations Section */}
      <section id="monthly" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">
              Support FundedYouth
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ways to Give
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every gift — one-time or monthly — helps kids discover what they can create.
            </p>
          </div>

          {/* Shared Donor Benefits */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
            {["Listed on Donors Page", "Monthly Donors Newsletter", "Discounts on Services and Products"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm text-gray-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Square — One-Time */}
            <div className="order-3 md:order-1 border-2 border-gray-200 rounded-2xl p-7 hover:shadow-lg hover:border-gray-900 transition-all flex flex-col">
              <span className="inline-block self-start bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                One-Time
              </span>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.01 0A4.01 4.01 0 000 4.01v15.98A4.01 4.01 0 004.01 24h15.98A4.01 4.01 0 0024 19.99V4.01A4.01 4.01 0 0019.99 0H4.01zm3.12 7.13h9.74c.56 0 1.01.45 1.01 1.01v7.72c0 .56-.45 1.01-1.01 1.01H7.13c-.56 0-1.01-.45-1.01-1.01V8.14c0-.56.45-1.01 1.01-1.01zm2.63 2.63a.76.76 0 00-.75.75v2.98c0 .41.34.75.75.75h4.48c.41 0 .75-.34.75-.75v-2.98a.76.76 0 00-.75-.75H9.76z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Give via Square</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                Quick and easy — accepts credit cards, debit cards, Apple Pay, and Google Pay.
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://square.link/u/EIfgYtZA"
                className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Donate with Square
              </a>
            </div>

            {/* Zeffy — One-Time */}
            <div className="order-2 md:order-2 border-2 border-gray-200 rounded-2xl p-7 hover:shadow-lg hover:border-blue-500 transition-all flex flex-col">
              <span className="inline-block self-start bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                One-Time
              </span>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Give via Zeffy</h3>
              </div>
              <p className="text-gray-600 text-sm mb-1 flex-grow">
                100% of your donation goes to FundedYouth — Zeffy charges no platform fees.
              </p>
              <p className="text-blue-600 text-xs font-medium mb-6">
                Tip: Select "Other" and enter $0 at checkout
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.zeffy.com/en-US/donation-form/one-time-donation-33"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Donate with Zeffy
              </a>
            </div>

            {/* Zeffy — Monthly */}
            <div className="order-1 md:order-3 border-2 border-orange-300 rounded-2xl p-7 bg-orange-50 hover:shadow-lg hover:border-orange-400 transition-all flex flex-col relative">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Monthly
                </span>
                <span className="text-orange-600 text-xs font-semibold">Recommended</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Monthly via Zeffy</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                Choose any amount. Small monthly gifts create big, lasting impact. 100% goes to FundedYouth.
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.zeffy.com/en-US/donation-form/sponsor-a-student-22"
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Giving Monthly
              </a>
              <p className="text-gray-500 text-xs mt-3 text-center">Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/images/classroom-tutoring-v1.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-blue-800/90"></div>

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Be the Reason a Child Discovers
            <br />
            What They Can Create
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto drop-shadow-md">
            Your support gives a child hands-on time to learn, create, and
            grow — building skills that last a lifetime.
          </p>
          <a
            href="#monthly"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-lg"
          >
            Support a Child Today
          </a>
        </div>
      </section>

      {/* Questions Section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions About Donating?</h3>
          <p className="text-gray-600 text-sm mb-4">We're here to help. Reach out anytime.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <span className="inline-flex items-center">
              <img
                src="/assets/images/email-donate.svg"
                alt="Email donate"
                className="h-5"
              />
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <a href="tel:+16197285002" className="text-blue-600 hover:text-blue-700 font-medium">
              (619) 728-5002
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
