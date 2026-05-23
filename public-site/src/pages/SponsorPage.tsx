import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { PuzzleCaptcha } from "../components/PuzzleCaptcha";
import { useSeo } from "../lib/useSeo";

const PAGE_TITLE =
  "Corporate Sponsorship — FundedYouth | Sponsor STEAM Education";
const PAGE_DESC =
  "Become a FundedYouth corporate sponsor. Fund STEAM courses, support FIRST Tech Challenge and NASA Student Launch teams, and shape the next generation of engineers. 501(c)(3) — EIN 93-4090260.";
const PAGE_URL = "https://fundedyouth.org/sponsor";

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
      "@type": "DonateAction",
      name: "Corporate Sponsorship",
      description:
        "Annual corporate sponsorship tiers from $500 (Bronze) to $50,000+ (Diamond). Tax-deductible.",
      recipient: { "@id": "https://fundedyouth.org/#organization" },
    },
  ],
};

interface FormData {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  industry: string;
  sponsorshipLevel: string;
  interests: string[];
  message: string;
}

const initialFormData: FormData = {
  companyName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  jobTitle: "",
  industry: "",
  sponsorshipLevel: "",
  interests: [],
  message: "",
};

const industries = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance & Banking" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail & Consumer Goods" },
  { value: "energy", label: "Energy & Utilities" },
  { value: "real-estate", label: "Real Estate" },
  { value: "professional-services", label: "Professional Services" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "government", label: "Government" },
  { value: "other", label: "Other" },
];

const sponsorshipLevels = [
  { value: "bronze", label: "Bronze Partner ($500 - $2,499/year)" },
  { value: "silver", label: "Silver Partner ($2,500 - $9,999/year)" },
  { value: "gold", label: "Gold Partner ($10,000 - $24,999/year)" },
  { value: "platinum", label: "Platinum Partner ($25,000 - $49,999/year)" },
  { value: "diamond", label: "Diamond Partner ($50,000+/year)" },
  { value: "custom", label: "Custom Partnership" },
];

const interestOptions = [
  { value: "stem-programs", label: "STEM Programs" },
  { value: "mentorship", label: "Mentorship Programs" },
  { value: "scholarships", label: "Scholarships" },
  { value: "events", label: "Event Sponsorship" },
  { value: "equipment", label: "Equipment Donation" },
  { value: "volunteer", label: "Corporate Volunteering" },
];

interface TierCard {
  name: string;
  range: string;
  blurb: string;
  accent: string;
  pill: string;
  highlight?: boolean;
}

const tierCards: TierCard[] = [
  {
    name: "Bronze",
    range: "$500 – $2,499/yr",
    blurb: "Equip a small class or fund one cohort of student materials.",
    accent: "from-amber-700 to-orange-600",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    name: "Silver",
    range: "$2,500 – $9,999/yr",
    blurb: "Sponsor a quarter of the makerspace or a competition team season.",
    accent: "from-slate-500 to-slate-400",
    pill: "bg-slate-100 text-slate-700 border-slate-200",
  },
  {
    name: "Gold",
    range: "$10,000 – $24,999/yr",
    blurb: "Fund a full course track or large equipment purchase for student labs.",
    accent: "from-yellow-500 to-amber-400",
    pill: "bg-yellow-50 text-yellow-800 border-yellow-200",
    highlight: true,
  },
  {
    name: "Platinum",
    range: "$25,000 – $49,999/yr",
    blurb: "Underwrite a full FIRST Tech Challenge or NASA Student Launch season.",
    accent: "from-cyan-500 to-blue-500",
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    name: "Diamond",
    range: "$50,000+/yr",
    blurb: "Name a lab, fund a multi-year pathway, or launch a satellite makerspace.",
    accent: "from-purple-600 to-fuchsia-500",
    pill: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

interface Benefit {
  title: string;
  description: string;
  color: string;
  icon: ReactNode;
}

const benefits: Benefit[] = [
  {
    title: "Community Impact",
    description:
      "Directly fund underserved students learning real STEAM skills — every dollar reinvests into programs, not overhead.",
    color: "bg-blue-100 text-blue-700",
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
    title: "Brand Recognition",
    description:
      "Recognition at our events, on the makerspace, in marketing materials, and at competition team appearances.",
    color: "bg-orange-100 text-orange-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    ),
  },
  {
    title: "Engineering Talent Pipeline",
    description:
      "Connect with FIRST Tech Challenge and NASA Student Launch teams — meet the engineering interns and hires of tomorrow.",
    color: "bg-purple-100 text-purple-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-1.586a1 1 0 00-.707.293l-1.121 1.121A2 2 0 0114.172 19H9.828a2 2 0 01-1.414-.586l-1.121-1.121A1 1 0 006.586 17H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2"
      />
    ),
  },
  {
    title: "Tax Benefits",
    description:
      "As a 501(c)(3) nonprofit (EIN 93-4090260), your contributions are tax-deductible to the fullest extent of the law.",
    color: "bg-emerald-100 text-emerald-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
  },
];

export function SponsorPage() {
  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    schema: SCHEMA,
  });

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [honeypot, setHoneypot] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }));
  };

  const handleCaptchaVerified = (token: string) => {
    setCaptchaToken(token);
  };

  const handleCaptchaReset = () => {
    setCaptchaToken("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    if (!captchaToken) {
      setSubmitStatus({
        type: "error",
        message: "Please complete the puzzle verification.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "Thank you! Your application has been submitted. Our team will contact you soon.",
        });
        setFormData(initialFormData);
        setCaptchaToken("");
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message ||
            "There was an error submitting your application. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.companyName &&
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.jobTitle &&
    formData.industry &&
    formData.sponsorshipLevel &&
    captchaToken;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-blue-50 py-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(251,191,36,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 shadow-sm backdrop-blur">
            Partner With Us
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Fund the next generation of{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              engineers
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Corporate sponsorship powers our STEAM courses, equipment, and
            competition teams — and gives your company direct visibility with
            the engineering talent of tomorrow.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            501(c)(3) Tax-deductible · EIN{" "}
            <span className="font-mono">93-4090260</span>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              Sponsorship Tiers
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choose how to partner
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
              Five annual tiers plus a custom partnership option. All
              contributions are 501(c)(3) tax-deductible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {tierCards.map((t) => (
              <div
                key={t.name}
                className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  t.highlight
                    ? "border-yellow-300 ring-2 ring-yellow-200"
                    : "border-gray-200"
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-px right-4 inline-flex rounded-b-md bg-gradient-to-r from-yellow-500 to-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                    Most common
                  </span>
                )}
                <div className={`h-1.5 bg-gradient-to-r ${t.accent}`} />
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${t.pill}`}
                  >
                    {t.name}
                  </span>
                  <p className="mt-3 text-sm font-bold text-gray-900">
                    {t.range}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                    {t.blurb}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Need something different?{" "}
            <a
              href="#apply"
              className="font-semibold text-amber-700 hover:text-amber-800"
            >
              Select &quot;Custom Partnership&quot;
            </a>{" "}
            in the form below.
          </p>
        </div>
      </section>

      {/* Why partner */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Why Partner
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What sponsorship gets you
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg ${b.color}`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {b.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              Application
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Start a conversation
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Tell us about your company. Our team will follow up within a
              business day.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  placeholder="Acme Corporation"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
              </div>

              {/* First / Last */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  />
                </div>
              </div>

              {/* Email / Phone */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  />
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  required
                  placeholder="Director of Community Relations"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
              </div>

              {/* Industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                >
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sponsorship Level */}
              <div>
                <label
                  htmlFor="sponsorshipLevel"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Interested Sponsorship Level{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="sponsorshipLevel"
                  name="sponsorshipLevel"
                  required
                  value={formData.sponsorshipLevel}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                >
                  <option value="">Select a level</option>
                  {sponsorshipLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Areas of Interest{" "}
                  <span className="font-normal text-gray-400">
                    (select all that apply)
                  </span>
                </label>
                <div className="mt-2 grid gap-3 md:grid-cols-2">
                  {interestOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 transition-colors hover:bg-amber-50 hover:border-amber-200"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(option.value)}
                        onChange={() => handleInterestChange(option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your company's mission, why you're interested in partnering, or any specific ideas you have..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
              </div>

              {/* Captcha */}
              <PuzzleCaptcha
                onVerified={handleCaptchaVerified}
                onReset={handleCaptchaReset}
              />

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute left-[-5000px]">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Status */}
              {submitStatus.type && (
                <div
                  className={`rounded-lg p-4 text-sm ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Submit */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:from-amber-600 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                  {!isSubmitting && (
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
                  )}
                </button>
                <p className="mt-3 text-xs text-gray-500">
                  By submitting, you agree to our privacy policy and terms of
                  service.
                </p>
              </div>
            </form>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="text-gray-600">Want to talk first?</span>
            <Link
              to="/contact"
              className="font-semibold text-amber-700 hover:text-amber-800"
            >
              Contact us →
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              to="/impact"
              className="font-semibold text-amber-700 hover:text-amber-800"
            >
              See our impact →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
