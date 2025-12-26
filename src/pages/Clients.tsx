import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Search,
  Plus,
  Phone,
  Mail,
  Crown,
  Package,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const clients = [
  {
    id: 1,
    name: "Marie Koné",
    phone: "07 12 34 56 78",
    email: "marie.kone@email.com",
    isVip: true,
    totalOrders: 45,
    totalSpent: 675000,
    lastVisit: "Aujourd'hui",
  },
  {
    id: 2,
    name: "Amadou Diallo",
    phone: "05 98 76 54 32",
    email: "amadou.d@email.com",
    isVip: false,
    totalOrders: 12,
    totalSpent: 156000,
    lastVisit: "Il y a 3 jours",
  },
  {
    id: 3,
    name: "Fatou Sow",
    phone: "07 11 22 33 44",
    email: "fatou.sow@email.com",
    isVip: true,
    totalOrders: 78,
    totalSpent: 1250000,
    lastVisit: "Hier",
  },
  {
    id: 4,
    name: "Ibrahim Touré",
    phone: "05 55 66 77 88",
    email: null,
    isVip: false,
    totalOrders: 5,
    totalSpent: 45000,
    lastVisit: "Il y a 2 semaines",
  },
  {
    id: 5,
    name: "Awa Traoré",
    phone: "07 99 88 77 66",
    email: "awa.traore@email.com",
    isVip: false,
    totalOrders: 23,
    totalSpent: 312000,
    lastVisit: "Il y a 5 jours",
  },
];

export default function Clients() {
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Gérez votre base de clients et consultez leur historique
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Nouveau client
        </Button>
      </div>

      {/* Search & Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom ou téléphone..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Card className="p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Crown className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{clients.filter((c) => c.isVip).length}</p>
            <p className="text-xs text-muted-foreground">Clients VIP</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold">{clients.length}</p>
            <p className="text-xs text-muted-foreground">Total clients</p>
          </div>
        </Card>
      </div>

      {/* Clients List */}
      <Card>
        <div className="divide-y">
          {filteredClients.map((client, index) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{client.name}</p>
                    {client.isVip && (
                      <Badge variant="primary" className="gap-1">
                        <Crown className="h-3 w-3" />
                        VIP
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {client.phone}
                    </span>
                    {client.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center gap-1 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{client.totalOrders}</span>
                    <span className="text-muted-foreground">commandes</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {client.totalSpent.toLocaleString()} FCFA dépensés
                  </p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium">Dernière visite</p>
                  <p className="text-sm text-muted-foreground">
                    {client.lastVisit}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                    <DropdownMenuItem>Historique des dépôts</DropdownMenuItem>
                    <DropdownMenuItem>Nouveau dépôt</DropdownMenuItem>
                    {!client.isVip && (
                      <DropdownMenuItem>Passer en VIP</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {filteredClients.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Aucun client trouvé</p>
              <Button variant="link" onClick={() => setSearch("")}>
                Effacer la recherche
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
