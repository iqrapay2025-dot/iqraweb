import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";


interface SupportPageProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
}

export function SupportPage({
  darkMode = false,
  onNavigate,
}: SupportPageProps = {}) {
  const { t } = useLanguage();

  const faqs = [
    { id: "faq1", q: "support.faq1Q", a: "support.faq1A" },
    { id: "faq2", q: "support.faq2Q", a: "support.faq2A" },
    { id: "faq3", q: "support.faq3Q", a: "support.faq3A" },
    { id: "faq4", q: "support.faq4Q", a: "support.faq4A" },
    { id: "faq5", q: "support.faq5Q", a: "support.faq5A" },
    { id: "faq6", q: "support.faq6Q", a: "support.faq6A" },
    { id: "faq7", q: "support.faq7Q", a: "support.faq7A" },
  ];

  return (
    <div
      className="min-h-screen text-foreground"
      style={{
        backgroundColor: darkMode ? "#1a1a1a" : "var(--background)",
      }}
    >
      {/* FAQ Section */}
      <section
        className="py-20"
        style={{
          backgroundColor: darkMode ? "#1a1a1a" : "var(--background)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-[#1A5C38] dark:text-foreground text-[26px] sm:text-[36px] tracking-[-0.3px] leading-[1.3] mb-3">
              {t("support.faqTitle")}
            </h2>
          </motion.div>

          <div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="px-4 rounded-xl border bg-card shadow-sm mb-8 last:mb-0"
                >
                  <AccordionTrigger
                    className="font-display text-left text-[16px] font-semibold gap-4 py-4 hover:no-underline"
                  >
                    {t(faq.q)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="font-sans text-[15px] sm:text-[16px] text-muted-foreground leading-[1.7]">
                      {t(faq.a)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Below FAQ - fallback contact link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <p className="text-muted-foreground">
              Can&#39;t find what you&#39;re looking for?{" "}
              <a
                href="#contact"
                className="text-primary hover:text-primary/80 underline underline-offset-2"
              >
                Contact us directly
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      
    </div>
  );
}
