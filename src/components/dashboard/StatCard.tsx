import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  variant?: "default" | "primary" | "accent" | "success" | "warning";
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-primary/10 border-primary/20",
  accent: "bg-accent/10 border-accent/20",
  success: "bg-success/10 border-success/20",
  warning: "bg-warning/10 border-warning/20",
};

const iconVariantStyles = {
  default: "bg-secondary text-foreground",
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
};

export function StatCard({
  title,
  value,
  change,
  icon,
  variant = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                change >= 0 ? "text-success" : "text-destructive"
              )}
            >
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(change)}% vs hier</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            iconVariantStyles[variant]
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
