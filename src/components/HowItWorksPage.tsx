import { UserPlus, BookOpen, Award, TrendingUp, Shield, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { IslamicPattern } from "./IslamicPattern";
import { Footer } from "./Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface HowItWorksPageProps {
  onNavigate?: (page: string) => void;
}

export function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  const { t } = useLanguage();
  
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
      icon: Award,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
      details: [t('howItWorks.step3Detail1'), t('howItWorks.step3Detail2'), t('howItWorks.step3Detail3')],
    },
    {
      icon: TrendingUp,
      title: t('howItWorks.step4Title'),
      description: t('howItWorks.step4Desc'),
      details: [t('howItWorks.step4Detail1'), t('howItWorks.step4Detail2'), t('howItWorks.step4Detail3')],
    },
  ];

  const halalFeatures = [
    {
      icon: Shield,
      title: t('howItWorks.halalTitle1'),
      description: t('howItWorks.halalDesc1'),
    },
    {
      icon: CheckCircle2,
      title: t('howItWorks.halalTitle2'),
      description: t('howItWorks.halalDesc2'),
    },
    {
      icon: Award,
      title: t('howItWorks.halalTitle3'),
      description: t('howItWorks.halalDesc3'),
    },
  ];

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
            <h1 className="text-4xl sm:text-5xl mb-6">{t('howItWorks.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                  <div className="flex-1">
                    <Card className="p-8 hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground">
                              {index + 1}
                            </div>
                            <h3 className="text-2xl">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-4">{step.description}</p>
                          <ul className="space-y-2">
                            {step.details.map((detail) => (
                              <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="md:w-24 flex items-center justify-center">
                    {index < steps.length - 1 && (
                      <div className="hidden md:block w-0.5 h-12 bg-gradient-to-b from-primary to-secondary" />
                    )}
                  </div>
                  <div className="flex-1 md:flex hidden" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Halal & Transparent System */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
        <IslamicPattern />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-accent rounded-full mb-6">
              <span className="text-accent-foreground">✓ 100% Halal Certified</span>
            </div>
            <h2 className="text-3xl sm:text-4xl mb-4">{t('howItWorks.halalSectionTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorks.halalSectionDesc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {halalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl mb-6 text-center">{t('howItWorks.revenueTitle')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Ethical Advertising:</strong> Only ads from halal-certified businesses and services
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Premium Subscriptions:</strong> Optional premium content with enhanced features
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Educational Partnerships:</strong> Collaborations with Islamic institutions and scholars
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Charitable Contributions:</strong> 2.5% of all profits go to Zakat-eligible causes
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 transition-all hover:scale-105 hover:shadow-lg"
              asChild
            >
              <a
                href="https://chat.whatsapp.com/Ej08ZEjAnlyAS7vE6uY7W8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Waitlist Now
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
