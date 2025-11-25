"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconArrowRight,
  IconBook,
  IconBug,
  IconChevronDown,
  IconCode,
  IconFileText,
  IconHelp,
  IconMail,
  IconMessage,
  IconPhone,
  IconQuestionMark,
  IconSearch,
  IconSend,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { routes } from "@/constants/routes";

const supportFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  category: z.enum(["technical", "billing", "general", "bug"]),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

const quickHelpLinks = [
  {
    icon: IconBook,
    title: "Documentation",
    description: "Browse our comprehensive guides and tutorials",
    href: "#",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: IconCode,
    title: "API Reference",
    description: "Explore our API documentation and examples",
    href: "#",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: IconSettings,
    title: "Account Settings",
    description: "Manage your account preferences and settings",
    href: routes.DASHBOARD_ROUTES.SETTINGS,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    icon: IconBug,
    title: "Report a Bug",
    description: "Found an issue? Let us know and we'll fix it",
    href: "#report-bug",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
];

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click on the 'Register' button in the top navigation bar or visit the registration page. Fill in your details including name, email, and password. Once registered, you'll receive a confirmation email to verify your account.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "If you've forgotten your password, click on 'Forgot Password' on the login page. Enter your email address and you'll receive instructions to reset your password via email.",
      },
      {
        question: "What features are available in the dashboard?",
        answer:
          "The dashboard provides access to post management, category and tag organization, analytics, settings, and more. You can create, edit, and manage your blog posts, view statistics, and customize your account preferences.",
      },
    ],
  },
  {
    category: "Content Management",
    questions: [
      {
        question: "How do I create a new blog post?",
        answer:
          "Navigate to the Dashboard > Posts section and click 'Create New Post'. Fill in the title, content using our rich text editor, add a cover image, select categories and tags, and set the publication status. Once ready, click 'Publish'.",
      },
      {
        question: "Can I schedule posts for later?",
        answer:
          "Yes! When creating or editing a post, you can set a future publication date. The post will automatically be published at the scheduled time.",
      },
      {
        question: "How do I add images to my posts?",
        answer:
          "You can add images through the rich text editor. Click the image icon in the toolbar, then either upload an image from your device or paste an image URL. You can also set a cover image in the post settings.",
      },
      {
        question: "What's the difference between categories and tags?",
        answer:
          "Categories are broad topics that organize your content (e.g., 'Technology', 'Tutorials'). Tags are more specific keywords that help readers find related content. A post typically has one category but multiple tags.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "What browsers are supported?",
        answer:
          "Our platform works best with modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience.",
      },
      {
        question: "Is there a mobile app?",
        answer:
          "Currently, we offer a responsive web application that works seamlessly on mobile devices. A dedicated mobile app is in development and will be available soon.",
      },
      {
        question: "How do I export my content?",
        answer:
          "You can export your posts from the dashboard. Go to Settings > Export and choose your preferred format (JSON, Markdown, or HTML). Your content will be downloaded as a file.",
      },
      {
        question: "What file formats are supported for uploads?",
        answer:
          "We support common image formats (JPEG, PNG, GIF, WebP) and document formats (PDF, DOCX). Maximum file size is 10MB per file.",
      },
    ],
  },
  {
    category: "Billing & Account",
    questions: [
      {
        question: "Is the platform free to use?",
        answer:
          "We offer a free tier with basic features. Premium plans with advanced features are available. Check our pricing page for more details on what's included in each plan.",
      },
      {
        question: "How do I upgrade my account?",
        answer:
          "Navigate to Settings > Subscription in your dashboard. Choose your preferred plan and follow the payment instructions. Your account will be upgraded immediately after payment confirmation.",
      },
      {
        question: "Can I cancel my subscription?",
        answer:
          "Yes, you can cancel your subscription at any time from Settings > Subscription. Your access will continue until the end of your current billing period.",
      },
    ],
  },
];

const helpArticles = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of using our platform",
    category: "Getting Started",
    readTime: "5 min",
    href: "#",
  },
  {
    title: "Rich Text Editor Tips",
    description: "Master the content editor with these tips",
    category: "Content Management",
    readTime: "8 min",
    href: "#",
  },
  {
    title: "SEO Best Practices",
    description: "Optimize your posts for search engines",
    category: "Content Management",
    readTime: "10 min",
    href: "#",
  },
  {
    title: "API Integration Guide",
    description: "Connect your application with our API",
    category: "Technical Support",
    readTime: "15 min",
    href: "#",
  },
];

const contactMethods = [
  {
    icon: IconMail,
    label: "Email Support",
    value: "support@vynspirelabs.com",
    href: "mailto:support@vynspirelabs.com",
    description: "We typically respond within 24 hours",
  },
  {
    icon: IconPhone,
    label: "Phone Support",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    description: "Available Monday-Friday, 9 AM - 5 PM PST",
  },
  {
    icon: IconMessage,
    label: "Live Chat",
    value: "Available Now",
    href: "#",
    description: "Chat with our support team in real-time",
  },
];

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    },
  });

  const onSubmit = async (data: SupportFormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Support form submitted:", data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    form.reset();
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const filteredFaqs = faqCategories.flatMap((cat) =>
    cat.questions
      .filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .map((q) => ({ ...q, category: cat.category })),
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 w-fit mx-auto" variant="secondary">
              <IconHelp className="mr-2 size-4" />
              Support Center
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              How can we help you?
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed md:text-xl">
              Find answers to common questions, browse documentation, or get in
              touch with our support team.
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <IconSearch className="text-muted-foreground absolute left-4 top-1/2 size-5 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 pr-4 text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Links */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold">Quick Help</h2>
            <p className="text-muted-foreground">
              Get started quickly with these resources
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickHelpLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.title} href={link.href}>
                  <Card className="group h-full transition-all hover:shadow-lg">
                    <CardContent className="p-6">
                      <div
                        className={`${link.bgColor} mb-4 flex size-12 items-center justify-center rounded-lg`}
                      >
                        <Icon className={`${link.color} size-6`} />
                      </div>
                      <h3 className="mb-2 font-semibold">{link.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {link.description}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to the most common questions
            </p>
          </div>

          <div className="space-y-4">
            {searchQuery
              ? filteredFaqs.map((faq, index) => (
                  <Collapsible
                    key={`${faq.category}-${index}`}
                    open={openFaq === `${faq.category}-${index}`}
                    onOpenChange={(open) =>
                      setOpenFaq(open ? `${faq.category}-${index}` : null)
                    }
                  >
                    <Card>
                      <CollapsibleTrigger asChild>
                        <CardContent className="flex cursor-pointer items-center justify-between p-6 hover:bg-muted/50">
                          <div className="flex-1 text-left">
                            <div className="mb-1">
                              <Badge variant="secondary" className="text-xs">
                                {faq.category}
                              </Badge>
                            </div>
                            <h3 className="font-semibold">{faq.question}</h3>
                          </div>
                          <IconChevronDown
                            className={`text-muted-foreground size-5 transition-transform ${
                              openFaq === `${faq.category}-${index}`
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </CardContent>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="border-t p-6 pt-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))
              : faqCategories.map((category) => (
                  <div key={category.category} className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      {category.category}
                    </h3>
                    {category.questions.map((faq, index) => (
                      <Collapsible
                        key={`${category.category}-${index}`}
                        open={openFaq === `${category.category}-${index}`}
                        onOpenChange={(open) =>
                          setOpenFaq(
                            open ? `${category.category}-${index}` : null,
                          )
                        }
                      >
                        <Card>
                          <CollapsibleTrigger asChild>
                            <CardContent className="flex cursor-pointer items-center justify-between p-6 hover:bg-muted/50">
                              <h3 className="flex-1 text-left font-semibold">
                                {faq.question}
                              </h3>
                              <IconChevronDown
                                className={`text-muted-foreground size-5 transition-transform ${
                                  openFaq === `${category.category}-${index}`
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </CardContent>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <CardContent className="border-t p-6 pt-4">
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </CardContent>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    ))}
                  </div>
                ))}
          </div>

          {searchQuery && filteredFaqs.length === 0 && (
            <div className="py-12 text-center">
              <IconQuestionMark className="text-muted-foreground mx-auto mb-4 size-12" />
              <p className="text-muted-foreground">
                No results found for "{searchQuery}". Try different keywords or{" "}
                <a href="#contact" className="text-primary hover:underline">
                  contact support
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Help Articles */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Help Articles</h2>
            <p className="text-muted-foreground">
              Browse our comprehensive guides and tutorials
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {helpArticles.map((article) => (
              <Card
                key={article.title}
                className="group h-full transition-all hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <IconFileText className="text-primary size-5" />
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  <h3 className="mb-2 font-semibold">{article.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      {article.readTime} read
                    </span>
                    <a
                      href={article.href}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Read more →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Form */}
      <section className="bg-muted/30 py-16" id="contact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-2 text-2xl font-bold">Still need help?</h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and our support team will get back to
                you as soon as possible.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="technical">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="billing">
                              Billing Question
                            </SelectItem>
                            <SelectItem value="bug">Report a Bug</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                          <Input
                            {...field}
                            placeholder="What can we help you with?"
                          />
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
                            placeholder="Please provide as much detail as possible..."
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submitSuccess && (
                    <div className="bg-primary/10 text-primary rounded-lg border border-primary/20 p-4 text-sm">
                      Thank you for contacting us! We'll get back to you within
                      24 hours.
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
                <h2 className="mb-6 text-2xl font-bold">
                  Other Ways to Reach Us
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Prefer a different method? Choose the option that works best
                  for you.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Card
                      key={method.label}
                      className="transition-all hover:shadow-md"
                    >
                      <CardContent className="p-6">
                        <a
                          href={method.href}
                          className="flex items-start gap-4"
                          target={
                            method.href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            method.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-lg">
                            <Icon className="size-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-1 font-semibold">
                              {method.label}
                            </h3>
                            <p className="text-muted-foreground mb-1 text-sm">
                              {method.value}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {method.description}
                            </p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Additional Info */}
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold">Response Time</h3>
                  <p className="text-muted-foreground text-sm">
                    Our support team typically responds within 24-48 hours
                    during business days. For urgent matters, please call us
                    directly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">
                Can't find what you're looking for?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Our support team is here to help. Get in touch and we'll assist
                you with any questions or issues.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <a href={routes.CONTACT}>
                    Contact Us
                    <IconArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={routes.HOME}>Back to Home</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
