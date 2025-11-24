import type { TablerIcon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: TablerIcon;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, className }: StatCardProps) {
  const formatValue = (val: string | number): string => {
    if (typeof val === "number") {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      }
      if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div
      className={cn(
        "bg-card border-border rounded-lg border p-6 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{formatValue(value)}</p>
        </div>
        <div className="bg-primary/10 rounded-full p-3">
          <Icon className="text-primary size-6" />
        </div>
      </div>
    </div>
  );
}

