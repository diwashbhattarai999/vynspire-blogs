"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "../ui/button";

const themeToggleVariants = cva(
  "w-full justify-start !gap-4 px-2 font-normal outline-none focus:outline-none focus-visible:ring-0 hover:outline-none",
  {
    variants: {
      toggleVariant: {
        default: "",
        icon: "w-fit",
      },
    },
    defaultVariants: {
      toggleVariant: "default",
    },
  },
);

export interface ThemeToggleProps
  extends ButtonProps,
    VariantProps<typeof themeToggleVariants> {
  asChild?: boolean;
}

export function ThemeToggle({
  className,
  toggleVariant,
  asChild = false,
  onClick,
  ...props
}: ThemeToggleProps) {
  const Comp = asChild ? Slot : Button;

  const { theme, setTheme } = useTheme();

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClick?.(e);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Comp
      aria-label="Toggle theme"
      className={cn(themeToggleVariants({ toggleVariant, className }))}
      size={props.size || "sm"}
      variant={props.variant || "ghost"}
      onClick={handleOnClick}
      {...props}
    >
      {theme === "dark" ? (
        <>
          <Sun className="group-hover:text-primary size-4" />
          {toggleVariant !== "icon" && "Light Mode"}
        </>
      ) : (
        <>
          <Moon className="group-hover:text-primary size-4" />
          {toggleVariant !== "icon" && "Dark Mode"}
        </>
      )}
    </Comp>
  );
}
