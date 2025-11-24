import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: 1, name: "Home", href: routes.HOME },
  { id: 2, name: "About", href: routes.ABOUT_US },
  { id: 3, name: "Contact", href: routes.CONTACT },
];

export const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search overlay on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when search is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          "fixed z-20 w-full transition-all duration-300",
          isScrolled &&
            "bg-background/75 border-b border-black/5 backdrop-blur-lg",
        )}
      >
        <div className="max-container">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0">
            {/* Desktop Layout: Logo | Search | Nav+Login */}
            <div className="hidden w-full items-center lg:flex">
              {/* Logo */}
              <Logo
                aria-label="Themjon Traders"
                className="flex items-center space-x-2 text-lg"
              />

              {/* Nav Links & Login/Register */}
              <div className="flex items-center gap-2">
                <ul className="flex gap-1">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={cn(
                          buttonVariants({ size: "sm", variant: "ghost" }),
                          "hover:bg-primary/5 hover:text-primary hover:border-primary/5 border border-transparent",
                          {
                            "bg-primary/5 text-primary border-primary/5 border":
                              isActive(item.href),
                          },
                        )}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="ml-8 flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                  <Link
                    className={cn(buttonVariants({ size: "sm" }))}
                    href={routes.AUTH.LOGIN}
                  >
                    <span>Login</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Mobile: Logo, Search Icon & Hamburger Menu */}
            <div className="flex w-full items-center justify-between gap-6 lg:hidden">
              <Logo
                aria-label="Themjon Traders"
                className="flex items-center space-x-2"
              />
              <div className="flex items-center gap-4">
                <button
                  aria-label="Open Search"
                  className="relative z-20 -m-2.5 block cursor-pointer p-2.5"
                  onClick={() => setIsSearchOpen(true)}
                  type="button"
                >
                  <Search className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label={menuState === true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5"
                  onClick={() => setMenuState(!menuState)}
                >
                  <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
                  <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
                </button>
              </div>
            </div>
            {/* Desktop Menu Links (hidden, now in flex above) */}
            {/* Mobile Menu */}
            <div className="bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        href={item.href}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t pt-6">
                  <Link
                    className={cn(buttonVariants({ size: "sm" }))}
                    href={routes.AUTH.LOGIN}
                  >
                    <span>Login</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close Search Overlay"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
            tabIndex={0}
          />
          {/* Search Container */}
          <div className="bg-background absolute inset-x-0 top-0 shadow-xl">
            <div className="max-container px-4 py-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Search Products & Companies
                </h2>
                <button
                  type="button"
                  aria-label="Close Search"
                  className="hover:bg-muted -m-2 rounded-lg p-2 transition-colors"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="size-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
