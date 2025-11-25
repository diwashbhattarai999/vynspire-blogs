"use client";

import { IconHeart, IconMessageCircle, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/auth-context";
import {
  deleteComment,
  getPostComments,
  type PostComment,
} from "@/lib/api/posts";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string): string {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return dateString;
  }
}

interface CommentItemProps {
  comment: PostComment;
  onDelete: (commentId: string) => void;
  canDelete: boolean;
  currentUserEmail?: string;
}

function CommentItem({
  comment,
  onDelete,
  canDelete,
  currentUserEmail,
}: CommentItemProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <div className="space-y-3">
        <div className="flex gap-3">
          <Avatar className="size-10 shrink-0">
            <AvatarImage alt={comment.userName} src={comment.userAvatar} />
            <AvatarFallback>{getInitials(comment.userName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-sm">{comment.userName}</span>
                <span className="text-muted-foreground ml-2 text-xs">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              {canDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <IconTrash className="text-destructive size-4" />
                </Button>
              )}
            </div>
            <p className="text-foreground text-sm leading-relaxed">
              {comment.comment}
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors"
              >
                <IconHeart className="size-4" />
                <span>{comment.likes}</span>
              </button>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-13 space-y-3 border-l-2 pl-4">
            {comment.replies.map((reply) => {
              // Reply can be deleted by the reply author or the parent comment author
              const canDeleteReply =
                currentUserEmail === reply.userEmail ||
                currentUserEmail === comment.userEmail;
              return (
                <div key={reply.id} className="flex gap-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage alt={reply.userName} src={reply.userAvatar} />
                    <AvatarFallback className="text-xs">
                      {getInitials(reply.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-sm">
                          {reply.userName}
                        </span>
                        <span className="text-muted-foreground ml-2 text-xs">
                          {formatDate(reply.createdAt)}
                        </span>
                      </div>
                      {canDeleteReply && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => onDelete(reply.id)}
                        >
                          <IconTrash className="text-destructive size-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed">
                      {reply.comment}
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors"
                      >
                        <IconHeart className="size-4" />
                        <span>{reply.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          onDelete(comment.id);
          setDeleteDialogOpen(false);
        }}
        title="Delete Comment"
        description="Are you sure you want to delete this comment?"
      />
    </>
  );
}

interface PostCommentsProps {
  postId: string;
}

export function PostComments({ postId }: PostCommentsProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery<PostComment[]>({
    queryKey: ["post-comments", postId],
    queryFn: () => getPostComments(postId),
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-comments", postId] });
    },
  });

  const handleDeleteComment = (commentId: string) => {
    deleteMutation.mutate(commentId);
  };

  const canDeleteComment = (comment: PostComment) => {
    if (!user) return false;
    return user.email === comment.userEmail;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <IconMessageCircle className="size-5" />
            Comments ({comments.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="text-primary size-5" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center text-sm">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
                canDelete={canDeleteComment(comment)}
                currentUserEmail={user?.email}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
