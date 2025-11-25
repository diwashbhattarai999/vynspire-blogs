"use client";

import { SiteHeader } from "@/components/layouts/header/site-header";
import { EditPostDialog } from "@/components/modules/posts/edit-post-dialog";
import { PostComments } from "@/components/modules/posts/post-comments";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { routes } from "@/constants/routes";
import { useAuth } from "@/contexts/auth-context";
import { deletePost, getPostById } from "@/lib/api/posts";
import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconEdit,
  IconEye,
  IconFileText,
  IconHeart,
  IconMessageCircle,
  IconShare,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push(routes.DASHBOARD_ROUTES.POSTS);
    },
  });

  // const canEditOrDelete = user && post && user.email === post.author.email;
  const canEditOrDelete = user && post;

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="relative mx-auto size-full max-w-[1920px]">
        <SiteHeader title="Post" />
        <main className="bg-background h-[calc(100vh-var(--header-height))] flex-1 overflow-x-hidden overflow-y-auto px-6 py-4">
          <div className="flex items-center justify-center py-12">
            <Spinner className="text-primary size-6" />
          </div>
        </main>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="relative mx-auto size-full max-w-[1920px]">
        <SiteHeader title="Post" />
        <main className="bg-background h-[calc(100vh-var(--header-height))] flex-1 overflow-x-hidden overflow-y-auto px-6 py-4">
          <div className="bg-destructive/10 text-destructive rounded-lg border border-destructive/20 p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold">Post Not Found</h2>
            <p className="mb-4 text-muted-foreground">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push(routes.DASHBOARD_ROUTES.POSTS)}>
              <IconArrowLeft className="mr-2 size-4" />
              Back to Posts
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative mx-auto size-full max-w-[1920px]">
      <SiteHeader title="Post" />

      <main className="bg-background h-[calc(100vh-var(--header-height))] flex-1 overflow-x-hidden overflow-y-auto px-6 py-4">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push(routes.DASHBOARD_ROUTES.POSTS)}
            className="mb-4"
          >
            <IconArrowLeft className="mr-2 size-4" />
            Back to Posts
          </Button>

          {/* Cover Image */}
          <Card className="overflow-hidden">
            <div className="bg-muted relative aspect-video w-full overflow-hidden">
              {post.coverImage ? (
                <Image
                  width={1000}
                  height={1000}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  src={post.coverImage}
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
          <Card>
            <CardContent className="p-8">
              {/* Category Badge and Actions */}
              <div className="mb-4 flex items-center justify-between">
                <Badge className="bg-primary text-primary-foreground">
                  {post.category}
                </Badge>
                {canEditOrDelete && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditDialogOpen(true)}
                    >
                      <IconEdit className="mr-2 size-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      <IconTrash className="mr-2 size-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-muted-foreground mb-6 text-lg">
                {post.excerpt}
              </p>

              {/* Author and Meta Info */}
              <div className="mb-6 flex flex-wrap items-center gap-4 border-b pb-6">
                <div className="flex items-center gap-2">
                  <Avatar className="size-10">
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
              <div className="mb-6 flex flex-wrap items-center gap-6">
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
                <div className="mb-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Post Content */}
              <div className="markdown-content">
                {post.content ? (
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
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                ) : (
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      This is a placeholder for the full post content. In a real
                      application, this would contain the complete article text,
                      formatted with markdown or rich text.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
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

          {/* Comments Section */}
          <PostComments postId={post.id} />

          {/* Edit Post Dialog */}
          <EditPostDialog
            postId={id}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />

          {/* Delete Confirmation Dialog */}
          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={handleDelete}
            title="Delete Post"
            description="Are you sure you want to delete this post?"
            itemName={post.title}
            isLoading={deleteMutation.isPending}
          />
        </div>
      </main>
    </div>
  );
}
