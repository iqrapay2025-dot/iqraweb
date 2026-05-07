import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const phoneNumber = "2349043609339";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const userTypes = [
    {
      icon: "🏛️",
      title: "An Islamic Organisation or NGO",
      subtitle: "We distribute Zakat or Sadaqah",
      color: "from-[#009688]/10 to-[#009688]/5 hover:from-[#009688]/20 hover:to-[#009688]/10",
      border: "border-[#009688]/20 hover:border-[#009688]/60",
      accentColor: "text-[#009688]",
      bgNormal: "linear-gradient(to right, rgba(0, 150, 136, 0.1), rgba(0, 150, 136, 0.05))",
      bgHover: "linear-gradient(to right, rgba(0, 150, 136, 0.2), rgba(0, 150, 136, 0.1))",
      borderNormal: "rgba(0, 150, 136, 0.2)",
      borderHover: "rgba(0, 150, 136, 0.6)",
      message: `As-salamu alaykum warahmatullahi wabarakatuh,

My name is [Name] and I represent [Organisation Name].

I came across IqraPay — the Islamic Learn & Earn platform — and I'm interested in exploring how our organisation can contribute to the Reward Pool as part of our Zakat/Sadaqah distribution.

We currently support Islamic education initiatives and believe IqraPay aligns with our mission.

Could we schedule a brief call to understand the impact model and how funds are managed?

Jazakumullahu khayran.`,
    },
    {
      icon: "💼",
      title: "A Muslim Business Owner",
      subtitle: "I want to sponsor as part of CSR",
      color: "from-[#360400]/10 to-[#360400]/5 hover:from-[#360400]/15 hover:to-[#360400]/8",
      border: "border-[#360400]/20 hover:border-[#360400]/50",
      accentColor: "text-[#360400]",
      bgNormal: "linear-gradient(to right, rgba(54, 4, 0, 0.1), rgba(54, 4, 0, 0.05))",
      bgHover: "linear-gradient(to right, rgba(54, 4, 0, 0.15), rgba(54, 4, 0, 0.08))",
      borderNormal: "rgba(54, 4, 0, 0.2)",
      borderHover: "rgba(54, 4, 0, 0.5)",
      message: `As-salamu alaykum,

I'm [Name], founder of [Business Name].

I visited the IqraPay website and I'm interested in the sponsorship tiers — particularly the Growth or Legacy Sponsor options.

I'd love to understand:
- How my contribution is tracked
- What the monthly impact report looks like
- How my brand is acknowledged

Looking forward to hearing from you. Barakallahu feek.`,
    },
    {
      icon: "🤲",
      title: "An Individual Muslim",
      subtitle: "I want to give Sadaqah Jariyah",
      color: "from-amber-500/10 to-amber-500/5 hover:from-amber-500/20 hover:to-amber-500/10",
      border: "border-amber-500/20 hover:border-amber-500/60",
      accentColor: "text-amber-600",
      bgNormal: "linear-gradient(to right, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))",
      bgHover: "linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))",
      borderNormal: "rgba(245, 158, 11, 0.2)",
      borderHover: "rgba(245, 158, 11, 0.6)",
      message: `As-salamu alaykum,

I came across IqraPay and the sadaqah jariyah angle really resonated with me.

I'd like to make a monthly contribution to the Reward Pool — even a small amount if it helps a learner reach Payout Day.

Can you let me know how individual donations work and how I'll know my contribution is being used?

Jazakallahu khayran.`,
    },
  ];

  const handleCardClick = (message: string) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="bg-background max-w-md w-full max-h-[90vh] overflow-y-auto"
            style={{ borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border flex items-start justify-between" style={{ padding: "20px 24px", borderRadius: "24px 24px 0 0" }}>
              <div className="flex items-center gap-3">
                {/* WhatsApp icon */}
                <div className="shadow" style={{ backgroundColor: "#25D366", padding: "10px", borderRadius: "12px", }}>
                  <svg viewBox="0 0 24 24" style={{ width: "20px", height: "20px", fill: "white" }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Who are you?</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    We'll prepare the right message for you.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                style={{ padding: "6px", borderRadius: "12px" }}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User Type Cards */}
            <div className="space-y-3" style={{ padding: "20px" }}>
              {userTypes.map((type, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.07 }}
                    onClick={() => handleCardClick(type.message)}
                    className="w-full text-left transition-all"
                    style={{
                      padding: "16px",
                      borderRadius: "16px",
                      border: "2px solid",
                      background: isHovered ? (type as any).bgHover : (type as any).bgNormal,
                      borderColor: isHovered ? (type as any).borderHover : (type as any).borderNormal,
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl flex-shrink-0 leading-none">{type.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-base mb-0.5 ${type.accentColor} transition-colors`}>
                          {type.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{type.subtitle}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground transition-all flex-shrink-0" style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? "translateX(4px)" : "translateX(0)" }} />
                    </div>
                  </motion.button>
                );
              })}

              <p className="text-xs text-center text-muted-foreground" style={{ paddingTop: "8px", paddingBottom: "4px" }}>
                Clicking opens WhatsApp with a pre-filled message
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
