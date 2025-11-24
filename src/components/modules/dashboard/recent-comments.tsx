"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecentComments, type RecentComment } from "@/lib/api/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function RecentComments() {
  const { data: comments = [], isLoading } = useQuery<RecentComment[]>({
    queryKey: ["recent-comments"],
    queryFn: getRecentComments,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="size-10 shrink-0">
                <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                <AvatarFallback>{getInitials(comment.userName)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.userName}</span>
                  <span className="text-muted-foreground text-xs">
                    Has Commented
                  </span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {comment.comment}
                </p>
                <p className="text-muted-foreground text-xs">
                  {comment.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

