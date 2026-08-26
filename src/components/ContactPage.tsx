import { useState, useRef } from "react";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";
import {
  CONTACT_ENDPOINT,
  FORM_SUBMIT_ENDPOINT,
  CONTACT_EMAIL,
  isContactConfigured,
} from "../config/contact";

// IqraPay brand palette — matches WaitlistModal.tsx
const BRAND = {
  rich: "#5a0800",
  maroon: "#360400",
  dark: "#0d0000",
  accent: "#f59e0b",
  accentDark: "#d97706",
  darkCyan: "#008B8B",
  primary: "#009688",
  primaryDark: "#00796b",
  cream: "#faf6ec",
  white: "#ffffff",
  ink: "#151210",
  muted: "#6f6a62",
  border: "#e7e2d4",
  error: "#b3541f",
};

interface ContactPageProps {
  onNavigate?: (page: string) => void;
  darkMode?: boolean;
}

export function ContactPage({ onNavigate, darkMode = false }: ContactPageProps = {}) {
  // Theme-aware surfaces: light theme uses the brand palette, dark theme swaps
  // the light surfaces for dark equivalents so every area of the page stays
  // readable when dark mode is toggled on. Brand colours (teal, maroon, accent)
  // and the intentionally-dark left panel gradient are kept constant.
  const surface = darkMode
    ? {
        cardBg: "#26231f", // was BRAND.white — card + form grid background
        inputBg: "#2b2823", // was BRAND.cream — inputs + soft accents
        softBg: "#2b2823", // success check circle
        ink: "#f2efe7", // was BRAND.ink — primary text
        muted: "#b3aea2", // was BRAND.muted — secondary text
        border: "#3b372f", // was BRAND.border — borders/seams
        connectBg: "#26231f", // social button background
        connectBgHover: "#37332b", // social button hover
        iconDark: "#faf6ec", // social icon colour (light on dark)
      }
    : {
        cardBg: BRAND.white,
        inputBg: BRAND.cream,
        softBg: BRAND.cream,
        ink: BRAND.ink,
        muted: BRAND.muted,
        border: BRAND.border,
        connectBg: "rgba(13,0,0,0.05)",
        connectBgHover: BRAND.cream,
        iconDark: BRAND.dark,
      };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [botField, setBotField] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const lastSubmitRef = useRef(0);

  const RATE_LIMIT_MS = 5000;
  const mailtoFallback = `mailto:${CONTACT_EMAIL}`;

  const resetStatus = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  // Navigate to the FAQ (support) page. The app has no hashchange listener
  // (only popstate), so prefer onNavigate and fall back to a hash change.
  const goToFaq = () => {
    if (onNavigate) {
      onNavigate("support");
    } else {
      window.location.hash = "#support";
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+234 815 595 6187",
      href: "tel:+2348155956187",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Ibadan, Nigeria",
      href: null as string | null,
    },
    ];

  // Site-wide socials — rendered with Font Awesome brand icons (font-awesome is
  // loaded globally via index.html), consistent with the site Footer.
  const socialLinks = [
    { icon: "fab fa-x-twitter", href: "https://x.com/iqra_pay", label: "X / Twitter" },
    { icon: "fab fa-instagram", href: "https://www.instagram.com/iqra_pay/", label: "Instagram" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetStatus();

    // Honeypot — bots fill this, humans never see it.
    if (botField.trim() !== "") return;

    const nowMs = Date.now();
    if (nowMs - lastSubmitRef.current < RATE_LIMIT_MS) {
      setStatus("error");
      setErrorMessage("Please wait a moment before trying again.");
      return;
    }

    if (!name.trim()) {
      setStatus("error");
      setErrorMessage("Enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }
    if (!subject.trim()) {
      setStatus("error");
      setErrorMessage("Enter a subject.");
      return;
    }
    if (!message.trim()) {
      setStatus("error");
      setErrorMessage("Enter a message.");
      return;
    }

    setIsSubmitting(true);
    lastSubmitRef.current = Date.now();

    try {
      let delivered = false;
      let serverMessage = "";

      // ---- Helper: try Google Apps Script (preferred path) ----
      const tryAppsScript = async (): Promise<boolean> => {
        if (!isContactConfigured()) return false;
        try {
          // text/plain avoids a CORS preflight, which the Apps Script web app
          // can't answer (see the doPost handler in CONTACT_FORM_SETUP.md).
          const response = await fetch(CONTACT_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
              action: "contact",
              name,
              email,
              subject,
              message,
              website: botField,
            }),
          });

          let result: Record<string, unknown> = {};
          try {
            result = await response.json();
          } catch {
            result = {};
          }

          if (
            response.ok &&
            (result.success === true ||
              result.success === "true" ||
              result.ok === true)
          ) {
            delivered = true;
            return true;
          }
          serverMessage =
            typeof result.message === "string" ? result.message : "";
          return false;
        } catch {
          // Endpoint threw (network/CORS/invalid URL) — fall through to FormSubmit.
          return false;
        }
      };

      // ---- Helper 2: FormSubmit.co fallback (no API key) ----
      const tryFormSubmit = async (): Promise<boolean> => {
        try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("email", email);
          formData.append("subject", subject);
          formData.append("message", message);
          formData.append("_subject", `[IqraPay] ${subject}`);
          formData.append("_captcha", "false");

          const response = await fetch(FORM_SUBMIT_ENDPOINT, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
          });

          // FormSubmit's /ajax/ endpoint returns a JSON body but with a
          // `text/html` Content-Type, so parse the body directly rather than
          // trusting the header. Success is `{ success: "true" }` or
          // `{ success: true }`; an HTML body (email not yet activated) fails
          // to parse and we degrade to the mailto: fallback.
          const text = await response.text().catch(() => "");
          try {
            const data = JSON.parse(text);
            if (
              data.success === true ||
              data.success === "true" ||
              data.ok === true
            ) {
              return true;
            }
            serverMessage =
              typeof data.message === "string" ? data.message : "";
          } catch {
            serverMessage = "";
          }
          return false;
        } catch {
          return false;
        }
      };

      // Try Apps Script first, then FormSubmit as a safety net so a broken or
      // slow Apps Script endpoint never blocks a message from getting through.
      if (await tryAppsScript()) {
        delivered = true;
      } else if (await tryFormSubmit()) {
        delivered = true;
      }

      if (delivered) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setErrorMessage("");
      } else {
        setStatus("error");
        setErrorMessage(
          serverMessage ||
            `We couldn't send that automatically. Please email us directly at ${CONTACT_EMAIL}.`
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        `Something went wrong. Please email us directly at ${CONTACT_EMAIL}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 15px",
    borderRadius: 10,
    border: `1px solid ${surface.border}`,
    background: surface.inputBg,
    color: surface.ink,
    fontSize: 14.5,
    outline: "none",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12.5,
    fontWeight: 600,
    color: surface.ink,
    marginBottom: 7,
  };

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = BRAND.accent;
      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.15)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = surface.border;
      e.currentTarget.style.boxShadow = "none";
    },
  };

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      {/* Header */}
      <section style={{ padding: "100px 24px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: surface.ink }}>
            Get in Touch
          </h1>
          <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.7, color: surface.muted }}>
            Have questions or feedback? We'd love to hear from you. Reach out and we'll respond as soon as possible.
          </p>
          <p style={{ margin: "10px 0 0", fontSize: 13.5, color: surface.muted }}>
            Looking for answers to common questions?{" "}
            <a
              href="#support"
              onClick={(e) => {
                e.preventDefault();
                goToFaq();
              }}
              style={{ color: BRAND.primary, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2, cursor: "pointer" }}
            >
              Check our FAQ
            </a>
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section style={{ padding: "32px 24px 0" }}>
        <div className="iqp-contact-cards">
          {contactCards.map((card) => {
            const inner = (
              <>
                <span className="iqp-contact-card-icon">
                  <card.icon size={20} />
                </span>
                <span>
                  <span className="iqp-contact-card-label">{card.label}</span>
                  <span className="iqp-contact-card-value">{card.value}</span>
                </span>
              </>
            );
            return card.href ? (
              <a key={card.label} className="iqp-contact-card" href={card.href}>
                {inner}
              </a>
            ) : (
              <div key={card.label} className="iqp-contact-card">
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact form */}
      <section
        style={{
          width: "100%",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "48px 24px",
          boxSizing: "border-box",
        }}
      >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          background: surface.cardBg,
          borderRadius: 28,
          overflow: "hidden",
          border: `1px solid ${surface.border}`,
          boxShadow: "0 20px 60px -30px rgba(13,0,0,0.35)",
        }}
        className="iqp-contact-grid"
      >
        {/* Left panel — brand statement, no stock photo */}
        <div
          style={{
            position: "relative",
            background: `linear-gradient(160deg, ${BRAND.maroon} 0%, ${BRAND.dark} 100%)`,
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 480,
            overflow: "hidden",
          }}
        >
          {/* Signature element: a quiet geometric lattice, referencing
              Islamic geometric pattern traditions — restrained, low-contrast,
              not decorative noise. */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.08,
            }}
            viewBox="0 0 400 480"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="iqp-lattice"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M40 0 L80 40 L40 80 L0 40 Z"
                  fill="none"
                  stroke={BRAND.accent}
                  strokeWidth="1"
                />
                <circle cx="40" cy="40" r="14" fill="none" stroke={BRAND.accent} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="480" fill="url(#iqp-lattice)" />
          </svg>

          <div style={{ position: "relative" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: BRAND.accent,
                marginBottom: 18,
              }}
            >
              Read. Learn. Earn.
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: 32,
                lineHeight: 1.2,
                fontWeight: 700,
                color: BRAND.cream,
              }}
            >
              Get in touch
            </h1>
            <p
              style={{
                marginTop: 18,
                fontSize: 14.5,
                lineHeight: 1.7,
                color: "rgba(250,246,236,0.78)",
                maxWidth: 340,
              }}
            >
              We're building a platform where Muslims are rewarded for
              reading and understanding Islamic books — real halal rewards
              for real knowledge. Whether it's a question, feedback, or a
              partnership idea, we'd love to hear from you.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              fontSize: 13,
              color: "rgba(250,246,236,0.6)",
            }}
          >
            {CONTACT_EMAIL}
          </div>
        </div>

        {/* Right panel — form */}
        <div style={{ padding: "48px 40px" }}>
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: surface.softBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={BRAND.primary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="22"
                  height="22"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: 18,
                  color: surface.ink,
                  fontWeight: 700,
                }}
              >
                Message sent
              </h2>
              <p style={{ margin: 0, fontSize: 13.5, color: surface.muted }}>
                JazakAllahu khayran — we'll get back to you soon.
              </p>
              <button
                type="button"
                onClick={resetStatus}
                style={{
                  marginTop: 24,
                  padding: "10px 20px",
                  borderRadius: 9,
                  border: `1px solid ${surface.border}`,
                  background: "none",
                  color: surface.ink,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden off-screen, only bots fill it */}
              <div
                style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="website"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
                className="iqp-contact-row"
              >
                <div>
                  <label htmlFor="iqp-c-name" style={labelStyle}>
                    Name*
                  </label>
                  <input
                    id="iqp-c-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    {...focusHandlers}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="iqp-c-email" style={labelStyle}>
                    Email*
                  </label>
                  <input
                    id="iqp-c-email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    {...focusHandlers}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="iqp-c-subject" style={labelStyle}>
                  Subject*
                </label>
                <input
                  id="iqp-c-subject"
                  type="text"
                  placeholder="What's this about?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={inputStyle}
                  {...focusHandlers}
                  required
                />
              </div>

              <div style={{ marginBottom: errorMessage ? 8 : 20 }}>
                <label htmlFor="iqp-c-message" style={labelStyle}>
                  Message*
                </label>
                <textarea
                  id="iqp-c-message"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ ...inputStyle, minHeight: 130, resize: "vertical" }}
                  {...focusHandlers}
                  required
                />
              </div>

              {status === "error" && errorMessage && (
                <p
                  style={{
                    margin: "0 0 16px",
                    fontSize: 12.5,
                    color: BRAND.error,
                  }}
                >
                  {errorMessage}{" "}
                  <a href={mailtoFallback} style={{ color: BRAND.error, fontWeight: 600 }}>
                    Open email instead
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "12px 24px",
                  borderRadius: 9,
                  border: "none",
                  background: isSubmitting ? BRAND.primaryDark : BRAND.primary,
                  color: BRAND.white,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: isSubmitting ? "default" : "pointer",
                  transition: "background .15s ease",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .iqp-contact-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .iqp-contact-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 24px;
          border-radius: 16px;
          border: 1px solid ${surface.border};
          background: ${surface.cardBg};
          color: ${surface.ink};
          text-decoration: none;
          transition: all .18s ease;
          box-shadow: 0 4px 14px -10px rgba(13,0,0,0.18);
        }
        .iqp-contact-card:hover {
          transform: translateY(-3px);
          border-color: ${BRAND.accent};
          box-shadow: 0 16px 34px -16px rgba(245,158,11,0.5);
        }
        .iqp-contact-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: ${surface.inputBg};
          color: ${BRAND.primary};
          flex-shrink: 0;
        }
        .iqp-contact-card-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: ${surface.muted};
          margin-bottom: 2px;
        }
        .iqp-contact-card-value {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: ${surface.ink};
        }
        @media (max-width: 760px) {
          .iqp-contact-grid {
            grid-template-columns: 1fr !important;
          }
          .iqp-contact-row {
            grid-template-columns: 1fr !important;
          }
          .iqp-contact-cards {
            flex-direction: column;
            align-items: stretch;
          }
        }
            `}</style>
      </section>

      {/* Connect with us — social links shown after the contact form */}
      <section style={{ padding: "48px 24px 0" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: surface.ink }}>
            Connect With Us
          </h2>
          <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.7, color: surface.muted }}>
            Follow us on social media for updates, inspiration, and community highlights.
          </p>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 16 }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: surface.connectBg,
                  color: surface.iconDark,
                  border: `1px solid ${surface.border}`,
                  transition: "all .18s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = surface.connectBgHover;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = surface.connectBg;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <i className={`${social.icon} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
