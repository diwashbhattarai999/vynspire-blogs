"use client";

import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconEye,
  IconFileText,
  IconHeart,
  IconMessageCircle,
  IconShare,
  IconUser,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { PostComments } from "@/components/modules/posts/post-comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { routes } from "@/constants/routes";
import { getPostById, type Post } from "@/lib/api/posts";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

interface PublicPostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PublicPostDetailPage({
  params,
}: PublicPostDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<Post | null>({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-12">
              <Spinner className="text-primary size-6" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Card className="border-destructive/20 bg-destructive/10">
              <CardContent className="p-8 text-center">
                <h2 className="mb-2 text-xl font-semibold text-destructive">
                  Post Not Found
                </h2>
                <p className="text-muted-foreground mb-4">
                  The post you're looking for doesn't exist or has been removed.
                </p>
                <Button onClick={() => router.push(routes.HOME)}>
                  <IconArrowLeft className="mr-2 size-4" />
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Only show published posts publicly
  if (post.status !== "published") {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Card className="border-destructive/20 bg-destructive/10">
              <CardContent className="p-8 text-center">
                <h2 className="mb-2 text-xl font-semibold text-destructive">
                  Post Not Available
                </h2>
                <p className="text-muted-foreground mb-4">
                  This post is not publicly available.
                </p>
                <Button onClick={() => router.push(routes.HOME)}>
                  <IconArrowLeft className="mr-2 size-4" />
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <IconArrowLeft className="mr-2 size-4" />
            Back
          </Button>

          {/* Cover Image */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-muted relative aspect-video w-full overflow-hidden">
              {post.coverImage ? (
                <Image
                  width={1200}
                  height={675}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  src={post.coverImage}
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <IconFileText className="text-muted-foreground size-24" />
                </div>
              )}
              {post.featured && (
                <div className="bg-primary absolute top-4 right-4 rounded px-3 py-1.5 text-sm font-semibold text-primary-foreground">
                  Featured
                </div>
              )}
            </div>
          </Card>

          {/* Post Content */}
          <article className="space-y-6">
            {/* Category Badge */}
            <div>
              <Badge className="bg-primary text-primary-foreground">
                {post.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-foreground text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-muted-foreground text-lg leading-relaxed sm:text-xl">
              {post.excerpt}
            </p>

            {/* Author and Meta Info */}
            <div className="flex flex-wrap items-center gap-4 border-b pb-6">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage
                    alt={post.author.name}
                    src={post.author.avatar}
                  />
                  <AvatarFallback>
                    {getInitials(post.author.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <IconUser className="size-3" />
                    {post.author.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <IconCalendar className="size-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <IconClock className="size-4" />
                {post.readTime} min read
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconEye className="size-4" />
                <span>{formatNumber(post.views)} views</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconHeart className="size-4" />
                <span>{formatNumber(post.likes)} likes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconMessageCircle className="size-4" />
                <span>{formatNumber(post.comments)} comments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconShare className="size-4" />
                <span>{formatNumber(post.shares)} shares</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Post Content - Markdown */}
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-foreground mb-4 mt-8 text-3xl font-bold first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-foreground mb-3 mt-6 text-2xl font-bold first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-foreground mb-2 mt-4 text-xl font-semibold first:mt-0">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-foreground mb-2 mt-3 text-lg font-semibold first:mt-0">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="text-foreground mb-4 ml-6 list-disc space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="text-foreground mb-4 ml-6 list-decimal space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-foreground font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-foreground italic">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-muted text-foreground rounded px-1.5 py-0.5 text-sm font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-muted text-foreground mb-4 overflow-x-auto rounded-lg p-4">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary bg-muted/50 text-foreground mb-4 pl-4 italic">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a
                      className="text-primary hover:underline"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="border-border my-8 border-t" />,
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt}
                      className="my-4 rounded-lg shadow-lg"
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 border-t pt-6">
              <Button variant="outline" size="lg">
                <IconHeart className="mr-2 size-4" />
                Like ({formatNumber(post.likes)})
              </Button>
              <Button variant="outline" size="lg">
                <IconShare className="mr-2 size-4" />
                Share
              </Button>
              <Button variant="outline" size="lg">
                <IconMessageCircle className="mr-2 size-4" />
                Comment ({formatNumber(post.comments)})
              </Button>
            </div>
          </article>

          {/* Comments Section */}
          <div className="mt-12">
            <PostComments postId={post.id} />
          </div>

          {/* Related Posts Section - Placeholder for future */}
          <div className="mt-12 border-t pt-12">
            <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
            <p className="text-muted-foreground text-sm">
              Related posts feature coming soon...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
