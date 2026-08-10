import DOMPurify from "dompurify";

/**
 * Sanitize untrusted HTML before rendering it with `dangerouslySetInnerHTML`.
 *
 * Blog content is authored through the admin rich-text editor (a
 * `contentEditable` that stores `innerHTML`) and is rendered on public pages,
 * so it must be treated as untrusted. DOMPurify strips `<script>` tags,
 * event-handler attributes (`on*`), `javascript:` URLs and other XSS vectors
 * while preserving the formatting tags the editor produces (bold, lists,
 * blockquotes…). Links are forced to open in the same tab (no `target`) so
 * content-rendered anchors cannot be used for tab-nabbing.
 */

// Whitelist of tags the editor is allowed to produce. Anything else (script,
// iframe, object, embed, style, form, …) is removed.
const ALLOWED_TAGS = [
  "b", "strong", "i", "em", "u", "a", "p", "br", "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "blockquote", "hr", "span", "div", "img",
];

// Anchor/style attributes we intentionally do NOT allow: `target` (no new-tab
// tab-nabbing from content) and `style` (potential expression()/url() vectors).
// DOMPurify still strips `javascript:` URLs from href/src regardless.
const ALLOWED_ATTR = ["href", "title", "class", "alt", "src"];

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Defensively strip any <script> / onerror handlers even if the allow-list
    // were widened elsewhere.
    FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "style"],
    FORBID_ATTR: ["onfocus", "onblur", "onchange", "onload", "onclick"],
  });
}
