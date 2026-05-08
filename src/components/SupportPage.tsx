import { useState, useEffect } from "react";
import {
  Heart,
  Shield,
  Star,
  ArrowRight,
  Check,
  Mail,
  MessageCircle,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Zap,
  Globe,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { IslamicPattern } from "./IslamicPattern";
import { Footer } from "./Footer";
import { WhatsAppModal } from "./WhatsAppModal";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";

interface SupportPageProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
}

export function SupportPage({
  darkMode = false,
  onNavigate,
}: SupportPageProps = {}) {
  const { t } = useLanguage();
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donateHover, setDonateHover] = useState(false);
  const [whatsappHover, setWhatsappHover] = useState(false);
  const [submitHover, setSubmitHover] = useState(false);
  const [tierHoverIndex, setTierHoverIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "ae27bb89-a980-4ca2-9eed-65eac83a9aed",
          to: "iqrapay2025@gmail.com",
          subject: "Support IqraPay Enquiry",
          ...formData,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(t("support.successTitle") || "Message Sent!", {
          description:
            t("support.successMessage") ||
            "Jazakallahu khayran — we'll be in touch soon.",
        });
        setFormData({ name: "", organisation: "", email: "", message: "" });
      } else {
        toast.error(t("common.error") || "Something went wrong", {
          description: "Please try again or reach us on WhatsApp.",
        });
      }
    } catch {
      toast.error(t("common.error") || "Something went wrong", {
        description: "Please try again or email iqrapay2025@gmail.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const impactStats = [
    {
      icon: Users,
      value: "300+", // Align with home.activeLearners value from en.ts
      label: t("home.activeLearners"),
      // Use Tailwind's semantic colors directly for dynamic generation
      // If 'primary' is not defined, 'text-green-500' or similar could be used.
      color: "text-primary", // Using a direct color for clarity, assuming primary is green
      bg: "bg-primary/10",
    },
    {
      icon: BookOpen,
      value: "100+",
      label: t("home.hoursRead"),
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: TrendingUp,
      value: t("support.stat1Value"), // e.g., "₦5,000"
      label: t("support.stat1Label"), // e.g., "earned per learner"
      color: "text-amber-500", // Semantic amber color
      bg: "bg-secondary/10", // Using semantic amber color
    },
    {
      icon: Globe,
      value: "1",
      label: t("home.countries"),
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: t("support.step1Title"),
      desc: t("support.step1Desc"),
      icon: Heart,
      color: "bg-secondary", // Using semantic color
    },
    {
      step: "02",
      title: t("support.step2Title"),
      desc: t("support.step2Desc"),
      icon: BookOpen,
      color: "bg-primary", // Using semantic color
    },
    {
      step: "03",
      title: t("support.step3Title"),
      desc: t("support.step3Desc"),
      icon: TrendingUp,
      color: "bg-secondary", // Using semantic color
    },
  ];

  const sponsorshipTiers = [
    {
      name: t("support.tierSeed"),
      amount: t("support.seedPrice"),
      color: "border-primary/20",
      headerBg: "bg-primary",
      badge: null,
      perks: [
        t("support.perkNameInApp"),
        t("support.perkMonthlyReport"),
        t("support.perkDuaLetter"),
      ],
    },
    {
      name: t("support.tierGrowth"),
      amount: t("support.growthPrice"),
      color: "border-secondary/20",
      headerBg: "bg-secondary",
      badge: "Popular",
      perks: [
        t("support.perkAllSeed"),
        t("support.perkLogoFeature"),
        t("support.perkQuarterlyCall"),
        t("support.perkCertificate"),
      ],
    },
    {
      name: t("support.tierLegacy"),
      amount: t("support.legacyPrice"),
      color: "border-amber-500",
      headerBg: "bg-gradient-to-r from-amber-600 to-amber-500",
      badge: "Premium",
      perks: [
        t("support.perkAllGrowth"),
        t("support.perkNamedPool"),
        t("support.perkBoardBrief"),
        t("support.perkCobranding"),
        t("support.perkAnnualReport"),
      ],
    },
  ];

  return (
    <div
      className="min-h-screen text-foreground"
      style={{
        backgroundColor: darkMode ? "#1a1a1a" : "var(--background)",
      }}
    >
      {/* ── Hero Section ── */}
      <section
        className="relative pt-32 pb-34 overflow-hidden"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse at 70% 0%, #2a1500 0%, #1a0a00 45%, #0a0000 100%)"
            : "radial-gradient(ellipse at 70% 0%, #4a0800 0%, #2a0300 45%, #0d0000 100%)",
        }}
      >

        {/* Islamic pattern — slightly more visible than before */}
        <div className="absolute inset-0 opacity-[0.07]">
          <IslamicPattern />
        </div>
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "500px",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            borderRadius: "50%",
            filter: "blur(120px)",
            transform: "translate(25%, -50%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "400px",
            height: "400px",
            backgroundColor: "rgba(255, 193, 7, 0.1)",
            borderRadius: "50%",
            filter: "blur(100px)",
            transform: "translate(-25%, 50%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm mb-6 font-medium tracking-wide"
              style={{
                background: "rgba(0,150,136,0.2)",
                border: "1px solid rgba(0,150,136,0.4)",
                color: "#4dd0c4",
              }}
            >
              {t("support.heroTag")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 max-w-4xl mx-auto leading-tight">
              {t("support.heroTitle")}
            </h1>
            <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("support.heroSubtitle")}
            </p>
            <div className="flex flex-col mt-5 sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 shadow-lg shadow-primary/30 font-semibold transition-all hover:scale-105"
                onClick={() =>
                  document
                    .getElementById("sponsorship-tiers")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t("support.heroCtaPrimary")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-secondary hover:text-white px-8"
                onClick={() => setIsWhatsAppModalOpen(true)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t("support.heroCtaSecondary")}
              </Button>
            </div>
          </motion.div>

          {/* Floating Arabic */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-white text-2xl"
            dir="rtl"
          >
            إِذَا مَاتَ الإِنسَانُ انْقَطَعَ عَنهُ عَمَلُهُ إِلَّا مِن ثَلَاثٍ
          </motion.p>
          <p className="text-white mb-8 text-xs mt-1">
            "When a person dies, all their deeds end except three…" — Sahih
            Muslim
          </p>
        </div>
      </section>

      {/* ── Impact Stats Section ── */}
      <section
        className="py-16"
        style={{
          backgroundColor: darkMode ? "#0f0f0f" : "var(--muted)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />{" "}
                  {/* This uses the dynamically generated color/bg */}
                </div>
                <p className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section
        className="py-20"
        style={{
          backgroundColor: darkMode ? "#1a1a1a" : "var(--background)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-sm mb-4">
              {t("support.howItWorksTag")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t("support.howItWorksTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("support.howItWorksSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 mt-5 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-secondary via-primary/50 to-amber-500 opacity-30" />

            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div
                  className="bg-card border border-primary p-8 text-center shadow-sm h-full overflow-hidden"
                  style={{ borderRadius: "24px" }}
                >
                  <div
                    className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mb-2 block">
                    STEP {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsorship Tiers Section ── */}
      <section
        id="sponsorship-tiers"
        className="py-20 relative overflow-hidden"
        style={{
          backgroundColor: darkMode ? "#0f0f0f" : "var(--muted)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.03]">
          <IslamicPattern />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block bg-secondary/10 text-secondary dark:bg-secondary/30 rounded-full px-4 py-1.5 text-sm mb-4">
              {t("support.tiersTag")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t("support.tiersTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("support.tiersSubtitle")}
            </p>
          </motion.div>

          <div className="grid mt-5 md:grid-cols-3 gap-8 items-stretch">
            {sponsorshipTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative bg-card border-2 ${tier.color} shadow-sm overflow-hidden flex flex-col`}
                style={{
                  borderRadius: "24px",
                  borderColor: tier.color.includes("amber")
                    ? "#f59e0b"
                    : tier.color.includes("primary")
                      ? "var(--primary)"
                      : "var(--secondary)",
                }}
              >
                {tier.badge && (
                  <div
                    className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
                    style={{ backgroundColor: "#f59e0b" }}
                  >
                    {tier.badge}
                  </div>
                )}
                <div
                  className={`${tier.headerBg} p-8 py-9 text-white rounded-t-[24px]`}
                  style={
                    tier.headerBg.includes("gradient")
                      ? {
                          background:
                            "linear-gradient(to right, rgb(217, 119, 6), rgb(245, 158, 11))",
                        }
                      : undefined
                  }
                >
                  <Award className="w-8 h-8 mb-3 opacity-80" />
                  <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                  <p className="text-2xl font-extrabold">{tier.amount}</p>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8 w-full font-semibold"
                    onClick={() => setIsWhatsAppModalOpen(true)}
                    onMouseEnter={() => setTierHoverIndex(i)}
                    onMouseLeave={() => setTierHoverIndex(null)}
                    style={{
                      borderRadius: "12px",
                      backgroundColor: i === tierHoverIndex ? "rgba(0, 0, 0, 0.8)" : "var(--foreground)",
                      color: "var(--background)",
                      padding: "12px 16px",
                      height: "auto",
                      transition: "background-color 0.2s",
                    }}
                  >
                    {t("support.tierCta")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            {t("support.tiersNote")}
          </motion.p>
        </div>
      </section>

      {/* ── Sadaqah Jariyah Section ── */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom right, #065f46, rgba(6, 95, 70, 0.85), #8b5a3c)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.06]">
          <IslamicPattern />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="flex items-center justify-center mx-auto mb-6"
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
              }}
            >
              <Zap className="w-8 h-8" style={{ color: "#fff9c4" }} />
            </div>
            <span
              className="inline-block border border-white/25 rounded-full px-4 py-1.5 text-sm mb-6"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff9c4",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              {t("support.sadaqahTag")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              {t("support.sadaqahTitle")}
            </h2>
            <p
              className="sm:text-xl mt-2 max-w-2xl mx-auto leading-relaxed text-base"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              {t("support.sadaqahText")}
            </p>

            {/* Feature pills — white/low-opacity bg like the donate button */}
            <div className="flex flex-wrap justify-center p-3 gap-3 mb-10">
              {[
                "No minimum amount",
                "Monthly giving welcome",
                "Full transparency",
              ].map((pill) => (
                <div
                  key={pill}
                  className="flex items-center p-4 gap-2 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm text-white"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    fontSize: "13px",
                  }}
                >
                  <Check
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: "#fff9c4" }}
                  />
                  {pill}
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-2 px-10 shadow-2xl font-bold rounded-md transition-colors"
              style={{
                background: donateHover ? "#fff9c4" : "#ffffff",
                color: "#360400",
              }}
              onMouseEnter={() => setDonateHover(true)}
              onMouseLeave={() => setDonateHover(false)}
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t("support.donateAnyAmount")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Form Section ── */}
      <section
        id="contact-form"
        className="py-20"
        style={{
          backgroundColor: darkMode ? "#1a1a1a" : "var(--background)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-secondary/10 text-secondary dark:bg-secondary/30 rounded-full px-4 py-1.5 text-sm mb-4">
              Let's Connect
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t("support.contactTitle")}
            </h2>
          </motion.div>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "2rem",
              alignItems: "flex-start",
            }}
          >
            {/* Left: Info panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ width: isMobile ? "100%" : "40%", flexShrink: 0 }}
              className="space-y-6"
            >
              {/* Info card */}
              <div
                className="bg-secondary p-8 text-white"
                style={{ borderRadius: "24px" }}
              >
                <h3 className="text-xl font-bold mb-2">Reach out directly</h3>
                <p className="text-white/70 text-sm mb-6">
                  We respond within 24 hours — and warmly welcome every message.
                </p>

                <div className="space-y-4">
                  <a
                    href="mailto:iqrapay2025@gmail.com"
                    className="flex items-center gap-3 text-white/80 hover:text-white group"
                  >
                    <div className="bg-white/10 group-hover:bg-white/20 p-2 rounded-xl transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-sm">iqrapay2025@gmail.com</span>
                  </a>
                  <button
                    onClick={() => setIsWhatsAppModalOpen(true)}
                    className="flex items-center gap-3 text-white/80 hover:text-white group w-full text-left"
                  >
                    <div
                      className="transition-colors"
                      style={{
                        backgroundColor: "#25d36559",
                        padding: "8px",
                        borderRadius: "12px",
                      }}
                    >
                      <MessageCircle
                        className="w-5 h-5"
                        style={{
                          color: "#25D366",
                        }}
                      />
                    </div>
                    <span className="text-sm">WhatsApp us directly</span>
                  </button>
                </div>

                {/* Decorative Arabic text */}
                <div
                  className="mt-8 pt-6 text-center"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <p className="text-white/40 text-sm" dir="rtl">
                    جَزَاكَ اللَّهُ خَيْرًا
                  </p>
                  <p className="text-white/30 text-xs mt-1">
                    May Allah reward you with goodness
                  </p>
                </div>
              </div>

              {/* WhatsApp CTA card */}
              <button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="w-full text-white flex items-center gap-4 transition-colors text-left"
                style={{
                  backgroundColor: whatsappHover ? "#1da851" : "#25D366",
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow: "0 20px 25px -5px rgba(37, 211, 102, 0.2)",
                }}
                onMouseEnter={() => setWhatsappHover(true)}
                onMouseLeave={() => setWhatsappHover(false)}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    padding: "12px",
                    borderRadius: "16px",
                  }}
                >
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold">Chat on WhatsApp</div>
                  <div className="text-sm text-white/80">
                    We'll prepare the right message for you
                  </div>
                </div>
                <ArrowRight
                  className="w-5 h-5 ml-auto transition-opacity"
                  style={{ opacity: whatsappHover ? 1 : 0 }}
                />
              </button>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ width: isMobile ? "100%" : "60%" }}
            >
              <div
                style={{
                  borderRadius: "24px",
                  padding: "32px",
                  backgroundColor: darkMode ? "#2a2a2a" : "var(--card)",
                  border: `1px solid ${darkMode ? "#3a3a3a" : "var(--border)"}`,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid p-2 sm:grid-cols-2 gap-5">
                    <div>
                      <Label
                        htmlFor="name"
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          marginBottom: "8px",
                          display: "block",
                          color: darkMode ? "#e0e0e0" : "var(--foreground)",
                        }}
                      >
                        {t("support.fullName")}
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        style={{
                          borderRadius: "12px",
                          marginBottom: "12px",
                          backgroundColor: darkMode ? "#3a3a3a" : "var(--background)",
                          color: darkMode ? "#e0e0e0" : "var(--foreground)",
                          border: `1px solid ${darkMode ? "#4a4a4a" : "var(--border)"}`,
                          padding: "10px 12px",
                        }}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="organisation"
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          marginBottom: "8px",
                          display: "block",
                          color: darkMode ? "#e0e0e0" : "var(--foreground)",
                        }}
                      >
                        {t("support.organisation")}
                      </Label>
                      <Input
                        id="organisation"
                        name="organisation"
                        value={formData.organisation}
                        onChange={handleChange}
                        placeholder="Your organisation"
                        style={{
                          borderRadius: "12px",
                          backgroundColor: darkMode ? "#3a3a3a" : "var(--background)",
                          color: darkMode ? "#e0e0e0" : "var(--foreground)",
                          border: `1px solid ${darkMode ? "#4a4a4a" : "var(--border)"}`,
                          padding: "10px 12px",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "8px",
                        display: "block",
                        color: darkMode ? "#e0e0e0" : "var(--foreground)",
                      }}
                    >
                      {t("support.email")}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      style={{
                        borderRadius: "12px",
                        backgroundColor: darkMode ? "#3a3a3a" : "var(--background)",
                        color: darkMode ? "#e0e0e0" : "var(--foreground)",
                        border: `1px solid ${darkMode ? "#4a4a4a" : "var(--border)"}`,
                        padding: "10px 12px",
                      }}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "8px",
                        display: "block",
                        color: darkMode ? "#e0e0e0" : "var(--foreground)",
                      }}
                    >
                      {t("support.message")}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how you'd like to support IqraPay..."
                      style={{
                        borderRadius: "12px",
                        resize: "none",
                        backgroundColor: darkMode ? "#3a3a3a" : "var(--background)",
                        color: darkMode ? "#e0e0e0" : "var(--foreground)",
                        border: `1px solid ${darkMode ? "#4a4a4a" : "var(--border)"}`,
                        padding: "10px 12px",
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      marginTop: "12px",
                      backgroundColor: submitHover
                        ? "var(--secondary-dark, #7c3432)"
                        : "var(--secondary)",
                      color: "white",
                      borderRadius: "12px",
                      height: "48px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      fontWeight: "600",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={() => setSubmitHover(true)}
                    onMouseLeave={() => setSubmitHover(false)}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        {t("support.submitting")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t("support.submitButton")}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer Note Section ── */}
      <section
        className="text-white relative overflow-hidden"
        style={{
          background: darkMode
            ? "linear-gradient(to right, #1a0800, #2d0400)"
            : "linear-gradient(to right, #360400, #5a0800)",
          padding: "40px 16px",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ padding: "20px" }}
        >
          <IslamicPattern />
        </div>
        <div
          className="max-w-7xl mx-auto text-center relative z-10"
          style={{ padding: "0 16px" }}
        >
          <Shield className="w-6 h-6 text-primary mx-auto mb-3" />
          <p className="text-sm sm:text-base text-white/80">
            {t("support.footerNote")}
          </p>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </div>
  );
}
