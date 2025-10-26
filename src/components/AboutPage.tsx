import { Target, Eye, Sparkles, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { IslamicPattern } from "./IslamicPattern";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";
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
      title: t("about.faithFirstTitle"),
      description: t("about.faithFirstDesc"),
    },
    {
      icon: Sparkles,
      title: t("about.transparencyTitle"),
      description: t("about.transparencyDesc"),
    },
    {
      icon: Target,
      title: t("about.excellenceTitle"),
      description: t("about.excellenceDesc"),
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
      role: "Founder & CEO",
      location: "Ibadan, Nigeria",
      description:
        "Visionary student and entrepreneur passionate about merging faith, education, and technology. Currently studying Linguistics at the University of Ilorin.",
    },
    {
      id: 2,
      name: "Fatiah Badmus",
      role: "Co-Founder",
      location: "Osun, Nigeria",
      description:
        "Muslimah • Writer • WHO-Certified Mental Health Coach. Founder of Soothopedia, merging faith and psychology to inspire healing and wholeness. Advocates mental wellness, healthy love, and purposeful living through her words.",
    },
    {
      id: 3,
      name: "Ibrahim Yusuf",
      role: "Chief Technology Officer (CTO)",
      location: "Abuja, Nigeria",
      description:
        "Full-stack developer with expertise in fintech and educational platforms. Ensures our platform is secure, scalable, and user-friendly.",
    },
    {
      id: 4,
      name: "Fasasi Zaynab Adeola",
      role: "Chief Operations Officer (COO)",
      location: "Oyo, Nigeria",
      description:
        "I'm Fasasi Zaynab Adeola, also known as Almubtasimah, a writer, poet, designer, and creative strategist with a strong passion for innovation and problem-solving. My work focuses on creating purposeful and visually engaging content that connects ideas with impact. I combine creativity, communication, and analytical thinking to deliver meaningful results across writing and design projects.",
    },
    {
      id: 5,
      name: "Bilal Ahmed",
      role: "Chief Shariah Officer (CSO)",
      location: "Ilorin, Nigeria",
      description:
        "Islamic scholar ensuring all platform operations align with Shariah principles. Provides guidance on halal earning mechanisms.",
    },
    {
      id: 6,
      name: "Zainab Malik",
      role: "Chief Marketing Officer (CMO)",
      location: "Port Harcourt, Nigeria",
      description:
        "Digital marketing expert focused on spreading IqraPay's mission across the Muslim world through ethical marketing strategies.",
    },
    {
      id: 7,
      name: "Sule Jamiu Fātimah",
      role: "Design Lead",
      location: "Port Harcourt, Nigeria",
      description:
        "Meet Oyiza (Sule Jamiu Fātimah) A passionate graphic designer in training and the creative mind behind Estrella Creative Hub . She also enjoys digital Arabic calligraphy as a hobby.Currently studying Optometry at the University of Ilorin and Islamic studies at Ma'had Ibn Rajab , Oyiza finds peace in great design, creativity, books, and poetry — all fueled by her love for learning languages ​​and exploring new horizons.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-20 overflow-hidden">
        <IslamicPattern />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl mb-6">{t("about.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                  src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBjb21tdW5pdHklMjBtb3NxdWV8ZW58MXx8fHwxNzYwMzMzNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Muslim Community"
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
                {t("about.journeyTitle")}
              </h2>
              <p className="text-muted-foreground">{t("about.journeyPara1")}</p>
              <p className="text-muted-foreground">{t("about.journeyPara2")}</p>
              <p className="text-muted-foreground">{t("about.journeyPara3")}</p>
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

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
