import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { IslamicPattern } from "./IslamicPattern";
import { useLanguage } from "../contexts/LanguageContext";
import logoDark from "figma:asset/95c433e7c8d7b15a23b7736bc56fc1d657934d51.png";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('footer.home'), page: "home" },
    { name: t('footer.about'), page: "about" },
    { name: t('footer.howItWorks'), page: "how-it-works" },
    { name: t('footer.ambassadors'), page: "ambassadors" },
    { name: t('footer.blog'), page: "blog-list" },
    { name: t('footer.contact'), page: "contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/iqra_pay", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/iqra_pay/", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-secondary text-secondary-foreground mt-20 dark:bg-card dark:border-t dark:border-border">
      <IslamicPattern opacity={0.05} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <img 
              src={logoDark}
              alt="IqraPay Logo" 
              className="h-10 w-auto mb-4"
            />
            <p className="text-secondary-foreground/80 dark:text-foreground/80 mb-4">
              {t('footer.tagline')}
            </p>
            <p className="text-sm text-secondary-foreground/60 dark:text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-accent dark:text-primary">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  {onNavigate ? (
                    <button
                      onClick={() => {
                        onNavigate(link.page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-secondary-foreground/80 dark:text-foreground/70 hover:text-accent dark:hover:text-primary transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={`#${link.page}`}
                      className="text-secondary-foreground/80 dark:text-foreground/70 hover:text-accent dark:hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-accent dark:text-primary">{t('footer.connect')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-secondary-foreground/80 dark:text-foreground/70">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:iqrapay2025@gmail.com" className="hover:text-accent dark:hover:text-primary transition-colors duration-200">
                  iqrapay2025@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-secondary-foreground/80 dark:text-foreground/70">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a href="tel:+2348155956187" className="hover:text-accent dark:hover:text-primary transition-colors duration-200">
                  +234 815 595 6187
                </a>
              </li>
              <li className="flex items-start gap-2 text-secondary-foreground/80 dark:text-foreground/70">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Ibadan, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="mb-4 text-accent dark:text-primary">{t('footer.connect')}</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-secondary-foreground/10 dark:bg-muted hover:bg-accent dark:hover:bg-primary hover:text-secondary dark:hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-secondary-foreground/60 dark:text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 dark:border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/60 dark:text-muted-foreground">
              © {currentYear} IqraPay. {t('footer.rights')}
            </p>
            <div className="flex gap-6 text-sm">
              {onNavigate ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('privacy-policy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-secondary-foreground/60 dark:text-muted-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200"
                  >
                    {t('footer.privacyPolicy')}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('terms-of-service');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-secondary-foreground/60 dark:text-muted-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200"
                  >
                    {t('footer.termsOfService')}
                  </button>
                </>
              ) : (
                <>
                  <a href="#privacy-policy" className="text-secondary-foreground/60 dark:text-muted-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200">
                    {t('footer.privacyPolicy')}
                  </a>
                  <a href="#terms-of-service" className="text-secondary-foreground/60 dark:text-muted-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200">
                    {t('footer.termsOfService')}
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-secondary-foreground/50 dark:text-muted-foreground/70 italic">
              "Read in the name of your Lord who created" - Surah Al-Alaq (96:1)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
