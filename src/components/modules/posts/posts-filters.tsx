"use client";

import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/api/posts";
import { cn } from "@/lib/utils";

interface PostsFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function PostsFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: PostsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Badge
          key={category.id}
          className={cn(
            "cursor-pointer px-4 py-2 text-sm font-medium transition-all hover:scale-105",
            selectedCategory === category.slug
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
          onClick={() => onCategoryChange(category.slug)}
        >
          {category.name}
          <span className="ml-2 text-xs opacity-75">({category.count})</span>
        </Badge>
      ))}
    </div>
  );
}
