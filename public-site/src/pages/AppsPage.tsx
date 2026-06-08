import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/useSeo";

interface AppCategory {
  id: string;
  label: string;
  icon: string;
}

interface AppEntry {
  id: string;
  name: string;
  /** Small uppercase badge shown above the title (e.g. "Internal", "Maker"). */
  label: string;
  /** Category id — must match one of the category ids (used by the filter tabs). */
  category: string;
  description: string;
  /** Image URL for the app icon, or an emoji (anything that isn't a URL). */
  icon: string;
  /** Destination opened when the card is clicked. */
  url: string;
  /**
   * When true, `url` is an in-app route (rendered with the router and opened in
   * the same tab) rather than an external link.
   */
  internal?: boolean;
}

interface AppsFeed {
  categories: AppCategory[];
  apps: AppEntry[];
}

const FEED_URL = "/data/apps.json";

// Inline icons for the category filter chips, keyed by the category's `icon`.
function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "tools":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 00-5.66 5.66l-5.3 5.3a1.5 1.5 0 002.12 2.12l5.3-5.3a4 4 0 005.66-5.66l-2.47 2.47-2.12-2.12 2.47-2.47z" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "sparkles":
    default:
      return (
        <svg {...common}>
          <path d="M12 3l1.6 4.8L18 9.5l-4.4 1.7L12 16l-1.6-4.8L6 9.5l4.4-1.7L12 3zM19 14l.8 2.4L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.6L19 14z" />
        </svg>
      );
  }
}

function isUrl(icon: string): boolean {
  return /^(https?:)?\/\//.test(icon) || icon.startsWith("/");
}

function AppCard({ app }: { app: AppEntry }) {
  const cardClass =
    "group relative flex min-h-[200px] flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-md";

  const inner = (
    <>
      {/* Open affordance, top-right (in-app arrow vs. external link) */}
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground/30 transition-colors group-hover:bg-muted group-hover:text-muted-foreground"
      >
        <svg
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {app.internal ? (
            <path d="M5 12h14M13 6l6 6-6 6" />
          ) : (
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          )}
        </svg>
      </span>

      {/* App icon — image URL, or an emoji glyph */}
      <div className="flex size-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-background">
        {isUrl(app.icon) ? (
          <img
            src={app.icon}
            alt=""
            loading="lazy"
            className="size-full object-contain p-1.5"
          />
        ) : (
          <span className="text-3xl leading-none" aria-hidden="true">
            {app.icon}
          </span>
        )}
      </div>

      {/* Text block, pinned to the bottom of the card */}
      <div className="mt-auto pt-8">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {app.label}
        </p>
        <h3 className="mt-1 text-lg font-bold text-foreground">{app.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {app.description}
        </p>
      </div>
    </>
  );

  if (app.internal) {
    return (
      <Link to={app.url} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      {inner}
    </a>
  );
}

export function AppsPage() {
  const [feed, setFeed] = useState<AppsFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useSeo({
    title: "Apps — FundedYouth | Web Portals & Tools",
    description:
      "Quick access to FundedYouth web portals, maker tools, coding platforms, and internal apps.",
    url: "https://fundedyouth.org/apps",
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(FEED_URL);
        if (!res.ok) throw new Error(`Feed returned ${res.status}`);
        const data = (await res.json()) as AppsFeed;
        if (!cancelled) setFeed(data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load apps");
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

  const categories = feed?.categories ?? [];

  const filtered = useMemo<AppEntry[]>(() => {
    if (!feed) return [];
    const q = search.trim().toLowerCase();
    return feed.apps.filter((app) => {
      if (activeCategory !== "all" && app.category !== activeCategory) {
        return false;
      }
      if (q) {
        const hay = `${app.name} ${app.label} ${app.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [feed, activeCategory, search]);

  return (
    <main className="min-h-[70vh] bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-10">
        {/* Toolbar: filter tabs + search */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-neutral-900 text-white dark:bg-gradient-to-r dark:from-indigo-500 dark:to-violet-600"
                      : "border border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  <CategoryIcon name={cat.icon} className="size-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search web portals..."
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8">
          {loading && (
            <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
              Loading apps…
            </div>
          )}

          {error && !loading && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center">
              <p className="font-semibold text-destructive">
                Couldn&apos;t load apps
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
          )}

          {!loading && !error && feed && (
            <>
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
                  No apps match your filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
