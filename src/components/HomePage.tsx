import { BookOpen, Brain, Wallet, Users, Award, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { IslamicPattern } from "./IslamicPattern";
import heroImage from "../assets/home-hero.png";

import { TestimonialCarousel } from "./TestimonialCarousel";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { openWaitlist } from "./WaitlistModal";

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();

  const steps = [
    {
      icon: BookOpen,
      title: t('home.readTitle'),
      description: t('home.readDesc'),
      color: "bg-action",
    },
    {
      icon: Brain,
      title: t('home.learnTitle'),
      description: t('home.learnDesc'),
      color: "bg-secondary",
    },
    {
      icon: Wallet,
      title: t('home.earnTitle'),
      description: t('home.earnDesc'),
      color: "bg-action",
    },
  ];

  const whoIsFor = [
    {
      title: t('home.studentTitle'),
      description: t('home.studentDesc'),
      icon: BookOpen,
    },
    {
      title: t('home.universityTitle'),
      description: t('home.universityDesc'),
      icon: Award,
    },
    {
      title: t('home.revertTitle'),
      description: t('home.revertDesc'),
      icon: Users,
    },
    {
      title: t('home.anyoneTitle'),
      description: t('home.anyoneDesc'),
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <IslamicPattern />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
          <div className="md:pr-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="max-w-xl text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                {t('home.tagline')}
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                {t('home.heroDescription')}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button 
                  size="lg" 
                  className="rounded-lg px-7 text-sm font-semibold shadow-md transition hover:-translate-y-0.5"
                  asChild
                >
                  <a href="https://chat.whatsapp.com/Ej08ZEjAnlyAS7vE6uY7W8" target="_blank" rel="noopener noreferrer">
                    {t('home.getStarted')}
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-lg border-secondary/30 bg-background px-7 text-sm font-semibold text-secondary transition hover:border-secondary hover:bg-secondary hover:text-secondary-foreground dark:border-white dark:text-white dark:hover:border-white dark:hover:bg-white/10 dark:hover:text-white"
                  onClick={() => openWaitlist("hero")}
                >
                  {t('waitlist.join')}
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Verified learning · Free to join
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[26rem] md:justify-self-end"
          >
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
            <img
              src={heroImage}
              alt="A learner reading the Quran"
              className="relative z-10 aspect-[4/3] w-full rounded-2xl object-cover object-center shadow-xl sm:aspect-[4/5]"
              width="570"
              height="760"
            />
            <div className="absolute bottom-5 right-4 z-20 rounded-xl bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
              <div className="text-lg font-bold text-secondary">100%</div>
              <div className="text-xs text-muted-foreground">Verified skills</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="bg-background px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t('home.stepsTitle')}</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative h-full overflow-hidden rounded-2xl border-border/70 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${step.color}`}>
                    <step.icon className={`h-6 w-6 ${step.color === "bg-action" ? "text-action-foreground" : "text-secondary-foreground"}`} />
                  </div>
                  <div className="mb-2 text-xs font-bold tracking-widest text-primary">0{index + 1}</div>
                  <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg" 
              className="rounded-sm px-7 text-sm font-semibold shadow-md transition hover:brightness-95"
              onClick={() => openWaitlist("how-it-works")}
            >
              {t('home.howItWorksCta')}
            </Button>
          </div>
        </div>
      </section>

      {/* Who Is IqraPay For */}
      <section className="bg-background px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">{t('home.whoIsForTitle')}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whoIsFor.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full rounded-2xl p-5 text-left transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Learner stories</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TestimonialCarousel />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mb-12 overflow-hidden bg-secondary px-5 py-16 text-secondary-foreground md:mb-16 md:px-8 md:py-24">
        <IslamicPattern />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heart className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl mb-6">{t('home.ctaTitle')}</h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed opacity-90">
              {t('home.ctaDescription')}
            </p>
            <Button 
              size="lg" 
              className="bg-white text-secondary hover:bg-white/90 px-8"
              asChild
            >
              <a href="https://chat.whatsapp.com/Ej08ZEjAnlyAS7vE6uY7W8" target="_blank" rel="noopener noreferrer">
                {t('home.joinNow')}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      
    </div>
  );
}
