/**
 * Site-wide scroll in / out animation for `<section>` elements.
 *
 * Every `<section>` on every page fades in and slides up when it enters the
 * viewport and reverses (slides back down / fades out) when it leaves. The
 * effect is powered by a single `IntersectionObserver` (toggles the
 * `.in-view` utility class) plus a `MutationObserver` that picks up sections
 * mounted by the hash router (`App.tsx` swaps page components without a full
 * reload), so no page component needs to be edited individually.
 *
 * The animation is opt-in via the `js` class on `<html>` (added in
 * `main.tsx`): if JavaScript is unavailable the `.scroll-animate` class is
 * never attached, so sections stay fully visible — there is no flash of
 * hidden content. The matching styles live in `src/styles/globals.css`.
 */

export interface ScrollAnimateOptions {
  /** Element used as the viewport. Defaults to the browser viewport. */
  root?: Element | null;
  /** Margin around the root. Defaults to `0px`. */
  rootMargin?: string;
  /** Fraction of the section that must be visible to toggle. Defaults to
   * `0` (any pixel). */
  threshold?: number;
}

const DEFAULT_ROOT_MARGIN = "0px";
const DEFAULT_THRESHOLD = 0;

let intersectionObserver: IntersectionObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let scheduled = false;

/** Attach the animation classes to a single section (if not already done). */
function attach(section: Element): void {
  if (
    section instanceof HTMLElement &&
    !section.classList.contains("scroll-animate")
  ) {
    section.classList.add("scroll-animate");
    // Synchronous pre-check: if the section is already (at least partially)
    // visible, mark it in-view immediately. IntersectionObserver callbacks
    // are normally delivered before paint, but this guarantees zero sub-frame
    // flash for sections visible when the page first mounts or after a
    // client-side navigation.
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add("in-view");
    }
    intersectionObserver!.observe(section);
  }
}

/** Scan the document and attach the animation to every `<section>`. */
function scan(): void {
  document.querySelectorAll("section").forEach(attach);
}

/**
 * Initialise the scroll in / out animation. Safe to call more than once
 * (subsequent calls are a no-op). Does nothing in browsers without
 * `IntersectionObserver`.
 *
 * @returns a teardown function that disconnects both observers.
 */
export function initScrollAnimate(
  opts: ScrollAnimateOptions = {}
): () => void {
  // Unsupported viewport API, or already initialised — nothing to do.
  if (intersectionObserver || typeof IntersectionObserver === "undefined") {
    return () => {};
  }

  const {
    root = null,
    rootMargin = DEFAULT_ROOT_MARGIN,
    threshold = DEFAULT_THRESHOLD,
  } = opts;

  intersectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const section = entry.target as HTMLElement;
      // `isIntersecting` is true as soon as the section crosses the threshold
      // (scroll in) and false once it leaves (scroll out).
      if (entry.isIntersecting) {
        section.classList.add("in-view");
      } else {
        section.classList.remove("in-view");
      }
    }
  }, { root, rootMargin, threshold });

  // Attach to sections rendered at init. (React hasn't painted yet, so this is
  // usually a no-op; the real work happens via the MutationObserver below.)
  scan();

  // Pick up sections added by client-side navigation (hash routing swaps the
  // page component without a reload). Debounce with rAF so React's batched
  // DOM updates resolve into a single scan per frame.
  if (typeof MutationObserver !== "undefined") {
    mutationObserver = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        scan();
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  return () => {
    intersectionObserver?.disconnect();
    mutationObserver?.disconnect();
    intersectionObserver = null;
    mutationObserver = null;
    scheduled = false;
  };
}
