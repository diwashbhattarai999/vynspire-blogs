import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  asLink?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
  size?: number;
}

export function Logo({
  asLink = true,
  href,
  className,
  onClick,
  size = 32,
}: LogoProps) {
  const Comp = asLink ? Link : "div";

  return (
    <Comp className={cn("", className)} href={href || "/"} onClick={onClick}>
      <Image priority alt="Logo" height={size} src={"/logo.svg"} width={size} />
    </Comp>
  );
}
