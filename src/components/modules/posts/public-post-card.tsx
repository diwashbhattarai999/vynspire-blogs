import {
  IconClock,
  IconEye,
  IconFileText,
  IconHeart,
  IconMessageCircle,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Post } from "@/lib/api/posts";
import { cn } from "@/lib/utils";

interface PublicPostCardProps {
  post: Post;
  featured?: boolean;
  variant?: "default" | "compact";
}

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

export function PublicPostCard({
  post,
  featured = false,
  variant = "default",
}: PublicPostCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/posts/${post.id}`}>
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="flex gap-4">
            <div className="bg-muted relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
              {post.coverImage ? (
                <Image
                  width={96}
                  height={96}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={post.coverImage}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <IconFileText className="text-muted-foreground size-6" />
                </div>
              )}
            </div>
            <CardContent className="flex flex-1 flex-col justify-center p-4">
              <h3 className="text-foreground group-hover:text-primary mb-1 line-clamp-2 text-base font-semibold transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.id}`}>
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-lg",
          featured && "border-primary/50",
        )}
      >
        {/* Cover Image */}
        <div className="bg-muted relative aspect-video w-full overflow-hidden">
          {post.coverImage ? (
            <Image
              width={1000}
              height={1000}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={post.coverImage}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <IconFileText className="text-muted-foreground size-12" />
            </div>
          )}
          {featured && (
            <div className="bg-primary absolute top-2 right-2 rounded px-2 py-1 text-xs font-semibold text-primary-foreground">
              Featured
            </div>
          )}
          <div className="bg-primary/80 absolute bottom-2 left-2 rounded px-2 py-1 text-xs font-semibold text-primary-foreground">
            {post.category}
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
            {post.excerpt}
          </p>

          {/* Author and Date */}
          <div className="mb-3 flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage alt={post.author.name} src={post.author.avatar} />
              <AvatarFallback className="text-xs">
                {getInitials(post.author.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground text-xs">
              {post.author.name}
            </span>
            <span className="text-muted-foreground text-xs">•</span>
            <span className="text-muted-foreground text-xs">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} className="text-xs" variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <IconClock className="size-4" />
              <span>{post.readTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <IconEye className="size-4" />
              <span>{formatNumber(post.views)}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconHeart className="size-4" />
              <span>{formatNumber(post.likes)}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconMessageCircle className="size-4" />
              <span>{formatNumber(post.comments)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

