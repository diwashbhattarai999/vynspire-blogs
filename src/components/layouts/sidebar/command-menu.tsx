"use client";

import {
  IconDeviceDesktop,
  IconLink,
  IconMoon,
  IconSearch,
  IconSun,
  type TablerIcon,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

interface ICommandMenuProps {
  className?: string;
}

export const CommandMenu = ({ className }: ICommandMenuProps) => {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const themes: Array<{ id: Theme; nameKey: string; icon: TablerIcon }> = [
    { id: "light", nameKey: "Light Mode", icon: IconSun },
    { id: "dark", nameKey: "Dark Mode", icon: IconMoon },
    { id: "system", nameKey: "System Default", icon: IconDeviceDesktop },
  ];

  const onThemeSelect = useCallback(
    (id: Theme) => {
      runCommand(() => setTheme(id));
    },
    [runCommand, setTheme],
  );

  const links = [
    { name: "Dashboard", href: routes.DASHBOARD },
    { name: "Posts", href: routes.DASHBOARD_ROUTES.POSTS },
    { name: "Create Post", href: routes.DASHBOARD_ROUTES.POSTS_CREATE },
    { name: "Categories", href: routes.DASHBOARD_ROUTES.CATEGORIES },
    { name: "Tags", href: routes.DASHBOARD_ROUTES.TAGS },
    { name: "Settings", href: routes.DASHBOARD_ROUTES.SETTINGS },
  ];

  return (
    <div
      className={cn(
        "relative group-data-[collapsible=icon]:mt-4 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center",
        className,
      )}
    >
      <button
        className="group-data-[collapsible=icon]:hover:bg-muted cursor-pointer border-b p-4 group-data-[collapsible=icon]:rounded-md group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:p-2"
        onClick={() => setOpen(true)}
        type="button"
      >
        <div className="relative">
          <IconSearch
            className={cn(
              "text-muted-foreground absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 transform",
              "group-data-[collapsible=icon]:relative group-data-[collapsible=icon]:inset-0 group-data-[collapsible=icon]:translate-y-0",
            )}
          />
          <Input
            className="pl-10 text-sm group-data-[collapsible=icon]:hidden"
            placeholder="Search"
            readOnly
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-xs group-data-[collapsible=icon]:hidden">
            ⌘K
          </span>
        </div>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {links.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <IconLink className="mr-2 size-4" />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            {themes.map(({ id, nameKey, icon: Icon }) => (
              <CommandItem
                key={id}
                value={nameKey}
                onSelect={() => onThemeSelect(id)}
              >
                <Icon className="mr-2 size-4" />
                {nameKey}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
