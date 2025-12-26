import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  QrCode,
  Package,
  CheckCircle2,
  User,
  Clock,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const readyDeposits = [
  {
    id: "DEP-2024-003",
    client: "Fatou Sow",
    phone: "07 11 22 33 44",
    articles: 7,
    total: 24000,
    paid: 24000,
    remaining: 0,
    dueDate: "Aujourd'hui 18:00",
    status: "pret",
  },
  {
    id: "DEP-2024-007",
    client: "Kofi Mensah",
    phone: "05 66 77 88 99",
    articles: 3,
    total: 8500,
    paid: 5000,
    remaining: 3500,
    dueDate: "Aujourd'hui 18:00",
    status: "pret",
  },
  {
    id: "DEP-2024-009",
    client: "Awa Traoré",
    phone: "07 99 88 77 66",
    articles: 5,
    total: 15000,
    paid: 0,
    remaining: 15000,
    dueDate: "Hier 18:00",
    status: "pret",
  },
];

export default function Retrait() {
  const [search, setSearch] = useState("");
  const [selectedDeposit, setSelectedDeposit] = useState<string | null>(null);

  const filteredDeposits = readyDeposits.filter(
    (d) =>
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.client.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Retrait / Livraison</h1>
          <p className="text-muted-foreground">
            Gérez les retraits et encaissez les soldes
          </p>
        </div>
        <Badge variant="success" className="gap-1 w-fit">
          <CheckCircle2 className="h-4 w-4" />
          {readyDeposits.length} dépôts prêts
        </Badge>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par N° de ticket, nom ou téléphone..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <QrCode className="h-4 w-4 mr-2" />
            Scanner QR
          </Button>
        </div>
      </Card>

      {/* Deposits Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDeposits.map((deposit, index) => (
          <Card
            key={deposit.id}
            className={cn(
              "p-5 cursor-pointer transition-all animate-slide-up hover:shadow-lg",
              selectedDeposit === deposit.id && "ring-2 ring-primary"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setSelectedDeposit(deposit.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-semibold text-lg">{deposit.id}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {deposit.client}
                </div>
              </div>
              <Badge variant="success">Prêt</Badge>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Articles</span>
                <span className="font-medium flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  {deposit.articles} articles
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date promesse</span>
                <span className="font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {deposit.dueDate}
                </span>
              </div>
            </div>

            {/* Payment Status */}
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium">{deposit.total.toLocaleString()} F</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Déjà payé</span>
                <span className="text-success font-medium">
                  {deposit.paid.toLocaleString()} F
                </span>
              </div>
              {deposit.remaining > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reste à payer</span>
                  <span className="text-destructive font-bold">
                    {deposit.remaining.toLocaleString()} F
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t flex gap-2">
              {deposit.remaining > 0 ? (
                <Button className="flex-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Encaisser {deposit.remaining.toLocaleString()} F
                </Button>
              ) : (
                <Button className="flex-1" variant="success">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Confirmer le retrait
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredDeposits.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">Aucun dépôt trouvé</p>
          <Button variant="link" onClick={() => setSearch("")}>
            Effacer la recherche
          </Button>
        </div>
      )}
    </div>
  );
}
