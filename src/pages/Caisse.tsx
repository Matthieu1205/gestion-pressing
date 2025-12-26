import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Banknote,
  Smartphone,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: 1,
    type: "encaissement",
    amount: 15500,
    method: "especes",
    client: "Marie Koné",
    depositId: "DEP-2024-001",
    time: "10:30",
  },
  {
    id: 2,
    type: "encaissement",
    amount: 8000,
    method: "mobile",
    client: "Amadou Diallo",
    depositId: "DEP-2024-002",
    time: "09:15",
  },
  {
    id: 3,
    type: "remise",
    amount: -50000,
    method: "especes",
    motif: "Remise banque",
    time: "08:00",
  },
  {
    id: 4,
    type: "encaissement",
    amount: 24000,
    method: "carte",
    client: "Fatou Sow",
    depositId: "DEP-2024-003",
    time: "Hier 16:45",
  },
];

const methodIcons = {
  especes: Banknote,
  mobile: Smartphone,
  carte: CreditCard,
};

export default function Caisse() {
  const totalEspeces = 125000;
  const totalMobile = 85000;
  const totalCarte = 45000;
  const totalJour = totalEspeces + totalMobile + totalCarte;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Caisse</h1>
          <p className="text-muted-foreground">
            Gestion des encaissements et de la caisse
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-success-foreground animate-pulse" />
            Caisse ouverte
          </Badge>
          <Button variant="destructive">
            <Lock className="h-4 w-4" />
            Clôturer
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total du jour</p>
              <p className="text-3xl font-bold text-success">
                {totalJour.toLocaleString()} F
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Espèces</p>
              <p className="text-2xl font-bold">
                {totalEspeces.toLocaleString()} F
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <Banknote className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Mobile Money</p>
              <p className="text-2xl font-bold">
                {totalMobile.toLocaleString()} F
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Carte bancaire</p>
              <p className="text-2xl font-bold">
                {totalCarte.toLocaleString()} F
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Mouvements de caisse</h2>
          <p className="text-sm text-muted-foreground">
            Historique des encaissements et remises
          </p>
        </div>
        <div className="divide-y">
          {transactions.map((tx, index) => {
            const MethodIcon = methodIcons[tx.method as keyof typeof methodIcons] || Wallet;
            const isPositive = tx.type === "encaissement";

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      isPositive ? "bg-success/10" : "bg-destructive/10"
                    )}
                  >
                    {isPositive ? (
                      <ArrowDownRight className="h-5 w-5 text-success" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {tx.client || tx.motif}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {tx.depositId && <span>{tx.depositId}</span>}
                      <span className="flex items-center gap-1">
                        <MethodIcon className="h-3 w-3" />
                        {tx.method === "especes" && "Espèces"}
                        {tx.method === "mobile" && "Mobile Money"}
                        {tx.method === "carte" && "Carte"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p
                      className={cn(
                        "font-semibold",
                        isPositive ? "text-success" : "text-destructive"
                      )}
                    >
                      {isPositive ? "+" : ""}
                      {tx.amount.toLocaleString()} F
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {tx.time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Button variant="outline" size="lg" className="h-16">
          <ArrowUpRight className="h-5 w-5 mr-2" />
          Remise de fonds
        </Button>
        <Button size="lg" className="h-16">
          <ArrowDownRight className="h-5 w-5 mr-2" />
          Nouvel encaissement
        </Button>
      </div>
    </div>
  );
}
