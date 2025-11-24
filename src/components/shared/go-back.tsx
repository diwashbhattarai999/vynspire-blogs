import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface GoBackProps {
  label?: React.ReactNode;
  showIcon?: boolean;
}

export function GoBack({ label, showIcon = true }: GoBackProps) {
  return (
    <Link
      className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
      href="/"
    >
      {showIcon && <ArrowLeft className="mr-2 h-4 w-4" />}
      {label ?? "Back"}
    </Link>
  );
}
