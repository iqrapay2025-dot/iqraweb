import { Mail, Phone, MapPin } from "lucide-react";
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
    { name: t('footer.contact'), page: "contact" },
    { name: t('footer.faq'), page: "support" },
  ];

  const socialLinks = [
    { icon: "fab fa-x-twitter", href: "https://x.com/iqra_pay", label: "X / Twitter" },
    { icon: "fab fa-instagram", href: "https://www.instagram.com/iqra_pay/", label: "Instagram" },
    { icon: "fi-brands-linkedin", href: "https://www.linkedin.com/company/iqrapay", label: "LinkedIn" },
  ];

  return (
    <footer className="relative border-t border-secondary-foreground/10 bg-secondary text-secondary-foreground dark:border-border dark:bg-card dark:text-foreground">
      <IslamicPattern opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="mb-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {/* About Section */}
          <div>
            <img
              src={logoDark}
              alt="IqraPay Logo"
              className="h-10 w-auto mb-4"
              width="618"
              height="404"
            />
            <p className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/80 dark:text-foreground mb-4">
              {t('footer.tagline')}
            </p>
            <p className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/70 dark:text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-medium text-accent dark:text-foreground text-[16px] mb-3">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  {onNavigate ? (
                    <button
                      onClick={() => {
                        onNavigate(link.page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/80 dark:text-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={`#${link.page}`}
                      className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/80 dark:text-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200"
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
            <h3 className="font-display font-medium text-accent dark:text-foreground text-[16px] mb-3">{t('footer.connect')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent dark:text-primary" />
                <a href="mailto:support@iqrapay.com.ng" className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/80 dark:text-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200">
                  support@iqrapay.com.ng
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent dark:text-primary" />
                <a href="tel:+2348155956187" className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/80 dark:text-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200">
                  +234 815 595 6187
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent dark:text-primary" />
                <span className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/80 dark:text-foreground">Ibadan, Nigeria</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-sm bg-secondary-foreground/10 text-secondary-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground dark:bg-muted dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
                >
                  <i className={`${social.icon} text-xl text-inherit`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 dark:border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-[15px] text-secondary-foreground/70 dark:text-muted-foreground">
              © {currentYear} IqraPay. {t('footer.rights')}
            </p>
            <div className="flex gap-6">
              {onNavigate ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('privacy-policy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/70 dark:text-muted-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200"
                  >
                    {t('footer.privacyPolicy')}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('terms-of-service');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/70 dark:text-muted-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200"
                  >
                    {t('footer.termsOfService')}
                  </button>
                </>
              ) : (
                <>
                  <a href="/privacy-policy" className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/70 dark:text-muted-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200">
                    {t('footer.privacyPolicy')}
                  </a>
                  <a href="/terms-of-service" className="font-sans text-[15px] sm:text-[16px] text-secondary-foreground/70 dark:text-muted-foreground hover:text-accent dark:hover:text-primary transition-colors duration-200">
                    {t('footer.termsOfService')}
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="font-sans text-[15px] text-secondary-foreground/70 dark:text-muted-foreground italic">
              {t("footer.quote")}
            </p>
          </div>
        </div>
      </div>
    </footer>
    );
  }
