"use client";

import {
  IconArrowRight,
  IconBook,
  IconCategory,
  IconClock,
  IconEye,
  IconFileText,
  IconHeart,
  IconMessageCircle,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { PublicPostCard } from "@/components/modules/posts/public-post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { siteConfig } from "@/config/site";
import { routes } from "@/constants/routes";
import { type Category, getCategories, getPosts } from "@/lib/api/posts";
import { cn } from "@/lib/utils";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export default function Home() {
  const { data: featuredPosts } = useQuery({
    queryKey: ["posts", { featured: true, status: "published", limit: 1 }],
    queryFn: () => getPosts({ featured: true, status: "published", limit: 1 }),
  });

  const { data: recentPosts, isLoading: recentLoading } = useQuery({
    queryKey: ["posts", { status: "published", limit: 6 }],
    queryFn: () => getPosts({ status: "published", limit: 6 }),
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const featuredPost = featuredPosts?.posts[0];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <Badge className="mb-4 w-fit" variant="secondary">
                <IconTrendingUp className="mr-2 size-4" />
                Latest Insights
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Welcome to{" "}
                <span className="text-primary">{siteConfig.site.name}</span>
              </h1>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed md:text-xl">
                {siteConfig.site.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="#blog">
                    Explore Articles
                    <IconArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={routes.ABOUT_US}>Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Featured Post Preview */}
            {featuredPost && (
              <div className="relative">
                <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="bg-muted relative aspect-video w-full overflow-hidden">
                    {featuredPost.coverImage ? (
                      <Image
                        width={800}
                        height={600}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={featuredPost.coverImage}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <IconFileText className="text-muted-foreground size-24" />
                      </div>
                    )}
                    <div className="bg-primary/90 absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity group-hover:opacity-100">
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {featuredPost.title}
                      </h3>
                      <p className="text-white/90 line-clamp-2 text-sm">
                        {featuredPost.excerpt}
                      </p>
                    </div>
                    <div className="bg-primary absolute top-4 right-4 rounded px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Featured
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="border-y bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Featured Article</h2>
                <p className="text-muted-foreground mt-2">
                  Our most popular and insightful content
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                {featuredPost.coverImage ? (
                  <Image
                    width={1200}
                    height={800}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                    src={featuredPost.coverImage}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <IconFileText className="text-muted-foreground size-24" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <Badge className="mb-4 w-fit" variant="secondary">
                  {featuredPost.category}
                </Badge>
                <h3 className="mb-4 text-3xl font-bold">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <IconClock className="size-4" />
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconEye className="size-4" />
                    <span>{formatNumber(featuredPost.views)} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconHeart className="size-4" />
                    <span>{formatNumber(featuredPost.likes)} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconMessageCircle className="size-4" />
                    <span>{formatNumber(featuredPost.comments)} comments</span>
                  </div>
                </div>
                <Button asChild size="lg" className="w-fit gap-2">
                  <Link href={`/posts/${featuredPost.id}`}>
                    Read Article
                    <IconArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Explore Categories</h2>
            <p className="text-muted-foreground mt-2">
              Discover content organized by topics
            </p>
          </div>
          {categoriesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner className="text-primary size-6" />
            </div>
          ) : categories.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/posts?category=${category.slug}`}
                >
                  <Card className="group h-full transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div
                        className={cn(
                          "mb-4 size-12 rounded-lg flex items-center justify-center",
                          category.color,
                        )}
                      >
                        <IconCategory className="size-6 text-white" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {category.count}{" "}
                        {category.count === 1 ? "article" : "articles"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section id="blog" className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Latest Articles</h2>
              <p className="text-muted-foreground mt-2">
                Stay updated with our newest content
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/posts">View All</Link>
            </Button>
          </div>
          {recentLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner className="text-primary size-6" />
            </div>
          ) : recentPosts && recentPosts.posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.posts.map((post) => (
                <PublicPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-background rounded-lg border p-12 text-center">
              <IconBook className="text-muted-foreground mx-auto mb-4 size-12" />
              <p className="text-muted-foreground text-lg">
                No articles found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Join Our Community</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Get access to exclusive content, early updates, and join the
                conversation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href={routes.AUTH.REGISTER}>Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={routes.AUTH.LOGIN}>Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
