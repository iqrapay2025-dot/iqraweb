import {
  Users,
  Gift,
  TrendingUp,
  Award,
  Heart,
  Globe,
  Star,
  Zap,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { IslamicPattern } from "./IslamicPattern";
import { Footer } from "./Footer";
import { motion } from "motion/react";
import { AmbassadorCarousel } from "./AmbassadorCarousel";
import { mockAmbassadors } from "../data/mockAmbassadors";
import { useLanguage } from "../contexts/LanguageContext";
import ambassadorImage from "figma:asset/95bf0964463b9370401c4f83c40caaa6f395ec74.png";

interface AmbassadorsPageProps {
  onNavigate?: (page: string) => void;
}

export function AmbassadorsPage({ onNavigate }: AmbassadorsPageProps) {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Gift,
      title: t("ambassadors.benefit1Title"),
      description: t("ambassadors.benefit1Desc"),
    },
    {
      icon: TrendingUp,
      title: t("ambassadors.benefit2Title"),
      description: t("ambassadors.benefit2Desc"),
    },
    {
      icon: Award,
      title: t("ambassadors.benefit3Title"),
      description: t("ambassadors.benefit3Desc"),
    },
    {
      icon: Globe,
      title: t("ambassadors.benefit4Title"),
      description: t("ambassadors.benefit4Desc"),
    },
    {
      icon: Star,
      title: t("ambassadors.benefit5Title"),
      description: t("ambassadors.benefit5Desc"),
    },
    {
      icon: Zap,
      title: t("ambassadors.benefit6Title"),
      description: t("ambassadors.benefit6Desc"),
    },
  ];

  const requirements = [
    t("ambassadors.req1"),
    t("ambassadors.req2"),
    t("ambassadors.req3"),
    t("ambassadors.req4"),
    t("ambassadors.req5"),
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
            className="text-center"
          >
            <div className="inline-block px-4 py-2 bg-accent rounded-full mb-6">
              <span className="text-accent-foreground">
                🌟 Join Our Mission
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl mb-6">
              {t("ambassadors.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t("ambassadors.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://bit.ly/IqraPayCampusAmbassador–ApplicationForm">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  {t("ambassadors.applyNow")}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Ambassador Program */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl mb-6">
                {t("ambassadors.whatIsTitle")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("ambassadors.whatIsPara1")}
              </p>
              <p className="text-muted-foreground mb-4">
                {t("ambassadors.whatIsPara2")}
              </p>
              <p className="text-muted-foreground mb-6">
                {t("ambassadors.whatIsPara3")}
              </p>
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Heart className="h-8 w-8 text-primary flex-shrink-0" />
                <p className="text-sm">
                  Every person you bring to IqraPay is a soul you've helped on
                  their journey of knowledge. That's a reward that goes beyond
                  this world.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
                <img
                  src={ambassadorImage}
                  alt="IqraPay Ambassador"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl mb-2">Inspire & Earn</h3>
                  <p className="text-sm opacity-90">
                    Become a voice for Islamic education
                  </p>
                </div>
              </div>
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                <h3 className="text-2xl mb-6">Program Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="mb-1">Growing Community</h4>
                      <p className="text-sm text-muted-foreground">
                        Join 500+ ambassadors worldwide
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h4 className="mb-1">Generous Commissions</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn up to 30% per referral
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="mb-1">Monthly Bonuses</h4>
                      <p className="text-sm text-muted-foreground">
                        Extra rewards for top performers
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              {t("ambassadors.benefitsTitle")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("ambassadors.benefitsSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Ambassadors */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              {t("ambassadors.meetTitle")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("ambassadors.meetSubtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AmbassadorCarousel ambassadors={mockAmbassadors} />
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              {t("ambassadors.whoCanApply")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("ambassadors.whoCanApplySubtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="text-2xl mb-6">
                {t("ambassadors.requirementsTitle")}
              </h3>
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-foreground text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{requirement}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-secondary via-secondary/90 to-primary text-white relative overflow-hidden">
        <IslamicPattern />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Users className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl mb-6">
              {t("ambassadors.ctaTitle")}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {t("ambassadors.ctaDesc")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://bit.ly/IqraPayCampusAmbassador–ApplicationForm">
                <Button
                  size="lg"
                  className="bg-white text-secondary hover:bg-white/90 px-8"
                >
                  {t("ambassadors.applyNow")}
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-primary hover:bg-white/10"
                asChild
              >
                <a
                  href="src/documents/IqraPay Campus Ambassadorship Program.pdf"
                  download="Ambassador-Info.pdf"
                >
                  {t("ambassadors.downloadInfo")}
                </a>
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              Have questions? Contact us at info@iqrapay.com.ng
            </p>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
