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
import { toast, Toaster } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";

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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.emailLabel'),
      detail: "iqrapay2025@gmail.com",
      link: "mailto:iqrapay2025@gmail.com",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "ae27bb89-a980-4ca2-9eed-65eac83a9aed",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(t('contact.successTitle'), {
          description: t('contact.successMessage'),
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(t('common.error'), {
          description: "Please try again or email us directly.",
        });
      }
    } catch (error) {
      toast.error(t('common.error'), {
        description: "Please try again or email us directly at iqrapay2025@gmail.com",
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
            <h1 className="text-4xl sm:text-5xl mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
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
                  <h3 className="text-xl mb-2">{info.title}</h3>
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
                <h2 className="text-3xl mb-2">{t('contact.formTitle')}</h2>
                <p className="text-muted-foreground">
                  {t('contact.subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
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

                <p className="text-xs text-center text-muted-foreground">
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
            <h2 className="text-3xl mb-4">Connect With Us</h2>
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
