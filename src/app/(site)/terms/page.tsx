"use client";

import { IconFileText, IconScale } from "@tabler/icons-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing and using ${siteConfig.site.name} (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
  },
  {
    id: "description",
    title: "2. Description of Service",
    content: `${siteConfig.site.name} is a blog platform operated by ${siteConfig.company.name} that provides users with the ability to read, create, and manage blog content. The Service includes access to articles, tutorials, and other content related to technology, development, and innovation.`,
  },
  {
    id: "user-accounts",
    title: "3. User Accounts",
    content: `To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
- Provide accurate, current, and complete information during registration
- Maintain and update your information to keep it accurate, current, and complete
- Notify us immediately of any unauthorized use of your account
- Be responsible for all activities that occur under your account`,
  },
  {
    id: "user-conduct",
    title: "4. User Conduct",
    content: `You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
- Violate any applicable laws or regulations
- Infringe upon the rights of others
- Transmit any harmful, offensive, or inappropriate content
- Attempt to gain unauthorized access to the Service or its related systems
- Interfere with or disrupt the Service or servers
- Use automated systems to access the Service without permission
- Impersonate any person or entity
- Collect or store personal data about other users without permission`,
  },
  {
    id: "content",
    title: "5. Content and Intellectual Property",
    content: `All content on the Service, including but not limited to text, graphics, logos, images, and software, is the property of ${siteConfig.company.name} or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.

You retain ownership of any content you create and submit to the Service. By submitting content, you grant ${siteConfig.company.name} a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content for the purpose of operating and promoting the Service.

You may not reproduce, distribute, modify, or create derivative works from any content on the Service without express written permission from ${siteConfig.company.name}.`,
  },
  {
    id: "prohibited-content",
    title: "6. Prohibited Content",
    content: `You agree not to post, upload, or transmit any content that:
- Is illegal, harmful, threatening, abusive, or discriminatory
- Infringes on intellectual property rights
- Contains viruses or malicious code
- Is spam or unsolicited commercial content
- Violates privacy rights of others
- Is false, misleading, or defamatory
- Promotes illegal activities

${siteConfig.company.name} reserves the right to remove any content that violates these terms without notice.`,
  },
  {
    id: "privacy",
    title: "7. Privacy",
    content: `Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your personal information.`,
  },
  {
    id: "modifications",
    title: "8. Modifications to Service",
    content: `${siteConfig.company.name} reserves the right to modify, suspend, or discontinue the Service (or any part thereof) at any time with or without notice. You agree that ${siteConfig.company.name} will not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.`,
  },
  {
    id: "termination",
    title: "9. Termination",
    content: `We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.`,
  },
  {
    id: "disclaimers",
    title: "10. Disclaimers",
    content: `THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. ${siteConfig.company.name} MAKES NO WARRANTIES, EXPRESS OR IMPLIED, AND HEREBY DISCLAIMS ALL WARRANTIES INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

${siteConfig.company.name} does not warrant that:
- The Service will be uninterrupted or error-free
- The results obtained from use of the Service will be accurate or reliable
- The quality of any products, services, or information obtained through the Service will meet your expectations`,
  },
  {
    id: "limitation",
    title: "11. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${siteConfig.company.name} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.`,
  },
  {
    id: "indemnification",
    title: "12. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless ${siteConfig.company.name}, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your use of the Service or violation of these Terms.`,
  },
  {
    id: "governing-law",
    title: "13. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ${siteConfig.company.name} operates, without regard to its conflict of law provisions.`,
  },
  {
    id: "changes",
    title: "14. Changes to Terms",
    content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.

What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.`,
  },
  {
    id: "contact",
    title: "15. Contact Information",
    content: `If you have any questions about these Terms of Service, please contact us at:
- Email: legal@vynspirelabs.com
- Address: ${siteConfig.company.name}, San Francisco, CA
- Website: ${routes.CONTACT}`,
  },
];

export default function TermsOfServicePage() {
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
              <IconScale className="mr-2 size-4" />
              Legal Document
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed md:text-xl">
              Please read these terms carefully before using our service.
            </p>
            <p className="text-muted-foreground text-sm">
              Last updated: {currentDate}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-lg">
                  <IconFileText className="size-6 text-primary" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to {siteConfig.site.name}. These Terms of Service
                    ("Terms") govern your access to and use of our website and
                    services operated by {siteConfig.company.name} ("we", "us",
                    or "our"). By accessing or using our Service, you agree to
                    be bound by these Terms. If you disagree with any part of
                    these terms, then you may not access the Service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
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

          {/* Agreement Section */}
          <Card className="mt-12 border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">Agreement to Terms</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                By using {siteConfig.site.name}, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of
                Service. If you do not agree to these Terms, please do not use
                our Service.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href={routes.HOME}>Back to Home</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={routes.PRIVACY}>View Privacy Policy</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
