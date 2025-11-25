"use client";

import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBulb,
  IconCode,
  IconRocket,
  IconTarget,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";

const values = [
  {
    icon: IconBulb,
    title: "Innovation",
    description:
      "We believe in pushing boundaries and exploring new possibilities in technology and development.",
  },
  {
    icon: IconCode,
    title: "Quality",
    description:
      "We are committed to delivering high-quality content and solutions that meet the highest standards.",
  },
  {
    icon: IconUsers,
    title: "Community",
    description:
      "We foster a supportive community where developers and tech enthusiasts can learn and grow together.",
  },
  {
    icon: IconRocket,
    title: "Growth",
    description:
      "We are dedicated to continuous learning and helping others achieve their goals in technology.",
  },
];

const teamMembers = [
  {
    name: "Diwash Bhattarai",
    role: "Founder & Lead Developer",
    bio: "Passionate about technology and innovation with expertise in full-stack development and modern web technologies.",
    avatar: "",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "John Doe",
    role: "Senior Developer",
    bio: "Passionate about technology and innovation with over 10 years of experience in software development.",
    avatar: "",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Jane Smith",
    role: "Content Strategist",
    bio: "Tech writer and content creator focused on making complex topics accessible to everyone.",
    avatar: "",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Mike Johnson",
    role: "Technical Writer",
    bio: "Developer advocate and technical writer with expertise in modern web technologies.",
    avatar: "",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 w-fit mx-auto" variant="secondary">
              <IconTarget className="mr-2 size-4" />
              About Us
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to{" "}
              <span className="text-primary">{siteConfig.site.name}</span>
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed md:text-xl">
              {siteConfig.site.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              At {siteConfig.company.name}, we are dedicated to sharing
              knowledge, insights, and innovations in the world of technology.
              Our mission is to empower developers, designers, and tech
              enthusiasts with the tools and knowledge they need to build
              amazing things.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Through our blog, we aim to bridge the gap between complex
              technical concepts and practical implementation, making technology
              accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Meet Our Team</h2>
            <p className="text-muted-foreground">
              The passionate people behind {siteConfig.site.name}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-muted flex size-20 items-center justify-center rounded-full">
                      <span className="text-2xl font-semibold">
                        {getInitials(member.name)}
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-3">
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <IconBrandTwitter className="size-5" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <IconBrandLinkedin className="size-5" />
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <IconBrandGithub className="size-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">100+</div>
              <div className="text-muted-foreground text-sm">
                Articles Published
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground text-sm">
                Monthly Readers
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground text-sm">
                Community Members
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">5+</div>
              <div className="text-muted-foreground text-sm">
                Years of Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Join Our Community</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Be part of our growing community of developers and tech
                enthusiasts. Get access to exclusive content, early updates, and
                join the conversation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href={routes.AUTH.REGISTER}>
                    Get Started
                    <IconArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={routes.CONTACT}>Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

