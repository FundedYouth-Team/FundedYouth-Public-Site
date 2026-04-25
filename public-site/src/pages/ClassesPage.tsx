import { useEffect, useState } from "react";

interface EventbriteEvent {
  id: string;
  name: { text: string };
  url: string;
  start: { local: string };
  venue?: {
    name?: string;
    address?: {
      address_1?: string;
      address_2?: string;
    };
  };
  logo?: { url: string };
  ticket_availability?: {
    is_sold_out?: boolean;
    has_available_tickets?: boolean;
    minimum_ticket_price?: { display: string; value: number };
    maximum_ticket_price?: { display: string };
    available_capacity?: number;
  };
}

const EVENTBRITE_ORG_ID = import.meta.env.VITE_EVENTBRITE_ORGANIZATION_ID;

// Helper functions
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  return date;
};

const getMonthAbbr = (dateString: string) => {
  return formatEventDate(dateString).toLocaleDateString("en-US", { month: "short" }).toUpperCase();
};

const getDayOfMonth = (dateString: string) => {
  return formatEventDate(dateString).getDate();
};

const getFormattedDateTime = (dateString: string) => {
  const date = formatEventDate(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

const getVenueAddress = (event: EventbriteEvent) => {
  const venue = event.venue;
  if (!venue) return "Online Event";

  const address = venue.address;
  const parts: string[] = [];

  if (address?.address_1) parts.push(address.address_1);
  if (address?.address_2) parts.push(address.address_2);

  return parts.length > 0 ? parts.join(", ") : venue.name || "See event for details";
};

const getTicketInfo = (event: EventbriteEvent) => {
  const ticketAvailability = event.ticket_availability;

  if (!ticketAvailability) {
    return { available: false, text: "Tickets unavailable" };
  }

  if (ticketAvailability.is_sold_out) {
    return { available: false, text: "Sold Out" };
  }

  if (ticketAvailability.has_available_tickets) {
    const minPrice = ticketAvailability.minimum_ticket_price;
    let priceText = "";

    if (minPrice) {
      if (minPrice.display === "Free" || minPrice.value === 0) {
        priceText = "Free";
      } else {
        priceText = `From ${minPrice.display}`;
      }
    }

    return { available: true, text: priceText || "Tickets Available" };
  }

  return { available: false, text: "Registration closed" };
};

const getEventImage = (event: EventbriteEvent) => {
  if (event.logo?.url) return event.logo.url;
  const eventName = event.name?.text || "Event";
  return `https://placehold.co/100x100/3b82f6/ffffff?text=${encodeURIComponent(eventName.substring(0, 3))}`;
};

export function ClassesPage() {
  const [events, setEvents] = useState<EventbriteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDarkPreview, setShowDarkPreview] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDarkPreview((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Eventbrite's /organizations/{id}/events/ endpoint ignores status, time_filter,
        // and start_date.range_start — so we paginate through all events and filter client-side.
        const allEvents: EventbriteEvent[] = [];
        let continuation: string | undefined;
        const maxPages = 10;

        for (let page = 0; page < maxPages; page++) {
          const params = new URLSearchParams({
            order_by: "start_asc",
            expand: "venue,ticket_availability,logo",
          });
          if (continuation) params.set("continuation", continuation);

          const response = await fetch(
            `/api/eventbrite/v3/organizations/${EVENTBRITE_ORG_ID}/events/?${params}`
          );

          if (!response.ok) throw new Error("Failed to fetch events");

          const data = await response.json();
          if (Array.isArray(data.events)) allEvents.push(...data.events);

          if (!data.pagination?.has_more_items) break;
          continuation = data.pagination.continuation;
          if (!continuation) break;
        }

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const filteredEvents = allEvents.filter((event) => {
          if (!event.start?.local) return false;
          return new Date(event.start.local) >= now;
        });

        setEvents(filteredEvents);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ps-cdn.fundedyouth.org/assets/images/stem-classroom-v2.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-600/85"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Label */}
          <p className="text-white/90 text-sm font-semibold tracking-wider uppercase mb-4">
            Classes & Learning
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Learn to Create, Build & Innovate
          </h1>

          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            From weekend courses to hands-on workshops, discover the skills you need to bring
            your ideas to life. All skill levels welcome.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#courses"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Pathways
            </a>
            <a
              href="#upcoming"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 border-2 border-emerald-600 hover:border-emerald-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              View Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="upcoming" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-2">
              Upcoming Events
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Happening Next
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Register for upcoming classes and events. Space is limited—secure your spot today.
            </p>
          </div>

          {/* Events from Eventbrite */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading events...</p>
              </div>
            ) : events.length > 0 ? (
              events.map((event) => {
                const ticketInfo = getTicketInfo(event);
                return (
                  <div
                    key={event.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-100 mb-4">
                        <img
                          src={getEventImage(event)}
                          alt={event.name.text}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 text-center w-14">
                          {event.start?.local && (
                            <>
                              <div className="text-blue-600 font-bold text-sm">
                                {getMonthAbbr(event.start.local)}
                              </div>
                              <div className="text-gray-900 font-bold text-2xl">
                                {getDayOfMonth(event.start.local)}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">
                            {event.name.text}
                          </h3>
                          <p className="text-gray-600 text-sm mb-1">{getVenueAddress(event)}</p>
                          {event.start?.local && (
                            <p className="text-gray-500 text-sm mb-2">
                              {getFormattedDateTime(event.start.local)}
                            </p>
                          )}
                          <div className="flex items-center gap-3 flex-wrap">
                            {ticketInfo.available ? (
                              <>
                                <span className="text-green-600 text-sm font-medium">
                                  {ticketInfo.text}
                                </span>
                                <a
                                  href={`${event.url}#tickets`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                                >
                                  Get Tickets
                                </a>
                              </>
                            ) : (
                              <span className="text-red-500 text-sm font-medium">
                                {ticketInfo.text}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex gap-4">
                      <div className="flex-shrink-0 text-center w-14">
                        {event.start?.local && (
                          <>
                            <div className="text-blue-600 font-bold text-sm">
                              {getMonthAbbr(event.start.local)}
                            </div>
                            <div className="text-gray-900 font-bold text-2xl">
                              {getDayOfMonth(event.start.local)}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={getEventImage(event)}
                          alt={event.name.text}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{event.name.text}</h3>
                        <p className="text-gray-600 text-sm mb-1">{getVenueAddress(event)}</p>
                        {event.start?.local && (
                          <p className="text-gray-500 text-sm mb-2">
                            {getFormattedDateTime(event.start.local)}
                          </p>
                        )}
                        <div className="flex items-center gap-4 flex-wrap">
                          {ticketInfo.available ? (
                            <span className="text-green-600 text-sm font-medium">
                              {ticketInfo.text}
                            </span>
                          ) : (
                            <span className="text-red-500 text-sm font-medium">
                              {ticketInfo.text}
                            </span>
                          )}
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                          >
                            View event
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                          {ticketInfo.available && (
                            <a
                              href={`${event.url}#tickets`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                            >
                              Get Tickets
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <img
                  src="https://ps-cdn.fundedyouth.org/assets/images/coming-soon.png"
                  alt="Coming Soon"
                  className="mx-auto mb-4 max-w-xs"
                />
                <p className="text-gray-500">No upcoming events at this time. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FundedYouth Portal Section — mirrors portal.fundedyouth.org hero */}
      <section id="courses" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section heading */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-emerald-600 text-sm font-semibold tracking-wider uppercase mb-3">
              Join the Portal
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Create a Free Account Today
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column — copy + CTA */}
            <div>
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                Empowering the Next Generation
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Where <span className="text-blue-600">Youth</span>
                <br />
                Meets{" "}
                <span className="text-orange-500">Opportunity</span>
                <span className="text-gray-900">.</span>
              </h2>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                A community-driven platform for young innovators. Earn credits, join world-class
                courses, and build the future together with FundedYouth.
              </p>

              <a
                href="https://portal.fundedyouth.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Login / Sign Up
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            {/* Right column — dashboard mockup with floating accent cards */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Light variant sets the layout size; both images cross-fade in place */}
                <img
                  src="https://portal.fundedyouth.org/assets/user-portal-light.png"
                  alt="FundedYouth Portal dashboard preview"
                  className={`w-full h-auto transition-opacity duration-1000 ${
                    showDarkPreview ? "opacity-0" : "opacity-100"
                  }`}
                />
                <img
                  src="https://portal.fundedyouth.org/assets/user-portal-dark.png"
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                    showDarkPreview ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Top Innovator floating card */}
              <div className="hidden sm:flex absolute -top-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-4 items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
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

              {/* Robotics 101 floating card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl p-4 items-center gap-3 border border-gray-100 max-w-xs">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
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


    </main>
  );
}
