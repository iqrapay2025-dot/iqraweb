import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "motion/react";
import { toast } from "sonner";
import { CONTACT_ENDPOINT, CONTACT_EMAIL, FORM_SUBMIT_ENDPOINT } from "../config/contact";

export function NewsletterSubscribe() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    subject: "New Newsletter Subscription - IqraPay",
    website: "", // honeypot: hidden from real users, filled by bots
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: bots fill it, real users cannot see it. Discard silently.
    if (formData.website.trim() !== "") {
      return;
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      toast.error(t('common.error'), { description: "Please enter a valid email address." });
      return;
    }

    // Build a mailto: link as a last-resort fallback — it opens the user's
    // email client pre-addressed to iqrapay2025@gmail.com so a message can
    // always reach us even if both backend endpoints fail.
    const mailtoBody = `New newsletter subscription from: ${formData.email.trim()}`;
    const mailtoLink =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject)}` +
      `&body=${encodeURIComponent(mailtoBody)}`;

    setIsSubmitting(true);

    try {
      let success = false;
      let serverMessage: string | undefined;

      // Try Google Apps Script first, then FormSubmit as a safety net so a
      // broken or slow Apps Script endpoint never blocks a subscription.
      if (CONTACT_ENDPOINT) {
        try {
          // Preferred: Google Apps Script → GmailApp.sendEmail → iqrapay2025@gmail.com
          const response = await fetch(CONTACT_ENDPOINT, {
            method: "POST",
            // text/plain is a CORS "simple" content type -> no preflight OPTIONS
            // request (Google Apps Script web apps answer OPTIONS with 405). The
            // body is still a JSON string the server parses via e.postData.contents.
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
              action: "subscribe",
              email: formData.email.trim(),
              message: `New newsletter subscription from: ${formData.email.trim()}`,
            }),
          });

          const result = await response.json().catch(() => ({}));
          success =
            result.success === true ||
            result.success === "true" ||
            result.ok === true;
          serverMessage = result.message;
        } catch {
          success = false;
        }
      }

      if (!success) {
        // Fallback: FormSubmit.co delivers directly to iqrapay2025@gmail.com
        try {
          const fsBody = new FormData();
          fsBody.append("email", formData.email.trim());
          fsBody.append("_subject", formData.subject);
          fsBody.append("_replyto", formData.email.trim());
          fsBody.append(
            "message",
            `New newsletter subscription from: ${formData.email.trim()}`
          );
          // Disable FormSubmit's own honeypot since we enforce our own.
          fsBody.append("_captcha", "false");

          const response = await fetch(FORM_SUBMIT_ENDPOINT, {
            method: "POST",
            body: fsBody,
            headers: { Accept: "application/json" },
          });

          const text = await response.text().catch(() => "");
          try {
            const result = JSON.parse(text);
            // FormSubmit AJAX API returns success as a STRING "true"/"false"
            // (not a boolean), and may also echo `ok`. Accept any truthy form.
            success =
              result.ok === true ||
              result.success === true ||
              result.success === "true";
            serverMessage =
              typeof result.message === "string" ? result.message : undefined;
          } catch {
            success = false;
          }
        } catch {
          success = false;
        }
      }

      if (success) {
        toast.success(t('newsletter.successTitle'), {
          description: t('newsletter.successMessage'),
          icon: <CheckCircle className="h-5 w-5" />
        });
        setFormData({
          email: "",
          subject: "New Newsletter Subscription - IqraPay",
          website: "",
        });
      } else {
        // Either backend rejected the submission or wasn't configured.
        // Offer a one-click mailto: fallback so the visitor can still reach us.
        toast.error(t('common.error'), {
          description: serverMessage || `Could not subscribe right now. You can still email us at ${CONTACT_EMAIL}.`,
          action: {
            label: "Open Email",
            onClick: () => { window.location.href = mailtoLink; },
          },
        });
      }
    } catch {
      toast.error(t('common.error'), {
        description: `Please try again or email us directly at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 md:p-12 text-center bg-background/80 backdrop-blur-sm border-2">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-display font-bold text-[#1A5C38] dark:text-foreground text-[26px] sm:text-[36px] tracking-[-0.3px] leading-[1.3] mb-3">
              {t('newsletter.title')}
            </h2>
            <p className="font-sans text-[15px] sm:text-[16px] text-muted-foreground leading-[1.7] mb-8 max-w-[680px] mx-auto">
              {t('newsletter.description')}
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              {/* Honeypot: hidden from real users, filled by bots only */}
              <div className="absolute left-[-9999px] top-[-9999px]">
                <Input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    name="email"
                    placeholder={t('newsletter.placeholder')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 text-center sm:text-left"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-[#FFFDD0] font-display font-bold text-[16px] h-12 px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>{t('newsletter.subscribing')}</>
                  ) : (
                    <>
                      {t('newsletter.subscribe')} <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <p className="font-sans text-sm text-center text-muted-foreground mt-4">
                {t('newsletter.privacy')}
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
