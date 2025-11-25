"use client";

import { IconLock, IconShield } from "@tabler/icons-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `${siteConfig.company.name} ("we", "us", or "our") operates ${siteConfig.site.name} (the "Service"). This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.

We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.`,
  },
  {
    id: "information-collection",
    title: "2. Information We Collect",
    content: `We collect several types of information for various purposes to provide and improve our Service:

**Personal Information:**
- Name and email address (when you register or contact us)
- Profile information (if you create an account)
- Contact information (when you submit forms or inquiries)

**Usage Data:**
- IP address and browser type
- Pages visited and time spent on pages
- Referring website addresses
- Device information and operating system
- Cookies and similar tracking technologies

**Content Data:**
- Blog posts and comments you create
- Preferences and settings
- Interactions with our Service`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use the collected information for various purposes:

- To provide and maintain our Service
- To notify you about changes to our Service
- To allow you to participate in interactive features
- To provide customer support and respond to inquiries
- To gather analysis or valuable information to improve the Service
- To monitor the usage of the Service
- To detect, prevent, and address technical issues
- To send you newsletters, marketing materials, and other communications (with your consent)
- To comply with legal obligations`,
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing and Disclosure",
    content: `We do not sell your personal information. We may share your information in the following situations:

**Service Providers:**
We may employ third-party companies and individuals to facilitate our Service, provide services on our behalf, or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks and are obligated not to disclose or use it for any other purpose.

**Legal Requirements:**
We may disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.

**Business Transfers:**
If we are involved in a merger, acquisition, or asset sale, your Personal Data may be transferred.

**With Your Consent:**
We may disclose your information for any other purpose with your consent.`,
  },
  {
    id: "cookies",
    title: "5. Cookies and Tracking Technologies",
    content: `We use cookies and similar tracking technologies to track activity on our Service and hold certain information.

**Types of Cookies:**
- Essential Cookies: Required for the Service to function properly
- Analytics Cookies: Help us understand how visitors interact with our Service
- Preference Cookies: Remember your settings and preferences
- Marketing Cookies: Used to deliver relevant advertisements

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.`,
  },
  {
    id: "data-security",
    title: "6. Data Security",
    content: `The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.`,
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: `We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.

We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer periods.`,
  },
  {
    id: "your-rights",
    title: "8. Your Privacy Rights",
    content: `Depending on your location, you may have certain rights regarding your personal information:

**Access:** You have the right to access the personal information we hold about you.

**Correction:** You have the right to request correction of inaccurate or incomplete data.

**Deletion:** You have the right to request deletion of your personal data under certain circumstances.

**Objection:** You have the right to object to processing of your personal data.

**Portability:** You have the right to request transfer of your data to another service.

**Withdrawal of Consent:** You have the right to withdraw consent where we rely on consent to process your personal data.

To exercise these rights, please contact us using the information provided in the Contact section.`,
  },
  {
    id: "children-privacy",
    title: "9. Children's Privacy",
    content: `Our Service is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.

If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.`,
  },
  {
    id: "third-party",
    title: "10. Third-Party Links",
    content: `Our Service may contain links to third-party websites or services that are not owned or controlled by ${siteConfig.company.name}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.

We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.`,
  },
  {
    id: "international",
    title: "11. International Data Transfers",
    content: `Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction.

If you are located outside the United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to the United States and process it there.

Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.`,
  },
  {
    id: "california",
    title: "12. California Privacy Rights",
    content: `If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):

- Right to know what personal information is collected
- Right to know if personal information is sold or disclosed
- Right to opt-out of the sale of personal information
- Right to non-discrimination for exercising privacy rights

To exercise these rights, please contact us using the information provided in the Contact section.`,
  },
  {
    id: "gdpr",
    title: "13. GDPR Rights (EU Users)",
    content: `If you are located in the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR):

- Right to access your personal data
- Right to rectification of inaccurate data
- Right to erasure ("right to be forgotten")
- Right to restrict processing
- Right to data portability
- Right to object to processing
- Right to withdraw consent

To exercise these rights, please contact us using the information provided in the Contact section.`,
  },
  {
    id: "changes",
    title: "14. Changes to This Privacy Policy",
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.`,
  },
  {
    id: "contact",
    title: "15. Contact Us",
    content: `If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:

- Email: privacy@vynspirelabs.com
- Address: ${siteConfig.company.name}, San Francisco, CA
- Website: ${routes.CONTACT}

We will respond to your inquiry within 30 days.`,
  },
];

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 w-fit mx-auto" variant="secondary">
              <IconShield className="mr-2 size-4" />
              Privacy & Security
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed md:text-xl">
              Your privacy is important to us. Learn how we collect, use, and
              protect your information.
            </p>
            <p className="text-muted-foreground text-sm">
              Last updated: {currentDate}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-lg">
                  <IconLock className="size-6 text-primary" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Our Commitment to Privacy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At {siteConfig.company.name}, we are committed to protecting
                    your privacy and ensuring the security of your personal
                    information. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you visit
                    our website {siteConfig.site.url} or use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <Card key={section.id} id={section.id}>
                <CardContent className="p-8">
                  <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Points Summary */}
          <Card className="mt-12 border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Key Points Summary</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">We Collect</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Information you provide directly</li>
                    <li>• Usage and analytics data</li>
                    <li>• Cookies and tracking technologies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">We Use It For</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Providing and improving our Service</li>
                    <li>• Communication and support</li>
                    <li>• Analytics and security</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">We Share</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• With service providers (as needed)</li>
                    <li>• When required by law</li>
                    <li>• With your consent</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Your Rights</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Access and update your data</li>
                    <li>• Request deletion</li>
                    <li>• Opt-out of communications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement Section */}
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">
                Questions About Privacy?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please don't hesitate to contact us. We
                are committed to addressing your privacy concerns promptly and
                transparently.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href={routes.CONTACT}>Contact Us</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={routes.TERMS}>View Terms of Service</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={routes.HOME}>Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
