"use client";

import { IconMenu2, IconSearch, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", href: routes.HOME },
  { name: "Blog", href: `${routes.HOME}#blog` },
  { name: "Categories", href: `${routes.HOME}#categories` },
  { name: "About", href: routes.ABOUT_US },
  { name: "Contact", href: routes.CONTACT },
];

export function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `${routes.HOME}?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60"
            : "bg-background",
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Logo href={routes.HOME} className="flex items-center text-xl" />

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 md:flex">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-muted-foreground hover:text-primary rounded-lg p-2 transition-colors"
                aria-label="Search"
              >
                <IconSearch className="size-5" />
              </button>

              {/* Theme Toggle */}
              <ThemeToggle toggleVariant="icon" />

              {/* Login Button */}
              <Button asChild size="sm" className="hidden sm:flex">
                <Link href={routes.AUTH.LOGIN}>Login</Link>
              </Button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-muted-foreground hover:text-primary md:hidden rounded-lg p-2 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <IconX className="size-6" />
                ) : (
                  <IconMenu2 className="size-6" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="border-t py-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                  autoFocus
                />
                <Button type="submit" size="sm">
                  Search
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                >
                  Cancel
                </Button>
              </form>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t bg-background md:hidden">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button asChild className="w-full" size="sm">
                  <Link href={routes.AUTH.LOGIN}>Login</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16" />
    </>
  );
}
