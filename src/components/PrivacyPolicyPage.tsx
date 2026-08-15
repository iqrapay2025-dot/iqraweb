import { Footer } from "./Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
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
            Privacy Policy
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
                At IqraPay, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                Read-to-Earn platform. We operate in accordance with Islamic principles and Nigerian data protection laws.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl text-foreground mb-3">1.1 Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                When you register for IqraPay, we may collect the following information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Country and location information</li>
                <li>Date of birth (to verify age eligibility)</li>
                <li>Payment information (for rewards disbursement)</li>
              </ul>

              <h3 className="text-xl text-foreground mb-3">1.2 Learning Activity Data</h3>
              <p className="text-muted-foreground mb-4">
                We collect information about your learning activities on the platform:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Reading progress and completion records</li>
                <li>Quiz and assessment results</li>
                <li>Time spent on learning materials</li>
                <li>Earned rewards and points</li>
                <li>Course enrollments and preferences</li>
              </ul>

              <h3 className="text-xl text-foreground mb-3">1.3 Technical Information</h3>
              <p className="text-muted-foreground mb-4">
                We automatically collect certain technical information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Access times and referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li><strong>Platform Operation:</strong> To provide, maintain, and improve our Read-to-Earn services</li>
                <li><strong>Rewards Processing:</strong> To calculate, verify, and distribute halal earnings to users</li>
                <li><strong>Communication:</strong> To send you updates, newsletters, and important platform announcements</li>
                <li><strong>Personalization:</strong> To customize your learning experience and recommend relevant content</li>
                <li><strong>Security:</strong> To detect, prevent, and address fraud, abuse, and security issues</li>
                <li><strong>Analytics:</strong> To understand how users interact with our platform and improve our services</li>
                <li><strong>Compliance:</strong> To comply with legal obligations and enforce our Terms of Service</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">3. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl text-foreground mb-3">3.1 We Do Not Sell Your Information</h3>
              <p className="text-muted-foreground mb-4">
                IqraPay does not sell, rent, or trade your personal information to third parties for marketing purposes. 
                Your data is treated as an Amanah (trust) that we safeguard with utmost care.
              </p>

              <h3 className="text-xl text-foreground mb-3">3.2 Limited Sharing</h3>
              <p className="text-muted-foreground mb-4">
                We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in platform operations (e.g., payment processors, hosting services) under strict confidentiality agreements</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with user notification</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
              <p className="text-muted-foreground">
                While we strive to protect your information, no method of transmission over the internet is 100% secure. 
                Users are encouraged to use strong passwords and keep their login credentials confidential.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground mb-4">
                IqraPay uses cookies and similar technologies to enhance user experience:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li><strong>Essential Cookies:</strong> Required for platform functionality and security</li>
                <li><strong>Performance Cookies:</strong> Help us understand how users interact with the platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-muted-foreground">
                You can control cookie settings through your browser, but disabling certain cookies may limit platform functionality.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">6. Your Privacy Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for processing where applicable</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
              </ul>
              <p className="text-muted-foreground">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:iqrapay2025@gmail.com" className="text-primary hover:underline">
                  iqrapay2025@gmail.com
                </a>
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. When information 
                is no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground">
                IqraPay is designed to be family-friendly and accessible to users of all ages. However, users under 18 years 
                of age must have parental or guardian consent to use the platform. We do not knowingly collect personal 
                information from children without proper consent. If you believe we have collected information from a child 
                without consent, please contact us immediately.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">9. International Users</h2>
              <p className="text-muted-foreground">
                IqraPay is based in Nigeria and operates globally. By using our platform, you consent to the transfer of your 
                information to Nigeria and other countries where we operate. We ensure appropriate safeguards are in place to 
                protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">10. Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our platform may contain links to third-party websites or services. We are not responsible for the privacy 
                practices of these external sites. We encourage you to review their privacy policies before providing any 
                personal information.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
                We will notify users of material changes via email or platform notification. Continued use of IqraPay after 
                changes indicates acceptance of the updated policy.
              </p>
            </section>

            {/* Islamic Principles */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">12. Commitment to Islamic Principles</h2>
              <p className="text-muted-foreground">
                IqraPay is committed to operating in accordance with Islamic principles. We treat user data as an Amanah (trust) 
                and ensure our data practices align with Shariah-compliant standards. We do not use your information for any 
                Haram (prohibited) activities.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl text-foreground mb-4">13. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-foreground mb-2"><strong>IqraPay</strong></p>
                <p className="text-muted-foreground">Email: <a href="mailto:iqrapay2025@gmail.com" className="text-primary hover:underline">iqrapay2025@gmail.com</a></p>
                <p className="text-muted-foreground">Phone: <a href="tel:+2348155956187" className="text-primary hover:underline">+234 815 595 6187</a></p>
                <p className="text-muted-foreground">Location: Ibadan, Nigeria</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8">
              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg p-6">
                <p className="text-foreground">
                  By using IqraPay, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
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
