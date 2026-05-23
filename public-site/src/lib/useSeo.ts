import { useEffect } from "react";

export interface SeoConfig {
  /** Full <title> string. */
  title: string;
  /** Meta description; also used for og:description and twitter:description. */
  description: string;
  /** Absolute canonical URL for the page. */
  url: string;
  /** Absolute URL for the OG/Twitter card image. Falls back to a generic site image. */
  image?: string;
  /**
   * Optional JSON-LD schema object (or array of objects). Re-applied whenever
   * the serialized form changes, so dynamic schemas (e.g. feed-driven) work.
   */
  schema?: unknown;
  /** Optional og:type. Defaults to "website". */
  ogType?: string;
}

const DEFAULT_IMAGE =
  "https://ps-cdn.fundedyouth.org/assets/images/stem-classroom-v2.png";

/**
 * Manages the document <title>, meta tags, canonical link, and one JSON-LD
 * schema block for the current page. Cleans up on unmount: restores prior
 * title, removes meta/link/script tags it created.
 *
 * Meta tags it added (vs. updated) are tagged with data-page-seo="1" so
 * cleanup doesn't touch tags shipped in index.html.
 */
export function useSeo(config: SeoConfig): void {
  const {
    title,
    description,
    url,
    image = DEFAULT_IMAGE,
    schema,
    ogType = "website",
  } = config;
  const schemaJson = schema ? JSON.stringify(schema) : null;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    function upsertMeta(
      attr: "name" | "property",
      key: string,
      content: string,
      track: string[]
    ) {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        el.dataset.pageSeo = "1";
        document.head.appendChild(el);
        track.push(`${attr}=${key}`);
      }
      el.setAttribute("content", content);
    }

    const added: string[] = [];
    upsertMeta("name", "description", description, added);
    upsertMeta("property", "og:type", ogType, added);
    upsertMeta("property", "og:url", url, added);
    upsertMeta("property", "og:title", title, added);
    upsertMeta("property", "og:description", description, added);
    upsertMeta("property", "og:image", image, added);
    upsertMeta("name", "twitter:card", "summary_large_image", added);
    upsertMeta("name", "twitter:title", title, added);
    upsertMeta("name", "twitter:description", description, added);
    upsertMeta("name", "twitter:image", image, added);

    // Canonical link
    let canonicalEl = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    const canonicalAddedHere = !canonicalEl;
    const prevCanonicalHref = canonicalEl?.href ?? "";
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      canonicalEl.dataset.pageSeo = "1";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = url;

    // JSON-LD — single block per page, removed/replaced on each effect run
    const LD_ID = "page-jsonld";
    document.getElementById(LD_ID)?.remove();
    if (schemaJson) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = LD_ID;
      script.textContent = schemaJson;
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      document.getElementById(LD_ID)?.remove();
      for (const key of added) {
        const [attr, val] = key.split("=");
        document.head
          .querySelector(`meta[${attr}="${val}"][data-page-seo="1"]`)
          ?.remove();
      }
      if (canonicalEl) {
        if (canonicalAddedHere) canonicalEl.remove();
        else canonicalEl.href = prevCanonicalHref;
      }
    };
  }, [title, description, url, image, schemaJson, ogType]);
}
