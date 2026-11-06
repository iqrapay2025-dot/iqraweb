import { useState, useRef } from "react";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";
import {
  CONTACT_ENDPOINT,
  FORM_SUBMIT_ENDPOINT,
  CONTACT_EMAIL,
  isContactConfigured,
} from "../config/contact";
import { useLanguage } from "../contexts/LanguageContext";

// IqraPay brand palette — matches WaitlistModal.tsx
const BRAND = {
  rich: "var(--secondary)",
  maroon: "var(--secondary)",
  dark: "var(--foreground)",
  accent: "var(--accent)",
  accentDark: "var(--accent-foreground)",
  darkCyan: "var(--chart-4)",
  primary: "var(--primary)",
  cream: "var(--muted)",
  white: "var(--card)",
  ink: "var(--foreground)",
  muted: "var(--muted-foreground)",
  border: "var(--border)",
  error: "var(--destructive)",
};

interface ContactPageProps {
  onNavigate?: (page: string) => void;
  darkMode?: boolean;
}

export function ContactPage({ onNavigate }: ContactPageProps = {}) {
  const { t } = useLanguage();
  const surface = {
    cardBg: "var(--card)",
    inputBg: "var(--input-background)",
    softBg: "var(--muted)",
    ink: "var(--foreground)",
    muted: "var(--muted-foreground)",
    border: "var(--border)",
    connectBg: "color-mix(in srgb, var(--secondary) 10%, transparent)",
    connectBgHover: "var(--muted)",
    iconDark: "var(--foreground)",
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
      window.history.pushState({ page: "support" }, "", "/support");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: t("contact.emailLabel"),
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: Phone,
      label: t("contact.phoneLabel"),
      value: "+234 815 595 6187",
      href: "tel:+2348155956187",
    },
    {
      icon: MapPin,
      label: t("contact.addressLabel"),
      value: "Ibadan, Nigeria",
      href: null as string | null,
    },
    ];

  // Site-wide socials — rendered with Font Awesome brand icons (font-awesome is
  // loaded globally via index.html), consistent with the site Footer.
  const socialLinks = [
    { icon: "fab fa-x-twitter", href: "https://x.com/iqra_pay", label: "X / Twitter" },
    { icon: "fab fa-instagram", href: "https://www.instagram.com/iqra_pay/", label: "Instagram" },
    { icon: "fi-brands-linkedin", href: "https://www.linkedin.com/company/iqrapay", label: "LinkedIn" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetStatus();

    // Honeypot — bots fill this, humans never see it.
    if (botField.trim() !== "") return;

    const nowMs = Date.now();
    if (nowMs - lastSubmitRef.current < RATE_LIMIT_MS) {
      setStatus("error");
      setErrorMessage(t("contact.rateLimitError"));
      return;
    }

    if (!name.trim()) {
      setStatus("error");
      setErrorMessage(t("contact.nameRequired"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage(t("contact.emailInvalid"));
      return;
    }
    if (!subject.trim()) {
      setStatus("error");
      setErrorMessage(t("contact.subjectRequired"));
      return;
    }
    if (!message.trim()) {
      setStatus("error");
      setErrorMessage(t("contact.messageRequired"));
      return;
    }

    setIsSubmitting(true);
    lastSubmitRef.current = Date.now();

    try {
      let delivered = false;
      let appsScriptResponseInvalid = false;

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
            appsScriptResponseInvalid = true;
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
          if (!response.ok || appsScriptResponseInvalid) {
            appsScriptResponseInvalid = true;
          }
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
          } catch {
            // A non-JSON response is treated as an unsuccessful delivery.
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
          appsScriptResponseInvalid
            ? `${t("contact.scriptSetupError")} ${t("contact.deliveryFailed")} ${CONTACT_EMAIL}.`
            : `${t("contact.deliveryFailed")} ${CONTACT_EMAIL}.`
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(`${t("contact.unexpectedError")} ${CONTACT_EMAIL}.`);
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
      e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--ring) 20%, transparent)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = surface.border;
      e.currentTarget.style.boxShadow = "none";
    },
  };

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      {/* Header */}
      <section style={{ padding: "56px 20px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: surface.ink }}>
            {t("contact.title")}
          </h1>
          <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.7, color: surface.muted }}>
            {t("contact.subtitle")}
          </p>
          <p style={{ margin: "10px 0 0", fontSize: 13.5, color: surface.muted }}>
            {t("contact.faqPrompt")}{" "}
            <a
              href="/support"
              onClick={(e) => {
                e.preventDefault();
                goToFaq();
              }}
              style={{ color: BRAND.primary, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2, cursor: "pointer" }}
            >
              {t("contact.faqLink")}
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
          borderRadius: 6,
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
            background: BRAND.maroon,
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
                color: "var(--secondary-foreground)",
                marginBottom: 18,
              }}
            >
              {t("home.tagline")}
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: 32,
                lineHeight: 1.2,
                fontWeight: 700,
                color: "var(--secondary-foreground)",
              }}
            >
              {t("contact.title")}
            </h1>
            <p
              style={{
                marginTop: 18,
                fontSize: 14.5,
                lineHeight: 1.7,
                color: "color-mix(in srgb, var(--secondary-foreground) 82%, transparent)",
                maxWidth: 340,
              }}
            >
              {t("contact.subtitle")}
            </p>
          </div>

          <div
            style={{
              position: "relative",
              fontSize: 13,
              color: "color-mix(in srgb, var(--secondary-foreground) 72%, transparent)",
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
                {t("contact.successTitle")}
              </h2>
              <p style={{ margin: 0, fontSize: 13.5, color: surface.muted }}>
                {t("contact.successMessage")}
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
                {t("contact.sendAnother")}
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
                    {t("contact.name")}*
                  </label>
                  <input
                    id="iqp-c-name"
                    type="text"
                    placeholder={t("contact.namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    {...focusHandlers}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="iqp-c-email" style={labelStyle}>
                    {t("contact.email")}*
                  </label>
                  <input
                    id="iqp-c-email"
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
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
                  {t("contact.subject")}*
                </label>
                <input
                  id="iqp-c-subject"
                  type="text"
                  placeholder={t("contact.subject")}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={inputStyle}
                  {...focusHandlers}
                  required
                />
              </div>

              <div style={{ marginBottom: errorMessage ? 8 : 20 }}>
                <label htmlFor="iqp-c-message" style={labelStyle}>
                  {t("contact.message")}*
                </label>
                <textarea
                  id="iqp-c-message"
                  placeholder={t("contact.message")}
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
                    {t("contact.openEmail")}
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
                  background: "var(--action)",
                  color: "var(--action-foreground)",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: isSubmitting ? "default" : "pointer",
                  transition: "background .15s ease",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t("contact.sending")}
                  </>
                ) : (
                  <>
                    {t("contact.send")}
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
          box-shadow: 0 16px 34px -16px color-mix(in srgb, var(--ring) 40%, transparent);
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
        .dark .iqp-contact-social {
          color: var(--secondary-foreground) !important;
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
      <section style={{ padding: "48px 24px 72px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: surface.ink }}>
            {t("contact.followTitle")}
          </h2>
          <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.7, color: surface.muted }}>
            {t("contact.connectSubtitle")}
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
                className="iqp-contact-social"
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
