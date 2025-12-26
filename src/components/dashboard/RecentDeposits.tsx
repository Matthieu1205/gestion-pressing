import { Badge } from "@/components/ui/badge";
import { Clock, Package } from "lucide-react";

const deposits = [
  {
    id: "DEP-2024-001",
    client: "Marie Koné",
    articles: 5,
    total: "15 500 FCFA",
    status: "en_cours",
    date: "Aujourd'hui, 10:30",
  },
  {
    id: "DEP-2024-002",
    client: "Amadou Diallo",
    articles: 3,
    total: "8 000 FCFA",
    status: "pret",
    date: "Aujourd'hui, 09:15",
  },
  {
    id: "DEP-2024-003",
    client: "Fatou Sow",
    articles: 8,
    total: "24 000 FCFA",
    status: "livre",
    date: "Hier, 16:45",
  },
  {
    id: "DEP-2024-004",
    client: "Ibrahim Touré",
    articles: 2,
    total: "5 500 FCFA",
    status: "en_cours",
    date: "Hier, 14:20",
  },
];

const statusConfig = {
  en_cours: { label: "En cours", variant: "warning" as const },
  pret: { label: "Prêt", variant: "success" as const },
  livre: { label: "Livré", variant: "default" as const },
};

export function RecentDeposits() {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Dépôts récents</h3>
            <p className="text-sm text-muted-foreground">
              Dernières transactions enregistrées
            </p>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">
            Voir tout
          </button>
        </div>
      </div>
      <div className="divide-y">
        {deposits.map((deposit, index) => (
          <div
            key={deposit.id}
            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{deposit.client}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{deposit.id}</span>
                  <span>•</span>
                  <span>{deposit.articles} articles</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{deposit.total}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{deposit.date}</span>
                </div>
              </div>
              <Badge
                variant={
                  statusConfig[deposit.status as keyof typeof statusConfig].variant
                }
              >
                {statusConfig[deposit.status as keyof typeof statusConfig].label}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
