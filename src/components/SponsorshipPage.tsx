import { useState, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useLanguage } from "../contexts/LanguageContext";

/* ------------------------------------------------------------------
 * Sponsorship Page
 *
 * Rendered inside the app shell in App.tsx, which supplies the shared
 * Navigation (navbar) and Footer components — the same way every other
 * public page is wired up. This page intentionally renders NO inline
 * <header>/<footer> of its own to avoid duplicating the shared
 * Navbar/Footer.
 *
 * Brand tokens are defined below and reused consistently. The page uses
 * inline styles (matching the reference design and the rendered
 * behaviour of the committed Tailwind snapshot) rather than arbitrary
 * Tailwind utilities, which are NOT compiled by this project's current
 * CSS pipeline (no `@import "tailwindcss"`, so the @tailwindcss/vite
 * plugin does not regenerate the committed src/index.css snapshot).
 * This guarantees the styling renders in both dev and production.
 * ------------------------------------------------------------------ */

/* ---------------- Brand tokens ---------------- */
const C = {
  teal: "#009688", // Deep Teal (primary)
  tealDark: "#00786D", // Teal Dark (hover/gradient)
  tealTint: "#E4F3F1", // Teal Tint (light backgrounds)
  cocoa: "#2D0A02", // Cocoa Brown (headings/text)
  white: "#FFFFFF",
  snow: "#F9F9F9", // page background
  border: "#E7E7E5",
  textMuted: "#6B6B68",
};
const FONT_HEAD = "'Utendo','Manrope',sans-serif";
const FONT_BODY = "'Manrope', sans-serif";

// Real IqraPay WhatsApp number, international format, no "+" or leading "0".
const WHATSAPP_NUMBER = "2349043609339";

/* ---------------- Theme (light/dark) ---------------- */
interface Theme {
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  ink: string; // primary headings/text
  inkMuted: string; // muted/secondary text
  softBg: string; // light button / surface background
  tint: string; // teal tint hover (FAQ rows)
  inputBg: string; // form input background
}

function buildTheme(darkMode: boolean): Theme {
  return darkMode
    ? {
        pageBg: "#1a1a1a",
        cardBg: "#242424",
        cardBorder: "#3a3a3a",
        ink: "#f5f5f5",
        inkMuted: "#a0a0a0",
        softBg: "#2a2a2a",
        tint: "#1e2c2a",
        inputBg: "#2a2a2a",
      }
    : {
        pageBg: C.snow,
        cardBg: C.white,
        cardBorder: C.border,
        ink: C.cocoa,
        inkMuted: C.textMuted,
        softBg: C.snow,
        tint: C.tealTint,
        inputBg: C.white,
      };
}

/* ---------------- Types ---------------- */
interface Tier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  features: string[];
  cta: string;
  badge: string | null;
}

interface Step {
  title: string;
  text: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Faq {
  q: string;
  a: string;
}

/* ---------------- Helpers ---------------- */
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

/* ---------------- Illustrations (inline SVG, brand-colored) ---------------- */
function IllustrationBook() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill={C.tealTint} />
      <path
        d="M30 38c0 0 22-7 30 4 8-11 30-4 30-4v46c0 0-22-7-30 4-8-11-30-4-30-4Z"
        fill="none"
        stroke={C.teal}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line x1="60" y1="42" x2="60" y2="88" stroke={C.cocoa} strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

function IllustrationCoin() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill={C.tealTint} />
      <circle cx="60" cy="60" r="28" fill="none" stroke={C.teal} strokeWidth="3" />
      <circle cx="60" cy="60" r="19" fill="none" stroke={C.teal} strokeWidth="2" opacity="0.5" />
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontFamily={FONT_HEAD}
        fontSize="20"
        fill={C.teal}
        fontWeight="700"
      >
        ₦
      </text>
    </svg>
  );
}

function IllustrationChart() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill={C.tealTint} />
      <rect x="38" y="60" width="10" height="24" rx="2" fill={C.teal} />
      <rect x="55" y="48" width="10" height="36" rx="2" fill={C.teal} opacity="0.75" />
      <rect x="72" y="38" width="10" height="46" rx="2" fill={C.teal} />
    </svg>
  );
}
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

/* ---------------- Pricing card ---------------- */
function Card({ tier, onOpen, theme }: { tier: Tier; onOpen: (tier: Tier) => void; theme: Theme }) {
  const [ref, visible] = useReveal();
  const [hover, setHover] = useState(false);
  const featured = !!tier.badge;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? (hover ? "translateY(-6px)" : "translateY(0)") : "translateY(16px)",
        transition: "opacity .5s ease, transform .2s ease, box-shadow .2s ease",
        background: featured
          ? `linear-gradient(180deg, ${C.teal} 0%, ${C.tealDark} 100%)`
          : theme.cardBg,
        color: featured ? C.white : theme.ink,
        border: featured ? "none" : `1px solid ${theme.cardBorder}`,
        borderRadius: 20,
        padding: "28px 26px",
        display: "flex",
        flexDirection: "column",
        boxShadow: featured
          ? hover
            ? "0 20px 40px rgba(0,150,136,0.35)"
            : "0 12px 28px rgba(0,150,136,0.22)"
          : hover
          ? "0 12px 24px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.4,
            textTransform: "uppercase",
            color: featured ? "rgba(255,255,255,0.85)" : theme.inkMuted,
          }}
        >
          {tier.name}
        </span>
        {tier.badge && (
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 11,
              fontWeight: 700,
              background: "rgba(255,255,255,0.2)",
              color: C.white,
              padding: "4px 10px",
              borderRadius: 999,
            }}
          >
            {tier.badge}
          </span>
        )}
      </div>

      <div style={{ marginBottom: 6 }}>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 34, fontWeight: 700 }}>{tier.price}</span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            marginLeft: 6,
            color: featured ? "rgba(255,255,255,0.8)" : theme.inkMuted,
          }}
        >
          {tier.priceNote}
        </span>
      </div>

      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 13.5,
          lineHeight: 1.5,
          margin: "8px 0 22px",
          color: featured ? "rgba(255,255,255,0.9)" : theme.inkMuted,
        }}
      >
        {tier.tagline}
      </p>

      <div style={{ height: 1, background: featured ? "rgba(255,255,255,0.2)" : theme.cardBorder, margin: "0 0 22px" }} />

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        {tier.features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FONT_BODY, fontSize: 13.5 }}>
            {featured ? (
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="9" height="9" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4.5 8.2L6.7 10.4L11.3 5.6"
                    stroke={C.teal}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : (
              <CheckIcon />
            )}
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onOpen(tier)}
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 700,
          fontSize: 14,
          padding: "13px 0",
          borderRadius: 12,
          border: featured ? "none" : `1px solid ${theme.cardBorder}`,
          cursor: "pointer",
          background: featured ? C.white : theme.softBg,
          color: featured ? C.teal : theme.ink,
          transition: "opacity .2s ease, transform .15s ease",
        }}
      >
        {tier.cta}
      </button>
    </div>
  );
}
/* ---------------- Modal ---------------- */
function SponsorModal({ tier, onClose, theme, t }: { tier: Tier; onClose: () => void; theme: Theme; t: (key: string) => string }) {
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
    const verb =
      tier.id === "waqf" ? t("sponsorship.modalVerbWaqf") : `${t("sponsorship.modalVerbTier")} ${tier.name}`;
    const message = `${t("sponsorship.modalMessagePrefix")} ${name.trim()} ${t("sponsorship.modalMessageSuffix")} ${verb}.`;
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
          {tier.name}
        </h3>
        <p style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: theme.inkMuted, margin: "0 0 22px" }}>
          {t("sponsorship.modalInstruction")}
        </p>
        <label style={{ fontFamily: FONT_BODY, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.4, color: theme.inkMuted }}>
          {t("sponsorship.modalNameLabel")}
        </label>
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder={t("sponsorship.modalNamePlaceholder")}
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
          {t("sponsorship.modalContinue")}
        </button>
      </form>
    </div>
  );
}
/* ---------------- Step card ---------------- */
function StepCard({ step, index, theme }: { step: Step; index: number; theme: Theme }) {
  const [ref, visible] = useReveal();
  const [hover, setHover] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "center",
        background: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 20,
        padding: "32px 22px",
        opacity: visible ? 1 : 0,
        transform: visible ? (hover ? "translateY(-6px)" : "translateY(0)") : "translateY(16px)",
        transition: `opacity .55s ease ${index * 120}ms, transform .25s ease, box-shadow .25s ease`,
        boxShadow: hover ? "0 14px 28px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        {index === 0 && <IllustrationCoin />}
        {index === 1 && <IllustrationBook />}
        {index === 2 && <IllustrationChart />}
      </div>
      <h3 style={{ fontFamily: FONT_HEAD, fontSize: 16.5, color: theme.ink, margin: "0 0 8px" }}>{step.title}</h3>
      <p style={{ fontFamily: FONT_BODY, fontSize: 13.5, lineHeight: 1.6, color: theme.inkMuted, margin: 0 }}>
        {step.text}
      </p>
    </div>
  );
}

/* ---------------- Stat cell ---------------- */
function StatCell({ stat, isFirst, theme }: { stat: Stat; isFirst: boolean; theme: Theme }) {
  const [hover, setHover] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "center",
        borderLeft: !isFirst && !isMobile ? `1px solid ${theme.cardBorder}` : "none",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "transform .2s ease",
        cursor: "default",
      }}
    >
      <div style={{ fontFamily: FONT_HEAD, fontSize: 26, color: C.teal, fontWeight: 700 }}>{stat.value}</div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: theme.inkMuted, marginTop: 4 }}>{stat.label}</div>
    </div>
  );
}

/* ---------------- FAQ item ---------------- */
function FaqItem({ faq, theme }: { faq: Faq; theme: Theme }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderBottom: `1px solid ${theme.cardBorder}`,
        padding: "18px 14px",
        margin: "0 -14px",
        borderRadius: 12,
        background: hover ? theme.tint : "transparent",
        transition: "background .2s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0,
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: FONT_HEAD, fontSize: 15.5, color: theme.ink, fontWeight: 600 }}>{faq.q}</span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 18,
            color: C.teal,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform .2s ease",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: "hidden",
          transition: "max-height .3s ease",
        }}
      >
        <p style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.6, color: theme.inkMuted, margin: "12px 0 0" }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Closing CTA button ---------------- */
function CtaButton({ onClick, t }: { onClick: () => void; t: (key: string) => string }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 14,
        padding: "13px 28px",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        background: C.white,
        color: C.teal,
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "0 10px 24px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform .2s ease, box-shadow .2s ease",
      }}
    >
      {t("sponsorship.ctaButton")}
    </button>
  );
}
/* ---------------- Page ---------------- */
export function SponsorshipPage({
  darkMode = false,
  onNavigate,
}: {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
}) {
  const [activeTier, setActiveTier] = useState<Tier | null>(null);
  const theme = buildTheme(darkMode);
  const { t } = useLanguage();

  // Build translated data from the language context.
  const tiers: Tier[] = [
    {
      id: "sadaqah",
      name: t("sponsorship.tierSadaqahName"),
      price: t("sponsorship.tierSadaqahPrice"),
      priceNote: t("sponsorship.tierSadaqahPriceNote"),
      tagline: t("sponsorship.tierSadaqahTagline"),
      features: [
        t("sponsorship.tierSadaqahFeat0"),
        t("sponsorship.tierSadaqahFeat1"),
        t("sponsorship.tierSadaqahFeat2"),
      ],
      cta: t("sponsorship.tierSadaqahCta"),
      badge: null,
    },
    {
      id: "knowledge",
      name: t("sponsorship.tierKnowledgeName"),
      price: t("sponsorship.tierKnowledgePrice"),
      priceNote: t("sponsorship.tierKnowledgePriceNote"),
      tagline: t("sponsorship.tierKnowledgeTagline"),
      features: [
        t("sponsorship.tierKnowledgeFeat0"),
        t("sponsorship.tierKnowledgeFeat1"),
        t("sponsorship.tierKnowledgeFeat2"),
        t("sponsorship.tierKnowledgeFeat3"),
        t("sponsorship.tierKnowledgeFeat4"),
      ],
      cta: t("sponsorship.tierKnowledgeCta"),
      badge: t("sponsorship.tierKnowledgeBadge"),
    },
    {
      id: "waqf",
      name: t("sponsorship.tierWaqfName"),
      price: t("sponsorship.tierWaqfPrice"),
      priceNote: t("sponsorship.tierWaqfPriceNote"),
      tagline: t("sponsorship.tierWaqfTagline"),
      features: [
        t("sponsorship.tierWaqfFeat0"),
        t("sponsorship.tierWaqfFeat1"),
        t("sponsorship.tierWaqfFeat2"),
        t("sponsorship.tierWaqfFeat3"),
        t("sponsorship.tierWaqfFeat4"),
        t("sponsorship.tierWaqfFeat5"),
      ],
      cta: t("sponsorship.tierWaqfCta"),
      badge: null,
    },
  ];

  const steps: Step[] = [
    { title: t("sponsorship.step1Title"), text: t("sponsorship.step1Text") },
    { title: t("sponsorship.step2Title"), text: t("sponsorship.step2Text") },
    { title: t("sponsorship.step3Title"), text: t("sponsorship.step3Text") },
  ];

  const stats: Stat[] = [
    { value: t("sponsorship.stat1Value"), label: t("sponsorship.stat1Label") },
    { value: t("sponsorship.stat2Value"), label: t("sponsorship.stat2Label") },
    { value: t("sponsorship.stat3Value"), label: t("sponsorship.stat3Label") },
  ];

  const faqs: Faq[] = [
    { q: t("sponsorship.faq1Q"), a: t("sponsorship.faq1A") },
    { q: t("sponsorship.faq2Q"), a: t("sponsorship.faq2A") },
    { q: t("sponsorship.faq3Q"), a: t("sponsorship.faq3A") },
    { q: t("sponsorship.faq4Q"), a: t("sponsorship.faq4A") },
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
      {/* Hero — top padding clears the fixed navbar (h-16 + breathing room) */}
      <section style={{ padding: "104px 20px 36px", textAlign: "center" }}>
        <Reveal style={{ maxWidth: 580, margin: "0 auto" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: 0.4 }}>{t("sponsorship.eyebrow")}</span>
          <h1
            style={{
              fontFamily: FONT_HEAD,
              fontSize: "clamp(28px, 6vw, 40px)",
              color: theme.ink,
              margin: "10px 0 14px",
              lineHeight: 1.15,
            }}
          >
            {t("sponsorship.heroTitle")}
          </h1>
          <p
            style={{
              color: theme.inkMuted,
              fontSize: "clamp(14px, 3.4vw, 15.5px)",
              lineHeight: 1.65,
              margin: "0 0 8px",
            }}
          >
          {t("sponsorship.heroBody")}
          </p>
          <p
            style={{
              color: theme.inkMuted,
              fontSize: 13.5,
              lineHeight: 1.6,
              margin: "8px 0 0",
            }}
          >
            {t("sponsorship.heroDisclosure")}
          </p>
        </Reveal>
      </section>

      {/* Stats strip */}
      <section style={{ maxWidth: 900, margin: "0 auto 64px", padding: "0 24px" }}>
        <Reveal
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 20,
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: 20,
            padding: "24px 20px",
          }}
        >
          {stats.map((s, i) => (
            <StatCell key={i} stat={s} isFirst={i === 0} theme={theme} />
          ))}
        </Reveal>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 72px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 26, color: theme.ink, margin: "0 0 8px" }}>
            {t("sponsorship.stepsTitle")}
          </h2>
          <p style={{ color: theme.inkMuted, fontSize: 14.5, maxWidth: 460, margin: "0 auto" }}>
            {t("sponsorship.stepsSubtitle")}
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} theme={theme} />
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 24px 24px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 26, color: theme.ink, margin: "0 0 8px" }}>
            {t("sponsorship.tiersTitle")}
          </h2>
          <p style={{ color: theme.inkMuted, fontSize: 14.5, maxWidth: 460, margin: "0 auto" }}>
            {t("sponsorship.tiersSubtitle")}
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 24 }}>
          {tiers.map((tier) => (
            <Card key={tier.id} tier={tier} onOpen={setActiveTier} theme={theme} />
          ))}
        </div>
      </section>

      {/* Institutional licensing callout */}
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 24px" }}>
        <Reveal style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 24, color: theme.ink, margin: "0 0 8px" }}>
            {t("sponsorship.institutionCalloutTitle")}
          </h2>
          <p style={{ color: theme.inkMuted, fontSize: 14.5, lineHeight: 1.6, maxWidth: 540, margin: "0 auto 20px" }}>
            {t("sponsorship.institutionCalloutBody")}
          </p>
          <a
            href="#institutional-licensing"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("institutional-licensing");
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: FONT_BODY,
              fontSize: 14,
              fontWeight: 600,
              color: C.teal,
              textDecoration: "underline",
              cursor: "pointer",
              transition: "opacity .2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {t("sponsorship.institutionCalloutCta")}
          </a>
        </Reveal>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "72px 24px 24px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: 24, color: theme.ink, margin: "0 0 8px" }}>
            {t("sponsorship.faqTitle")}
          </h2>
        </Reveal>
        <Reveal>
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} theme={theme} />
          ))}
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section style={{ padding: "72px 24px 40px", textAlign: "center" }}>
        <Reveal
          style={{
            maxWidth: 620,
            margin: "0 auto",
            background: `linear-gradient(180deg, ${C.teal} 0%, ${C.tealDark} 100%)`,
            borderRadius: 24,
            padding: "40px 24px",
          }}
        >
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(20px, 5vw, 24px)", color: C.white, margin: "0 0 10px" }}>
            {t("sponsorship.ctaTitle")}
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 14.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, margin: "0 0 24px" }}>
            {t("sponsorship.ctaBody")}
          </p>
          <CtaButton onClick={() => setActiveTier(tiers[1])} t={t} />
        </Reveal>
      </section>

      {activeTier && <SponsorModal tier={activeTier} onClose={() => setActiveTier(null)} theme={theme} t={t} />}
    </div>
  );
}

export default SponsorshipPage;