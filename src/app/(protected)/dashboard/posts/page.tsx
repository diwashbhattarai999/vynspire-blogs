"use client";

import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/layouts/header/site-header";
import { CoverBanner } from "@/components/modules/posts/cover-banner";
import { PostCard } from "@/components/modules/posts/post-card";
import { PostsFilters } from "@/components/modules/posts/posts-filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { type GetPostsParams, getCategories, getPosts } from "@/lib/api/posts";

export default function PostsPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 12;

  // Read tag from URL query params on mount
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    setSelectedTag(tagParam);
    if (tagParam) {
      setPage(1); // Reset to first page when tag changes
    }
  }, [searchParams]);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const queryParams: GetPostsParams = {
    search: searchQuery || undefined,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    tag: selectedTag || undefined,
    status: "published",
    page,
    limit,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", queryParams],
    queryFn: () => getPosts(queryParams),
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page when category changes
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when search changes
  };

  return (
    <div className="relative mx-auto size-full max-w-[1920px]">
      <SiteHeader title="Posts" />

      <main className="bg-background h-[calc(100vh-var(--header-height))] flex-1 overflow-x-hidden overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {/* Cover Banner with Search */}
          <CoverBanner
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />

          {/* Tag Filter Badge */}
          {selectedTag && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-2 px-3 py-1.5">
                <span>Tag: {selectedTag}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTag(null);
                    setPage(1);
                  }}
                  className="hover:bg-muted-foreground/20 rounded-full p-0.5 transition-colors"
                  aria-label="Clear tag filter"
                >
                  <IconX className="size-3" />
                </button>
              </Badge>
            </div>
          )}

          {/* Category Filters */}
          <PostsFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Spinner className="text-primary size-6" />
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="bg-destructive/10 text-destructive rounded-lg border border-destructive/20 p-4 text-center">
              Failed to load posts. Please try again later.
            </div>
          )}

          {/* Posts Grid */}
          {!isLoading && !isError && data && (
            <div>
              {data.posts.length === 0 ? (
                <div className="bg-muted rounded-lg border p-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    No posts found. Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
                    {data.posts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        featured={post.featured}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {data.totalPages > 1 && (
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="text-muted-foreground text-sm">
                        Showing {(page - 1) * limit + 1} to{" "}
                        {Math.min(page * limit, data.total)} of {data.total}{" "}
                        posts
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={page === 1}
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                          <IconChevronLeft className="size-4" />
                          Previous
                        </Button>
                        <div className="text-muted-foreground text-sm">
                          Page {page} of {data.totalPages}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={page >= data.totalPages}
                          onClick={() =>
                            setPage((p) => Math.min(data.totalPages, p + 1))
                          }
                        >
                          Next
                          <IconChevronRight className="size-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
