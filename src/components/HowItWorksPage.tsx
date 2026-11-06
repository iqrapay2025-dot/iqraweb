import { useState } from "react";
import { UserPlus, BookOpen, Award, Wallet, TrendingUp, Shield, CheckCircle2, Target, ShoppingBag, Lightbulb, ChevronDown } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { IslamicPattern } from "./IslamicPattern";

import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { openWaitlist } from "./WaitlistModal";

interface HowItWorksPageProps {
  onNavigate?: (page: string) => void;
}

export function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    { question: t('howItWorks.faq1Q'), answer: t('howItWorks.faq1A') },
    { question: t('howItWorks.faq2Q'), answer: t('howItWorks.faq2A') },
    { question: t('howItWorks.faq3Q'), answer: t('howItWorks.faq3A') },
    { question: t('howItWorks.faq4Q'), answer: t('howItWorks.faq4A') },
    { question: t('howItWorks.faq5Q'), answer: t('howItWorks.faq5A') },
    { question: t('howItWorks.faq6Q'), answer: t('howItWorks.faq6A') },
  ];

  const steps = [
    {
      icon: UserPlus,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
      details: [t('howItWorks.step1Detail1'), t('howItWorks.step1Detail2'), t('howItWorks.step1Detail3')],
    },
    {
      icon: BookOpen,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
      details: [t('howItWorks.step2Detail1'), t('howItWorks.step2Detail2'), t('howItWorks.step2Detail3')],
    },
    {
      icon: BookOpen,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
      details: [t('howItWorks.step3Detail1'), t('howItWorks.step3Detail2'), t('howItWorks.step3Detail3')],
    },
    {
      icon: CheckCircle2,
      title: t('howItWorks.step4Title'),
      description: t('howItWorks.step4Desc'),
      details: [t('howItWorks.step4Detail1'), t('howItWorks.step4Detail2'), t('howItWorks.step4Detail3')],
    },
    {
      icon: Shield,
      title: t('howItWorks.step5Title'),
      description: t('howItWorks.step5Desc'),
      details: [t('howItWorks.step5Detail1'), t('howItWorks.step5Detail2'), t('howItWorks.step5Detail3')],
    },
    {
      icon: Award,
      title: t('howItWorks.step6Title'),
      description: t('howItWorks.step6Desc'),
      details: [t('howItWorks.step6Detail1'), t('howItWorks.step6Detail2'), t('howItWorks.step6Detail3')],
    },
    {
      icon: Wallet,
      title: t('howItWorks.step7Title'),
      description: t('howItWorks.step7Desc'),
      details: [t('howItWorks.step7Detail1'), t('howItWorks.step7Detail2'), t('howItWorks.step7Detail3')],
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background px-5 py-14 md:px-8 md:py-20">
        <IslamicPattern />
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-5 text-balance text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl">{t('howItWorks.title')}</h1>
            <p className="mx-auto max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-action">
                      <step.icon className="h-6 w-6 text-action-foreground" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  <ul className="space-y-2.5">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Verify Learning */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl mb-6">{t('howItWorks.whyVerifyTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('howItWorks.whyVerifyBody')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* How Rewards Work */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl mb-4">{t('howItWorks.rewardsTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center hover:shadow-xl transition-shadow h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl mb-3">{t('howItWorks.reward1Title')}</h3>
                <p className="text-muted-foreground">{t('howItWorks.reward1Desc')}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center hover:shadow-xl transition-shadow h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl mb-3">{t('howItWorks.reward2Title')}</h3>
                <p className="text-muted-foreground">{t('howItWorks.reward2Desc')}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center hover:shadow-xl transition-shadow h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl mb-3">{t('howItWorks.reward3Title')}</h3>
                <p className="text-muted-foreground">{t('howItWorks.reward3Desc')}</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Donors */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl mb-6">{t('howItWorks.donorsTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('howItWorks.donorsBody')}
            </p>
            <Button
              size="lg"
              className="bg-action hover:bg-action/90 text-action-foreground px-8 transition-all hover:scale-105 hover:shadow-lg"
              onClick={() => {
                if (onNavigate) {
                  onNavigate("support");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  window.history.pushState({ page: "support" }, "", "/support");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              {t('howItWorks.donorsButton')}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl mb-4">{t('howItWorks.faqTitle')}</h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <h3 className="text-xl pr-4">{item.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl mb-6">{t('howItWorks.ctaTitle')}</h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('howItWorks.ctaDesc')}
            </p>
            <Button
              size="lg"
              className="bg-action hover:bg-action/90 text-action-foreground px-8 transition-all hover:scale-105 hover:shadow-lg"
              onClick={() => openWaitlist("how-it-works")}
            >
              Join Waitlist Now
            </Button>
          </motion.div>
        </div>
      </section>

      
    </div>
  );
}