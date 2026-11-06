import { Target, Eye, Sparkles, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { IslamicPattern } from "./IslamicPattern";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import aboutHeroImage from "../assets/rawdah3.jpg";

import { motion } from "motion/react";
import { TeamCarousel, TeamMember } from "./TeamCarousel";
import { useLanguage } from "../contexts/LanguageContext";

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useLanguage();

  const values = [
    {
      icon: CheckCircle,
      title: t("about.authenticityTitle"),
      description: t("about.authenticityDesc"),
    },
    {
      icon: Sparkles,
      title: t("about.accountabilityTitle"),
      description: t("about.accountabilityDesc"),
    },
    {
      icon: Target,
      title: t("about.dignityTitle"),
      description: t("about.dignityDesc"),
    },
    {
      icon: Eye,
      title: t("about.communityTitle"),
      description: t("about.communityDesc"),
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Muhammad Jumah",
      role: t("about.member1Role"),
      location: "Ibadan, Nigeria",
      description: t("about.member1Bio"),
    },
    {
      id: 2,
      name: "Fatiah Badmus",
      role: t("about.member2Role"),
      location: "Osun, Nigeria",
      description: t("about.member2Bio"),
    },
    {
      id: 3,
      name: "Yusuf Olosan",
      role: t("about.member3Role"),
      location: "Ilorin, Nigeria",
      description: t("about.member3Bio"),
    },
    {
      id: 4,
      name: "Fasasi Zaynab Adeola",
      role: t("about.member4Role"),
      location: "Oyo, Nigeria",
      description: t("about.member4Bio"),
    },
    {
      id: 5,
      name: "Najeemdeen Zulqarnain",
      role: t("about.member5Role"),
      location: "Medina, Saudi Arabia",
      description: t("about.member5Bio"),
    },
    {
      id: 6,
      name: "Aderemi Fathia",
      role: t("about.member6Role"),
      location: "Ilorin, Nigeria",
      description: t("about.member6Bio"),
    },
    {
      id: 7,
      name: "Sule Jamiu Fātimah",
      role: t("about.member7Role"),
      location: "Kogi, Nigeria",
      description: t("about.member7Bio"),
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted px-5 py-14 md:px-8 md:py-20">
        <IslamicPattern />
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-5 text-balance text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl">{t("about.title")}</h1>
            <p className="mx-auto max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              {t("about.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={aboutHeroImage}
                  alt={t("about.heroImageAlt")}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl">
                {t("about.storyTitle")}
              </h2>
              <p className="text-muted-foreground">{t("about.storyBody")}</p>
              <div className="pt-4">
                <div className="inline-block px-4 py-2 bg-accent rounded-lg">
                  <span className="text-accent-foreground">
                    Est. 2025 • Certified Halal
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl mb-4">{t("about.visionTitle")}</h3>
                <p className="text-muted-foreground">{t("about.visionDesc")}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl mb-4">{t("about.missionTitle")}</h3>
                <p className="text-muted-foreground">
                  {t("about.missionDesc")}
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              {t("about.valuesTitle")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("about.valuesSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Are Now */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl mb-6">{t("about.whereWeAreTitle")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.whereWeAreBody")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
        <IslamicPattern />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl text-white">MJ</span>
            </div>
            <h2 className="text-3xl mb-4">{t("about.founderTitle")}</h2>
            <h3 className="text-xl text-primary mb-4">
              {t("about.founderName")}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              {t("about.founderBio")}
            </p>
            <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-6 py-2 max-w-2xl mx-auto">
              {t("about.founderQuote")}
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              {t("about.teamTitle")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("about.teamSubtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TeamCarousel teamMembers={teamMembers} />
          </motion.div>
        </div>
      </section>

      
    </div>
  );
}
