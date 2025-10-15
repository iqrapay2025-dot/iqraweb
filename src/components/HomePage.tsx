import { BookOpen, TrendingUp, Users, Award, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { IslamicPattern } from "./IslamicPattern";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { motion } from "motion/react";

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const steps = [
    {
      icon: BookOpen,
      title: "Read",
      description: "Engage with the Qur'an and beneficial Islamic knowledge daily",
      color: "bg-primary",
    },
    {
      icon: TrendingUp,
      title: "Earn",
      description: "Get rewarded with halal earnings for your consistent learning",
      color: "bg-secondary",
    },
    {
      icon: Users,
      title: "Grow",
      description: "Build your faith and wealth while strengthening the Ummah",
      color: "bg-primary",
    },
  ];



  const stats = [
    { value: "300+", label: "Active Community Members" },
    { value: "50+", label: "X(Twitter) Social Followers" },
    { value: "100%", label: "Halal Certified" },
    { value: "100+", label: "Instagram Social Followers" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <IslamicPattern />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-accent rounded-full mb-6">
                <span className="text-accent-foreground">🕌 Faith-Driven • Tech-Forward</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
                Learn the Deen.
                <br />
                <span className="text-primary">Earn for the Dunyā.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                IqraPay is a halal Read-to-Earn platform empowering Muslims to earn rewards while learning the Qur'an and beneficial knowledge.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 transition-all hover:scale-105 hover:shadow-lg"
                  asChild
                >
                  <a href="https://chat.whatsapp.com/Ej08ZEjAnlyAS7vE6uY7W8" target="_blank" rel="noopener noreferrer">
                    Join Waitlist
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 transition-all hover:scale-105 hover:shadow-md"
                  onClick={() => onNavigate && onNavigate('about')}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1721744687343-788d031da8b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMGJvb2slMjBpc2xhbWljfGVufDF8fHx8MTc2MDQ5MDI1NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Quran and Islamic learning"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8" />
                  <div>
                    <div className="text-2xl">100%</div>
                    <div className="text-sm opacity-90">Halal Certified</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl mb-4">How IqraPay Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start your journey of faith and growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center hover:shadow-xl transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl mb-4 opacity-20">{index + 1}</div>
                  <h3 className="text-2xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">Trusted by the Ummah</h2>
            <p className="text-xl text-muted-foreground">
              Hear from our global community of learners
            </p>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary via-secondary/90 to-primary text-white relative overflow-hidden">
        <IslamicPattern />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heart className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of Muslims earning halal rewards while deepening their knowledge of Islam.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-secondary hover:bg-white/90 px-8"
              asChild
            >
              <a href="https://chat.whatsapp.com/Ej08ZEjAnlyAS7vE6uY7W8" target="_blank" rel="noopener noreferrer">
                Join the Waitlist
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
