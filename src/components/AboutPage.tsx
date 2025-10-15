import { Target, Eye, Sparkles, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { IslamicPattern } from "./IslamicPattern";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";
import { motion } from "motion/react";
import { TeamCarousel, TeamMember } from "./TeamCarousel";

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: CheckCircle,
      title: "Faith-First",
      description: "Every decision is rooted in Islamic principles and ethics",
    },
    {
      icon: Sparkles,
      title: "Transparency",
      description: "Complete clarity in our halal earning mechanisms",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Commitment to quality in both content and platform",
    },
    {
      icon: Eye,
      title: "Community",
      description: "Building and empowering the global Muslim Ummah",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Muhammad Jumah",
      role: "Founder & CEO",
      location: "Ibadan, Nigeria",
      description: "Visionary student and entrepreneur passionate about merging faith, education, and technology. Currently studying Linguistics at the University of Ilorin.",
    },
    {
      id: 2,
      name: "Fatiah Badmus",
      role: "Co-Founder",
      location: "Osun, Nigeria",
      description: "Muslimah • Writer • WHO-Certified Mental Health Coach. Founder of Soothopedia and Himaayah, merging faith and psychology to inspire healing and wholeness. Advocates mental wellness, healthy love, and purposeful living through her words.",
    },
    {
      id: 3,
      name: "Ibrahim Yusuf",
      role: "Lead Developer",
      location: "Abuja, Nigeria",
      description: "Full-stack developer with expertise in fintech and educational platforms. Ensures our platform is secure, scalable, and user-friendly.",
    },
    {
      id: 4,
      name: "Fatima Hassan",
      role: "Community Manager",
      location: "Kano, Nigeria",
      description: "Dedicated to building and nurturing our global Muslim community. Manages user engagement, support, and ambassador programs.",
    },
    {
      id: 5,
      name: "Bilal Ahmed",
      role: "Shariah Advisor",
      location: "Ilorin, Nigeria",
      description: "Islamic scholar ensuring all platform operations align with Shariah principles. Provides guidance on halal earning mechanisms.",
    },
    {
      id: 6,
      name: "Zainab Malik",
      role: "Marketing Lead",
      location: "Port Harcourt, Nigeria",
      description: "Digital marketing expert focused on spreading IqraPay's mission across the Muslim world through ethical marketing strategies.",
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
            <h1 className="text-4xl sm:text-5xl mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building a platform that honors the sacred pursuit of knowledge
              while providing halal sustenance to the Ummah
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
              <h2 className="text-3xl sm:text-4xl">The Journey Begins</h2>
              <p className="text-muted-foreground">
                IqraPay was born from a simple observation: Muslims around the
                world want to deepen their knowledge of Islam, but many face
                financial barriers to dedicating time to learning.
              </p>
              <p className="text-muted-foreground">
                We asked ourselves: What if we could create a platform that
                rewards the noble pursuit of Islamic knowledge? What if learning
                the Qur'an and Sunnah could also provide halal sustenance?
              </p>
              <p className="text-muted-foreground">
                That question led to IqraPay — a revolutionary platform that
                combines faith-based education with ethical, transparent earning
                opportunities. We've built this with scholars, educators, and
                fintech experts to ensure everything aligns with Islamic
                principles.
              </p>
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
                <h3 className="text-2xl mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the world's leading platform for Islamic education,
                  empowering every Muslim to access, learn, and benefit from the
                  treasures of our faith while earning halal sustenance in the
                  process.
                </p>
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
                <h3 className="text-2xl mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To create a sustainable, transparent, and halal ecosystem
                  where Muslims can deepen their knowledge of the Qur'an,
                  Hadith, and Islamic sciences while receiving ethical rewards
                  that support their worldly needs.
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
            <h2 className="text-3xl sm:text-4xl mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
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
            <h2 className="text-3xl mb-4">About the Founder</h2>
            <h3 className="text-xl text-primary mb-4">Muhammad Jumah</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              IqraPay was founded by Muhammad Jumah, a visionary student and
              entrepreneur committed to bridging the gap between faith,
              education, and technology. As a Linguistics student at the
              University of Ilorin, he continues to observe the challenges many
              Muslims face in balancing the pursuit of knowledge with financial
              stability. These ongoing experiences have inspired him to reflect
              deeply on how learning, faith, and livelihood can coexist
              harmoniously. Driven by a desire to make learning both rewarding
              and sustainable, he established IqraPay — a halal “Read-to-Earn”
              platform designed to empower Muslims to grow spiritually and
              financially through meaningful learning.
            </p>
            <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-6 py-2 max-w-2xl mx-auto">
              “Knowledge without action
              is pointless and action without halal sustenance is unsustainable.
              IqraPay bridges all three.”
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
            <h2 className="text-3xl sm:text-4xl mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The dedicated individuals working to make Islamic education accessible and rewarding
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
