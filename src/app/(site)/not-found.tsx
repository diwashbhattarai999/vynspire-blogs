"use client";

import {
  IconArrowLeft,
  IconFileText,
  IconHome,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/constants/routes";

const helpfulLinks = [
  {
    icon: IconHome,
    title: "Home",
    description: "Go back to the homepage",
    href: routes.HOME,
  },
  {
    icon: IconFileText,
    title: "Blog",
    description: "Browse our latest articles",
    href: `${routes.HOME}#blog`,
  },
  {
    icon: IconSearch,
    title: "Search",
    description: "Find what you're looking for",
    href: routes.HOME,
  },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-primary/20 sm:text-[12rem]">
                404
              </h1>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Page Not Found
              </h2>
              <p className="text-muted-foreground mx-auto max-w-md text-lg">
                Oops! The page you're looking for doesn't exist or has been
                moved. Let's get you back on track.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mb-12 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href={routes.HOME}>
                  <IconHome className="size-4" />
                  Go Home
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => window.history.back()}
              >
                <IconArrowLeft className="size-4" />
                Go Back
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mb-8">
              <h3 className="mb-6 text-xl font-semibold">
                You might be looking for:
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {helpfulLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.title} href={link.href}>
                      <Card className="group h-full transition-all hover:shadow-lg">
                        <CardContent className="p-6 text-center">
                          <div className="mb-4 flex justify-center">
                            <div className="bg-primary/10 group-hover:bg-primary/20 flex size-12 items-center justify-center rounded-lg transition-colors">
                              <Icon className="size-6 text-primary" />
                            </div>
                          </div>
                          <h4 className="mb-2 font-semibold">{link.title}</h4>
                          <p className="text-muted-foreground text-sm">
                            {link.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Additional Help */}
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4 text-sm">
                  If you believe this is an error, please{" "}
                  <Link
                    href={routes.CONTACT}
                    className="text-primary hover:underline"
                  >
                    contact us
                  </Link>{" "}
                  and let us know what happened.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
