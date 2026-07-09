import { useEffect, useMemo, useState } from "react";
import { useSeo } from "../lib/useSeo";

interface SessionEvent {
  id: string;
  name: string;
  description: string;
  type: "class" | "workshop" | "bootcamp" | "event";
  status: "scheduled" | "cancelled";
  category?: { name: string; color: string };
  eventCode?: string;
  startTime: string;
  endTime: string;
  location: string;
  instructorName: string;
  capacity: number;
  spotsRemaining: number;
  requiresMembership: boolean;
  registerUrl: string;
  updatedAt: string;
}

interface SessionsFeed {
  generatedAt: string;
  count: number;
  events: SessionEvent[];
}

const FEED_URL = "/api/calendar/sessions.json";
const ICS_URL = "https://cdn.fundedyouth.org/feeds/calendar/sessions.ics";

type ViewMode = "calendar" | "list";
type TypeFilter = "all" | "class" | "workshop" | "bootcamp" | "event";

function categoryBadgeStyle(color: string): React.CSSProperties {
  // 8-char hex appends RGBA alpha (supported in all modern browsers)
  return {
    backgroundColor: `${color}1A`,
    borderColor: `${color}66`,
  };
}

// Strip a leading "(EVENTCODE) " prefix from a name when we display the
// eventCode separately, to avoid showing the same code twice.
function stripCodePrefix(name: string, code: string | undefined): string {
  if (!code) return name;
  const prefix = `(${code})`;
  return name.startsWith(prefix) ? name.slice(prefix.length).trim() : name;
}

function formatDuration(startIso: string, endIso: string): string {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  return Number.isInteger(hours)
    ? `${hours} hr${hours === 1 ? "" : "s"}`
    : `${hours.toFixed(1)} hrs`;
}

interface TypeStyle {
  dot: string;
  chipBg: string;
  chipText: string;
  chipHover: string;
  badge: string;
  legend: string;
}

const TYPE_STYLES: Record<SessionEvent["type"], TypeStyle> = {
  class: {
    dot: "bg-blue-500",
    chipBg: "bg-blue-50",
    chipText: "text-blue-900",
    chipHover: "hover:bg-blue-100",
    badge: "bg-blue-100 text-blue-700",
    legend: "bg-blue-500",
  },
  workshop: {
    dot: "bg-orange-500",
    chipBg: "bg-orange-50",
    chipText: "text-orange-900",
    chipHover: "hover:bg-orange-100",
    badge: "bg-orange-100 text-orange-700",
    legend: "bg-orange-500",
  },
  bootcamp: {
    dot: "bg-purple-500",
    chipBg: "bg-purple-50",
    chipText: "text-purple-900",
    chipHover: "hover:bg-purple-100",
    badge: "bg-purple-100 text-purple-700",
    legend: "bg-purple-500",
  },
  event: {
    dot: "bg-emerald-500",
    chipBg: "bg-emerald-50",
    chipText: "text-emerald-900",
    chipHover: "hover:bg-emerald-100",
    badge: "bg-emerald-100 text-emerald-700",
    legend: "bg-emerald-500",
  },
};

const CANCELLED_STYLE: TypeStyle = {
  dot: "bg-red-500",
  chipBg: "bg-red-50",
  chipText: "text-red-900 line-through",
  chipHover: "hover:bg-red-100",
  badge: "bg-red-100 text-red-700",
  legend: "bg-red-500",
};

function getStyle(event: SessionEvent): TypeStyle {
  if (event.status === "cancelled") return CANCELLED_STYLE;
  return TYPE_STYLES[event.type] ?? TYPE_STYLES.class;
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return dateKey(a) === dateKey(b);
}

function formatChipTime(iso: string): string {
  const d = new Date(iso);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return m === 0
    ? `${h} ${ampm}`
    : `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

function formatLongDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeRange(startIso: string, endIso: string): string {
  return `${formatChipTime(startIso)} – ${formatChipTime(endIso)}`;
}

function getCalendarGrid(monthDate: Date): Date[][] {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + w * 7 + d);
      week.push(date);
    }
    weeks.push(week);
  }
  return weeks;
}

const WEEKDAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function EventDetailModal({
  event,
  onClose,
}: {
  event: SessionEvent;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const s = getStyle(event);
  const isFull = event.spotsRemaining <= 0;
  const isCancelled = event.status === "cancelled";
  const displayName = stripCodePrefix(event.name, event.eventCode);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 pr-8">
            <span
              className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.badge}`}
            >
              {event.type}
            </span>
            {event.category && (
              <span
                className="inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-800"
                style={categoryBadgeStyle(event.category.color)}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: event.category.color }}
                />
                {event.category.name}
              </span>
            )}
            {isCancelled && (
              <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                Cancelled
              </span>
            )}
          </div>

          <h2
            id="event-modal-title"
            className={`mt-3 text-xl font-bold leading-tight ${
              isCancelled ? "text-gray-500 line-through" : "text-gray-900"
            }`}
          >
            {event.eventCode && (
              <span className="mr-2 inline-block rounded bg-gray-100 px-1.5 py-0.5 align-middle font-mono text-xs font-semibold text-gray-700">
                {event.eventCode}
              </span>
            )}
            {displayName}
          </h2>

          {event.description && (
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {event.description}
            </p>
          )}

          <dl className="mt-4 space-y-2.5 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 shrink-0 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatLongDate(event.startTime)}
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 shrink-0 text-gray-400"
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
              {formatTimeRange(event.startTime, event.endTime)}
              <span className="text-gray-400">
                · {formatDuration(event.startTime, event.endTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 shrink-0 text-gray-400"
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
              {event.location}
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 shrink-0 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {event.instructorName}
            </div>
            <div
              className={`flex items-center gap-2 ${isFull ? "text-red-600" : ""}`}
            >
              <svg
                className="h-4 w-4 shrink-0 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-5.13a4 4 0 11-8 0 4 4 0 018 0zm6 3a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {isFull
                ? "Full"
                : `${event.spotsRemaining} spot${
                    event.spotsRemaining === 1 ? "" : "s"
                  } left`}
            </div>
          </dl>

          {event.requiresMembership && (
            <p className="mt-3 text-xs font-medium text-blue-700">
              Active membership required
            </p>
          )}

          <a
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold shadow-md transition-colors ${
              isCancelled || isFull
                ? "pointer-events-none bg-gray-200 text-gray-500"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            aria-disabled={isCancelled || isFull}
          >
            {isCancelled
              ? "Cancelled"
              : isFull
              ? "Full"
              : "Register on Portal"}
            {!isCancelled && !isFull && (
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
          </a>
        </div>
      </div>
    </div>
  );
}

export function SchedulePage() {
  const [feed, setFeed] = useState<SessionsFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("calendar");
  const [selectedEvent, setSelectedEvent] = useState<SessionEvent | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(FEED_URL);
        if (!res.ok) throw new Error(`Feed returned ${res.status}`);
        const data = (await res.json()) as SessionsFeed;
        if (!cancelled) setFeed(data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load sessions");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // SEO + JSON-LD Event schema (driven by feed)
  const scheduleSchema = useMemo(() => {
    if (!feed) return null;
    const PAGE_URL = "https://fundedyouth.org/schedule";
    const PAGE_TITLE =
      "Schedule — FundedYouth | Upcoming STEAM Classes & Workshops in San Diego";
    const PAGE_DESC =
      "Browse upcoming STEAM classes, workshops, and bootcamps at FundedYouth. 3D printing, CAD design, coding, and more for students in San Diego County.";
    const now = Date.now();
    const upcoming = feed.events.filter(
      (e) =>
        new Date(e.endTime).getTime() >= now && e.status === "scheduled"
    );
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
          "@type": "ItemList",
          name: "Upcoming FundedYouth STEAM Sessions",
          description: PAGE_DESC,
          numberOfItems: upcoming.length,
          itemListElement: upcoming.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Event",
              name: e.name,
              description: e.description,
              identifier: e.eventCode,
              startDate: e.startTime,
              endDate: e.endTime,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              eventCategory: e.category?.name,
              location: {
                "@type": "Place",
                name: e.location,
                address: {
                  "@type": "PostalAddress",
                  addressRegion: "CA",
                  addressCountry: "US",
                },
              },
              organizer: { "@id": "https://fundedyouth.org/#organization" },
              performer: { "@type": "Person", name: e.instructorName },
              offers: {
                "@type": "Offer",
                url: e.registerUrl,
                availability:
                  e.spotsRemaining > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/SoldOut",
              },
            },
          })),
        },
      ],
    };
  }, [feed]);

  useSeo({
    title:
      "Schedule — FundedYouth | Upcoming STEAM Classes & Workshops in San Diego",
    description:
      "Browse upcoming STEAM classes, workshops, and bootcamps at FundedYouth. 3D printing, CAD design, coding, and more for students in San Diego County.",
    url: "https://fundedyouth.org/schedule",
    schema: scheduleSchema ?? undefined,
  });

  // Categories discovered from the feed (name + server-driven color)
  const presentCategories = useMemo<Array<{ name: string; color: string }>>(() => {
    if (!feed) return [];
    const seen = new Map<string, string>();
    for (const e of feed.events) {
      if (e.category && !seen.has(e.category.name)) {
        seen.set(e.category.name, e.category.color);
      }
    }
    return Array.from(seen, ([name, color]) => ({ name, color }));
  }, [feed]);

  const filtered = useMemo<SessionEvent[]>(() => {
    if (!feed) return [];
    const q = search.trim().toLowerCase();
    return feed.events.filter((e) => {
      if (typeFilter !== "all" && e.type !== typeFilter) return false;
      if (categoryFilter !== "all" && e.category?.name !== categoryFilter)
        return false;
      if (q) {
        const hay = `${e.name} ${e.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [feed, search, typeFilter, categoryFilter]);

  const eventsByDay = useMemo<Map<string, SessionEvent[]>>(() => {
    const map = new Map<string, SessionEvent[]>();
    for (const event of filtered) {
      const d = new Date(event.startTime);
      const key = dateKey(d);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(event);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [filtered]);

  const upcomingList = useMemo<SessionEvent[]>(() => {
    const now = Date.now();
    return [...filtered]
      .filter((e) => new Date(e.endTime).getTime() >= now)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [filtered]);

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const calendarGrid = useMemo(
    () => getCalendarGrid(currentMonth),
    [currentMonth]
  );
  const today = new Date();
  const monthIndex = currentMonth.getMonth();

  function goPrevMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  }
  function goNextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  }
  function goToday() {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  }

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
        <div className="container relative mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur">
                Schedule
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Upcoming Classes &amp; Workshops
              </h1>
              <p className="mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
                Browse upcoming STEAM classes, workshops, events, and
                bootcamps at FundedYouth.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={ICS_URL}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:border-blue-600 hover:text-blue-600"
              >
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Add to Calendar (.ics)
              </a>
              <a
                href="https://portal.fundedyouth.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
              >
                Open Portal
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
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="bg-white py-6 border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sessions..."
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Category filter — built from feed at runtime */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Categories</option>
                {presentCategories.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              {/* Type filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Types</option>
                <option value="class">Class</option>
                <option value="workshop">Workshop</option>
                <option value="bootcamp">Bootcamp</option>
                <option value="event">Event</option>
              </select>
            </div>

            {/* View toggle */}
            <div
              role="tablist"
              aria-label="View mode"
              className="inline-flex rounded-lg border border-gray-300 bg-white p-0.5"
            >
              <button
                role="tab"
                aria-selected={view === "calendar"}
                onClick={() => setView("calendar")}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === "calendar"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Calendar
              </button>
              <button
                role="tab"
                aria-selected={view === "list"}
                onClick={() => setView("list")}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
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
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          {loading && (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500">
              Loading sessions…
            </div>
          )}

          {error && !loading && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="font-semibold text-red-800">
                Couldn&apos;t load sessions
              </p>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          )}

          {!loading && !error && feed && view === "calendar" && (
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Month nav */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <button
                  onClick={goPrevMonth}
                  aria-label="Previous month"
                  className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {monthLabel}
                  </h2>
                  <button
                    onClick={goToday}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Today
                  </button>
                </div>
                <button
                  onClick={goNextMonth}
                  aria-label="Next month"
                  className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Weekday header */}
              <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
                {WEEKDAY_LABELS.map((d) => (
                  <div key={d} className="px-2 py-2 text-center">
                    {d}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-7">
                {calendarGrid.map((week, wi) =>
                  week.map((date, di) => {
                    const inMonth = date.getMonth() === monthIndex;
                    const isToday = isSameDay(date, today);
                    const dayEvents = eventsByDay.get(dateKey(date)) ?? [];
                    const isLastRow = wi === calendarGrid.length - 1;
                    return (
                      <div
                        key={`${wi}-${di}`}
                        className={`min-h-[90px] border-r border-gray-100 p-1.5 sm:min-h-[110px] ${
                          isLastRow ? "" : "border-b"
                        } ${di === 6 ? "border-r-0" : ""} ${
                          inMonth ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`mb-1 flex h-6 w-6 items-center justify-center text-xs font-semibold ${
                            isToday
                              ? "rounded-full bg-blue-600 text-white"
                              : inMonth
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map((event) => {
                            const s = getStyle(event);
                            const displayName = stripCodePrefix(
                              event.name,
                              event.eventCode,
                            );
                            return (
                              <button
                                key={event.id}
                                type="button"
                                onClick={() => setSelectedEvent(event)}
                                title={`${formatTimeRange(
                                  event.startTime,
                                  event.endTime,
                                )}${
                                  event.eventCode ? ` ${event.eventCode}` : ""
                                } ${event.name}`}
                                className={`flex w-full flex-col rounded px-1 py-0.5 text-left text-[10px] font-medium leading-tight ${s.chipBg} ${s.chipText} ${s.chipHover}`}
                              >
                                <span className="flex items-center gap-1 truncate">
                                  <span
                                    className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`}
                                  />
                                  <span className="truncate">
                                    {formatTimeRange(
                                      event.startTime,
                                      event.endTime,
                                    )}
                                    {event.eventCode && ` ${event.eventCode}`}
                                  </span>
                                </span>
                                <span className="truncate pl-2.5">
                                  {displayName}
                                </span>
                              </button>
                            );
                          })}
                          {dayEvents.length > 3 && (
                            <p className="px-1 text-[10px] font-medium text-gray-500">
                              +{dayEvents.length - 3} more
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-200 px-4 py-3 text-xs text-gray-600">
                {(Object.keys(TYPE_STYLES) as Array<keyof typeof TYPE_STYLES>).map(
                  (key) => (
                    <span key={key} className="inline-flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${TYPE_STYLES[key].legend}`}
                      />
                      <span className="capitalize">{key}</span>
                    </span>
                  )
                )}
                <span className="inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${CANCELLED_STYLE.legend}`} />
                  Cancelled
                </span>
              </div>
            </div>
          )}

          {!loading && !error && feed && view === "list" && (
            <>
              {upcomingList.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500">
                  No upcoming sessions match your filters.
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingList.map((event) => {
                    const s = getStyle(event);
                    const isFull = event.spotsRemaining <= 0;
                    const displayName = stripCodePrefix(event.name, event.eventCode);
                    return (
                      <article
                        key={event.id}
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.badge}`}
                              >
                                {event.type}
                              </span>
                              {event.category && (
                                <span
                                  className="inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-800"
                                  style={categoryBadgeStyle(event.category.color)}
                                >
                                  <span
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{ backgroundColor: event.category.color }}
                                  />
                                  {event.category.name}
                                </span>
                              )}
                              {event.status === "cancelled" && (
                                <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                                  Cancelled
                                </span>
                              )}
                            </div>
                            <h3
                              className={`mt-2 text-lg font-bold leading-tight ${
                                event.status === "cancelled"
                                  ? "text-gray-500 line-through"
                                  : "text-gray-900"
                              }`}
                            >
                              {event.eventCode && (
                                <span className="mr-2 inline-block rounded bg-gray-100 px-1.5 py-0.5 align-middle font-mono text-xs font-semibold text-gray-700">
                                  {event.eventCode}
                                </span>
                              )}
                              {displayName}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-gray-600 line-clamp-2">
                              {event.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-600 sm:text-sm">
                              <span className="inline-flex items-center gap-1">
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
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {formatLongDate(event.startTime)},{" "}
                                {formatTimeRange(event.startTime, event.endTime)}
                              </span>
                              <span className="inline-flex items-center gap-1">
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
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                                {formatDuration(event.startTime, event.endTime)}
                              </span>
                              <span className="inline-flex items-center gap-1">
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
                                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                {event.location}
                              </span>
                              <span className="inline-flex items-center gap-1">
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
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                                {event.instructorName}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 ${
                                  isFull ? "text-red-600" : ""
                                }`}
                              >
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
                                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-5.13a4 4 0 11-8 0 4 4 0 018 0zm6 3a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                {isFull
                                  ? "Full"
                                  : `${event.spotsRemaining} spot${event.spotsRemaining === 1 ? "" : "s"} left`}
                              </span>
                            </div>
                            {event.requiresMembership && (
                              <p className="mt-2 text-[11px] font-medium text-blue-700">
                                Active membership required
                              </p>
                            )}
                          </div>

                          <a
                            href={event.registerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold shadow-md transition-colors ${
                              event.status === "cancelled" || isFull
                                ? "pointer-events-none bg-gray-200 text-gray-500"
                                : "bg-orange-500 text-white hover:bg-orange-600"
                            }`}
                            aria-disabled={event.status === "cancelled" || isFull}
                          >
                            {event.status === "cancelled"
                              ? "Cancelled"
                              : isFull
                              ? "Full"
                              : "Register on Portal"}
                            {event.status !== "cancelled" && !isFull && (
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
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Footer note */}
          {!loading && !error && feed && (
            <p className="mt-6 text-center text-xs text-gray-500">
              Registration happens on{" "}
              <a
                href="https://portal.fundedyouth.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                portal.fundedyouth.org
              </a>
              . Feed last updated{" "}
              {new Date(feed.generatedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
              .
            </p>
          )}
        </div>
      </section>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </main>
  );
}
