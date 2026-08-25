import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";
import { GOOGLE_SHEETS_ENDPOINT } from "../config/waitlist";
import logoLight from "figma:asset/39ba4a0dd03e9a935003109f9573af3b0b10ff85.png";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

// IqraPay brand palette
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

export function WaitlistModal({
  open,
  onOpenChange,
  source = "hero",
}: WaitlistModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [referralAutoFilled, setReferralAutoFilled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [botField, setBotField] = useState(""); // honeypot: invisible to humans, bots fill it
  const lastSubmitRef = useRef(0); // client-side cooldown between submissions

  // Client-side rate limiter. The Apps Script endpoint accepts anonymous
  // posts (there's no server-side throttle), so we enforce a small cooldown
  // here to discourage bots from flooding the sheet.
  const RATE_LIMIT_MS = 5000;

  // Auto-fill referral code from the UTM link ambassadors share
  // (?utm_content=IQP-XXX##) so visitors don't have to type it manually.
  // Runs whenever the modal opens; reads the query string at that moment.
  // Won't overwrite a code the visitor already typed themselves.
  useEffect(() => {
    if (!open) return;
    const params = new URLSearchParams(window.location.search);
    const utmContent = params.get("utm_content");
    if (utmContent && !referralCode) {
      setReferralCode(utmContent.toUpperCase());
      setReferralAutoFilled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Normalize the configured endpoint: accepts either a full Web App URL
  // (https://script.google.com/macros/s/<ID>/exec) OR a bare Apps Script ID.
  // This keeps the form working whether the config holds the ID or the URL.
  const isConfigured = !!(GOOGLE_SHEETS_ENDPOINT || "").trim();
  const resolvedEndpoint = isConfigured
    ? GOOGLE_SHEETS_ENDPOINT.startsWith("http")
      ? GOOGLE_SHEETS_ENDPOINT
      : `https://script.google.com/macros/s/${GOOGLE_SHEETS_ENDPOINT}/exec`
    : "";

  const resetForm = () => {
    setName("");
    setEmail("");
    setReferralCode("");
    setReferralAutoFilled(false);
    setSubmitted(false);
    setError("");
    setBotField("");
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      resetForm();
    }
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Honeypot: humans never see this field, bots do fill it. Discard
    // silently so bots don't learn from an error response.
    if (botField.trim() !== "") return;

    // Rate limit: block rapid-fire submissions to the public sheet.
    const nowMs = Date.now();
    if (nowMs - lastSubmitRef.current < RATE_LIMIT_MS) {
      setError("Please wait a moment before trying again.");
      return;
    }

    if (!name.trim()) {
      setError("Enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!isConfigured) {
      toast.error(t("common.error"), {
        description: t("waitlist.notConfigured"),
      });
      return;
    }

    setIsSubmitting(true);
    lastSubmitRef.current = Date.now();
    try {
      const payload = {
        fullName: name,
        email,
        source,
        referralCode: referralCode.trim(),
      };
      const response = await fetch(resolvedEndpoint, {
        method: "POST",
        // Use text/plain — a CORS *simple* content type — instead of
        // application/json. application/json is non-simple, so the browser
        // sends a preflight OPTIONS request first, and Google Apps Script web
        // apps answer that with 405, which makes the browser block the real
        // POST (this is what produced "Something went wrong"). text/plain
        // skips the preflight; the body is still a JSON string that doPost
        // parses via e.postData.contents, so no Apps Script change is needed.
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      let result: Record<string, unknown> = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      // Apps Script responses: "duplicate_email" / "duplicate_name" keep the
      // form open with an explanation via setError (the row was NOT saved);
      // "success" shows the normal success state. Non-ok responses fall
      // through to the error branch below.
      if (response.ok) {
        if (result.result === "duplicate_email") {
          setError(
            "This email address is already on our waitlist. JazakAllahu khayran — you are already registered. 🌿"
          );
          return;
        }
        if (result.result === "duplicate_name") {
          setError(
            "This name is already on our waitlist. If this is you, JazakAllahu khayran — you are already registered. If you are a different person, please contact us at iqrapay2025@gmail.com 🌿"
          );
          return;
        }
        if (result.result === "success") {
          setSubmitted(true);
          toast.success(t("waitlist.successTitle"), {
            description: t("waitlist.successMessage"),
          });
          return;
        }
      } else {
        // Surface the real HTTP status so CORS/script errors are diagnosable
        const detail =
          `${response.status} ${response.statusText}`.trim() ||
          String(response.status);
        console.error(
          "Waitlist submission failed:",
          response.status,
          response.statusText,
        );
        setError(`${t("waitlist.submitError")} (${detail})`);
        toast.error(t("common.error"), {
          description: `${t("waitlist.submitError")} (${detail})`,
        });
      }
    } catch (err: unknown) {
      const detail = err instanceof Error ? err.message : String(err);
      console.error("Waitlist submission error:", err);
      setError(`${t("waitlist.submitError")} (${detail})`);
      toast.error(t("common.error"), {
        description: `${t("waitlist.submitError")} (${detail})`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 13px",
    borderRadius: 9,
    border: `1px solid ${BRAND.border}`,
    background: BRAND.cream,
    color: BRAND.ink,
    fontSize: 13.5,
    outline: "none",
    marginBottom: 14,
    fontFamily: "inherit",
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="gap-0 overflow-hidden border-0 p-0 waitlist-modal sm:max-w-[640px] shadow-2xl"
        style={{
          borderRadius: 24,
        }}
        hideDefaultCloseButton
      >
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "24px 24px 28px",
            margin: 14,
            background: "#ffffff",
            border: `1px solid ${BRAND.border}`,
            borderRadius: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <img
              src={logoLight}
              alt="IqraPay"
              style={{ height: 40, width: "auto" }}
            />

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                background: "#ef4444",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#dc2626";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ef4444";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div
            style={{
              background: BRAND.white,
              borderRadius: 18,
              padding: "26px 24px",
            }}
          >
            {!submitted ? (
              <>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 19,
                    fontWeight: 700,
                    color: BRAND.ink,
                    textAlign: "center",
                  }}
                >
                  {t("waitlist.title")}
                </h1>
                <p
                  style={{
                    margin: "6px 0 20px",
                    fontSize: 12.5,
                    color: BRAND.muted,
                    textAlign: "center",
                  }}
                >
                  {t("waitlist.description")}
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot — hidden off-screen, only bots fill it */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      top: "-9999px",
                    }}
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

                  <label
                    htmlFor="iqp-name"
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: BRAND.ink,
                      marginBottom: 6,
                    }}
                  >
                    {t("waitlist.name")}
                  </label>
                  <input
                    id="iqp-name"
                    type="text"
                    placeholder={t("waitlist.namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ ...inputStyle }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = BRAND.accent;
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(245,158,11,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = BRAND.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    required
                  />

                  <label
                    htmlFor="iqp-email"
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: BRAND.ink,
                      marginBottom: 6,
                    }}
                  >
                    {t("waitlist.email")}
                  </label>
                  <input
                    id="iqp-email"
                    type="email"
                    placeholder={t("waitlist.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ ...inputStyle, marginBottom: error ? 8 : 14 }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = BRAND.accent;
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(245,158,11,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = BRAND.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    required
                  />

                  <label
                    htmlFor="iqp-referral"
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: BRAND.ink,
                      marginBottom: 6,
                    }}
                  >
                    Referral Code (optional)
                  </label>
                  <input
                    id="iqp-referral"
                    type="text"
                    placeholder="e.g. IQP-OLK01"
                    value={referralCode}
                    onChange={(e) => {
                      setReferralCode(e.target.value.toUpperCase());
                      setReferralAutoFilled(false);
                    }}
                    style={{ ...inputStyle, marginBottom: 6 }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = BRAND.accent;
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(245,158,11,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = BRAND.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {referralAutoFilled && (
                    <p
                      style={{
                        margin: "-2px 0 8px",
                        fontSize: 11,
                        color: BRAND.primary,
                        fontWeight: 600,
                      }}
                    >
                      ✓ Referral code applied
                    </p>
                  )}
                  <p
                    style={{
                      margin: "-2px 0 14px",
                      fontSize: 11,
                      color: BRAND.muted,
                    }}
                  >
                    If a Campus Ambassador referred you, enter their code here.
                  </p>
                  {error && (
                    <p
                      style={{
                        margin: "0 0 14px",
                        fontSize: 12,
                        color: BRAND.error,
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 9,
                      border: "none",
                      background: isSubmitting
                        ? BRAND.primaryDark
                        : BRAND.primary,
                      color: BRAND.white,
                      fontSize: 13.5,
                      fontWeight: 700,
                      cursor: isSubmitting ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      transition: "background .15s ease",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        {t("waitlist.submitting")}
                      </>
                    ) : (
                      t("waitlist.join")
                    )}
                  </button>

                  <p
                    style={{
                      marginTop: 16,
                      marginBottom: 0,
                      fontSize: 12,
                      color: BRAND.muted,
                      textAlign: "center",
                    }}
                  >
                    {t("waitlist.privacy")}{" "}
                    <span style={{ color: BRAND.darkCyan, fontWeight: 600 }}>
                      Read. Learn. Earn.
                    </span>
                  </p>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "6px 0 4px" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: BRAND.cream,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={BRAND.primary}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="20"
                    height="20"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2
                  style={{
                    margin: "0 0 6px",
                    fontSize: 17,
                    color: BRAND.ink,
                    fontWeight: 700,
                  }}
                >
                  {t("waitlist.successTitle")}
                </h2>
                <p style={{ margin: 0, fontSize: 13, color: BRAND.muted }}>
                  {t("waitlist.successMessage")}
                </p>
                <a
                  href="https://chat.whatsapp.com/Ej08ZEjAnlyAS7vE6uY7W8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 16,
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 9,
                    border: "none",
                    background: "#25D366",
                    color: "#ffffff",
                    fontSize: 13.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    textDecoration: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Join our WhatsApp Community
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  style={{
                    marginTop: 18,
                    width: "100%",
                    padding: "10px 16px",
                    borderRadius: 9,
                    border: `1px solid ${BRAND.border}`,
                    background: "none",
                    color: BRAND.ink,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {t("common.close")}
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function openWaitlist(source = "generic") {
  window.dispatchEvent(
    new CustomEvent("iqrapay:open-waitlist", { detail: { source } }),
  );
}