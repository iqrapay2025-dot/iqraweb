import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "motion/react";
import { toast } from "sonner";

export function NewsletterSubscribe() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    subject: "New Newsletter Subscription - IqraPay",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "ae27bb89-a980-4ca2-9eed-65eac83a9aed",
          ...formData,
          message: `New newsletter subscription from: ${formData.email}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(t('newsletter.successTitle'), {
          description: t('newsletter.successMessage'),
          icon: <CheckCircle className="h-5 w-5" />,
        });
        setFormData({
          email: "",
          subject: "New Newsletter Subscription - IqraPay",
        });
      } else {
        toast.error(t('common.error'), {
          description: "Please try again or contact us directly.",
        });
      }
    } catch (error) {
      toast.error(t('common.error'), {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 md:p-12 text-center bg-background/80 backdrop-blur-sm border-2">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('newsletter.description')}
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    name="email"
                    placeholder={t('newsletter.placeholder')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 text-center sm:text-left"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>{t('newsletter.subscribing')}</>
                  ) : (
                    <>
                      {t('newsletter.subscribe')} <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                {t('newsletter.privacy')}
              </p>
              
              <p className="text-xs text-muted-foreground mt-2">
                To enable email delivery, replace YOUR_ACCESS_KEY_HERE in the code with your Web3Forms access key.{" "}
                <a 
                  href="https://web3forms.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Get your free key here
                </a>
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
