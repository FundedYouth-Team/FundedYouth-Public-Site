import { useEffect, useState } from "react";

interface PromoPopupProps {
  title: string;
  description: string;
  image?: string;
  actionLabel?: string;
  onAction?: () => void;
  /**
   * Unique id used to remember dismissal for the rest of this page session.
   * Cleared on full page load (refresh, new tab, returning from another site),
   * so the popup re-appears on the next visit.
   */
  storageKey?: string;
  /** Milliseconds to wait before the popup slides in. */
  autoOpenDelay?: number;
  /** Where on the viewport to anchor the popup. Defaults to bottom-right. */
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-center";
}

// Module-level set: dismissed popups stay closed for the rest of this page
// session, but reset whenever the bundle is freshly loaded.
const dismissedInSession = new Set<string>();

const positionClasses: Record<NonNullable<PromoPopupProps["position"]>, string> = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "top-center": "top-20 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export function PromoPopup({
  title,
  description,
  image,
  actionLabel = "Learn more",
  onAction,
  storageKey,
  autoOpenDelay = 1500,
  position = "bottom-right",
}: PromoPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (storageKey && dismissedInSession.has(storageKey)) {
      return;
    }
    const timer = setTimeout(() => setOpen(true), autoOpenDelay);
    return () => clearTimeout(timer);
  }, [storageKey, autoOpenDelay]);

  const close = () => {
    setOpen(false);
    if (storageKey) {
      dismissedInSession.add(storageKey);
    }
  };

  const handleAction = () => {
    onAction?.();
    close();
  };

  const slideOffset = position.startsWith("top") ? "-translate-y-4" : "translate-y-4";

  return (
    <div
      role="dialog"
      aria-label={title}
      aria-hidden={!open}
      className={`fixed z-50 w-80 max-w-[calc(100vw-2rem)] ${positionClasses[position]} ${
        open ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_25px_60px_-12px_rgba(0,0,0,0.45)] transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : `opacity-0 ${slideOffset}`
        }`}
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 flex items-center justify-center shadow-md transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="px-5 pt-5 pr-12">
          <h3 className="text-gray-900 font-bold text-lg">{title}</h3>
        </div>

        {image && (
          <button
            type="button"
            onClick={handleAction}
            className="block w-full bg-gray-50 px-5 py-4 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={actionLabel}
          >
            <img
              src={image}
              alt=""
              className="w-full h-auto object-contain rounded-lg"
            />
          </button>
        )}

        <div className="p-5">
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
          <button
            type="button"
            onClick={handleAction}
            className="inline-flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
          >
            {actionLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
