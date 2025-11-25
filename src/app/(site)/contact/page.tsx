"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
  IconMapPin,
  IconMessage,
  IconPhone,
  IconSend,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: IconMail,
    label: "Email",
    value: "contact@vynspirelabs.com",
    href: "mailto:contact@vynspirelabs.com",
  },
  {
    icon: IconPhone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: IconMapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
];

const socialLinks = [
  {
    icon: IconBrandTwitter,
    label: "Twitter",
    href: `https://twitter.com/${siteConfig.social.twitter.handle.replace("@", "")}`,
  },
  {
    icon: IconBrandLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/vynspirelabs",
  },
  {
    icon: IconBrandGithub,
    label: "GitHub",
    href: "https://github.com/vynspirelabs",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Contact form submitted:", data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    form.reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 w-fit mx-auto" variant="secondary">
              <IconMessage className="mr-2 size-4" />
              Get in Touch
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Contact Us
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed md:text-xl">
              Have a question or want to collaborate? We'd love to hear from
              you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Send us a Message</h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <IconUser className="text-muted-foreground absolute left-3 top-1/2 size-5 -translate-y-1/2" />
                            <Input
                              {...field}
                              className="pl-10"
                              placeholder="Your name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <IconMail className="text-muted-foreground absolute left-3 top-1/2 size-5 -translate-y-1/2" />
                            <Input
                              {...field}
                              type="email"
                              className="pl-10"
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="What's this about?" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={6}
                            placeholder="Tell us more about your inquiry..."
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submitSuccess && (
                    <div className="bg-primary/10 text-primary rounded-lg border border-primary/20 p-4 text-sm">
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="size-4" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <IconSend className="size-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Feel free to reach out to us through any of the following
                  channels. We're here to help and answer any questions you may
                  have.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <Card
                      key={info.label}
                      className="transition-all hover:shadow-md"
                    >
                      <CardContent className="p-6">
                        <a
                          href={info.href}
                          className="flex items-start gap-4"
                          target={
                            info.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-lg">
                            <Icon className="size-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-1 font-semibold">{info.label}</h3>
                            <p className="text-muted-foreground text-sm">
                              {info.value}
                            </p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary flex size-12 items-center justify-center rounded-lg transition-colors"
                        aria-label={social.label}
                      >
                        <Icon className="size-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold">Response Time</h3>
                  <p className="text-muted-foreground text-sm">
                    We typically respond within 24-48 hours during business
                    days. For urgent matters, please reach out via phone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Join Our Community</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Stay connected with us and get the latest updates, articles, and
                exclusive content.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <a href={routes.AUTH.REGISTER}>
                    Sign Up
                    <IconArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={routes.HOME}>Read Our Blog</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

