"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecentArticles, type RecentArticle } from "@/lib/api/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconFileText } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toLocaleString();
}

export function RecentArticles() {
  const { data: articles = [], isLoading } = useQuery<RecentArticle[]>({
    queryKey: ["recent-articles"],
    queryFn: getRecentArticles,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Article</CardTitle>
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
        <CardTitle>Recent Article</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-muted-foreground text-left text-xs font-medium py-2">
                  No
                </th>
                <th className="text-muted-foreground text-left text-xs font-medium py-2">
                  Article Title
                </th>
                <th className="text-muted-foreground text-left text-xs font-medium py-2">
                  Post Date
                </th>
                <th className="text-muted-foreground text-left text-xs font-medium py-2">
                  Category
                </th>
                <th className="text-muted-foreground text-left text-xs font-medium py-2">
                  Comment
                </th>
                <th className="text-muted-foreground text-left text-xs font-medium py-2">
                  Like
                </th>
                <th className="text-muted-foreground text-left text-xs font-medium py-2">
                  Shared
                </th>
                <th className="text-muted-foreground text-left text-xs font-medium py-2">
                  Viewers
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article.id} className="border-b">
                  <td className="text-muted-foreground py-3 text-sm">
                    {index + 1}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback className="bg-muted">
                          <IconFileText className="size-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium line-clamp-1 max-w-xs">
                        {article.title}
                      </span>
                    </div>
                  </td>
                  <td className="text-muted-foreground py-3 text-sm">
                    {article.postDate}
                  </td>
                  <td className="py-3">
                    <Badge
                      className={cn(
                        "text-xs",
                        article.categoryColor || "bg-gray-100 text-gray-800",
                      )}
                    >
                      {article.category}
                    </Badge>
                  </td>
                  <td className="text-muted-foreground py-3 text-sm">
                    {formatNumber(article.comments)} Comment
                  </td>
                  <td className="text-muted-foreground py-3 text-sm">
                    {formatNumber(article.likes)} Likes
                  </td>
                  <td className="text-muted-foreground py-3 text-sm">
                    {formatNumber(article.shares)} Shared
                  </td>
                  <td className="text-muted-foreground py-3 text-sm">
                    {formatNumber(article.viewers)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

