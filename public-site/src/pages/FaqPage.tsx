import { useMemo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/useSeo";

interface FaqItem {
  q: string;
  /** Rich-text answer shown on the page (can include links/JSX). */
  answer: ReactNode;
  /** Plain-text version used in the FAQPage JSON-LD schema. */
  plain: string;
}

interface FaqGroup {
  title: string;
  items: FaqItem[];
}

const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "About the Platform",
    items: [
      {
        q: "What are FYBITS?",
        answer: (
          <>
            FYBITS are in-house learning credits that power everything on the
            FundedYouth platform. You buy them in packs on the{" "}
            <a
              href="https://portal.fundedyouth.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              portal
            </a>{" "}
            and spend them on the monthly membership (10 FYBITS/mo), courses,
            sessions, lab time, and optional add-ons.{" "}
            <strong>An active Basic Membership is required to spend FYBITS</strong>{" "}
            — without one, your credits stay in your wallet but are inactive.
            FYBITS are non-refundable and can&apos;t be exchanged for cash or
            real currency.
          </>
        ),
        plain:
          "FYBITS are in-house learning credits that power everything on the FundedYouth platform. You buy them in packs on the portal and spend them on the monthly membership (10 FYBITS/month), courses, sessions, lab time, and optional add-ons. An active Basic Membership is required to spend FYBITS — without one, your credits stay in your wallet but are inactive. FYBITS are non-refundable and cannot be exchanged for cash or real currency.",
      },
      {
        q: "How do memberships work?",
        answer: (
          <>
            Basic Membership costs <strong>10 FYBITS per month</strong> and
            unlocks 4 free intro courses (3DP1, 3DP2, 3DM1, CDE1), included
            printer access (Sovol at 1 credit/hour, Bambu at 2 credits/hour),
            and the ability to subscribe to optional add-ons like a filament
            discount. Cancel anytime — your remaining credits stay in your
            wallet, but they&apos;ll be inactive until you reactivate the
            membership.
          </>
        ),
        plain:
          "Basic Membership costs 10 FYBITS per month and unlocks 4 free intro courses (3DP1, 3DP2, 3DM1, CDE1), included printer access (Sovol at 1 credit/hour, Bambu at 2 credits/hour), and optional add-ons like filament discounts. Cancel anytime — your remaining credits stay in your wallet, but they're inactive until you reactivate the membership.",
      },
      {
        q: "What happens to my FYBITS if my membership ends?",
        answer: (
          <>
            Your FYBITS <strong>don&apos;t expire</strong> — they stay in your
            wallet. But without an active Basic Membership, the credits are{" "}
            <strong>inactive</strong>: you can&apos;t spend them on courses,
            sessions, lab time, or add-ons.{" "}
            <a
              href="https://portal.fundedyouth.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Reactivate the membership
            </a>{" "}
            any time and your FYBITS go right back to work.
          </>
        ),
        plain:
          "Your FYBITS don't expire — they stay in your wallet. But without an active Basic Membership, the credits are inactive: you can't spend them on courses, sessions, lab time, or add-ons. Reactivate the membership at any time and your FYBITS go right back to work.",
      },
      {
        q: "What age groups can join?",
        answer: (
          <>
            FundedYouth welcomes students from elementary through high school.
            Students under 13 need parental consent — we&apos;re COPPA
            compliant, and the parent or guardian receives a separate email to
            approve the account. Parents signing up more than one child can use
            the{" "}
            <a
              href="https://portal.fundedyouth.org/#/watch-and-learn"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              +trick
            </a>{" "}
            to register multiple kids under a single inbox.
          </>
        ),
        plain:
          "FundedYouth welcomes students from elementary through high school. Students under 13 need parental consent — we're COPPA compliant, and the parent or guardian receives a separate email to approve the account. Parents can use email +addressing to register multiple kids under one inbox (e.g. mom+ada@gmail.com and mom+leo@gmail.com).",
      },
    ],
  },
  {
    title: "Classes & Learning",
    items: [
      {
        q: "Are classes beginner friendly?",
        answer: (
          <>
            Yes. All Level 1 courses — 3DP1, 3DP2, 3DM1, CDE1 — are designed
            for absolute beginners. No prior experience required.{" "}
            <Link
              to="/learn#pathways"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Pathways
            </Link>{" "}
            then sequence you into more advanced material as you complete
            prerequisites.
          </>
        ),
        plain:
          "Yes. All Level 1 courses (3DP1, 3DP2, 3DM1, CDE1) are designed for absolute beginners — no prior experience required. Pathways sequence learners into more advanced material as they complete prerequisites.",
      },
      {
        q: "How do course prerequisites work?",
        answer: (
          <>
            Some advanced courses require completing an earlier course first.
            Pathways visually show the sequence — for example, the{" "}
            <Link
              to="/learn#pathways"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              3D Printer Pro
            </Link>{" "}
            pathway runs 3DP1 → 3DP2 → Advanced Slicing → Print Farm Ops.
            Locked courses show a lock icon and can&apos;t be enrolled in until
            the prerequisite is complete.
          </>
        ),
        plain:
          "Some advanced courses require completing an earlier course first. Pathways visually show the sequence — for example, the 3D Printer Pro pathway runs 3DP1 → 3DP2 → Advanced Slicing → Print Farm Ops. Locked courses display a lock icon and can't be enrolled in until prerequisites are met.",
      },
      {
        q: "What software do students learn?",
        answer: (
          <>
            Software varies by course: <strong>Ultimaker Cura</strong> for
            slicing (3DP1), <strong>Bambu Studio + MakerWorld</strong> (3DP2),{" "}
            <strong>Autodesk TinkerCAD</strong> for 3D modeling (3DM1), and{" "}
            <strong>Sprite Lab from Code.org</strong> for game coding (CDE1).
            Most of it runs in the browser or on lab computers — no installs
            required.
          </>
        ),
        plain:
          "Software varies by course: Ultimaker Cura for slicing (3DP1), Bambu Studio with MakerWorld (3DP2), Autodesk TinkerCAD for 3D modeling (3DM1), and Sprite Lab from Code.org for game coding (CDE1). Most software runs in the browser or on lab computers — no installs required.",
      },
      {
        q: "What equipment is used?",
        answer: (
          <>
            Our makerspace is equipped with{" "}
            <strong>Sovol FDM printers</strong>, <strong>Bambu printers</strong>{" "}
            (including multi-material), CAD workstations, coding computers,
            and basic electronics tools. Members get reduced rates on printer
            time — <strong>Sovol at 1 credit/hour</strong> and{" "}
            <strong>Bambu at 2 credits/hour</strong> (non-members pay $3/hour).
          </>
        ),
        plain:
          "Our makerspace is equipped with Sovol FDM 3D printers, Bambu printers (including multi-material), CAD workstations, coding computers, and basic electronics tools. Members get reduced rates on printer time: Sovol at 1 credit/hour and Bambu at 2 credits/hour, versus $3/hour for non-members.",
      },
    ],
  },
  {
    title: "Format & Partnerships",
    items: [
      {
        q: "Is this online or in-person?",
        answer: (
          <>
            Classes are <strong>in-person</strong> at our makerspace in San
            Diego County. Some lessons include online supporting materials, but
            the hands-on instruction and lab time happen on-site so students
            can use the equipment and get direct help from instructors.{" "}
            <Link
              to="/schedule"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              See the schedule
            </Link>
            .
          </>
        ),
        plain:
          "Classes are in-person at our makerspace in San Diego County. Some lessons include online supporting materials, but the hands-on instruction and lab time happen on-site so students can use the equipment and get direct help from instructors.",
      },
      {
        q: "Can schools partner with FundedYouth?",
        answer: (
          <>
            Yes — we offer after-school programs, STEAM partnerships,
            classroom integration, mobile workshops, teacher support,
            bootcamps, and certification tracks. Reach out via the{" "}
            <Link
              to="/teachers"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              For Schools
            </Link>{" "}
            page to start a conversation.
          </>
        ),
        plain:
          "Yes. FundedYouth offers after-school programs, STEAM partnerships, classroom integration, mobile workshops, teacher support, bootcamps, and certification tracks. Schools can reach out via the For Schools or Contact page to start a partnership.",
      },
    ],
  },
];

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const PAGE_TITLE =
  "FAQs — FundedYouth | FYBITS, Memberships, Classes & Schools";
const PAGE_DESC =
  "Answers about FYBITS credits, Basic Membership, beginner courses, software, equipment, and school partnerships at FundedYouth in San Diego County.";
const OG_IMAGE =
  "https://ps-cdn.fundedyouth.org/assets/images/stem-classroom-v2.png";
const PAGE_URL = "https://fundedyouth.org/faq";

export function FaqPage() {
  const schema = useMemo(() => {
    const allItems = FAQ_GROUPS.flatMap((g) => g.items);
    return {
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
          "@type": "FAQPage",
          mainEntity: allItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.plain },
          })),
        },
      ],
    };
  }, []);

  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    image: OG_IMAGE,
    schema,
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
            Help &amp; FAQs
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Helpful answers for students, parents, and schools — about FYBITS,
            memberships, classes, and how to get started.
          </p>
        </div>
      </section>

      {/* FAQ Groups */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 space-y-12">
          {FAQ_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-700">
                {group.title}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => {
                  const id = slug(item.q);
                  return (
                    <details
                      key={id}
                      id={id}
                      className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md open:shadow-md"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-5 py-4 text-base font-semibold text-gray-900 hover:bg-gray-50 list-none">
                        <span>{item.q}</span>
                        <svg
                          className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 text-sm leading-relaxed text-gray-700">
                        {item.answer}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still need help */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Still have questions?
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              We&apos;re happy to help
            </h2>
            <p className="mt-2 text-gray-600">
              Reach out, walk through the setup guide, or open the portal to
              get started.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
              >
                Contact us
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
              <a
                href="https://portal.fundedyouth.org/#/watch-and-learn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                Setup guide
              </a>
              <a
                href="https://portal.fundedyouth.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                Open Portal
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
