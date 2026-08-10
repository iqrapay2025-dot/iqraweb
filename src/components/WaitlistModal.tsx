import { useState } from "react";
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
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
    setSubmitted(false);
    setError("");
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
    try {
      const payload = { fullName: name, email, source };
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

      if (response.ok && result.success !== false) {
        setSubmitted(true);
        toast.success(t("waitlist.successTitle"), {
          description: t("waitlist.successMessage"),
        });
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
              onClick={() => onOpenChange(false)}
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
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
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
