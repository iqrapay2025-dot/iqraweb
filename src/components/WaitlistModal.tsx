import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";
import { GOOGLE_SHEETS_ENDPOINT } from "../config/waitlist";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

export function WaitlistModal({
  open,
  onOpenChange,
  source = "navbar",
}: WaitlistModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isConfigured =
    !!GOOGLE_SHEETS_ENDPOINT &&
    GOOGLE_SHEETS_ENDPOINT.trim() !== "" &&
    GOOGLE_SHEETS_ENDPOINT !== "https://script.google.com/macros/s/AKfycbyWJ5qJPf3Yt1UwmaoRmPTHkLDeSqdV8QU5-tEtxLeVqTpu42AjbuU79MNeflJBuI8Lzg/exec";

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

    if (!isConfigured) {
      toast.error(t("common.error"), {
        description: t("waitlist.notConfigured"),
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Payload keys map to your Sheet columns (see src/config/waitlist.ts)
      const payload = {
        name,
        email,
        source,
      };

      const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result: any = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (response.ok && result.success !== false) {
        setSubmitted(true);
        toast.success(t("waitlist.successTitle"), {
          description: t("waitlist.successMessage"),
          icon: <CheckCircle2 className="h-5 w-5" />,
        });
      } else {
        setError(t("waitlist.submitError"));
        toast.error(t("common.error"), {
          description: t("waitlist.submitError"),
        });
      }
    } catch (err) {
      setError(t("waitlist.submitError"));
      toast.error(t("common.error"), {
        description: t("waitlist.submitError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md gap-0 overflow-hidden rounded-2xl border border-border bg-background p-0">
        {/* Decorative header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-card via-background to-background px-7 pb-6 pt-8 text-center">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-amber/20 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-medium text-teal-light">
              <Sparkles className="h-3.5 w-3.5" />
              {t("waitlist.badge")}
            </span>

            <DialogTitle className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              {t("waitlist.title")}
            </DialogTitle>
            <DialogDescription className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              {t("waitlist.description")}
            </DialogDescription>
          </div>
        </div>

        {/* Form body */}
        <div className="px-7 pb-8">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal/15">
                <CheckCircle2 className="h-9 w-9 text-teal" />
              </div>
              <h3 className="text-xl font-semibold">{t("waitlist.successTitle")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("waitlist.successMessage")}
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => onOpenChange(false)}
              >
                {t("common.close")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="wl-name">{t("waitlist.name")}</Label>
                <Input
                  id="wl-name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("waitlist.namePlaceholder")}
                  className="h-11 rounded-lg bg-input-background"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="wl-email">{t("waitlist.email")}</Label>
                <Input
                  id="wl-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("waitlist.emailPlaceholder")}
                  className="h-11 rounded-lg bg-input-background"
                  required
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group mt-2 h-12 w-full rounded-lg bg-gradient-to-r from-teal to-teal-dark text-white shadow-lg shadow-teal/20 transition-all hover:scale-[1.02] hover:shadow-teal/30"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t("waitlist.submitting")}
                  </>
                ) : (
                  <>
                    {t("waitlist.join")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                {t("waitlist.privacy")}
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function openWaitlist(source = "generic") {
  window.dispatchEvent(new CustomEvent("iqrapay:open-waitlist", { detail: { source } }));
}
