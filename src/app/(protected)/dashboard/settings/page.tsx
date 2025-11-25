"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBell,
  IconBrandTwitter,
  IconDeviceDesktop,
  IconGlobe,
  IconMoon,
  IconPalette,
  IconSearch,
  IconSettings,
  IconSun,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SiteHeader } from "@/components/layouts/header/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteShortName: z.string().min(1, "Short name is required"),
  siteDescription: z.string().min(1, "Description is required"),
  siteUrl: z.string().url("Must be a valid URL"),
  locale: z.string().min(1, "Locale is required"),
  twitterHandle: z.string().optional(),
  seoKeywords: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: siteConfig.site.name,
      siteShortName: siteConfig.site.shortName,
      siteDescription: siteConfig.site.description,
      siteUrl: siteConfig.site.url,
      locale: siteConfig.site.locale,
      twitterHandle: siteConfig.social.twitter.handle,
      seoKeywords: siteConfig.seo.keywords.join(", "),
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    // In a real app, you would save these settings to your backend
    console.log("Settings saved:", data);
  };

  return (
    <div className="relative mx-auto size-full max-w-[1920px]">
      <SiteHeader title="Settings" />

      <main className="bg-background h-[calc(100vh-var(--header-height))] flex-1 overflow-x-hidden overflow-y-auto px-6 py-4">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage your blog settings and preferences
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconGlobe className="size-5" />
                    <CardTitle>General Settings</CardTitle>
                  </div>
                  <CardDescription>
                    Configure your blog's basic information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My Blog" {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your blog displayed throughout the site
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="siteShortName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Name</FormLabel>
                        <FormControl>
                          <Input placeholder="MBlog" {...field} />
                        </FormControl>
                        <FormDescription>
                          A shorter version of your site name for compact
                          displays
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A blog about technology and innovation"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A brief description of your blog
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="siteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site URL</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="locale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Locale</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="en_US">
                                English (US)
                              </SelectItem>
                              <SelectItem value="en_GB">
                                English (UK)
                              </SelectItem>
                              <SelectItem value="es_ES">Spanish</SelectItem>
                              <SelectItem value="fr_FR">French</SelectItem>
                              <SelectItem value="de_DE">German</SelectItem>
                              <SelectItem value="ja_JP">Japanese</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Appearance Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconPalette className="size-5" />
                    <CardTitle>Appearance</CardTitle>
                  </div>
                  <CardDescription>
                    Customize the look and feel of your blog
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setTheme("light")}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary",
                          theme === "light" && "border-primary bg-primary/5",
                        )}
                      >
                        <IconSun className="size-6" />
                        <span className="text-sm font-medium">Light</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme("dark")}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary",
                          theme === "dark" && "border-primary bg-primary/5",
                        )}
                      >
                        <IconMoon className="size-6" />
                        <span className="text-sm font-medium">Dark</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme("system")}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary",
                          theme === "system" && "border-primary bg-primary/5",
                        )}
                      >
                        <IconDeviceDesktop className="size-6" />
                        <span className="text-sm font-medium">System</span>
                      </button>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Choose your preferred theme. System will match your OS
                      settings.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconSearch className="size-5" />
                    <CardTitle>SEO Settings</CardTitle>
                  </div>
                  <CardDescription>
                    Optimize your blog for search engines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="seoKeywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Keywords</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="technology, blog, tutorials"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Comma-separated keywords for SEO optimization
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconBrandTwitter className="size-5" />
                    <CardTitle>Social Media</CardTitle>
                  </div>
                  <CardDescription>
                    Connect your social media accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="twitterHandle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter Handle</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="@username"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>
                          Your Twitter/X username (e.g., @username)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconBell className="size-5" />
                    <CardTitle>Notifications</CardTitle>
                  </div>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-muted-foreground text-sm">
                        Receive email updates about your blog activity
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="size-4 rounded border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>New Comment Alerts</Label>
                      <p className="text-muted-foreground text-sm">
                        Get notified when someone comments on your posts
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="size-4 rounded border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Weekly Digest</Label>
                      <p className="text-muted-foreground text-sm">
                        Receive a weekly summary of your blog statistics
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 border-t pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isSaving}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <IconSettings className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <IconSettings className="mr-2 size-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
