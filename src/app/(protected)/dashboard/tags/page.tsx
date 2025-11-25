"use client";

import { IconTag } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { SiteHeader } from "@/components/layouts/header/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { routes } from "@/constants/routes";
import { getTags, type Tag } from "@/lib/api/posts";
import { cn } from "@/lib/utils";

export default function TagsPage() {
  const { data: tags = [], isLoading } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  return (
    <div className="relative mx-auto size-full max-w-[1920px]">
      <SiteHeader title="Tags" />

      <main className="bg-background h-[calc(100vh-var(--header-height))] flex-1 overflow-x-hidden overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Tags</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Browse all tags used in your posts
            </p>
          </div>

          {/* Tags Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner className="text-primary size-6" />
            </div>
          ) : tags.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <IconTag className="text-muted-foreground mb-4 size-12" />
                <p className="text-muted-foreground text-lg">
                  No tags found. Tags will appear here when you add them to your
                  posts.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`${routes.DASHBOARD_ROUTES.POSTS}?tag=${encodeURIComponent(tag.name)}`}
                >
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconTag className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                          <span className="text-foreground group-hover:text-primary font-medium transition-colors">
                            {tag.name}
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            tag.count > 0 && "bg-primary/10 text-primary",
                          )}
                        >
                          {tag.count}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-2 text-xs">
                        {tag.count === 1 ? "post" : "posts"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
