"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconFileText, IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";

interface CoverBannerProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CoverBanner({ searchQuery, onSearchChange }: CoverBannerProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  return (
    <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 relative overflow-hidden rounded-lg p-8 md:p-12">
      <div className="relative z-10 space-y-6">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-primary-foreground/20 rounded-lg p-2">
              <IconFileText className="text-primary-foreground size-6" />
            </div>
            <h1 className="text-primary-foreground text-3xl font-bold md:text-4xl">
              Blog Posts
            </h1>
          </div>
          <p className="text-primary-foreground/90 max-w-2xl text-lg md:text-xl">
            Discover and manage all your blog posts. Create, edit, and organize
            your content with ease.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
          <IconSearch className="z-10 text-black/60 absolute left-4 top-1/2 size-5 -translate-y-1/2" />
          <Input
            className="!bg-white/80 text-black placeholder:text-black/60 h-12 pl-12 pr-12 text-base backdrop-blur-md shadow-lg"
            placeholder="Search posts by title, content, or tags..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          {localSearch && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-foreground/70 hover:text-foreground hover:bg-muted/50 absolute right-2 top-1/2 size-8 -translate-y-1/2 z-10"
              onClick={handleClearSearch}
            >
              <IconX className="size-4" />
            </Button>
          )}
        </form>
      </div>
      {/* Decorative elements */}
      <div className="bg-primary-foreground/10 absolute -right-20 -top-20 size-64 rounded-full blur-3xl" />
      <div className="bg-primary-foreground/10 absolute -bottom-20 -left-20 size-64 rounded-full blur-3xl" />
    </div>
  );
}
