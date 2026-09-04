import { useState, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useLanguage } from "../contexts/LanguageContext";

/* ------------------------------------------------------------------
 * Institutional Licensing Page (placeholder)
 *
 * Rendered inside the app shell in App.tsx, which supplies the shared
 * Navigation (navbar) and Footer — same as SponsorshipPage, so this
 * page renders NO inline header/footer of its own.
 *
 * Intentionally simple: a single centered section reusing the same
 * brand tokens, Reveal scroll-animation pattern, checkmark-list
 * styling and WhatsApp modal pattern as the Sponsorship page.
 * ------------------------------------------------------------------ */

/* ---------------- Brand tokens (same as SponsorshipPage) ---------------- */
const C = {
  teal: "#009688",
  tealDark: "#00786D",
  tealTint: "#E4F3F1",
  cocoa: "#2D0A02",
  white: "#FFFFFF",
  snow: "#F9F9F9",
  border: "#E7E7E5",
  textMuted: "#6B6B68",
};
const FONT_HEAD = "'Utendo','Manrope',sans-serif";
const FONT_BODY = "'Manrope', sans-serif";

// Same WhatsApp number wired in on the Sponsorship page.
const WHATSAPP_NUMBER = "2349043609339";

interface Theme {
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  ink: string;
  inkMuted: string;
  inputBg: string;
}

function buildTheme(darkMode: boolean): Theme {
  return darkMode
    ? {
        pageBg: "#1a1a1a",
        cardBg: "#242424",
        cardBorder: "#3a3a3a",
        ink: "#f5f5f5",
        inkMuted: "#a5a5a2",
        inputBg: "#2a2a2a",
      }
    : {
        pageBg: C.snow,
        cardBg: C.white,
        cardBorder: C.border,
        ink: C.cocoa,
        inkMuted: C.textMuted,
        inputBg: C.white,
      };
}

/* ---------------- Reveal (same scroll-animation pattern as SponsorshipPage) ---------------- */
function useReveal(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Checkmark (same styling as Sponsorship tier cards) ---------------- */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill={C.teal} opacity="0.12" />
      <path
        d="M4.5 8.2L6.7 10.4L11.3 5.6"
        stroke={C.teal}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- WhatsApp modal (simplified SponsorModal pattern) ---------------- */
function InstitutionalModal({
  onClose,
  theme,
  t,
}: {
  onClose: () => void;
  theme: Theme;
  t: (key: string) => string;
}) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const message = `Hi IqraPay! I'm reaching out on behalf of ${name.trim()} to learn more about Institutional Licensing.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(24,24,22,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 50,
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        style={{
          background: theme.cardBg,
          borderRadius: 18,
          padding: 30,
          width: "100%",
          maxWidth: 380,
          boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 18,
            color: theme.inkMuted,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
        <h3 style={{ fontFamily: FONT_HEAD, fontSize: 19, color: theme.ink, margin: "0 0 4px" }}>
          Institutional Licensing
        </h3>
        <p style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: theme.inkMuted, margin: "0 0 22px" }}>
          {t("institutional.modalInstruction")}
        </p>
        <label style={{ fontFamily: FONT_BODY, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.4, color: theme.inkMuted }}>
          {t("institutional.modalNameLabel")}
        </label>
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder={t("institutional.modalNamePlaceholder")}
          style={{
            width: "100%",
            marginTop: 6,
            marginBottom: 22,
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: 10,
            padding: "10px 12px",
            fontFamily: FONT_BODY,
            fontSize: 14,
            boxSizing: "border-box",
            background: theme.inputBg,
            color: theme.ink,
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            background: C.teal,
            color: C.white,
            border: "none",
            borderRadius: 12,
            padding: "13px 0",
            fontFamily: FONT_BODY,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          {t("institutional.modalContinue")}
        </button>
      </form>
    </div>
  );
}

/* ---------------- Page ---------------- */
export function InstitutionalLicensingPage({ darkMode = false }: { darkMode?: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = buildTheme(darkMode);
  const { t } = useLanguage();

  const bullets: string[] = [
    t("institutional.bulletAdmin"),
    t("institutional.bulletReports"),
    t("institutional.bulletPool"),
    t("institutional.bulletBranded"),
    t("institutional.bulletSupport"),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.pageBg,
        fontFamily: FONT_BODY,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* Single centered section — top padding clears the fixed navbar */}
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "104px 24px 72px" }}>
        <Reveal style={{ textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: 0.4 }}>
            {t("institutional.eyebrow")}
          </span>
          <h1
            style={{
              fontFamily: FONT_HEAD,
              fontSize: "clamp(28px, 6vw, 36px)",
              color: theme.ink,
              margin: "10px 0 14px",
              lineHeight: 1.15,
            }}
          >
            {t("institutional.headline")}
          </h1>
          <p
            style={{
              color: theme.inkMuted,
              fontSize: "clamp(14px, 3.4vw, 15.5px)",
              lineHeight: 1.65,
              margin: "0 0 32px",
            }}
          >
            {t("institutional.body")}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            style={{
              background: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: 20,
              padding: "28px 26px",
            }}
          >
            {bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0" }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}>
                  <CheckIcon />
                </span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.55, color: theme.ink }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} style={{ textAlign: "center" }}>
          <p
            style={{
              color: theme.inkMuted,
              fontSize: 14,
              lineHeight: 1.6,
              margin: "28px auto 24px",
            }}
          >
            {t("institutional.closing")}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 700,
              fontSize: 14,
              padding: "13px 28px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              background: C.teal,
              color: C.white,
              transition: "opacity .2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {t("institutional.cta")}
          </button>
        </Reveal>
      </section>

      {modalOpen && <InstitutionalModal onClose={() => setModalOpen(false)} theme={theme} t={t} />}
    </div>
  );
}

export default InstitutionalLicensingPage;
