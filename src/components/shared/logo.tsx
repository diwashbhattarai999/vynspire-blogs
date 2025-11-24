import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  asLink?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function Logo({ asLink = true, href, className, onClick }: LogoProps) {
  const Comp = asLink ? Link : "div";

  return (
    <Comp className={cn("", className)} href={href || "/"} onClick={onClick}>
      <Image priority alt="Logo" height={70} src={"/logo.svg"} width={70} />
    </Comp>
  );
}
