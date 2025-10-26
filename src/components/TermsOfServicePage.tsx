import { Footer } from "./Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface TermsOfServicePageProps {
  onNavigate: (page: string) => void;
}

export function TermsOfServicePage({ onNavigate }: TermsOfServicePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate("home")}
            className="mb-8 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gradient-primary mb-6">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg">
            Last Updated: October 15, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Card className="p-6 md:p-8 lg:p-12">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-muted-foreground">
                Welcome to IqraPay! These Terms of Service ("Terms") govern your access to and use of the IqraPay platform, 
                including our website, mobile applications, and all related services (collectively, the "Platform"). 
                By accessing or using IqraPay, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-muted-foreground mt-4">
                Please read these Terms carefully before using our Platform. If you do not agree to these Terms, 
                you may not access or use IqraPay.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By creating an account, accessing, or using IqraPay, you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Acknowledge that you have read and understood these Terms</li>
                <li>Agree to be legally bound by these Terms and all applicable laws and regulations</li>
                <li>Represent that you have the legal capacity to enter into this agreement</li>
                <li>Consent to receive communications from IqraPay regarding your account and platform updates</li>
              </ul>
            </section>

            {/* About IqraPay */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">2. About IqraPay</h2>
              <p className="text-muted-foreground mb-4">
                IqraPay is a halal Read-to-Earn platform designed to reward Muslims for learning the Qur'an and beneficial 
                Islamic knowledge. Our tagline, <em>"Learn the Deen. Earn for the Dunyā,"</em> reflects our mission to make 
                Islamic education accessible and rewarding.
              </p>
              <p className="text-muted-foreground mb-4">
                The Platform operates in accordance with Shariah-compliant principles and is founded by Muhammad Jumah. 
                We provide educational content, assessments, and a rewards system that allows users to earn halal income 
                through consistent learning and engagement.
              </p>
            </section>

            {/* Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">3. Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                To use IqraPay, you must:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Be at least 13 years of age (users under 18 require parental/guardian consent)</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Provide accurate and complete registration information</li>
                <li>Not be prohibited from using the Platform under Nigerian law or any other applicable jurisdiction</li>
                <li>Comply with all local laws and regulations in your jurisdiction</li>
              </ul>
              <p className="text-muted-foreground">
                IqraPay reserves the right to verify eligibility and refuse service to anyone at our discretion.
              </p>
            </section>

            {/* Account Registration */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">4. Account Registration and Security</h2>
              
              <h3 className="text-xl text-foreground mb-3">4.1 Account Creation</h3>
              <p className="text-muted-foreground mb-4">
                To access certain features, you must create an account by providing accurate, current, and complete information. 
                You agree to update your information to maintain its accuracy.
              </p>

              <h3 className="text-xl text-foreground mb-3">4.2 Account Security</h3>
              <p className="text-muted-foreground mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying IqraPay immediately of any unauthorized access or security breach</li>
                <li>Using strong passwords and enabling security features when available</li>
              </ul>

              <h3 className="text-xl text-foreground mb-3">4.3 Account Termination</h3>
              <p className="text-muted-foreground">
                IqraPay reserves the right to suspend or terminate accounts that violate these Terms, engage in fraudulent 
                activity, or for any other reason at our sole discretion.
              </p>
            </section>

            {/* Platform Services */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">5. Platform Services</h2>
              
              <h3 className="text-xl text-foreground mb-3">5.1 Educational Content</h3>
              <p className="text-muted-foreground mb-4">
                IqraPay provides access to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Qur'anic studies and recitation materials</li>
                <li>Islamic knowledge courses and articles</li>
                <li>Hadith studies and Fiqh (Islamic jurisprudence)</li>
                <li>Arabic language learning resources</li>
                <li>Beneficial Islamic educational content</li>
              </ul>

              <h3 className="text-xl text-foreground mb-3">5.2 Read-to-Earn Program</h3>
              <p className="text-muted-foreground mb-4">
                Users can earn halal rewards by:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Completing reading assignments and courses</li>
                <li>Passing quizzes and assessments</li>
                <li>Achieving learning milestones</li>
                <li>Consistent platform engagement</li>
                <li>Referring new users (when referral program is active)</li>
              </ul>

              <h3 className="text-xl text-foreground mb-3">5.3 Rewards and Payments</h3>
              <p className="text-muted-foreground mb-4">
                Earned rewards are subject to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Verification of completed activities</li>
                <li>Compliance with platform guidelines and anti-fraud measures</li>
                <li>Minimum withdrawal thresholds</li>
                <li>Payment processing times and methods</li>
                <li>Applicable taxes and fees (user responsibility)</li>
              </ul>
              <p className="text-muted-foreground">
                IqraPay reserves the right to adjust reward rates, payment methods, and program terms with reasonable notice.
              </p>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">6. User Conduct and Prohibited Activities</h2>
              <p className="text-muted-foreground mb-4">
                You agree NOT to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Use the Platform for any unlawful, un-Islamic, or prohibited purpose</li>
                <li>Engage in fraudulent activities, including but not limited to gaming the rewards system</li>
                <li>Create multiple accounts to exploit rewards</li>
                <li>Use automated tools, bots, or scripts to interact with the Platform</li>
                <li>Share, sell, or transfer your account to others</li>
                <li>Attempt to circumvent security measures or access restricted areas</li>
                <li>Post or transmit harmful, offensive, or inappropriate content</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Reverse engineer, decompile, or attempt to extract source code</li>
                <li>Interfere with the Platform's operation or server infrastructure</li>
              </ul>
              <p className="text-muted-foreground">
                Violation of these conduct rules may result in account suspension, termination, and forfeiture of earned rewards.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">7. Intellectual Property Rights</h2>
              
              <h3 className="text-xl text-foreground mb-3">7.1 IqraPay Content</h3>
              <p className="text-muted-foreground mb-4">
                All content on the Platform, including text, graphics, logos, images, software, and course materials, 
                is the property of IqraPay or its licensors and is protected by copyright, trademark, and other intellectual 
                property laws.
              </p>

              <h3 className="text-xl text-foreground mb-3">7.2 Limited License</h3>
              <p className="text-muted-foreground mb-4">
                IqraPay grants you a limited, non-exclusive, non-transferable license to access and use the Platform for 
                personal, non-commercial purposes. You may not reproduce, distribute, modify, or create derivative works 
                without explicit permission.
              </p>

              <h3 className="text-xl text-foreground mb-3">7.3 Islamic Content</h3>
              <p className="text-muted-foreground">
                Qur'anic text, Hadith, and other Islamic sources are from public domain or licensed materials. 
                We respect the sacred nature of these texts and encourage their proper use and sharing for educational purposes.
              </p>
            </section>

            {/* Disclaimer and Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">8. Disclaimer and Limitation of Liability</h2>
              
              <h3 className="text-xl text-foreground mb-3">8.1 Platform Disclaimer</h3>
              <p className="text-muted-foreground mb-4">
                The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied. 
                IqraPay does not guarantee:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Uninterrupted or error-free operation</li>
                <li>Accuracy, completeness, or reliability of content</li>
                <li>That the Platform will meet your specific requirements</li>
                <li>That defects will be corrected</li>
              </ul>

              <h3 className="text-xl text-foreground mb-3">8.2 Educational Disclaimer</h3>
              <p className="text-muted-foreground mb-4">
                While we strive to provide accurate Islamic educational content, users should consult qualified Islamic scholars 
                for specific religious guidance. IqraPay is not responsible for personal interpretations or decisions based on 
                Platform content.
              </p>

              <h3 className="text-xl text-foreground mb-3">8.3 Limitation of Liability</h3>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, IqraPay and its founders, employees, and partners shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Indirect, incidental, consequential, or punitive damages</li>
                <li>Loss of profits, data, or goodwill</li>
                <li>Service interruptions or technical issues</li>
                <li>Unauthorized access to your account or information</li>
                <li>Errors or omissions in content</li>
              </ul>
              <p className="text-muted-foreground">
                Our total liability shall not exceed the amount of rewards you have earned in the past six months.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">9. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless IqraPay, its founders (including Muhammad Jumah), employees, 
                contractors, and partners from any claims, damages, losses, liabilities, and expenses (including legal fees) 
                arising from your use of the Platform, violation of these Terms, or infringement of any rights of third parties.
              </p>
            </section>

            {/* Modifications to Service */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">10. Modifications to Service and Terms</h2>
              
              <h3 className="text-xl text-foreground mb-3">10.1 Service Modifications</h3>
              <p className="text-muted-foreground mb-4">
                IqraPay reserves the right to modify, suspend, or discontinue any aspect of the Platform at any time, 
                with or without notice. We are not liable for any modification, suspension, or discontinuation of services.
              </p>

              <h3 className="text-xl text-foreground mb-3">10.2 Terms Modifications</h3>
              <p className="text-muted-foreground">
                We may update these Terms periodically. Material changes will be communicated via email or platform notification. 
                Continued use of the Platform after changes constitutes acceptance of the modified Terms. We will update the 
                "Last Updated" date at the top of this document.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">11. Termination</h2>
              
              <h3 className="text-xl text-foreground mb-3">11.1 Termination by User</h3>
              <p className="text-muted-foreground mb-4">
                You may terminate your account at any time by contacting us at{" "}
                <a href="mailto:info@iqrapay.com.ng" className="text-primary hover:underline">
                  info@iqrapay.com.ng
                </a>. 
                Upon termination, you will forfeit access to the Platform and any unredeemed rewards below the minimum 
                withdrawal threshold.
              </p>

              <h3 className="text-xl text-foreground mb-3">11.2 Termination by IqraPay</h3>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your account immediately for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Violation of these Terms</li>
                <li>Fraudulent or abusive behavior</li>
                <li>Prolonged inactivity</li>
                <li>Legal or regulatory requirements</li>
                <li>Any reason at our sole discretion</li>
              </ul>

              <h3 className="text-xl text-foreground mb-3">11.3 Effect of Termination</h3>
              <p className="text-muted-foreground">
                Upon termination, all licenses granted to you will immediately cease, and you must stop using the Platform. 
                Provisions regarding intellectual property, liability, indemnification, and dispute resolution shall survive termination.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">12. Governing Law and Dispute Resolution</h2>
              
              <h3 className="text-xl text-foreground mb-3">12.1 Governing Law</h3>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, 
                without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl text-foreground mb-3">12.2 Dispute Resolution</h3>
              <p className="text-muted-foreground mb-4">
                Any disputes arising from these Terms or use of the Platform shall be resolved through:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li><strong>Informal Resolution:</strong> Contact us first to attempt good-faith resolution</li>
                <li><strong>Mediation:</strong> If informal resolution fails, disputes may be submitted to mediation</li>
                <li><strong>Arbitration/Court:</strong> Unresolved disputes shall be settled in the courts of Nigeria</li>
              </ul>
              <p className="text-muted-foreground">
                As a platform guided by Islamic principles, we encourage resolving disputes through peaceful means, 
                fairness, and mutual understanding.
              </p>
            </section>

            {/* Shariah Compliance */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">13. Shariah Compliance Commitment</h2>
              <p className="text-muted-foreground mb-4">
                IqraPay is committed to operating as a halal platform in accordance with Islamic principles:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>All earnings are derived from legitimate educational activities</li>
                <li>We do not engage in Riba (interest), gambling, or other Haram activities</li>
                <li>Content is vetted to ensure compliance with Islamic values</li>
                <li>User data is treated as Amanah (trust) with utmost care</li>
                <li>We strive to promote beneficial knowledge and righteous conduct</li>
              </ul>
              <p className="text-muted-foreground">
                While we make every effort to maintain Shariah compliance, users should exercise personal judgment and 
                consult scholars for specific religious questions.
              </p>
            </section>

            {/* Severability */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">14. Severability and Waiver</h2>
              <p className="text-muted-foreground mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or 
                eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
              <p className="text-muted-foreground">
                Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision.
              </p>
            </section>

            {/* Entire Agreement */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">15. Entire Agreement</h2>
              <p className="text-muted-foreground">
                These Terms, together with our Privacy Policy and any other legal notices published on the Platform, 
                constitute the entire agreement between you and IqraPay regarding your use of the Platform and supersede 
                all prior agreements and understandings.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">16. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions, concerns, or notices regarding these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-foreground mb-2"><strong>IqraPay</strong></p>
                <p className="text-muted-foreground">Founder: Muhammad Jumah</p>
                <p className="text-muted-foreground">Email: <a href="mailto:info@iqrapay.com.ng" className="text-primary hover:underline">info@iqrapay.com.ng</a></p>
                <p className="text-muted-foreground">Phone: <a href="tel:+2348155956187" className="text-primary hover:underline">+234 815 595 6187</a></p>
                <p className="text-muted-foreground">Location: Ibadan, Nigeria</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8">
              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg p-6">
                <p className="text-foreground mb-4">
                  <strong>By using IqraPay, you acknowledge that:</strong>
                </p>
                <ul className="list-disc pl-6 text-foreground">
                  <li>You have read, understood, and agree to be bound by these Terms of Service</li>
                  <li>You have read and agree to our Privacy Policy</li>
                  <li>You will use the Platform in accordance with Islamic principles and applicable laws</li>
                  <li>You understand the nature of the Read-to-Earn program and rewards system</li>
                </ul>
              </div>
            </section>

            {/* Closing */}
            <section className="mb-8">
              <div className="text-center py-8 border-t border-border">
                <p className="text-muted-foreground italic">
                  "Read in the name of your Lord who created" - Qur'an 96:1
                </p>
                <p className="text-foreground mt-4">
                  Learn the Deen. Earn for the Dunyā.
                </p>
              </div>
            </section>

          </div>
        </Card>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
