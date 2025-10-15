import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  text: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sheu Salamot Temileyi ",
    role: "Student",
    location: "Nigeria",
    text: "It will help me more about my Ibadaah, May Almighty Allah make it possible and make it Hujjah for us and not against us - Aameen.",
    avatar: "SS",
    rating: 5,
  },
  {
    name: "Kareem Atiyah ",
    role: "Student & Reader",
    location: "Nigeria",
    text: "Empowering Muslim through halal learning, May Almighty Allah ease ur affairs, accept it as an act of Ibadah and reward you abundantly Amin jazakumullahu khayran.",
    avatar: "KA",
    rating: 5,
  },
  {
    name: "Nurudeen Maryam Oyindamola",
    role: "Student",
    location: "Nigeria",
    text: "I am interested in IqraPay because it is a very nice initiative as I get to earn rewards when I read ,and that can serve as a motivation for me to continue. Well done,IqraPay team. May Almighty Allah ease the process for you and grant you a successful outcome .",
    avatar: "NM",
    rating: 5,
  },
  {
    name: "Akolade Samiah",
    role: "Student",
    location: "Lagos State, Nigeria",
    text: "The idea of learning and earning. Keep it up!",
    avatar: "AS",
    rating: 5,
  },
  {
    name: "Ismail Asmou",
    role: "Student",
    location: "Oyo State, Nigeria",
    text: "I love reading. More Wisdom!",
    avatar: "IA",
    rating: 5,
  },
  {
    name: "Zainab Omotayo Abdullah",
    role: "Reader",
    location: "Kwara, Nigeria",
    text: "Reading while earning is what I love about the idea. The idea is a nice one, May Allah ease it.",
    avatar: "ZA",
    rating: 5,
  },
  {
    name: "ABDULKAREEM, Luqman Owolabi",
    role: "Student",
    location: "Nigeria",
    text: "I'm so much interested in this up coming iqrapay, I pray it is well with everyone that is involved. May it be a successful project for both investors and the participants.",
    avatar: "AL",
    rating: 5,
  },
  {
    name: "Abdulsalam Aishat oyindamola ",
    role: "Student",
    location: "Kwara, Nigeria",
    text: "It's refreshing,thoughtful and compassionate. I pray Allah make it successful beyond your imagination as this is a noble cause Allahuma barik wa zid.",
    avatar: "AA",
    rating: 5,
  },
  {
    name: "Zainab Bisola Abdulazeez",
    role: "Volunteer",
    location: "Osun, Nigeria",
    text: "Extracting knowledge and earnings as well. May Almighty continue to support IqraPay.",
    avatar: "ZA",
    rating: 5,
  },
  {
    name: "Ademola Raodoh Asake",
    role: "A graduate, Teacher and a Reader",
    location: "Osun state, Nigeria",
    text: "I love the fact that it’s encouraging learning and knowledge gathering with a bonus of earning out of it. May Allah continue to strengthen your path and increase your endurance in helping and giving out your best, bihid’nillah.",
    avatar: "AR",
    rating: 5,
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {/* Main Carousel */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextSlide();
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide();
              }
            }}
            className="w-full"
          >
            <Card className="testimonial-card-gradient relative p-8 md:p-12 border-2 border-primary/10 shadow-2xl hover:shadow-primary/20 transition-shadow duration-300">
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="h-20 w-20 text-primary" />
              </div>

              {/* Islamic Pattern Decoration */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-5">
                <svg viewBox="0 0 100 100" className="text-primary">
                  <pattern
                    id="pattern"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="10" cy="10" r="2" fill="currentColor" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#pattern)" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="relative z-10">
                <p className="text-lg md:text-xl text-center text-foreground mb-8 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </p>
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col items-center gap-4">
                {/* Avatar with Gradient Background */}
                <div className="relative">
                  <div className="testimonial-avatar-glow absolute inset-0 rounded-full blur-md opacity-50" />
                  <div className="testimonial-avatar-gradient relative w-16 h-16 rounded-full flex items-center justify-center text-white text-xl border-2 border-white shadow-lg">
                    {testimonials[currentIndex].avatar}
                  </div>
                </div>

                {/* Name and Role */}
                <div className="text-center">
                  <div className="text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-xs text-primary mt-1">
                    {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-0 md:-px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="pointer-events-auto bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg border-2 -ml-4 md:-ml-12"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="pointer-events-auto bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg border-2 -mr-4 md:-mr-12"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-4 text-sm text-muted-foreground">
        {currentIndex + 1} / {testimonials.length}
      </div>
    </div>
  );
}
