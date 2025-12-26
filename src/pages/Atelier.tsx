import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Clock, CheckCircle2, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const deposits = [
  {
    id: "DEP-2024-001",
    client: "Marie Koné",
    articles: [
      { type: "Chemise", qty: 3 },
      { type: "Pantalon", qty: 2 },
    ],
    status: "en_traitement",
    express: true,
    dueDate: "Aujourd'hui 18:00",
    createdAt: "Hier 10:30",
  },
  {
    id: "DEP-2024-002",
    client: "Amadou Diallo",
    articles: [{ type: "Costume", qty: 1 }],
    status: "en_attente",
    express: false,
    dueDate: "Demain 18:00",
    createdAt: "Aujourd'hui 09:15",
  },
  {
    id: "DEP-2024-003",
    client: "Fatou Sow",
    articles: [
      { type: "Robe", qty: 2 },
      { type: "Chemise", qty: 4 },
      { type: "Couette", qty: 1 },
    ],
    status: "pret",
    express: false,
    dueDate: "Aujourd'hui 18:00",
    createdAt: "Lun 14:00",
  },
  {
    id: "DEP-2024-004",
    client: "Ibrahim Touré",
    articles: [{ type: "Manteau", qty: 1 }],
    status: "en_traitement",
    express: false,
    dueDate: "Mer 18:00",
    createdAt: "Aujourd'hui 11:45",
  },
];

const statusConfig = {
  en_attente: {
    label: "En attente",
    variant: "secondary" as const,
    icon: Clock,
    color: "text-muted-foreground",
  },
  en_traitement: {
    label: "En traitement",
    variant: "warning" as const,
    icon: Loader2,
    color: "text-warning",
  },
  pret: {
    label: "Prêt",
    variant: "success" as const,
    icon: CheckCircle2,
    color: "text-success",
  },
};

export default function Atelier() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Atelier</h1>
          <p className="text-muted-foreground">
            Suivi de la production et des statuts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="warning">4 en traitement</Badge>
          <Badge variant="success">2 prêts</Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher par N° ou client..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="en_attente">En attente</SelectItem>
              <SelectItem value="en_traitement">En traitement</SelectItem>
              <SelectItem value="pret">Prêt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Deposits Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {deposits.map((deposit, index) => {
          const status = statusConfig[deposit.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;

          return (
            <Card
              key={deposit.id}
              className={cn(
                "p-5 transition-all hover:shadow-lg animate-slide-up cursor-pointer",
                deposit.express && "border-accent/50"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{deposit.id}</p>
                    {deposit.express && (
                      <Badge variant="warning" className="gap-1">
                        <Zap className="h-3 w-3" />
                        Express
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{deposit.client}</p>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>

              {/* Articles */}
              <div className="space-y-2 mb-4">
                {deposit.articles.map((article, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm bg-muted/50 rounded-lg px-3 py-2"
                  >
                    <span>{article.type}</span>
                    <span className="font-medium">x{article.qty}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{deposit.dueDate}</span>
                </div>
                <Button size="sm" variant="outline">
                  Changer statut
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
