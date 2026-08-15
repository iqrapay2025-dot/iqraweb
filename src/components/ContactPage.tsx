import { useState } from "react";
import { Mail, MapPin, Phone, Send, MessageCircle, Twitter, Instagram } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { IslamicPattern } from "./IslamicPattern";
import { Footer } from "./Footer";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { CONTACT_ENDPOINT, CONTACT_EMAIL } from "../config/contact";

interface ContactPageProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
}

export function ContactPage({ darkMode = false, onNavigate }: ContactPageProps = {}) {
  const { t } = useLanguage();
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot: hidden from real users, filled by bots
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.emailLabel'),
            detail: CONTACT_EMAIL,
      link: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: Phone,
      title: t('contact.phoneLabel'),
      detail: "+234 815 595 6187",
      link: "tel:+2348155956187",
    },
    {
      icon: MapPin,
      title: t('contact.addressLabel'),
      detail: "Ibadan, Nigeria",
      link: null,
    },
  ];

  const socialLinks = [
    { icon: Twitter, label: "Twitter", url: "https://x.com/iqra_pay", color: "hover:text-blue-400" },
    { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/iqra_pay/", color: "hover:text-pink-500" },
  ];

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (): string => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!EMAIL_REGEX.test(formData.email.trim())) return "Please enter a valid email address.";
    if (!formData.subject.trim()) return "Please enter a subject.";
    if (!formData.message.trim()) return "Please enter a message.";
    if (formData.message.trim().length > 3000)
      return "Message is too long (max 3000 characters).";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: bots fill it, real users cannot see it. Discard silently.
    if (formData.website.trim() !== "") {
      return;
    }

    const error = validate();
    if (error) {
      toast.error(t('common.error'), { description: error });
      return;
    }

    // No backend configured? Open the user's email client pre-addressed
    // directly to iqrapay2025@gmail.com. No third-party relay, no exposed key.
    if (!CONTACT_ENDPOINT) {
      const body =
        `Name: ${formData.name.trim()}\n` +
        `Email: ${formData.email.trim()}\n` +
        `Subject: ${formData.subject.trim()}\n\n` +
        `${formData.message.trim()}`;
      const link =
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject.trim())}` +
        `&body=${encodeURIComponent(body)}`;
      window.location.href = link;
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        // text/plain is a CORS "simple" content type -> no preflight OPTIONS
        // request (Google Apps Script web apps answer OPTIONS with 405). The
        // body is still a JSON string the server parses via e.postData.contents.
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: "contact", ...formData }),
      });

      let result: { success?: boolean; message?: string } = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (result.success) {
        toast.success(t('contact.successTitle'), {
          description: t('contact.successMessage'),
        });
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      } else {
        toast.error(t('common.error'), {
          description: result.message || `Please try again or email us directly at ${CONTACT_EMAIL}.`,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-20 overflow-hidden">
        <IslamicPattern />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
                        <h1 className="font-display font-bold text-[#1A5C38] dark:text-foreground text-[32px] sm:text-[48px] tracking-[-0.5px] leading-[1.2] mb-4 text-center max-w-[800px] mx-auto">{t('contact.title')}</h1>
            <p className="font-sans text-[15px] sm:text-[16px] text-muted-foreground leading-[1.7] max-w-[680px] mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
            </section>

      {/* FAQ prompt above the contact form */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground">
            Looking for answers to common questions?{" "}
            <a
              href="#support"
              className="text-primary hover:text-primary/80 underline underline-offset-2"
            >
              Check our FAQ
            </a>
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-7 w-7 text-primary" />
                  </div>
                                    <h3 className="text-base font-medium text-foreground mb-1">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-muted-foreground hover:text-primary transition-colors">
                      {info.detail}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{info.detail}</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <div className="text-center mb-8">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h2 className="font-display font-bold text-[#1A5C38] dark:text-foreground text-[26px] sm:text-[36px] tracking-[-0.3px] leading-[1.3] mb-3">{t('contact.formTitle')}</h2>
                <p className="text-muted-foreground">
                  {t('contact.subtitle')}
                </p>
              </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot: hidden from real users, filled by bots only */}
                <div className="absolute left-[-9999px] top-[-9999px]">
                  <Label htmlFor="website" className="sr-only">If you are human, leave this blank</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.name')} *</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder={t('contact.name')} 
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.email')} *</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email" 
                      placeholder={t('contact.emailPlaceholder')} 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t('contact.subject')} *</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    placeholder={t('contact.subject')} 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.message')} *</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder={t('contact.message')} 
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-[#FFFDD0] font-display font-bold text-[16px]"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>{t('contact.sending')}</>
                  ) : (
                    <>
                      {t('contact.send')} <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                                <p className="font-sans text-sm text-center text-muted-foreground">
                  Thank You for reaching out!
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
                        <h2 className="font-display font-bold text-[#1A5C38] dark:text-foreground text-[26px] sm:text-[36px] tracking-[-0.3px] leading-[1.3] mb-3">Connect With Us</h2>
            <p className="text-muted-foreground mb-8">
              Follow us on social media for updates, inspiration, and community highlights
            </p>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border hover:shadow-lg transition-all ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
