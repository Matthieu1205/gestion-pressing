import { AlertTriangle, Package, Clock, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  {
    id: 1,
    type: "capacity",
    title: "Capacité dépassée samedi",
    description: "120 articles prévus pour une capacité de 100",
    icon: TrendingDown,
    severity: "high",
  },
  {
    id: 2,
    type: "stock",
    title: "Stock bas - Lessive Pro",
    description: "Seulement 2 unités restantes (seuil: 5)",
    icon: Package,
    severity: "medium",
  },
  {
    id: 3,
    type: "delay",
    title: "3 dépôts en retard",
    description: "Date promesse dépassée depuis plus de 24h",
    icon: Clock,
    severity: "high",
  },
];

const severityStyles = {
  high: "border-destructive/30 bg-destructive/5",
  medium: "border-warning/30 bg-warning/5",
  low: "border-muted bg-muted/50",
};

const iconStyles = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-muted text-muted-foreground",
};

export function AlertsList() {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="border-b p-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-semibold">Alertes</h3>
          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
            {alerts.length}
          </span>
        </div>
      </div>
      <div className="divide-y p-2">
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 m-2 transition-all hover:shadow-sm animate-slide-up",
              severityStyles[alert.severity as keyof typeof severityStyles]
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0",
                iconStyles[alert.severity as keyof typeof iconStyles]
              )}
            >
              <alert.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{alert.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {alert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
