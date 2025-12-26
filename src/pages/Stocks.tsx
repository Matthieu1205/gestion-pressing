import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  AlertTriangle,
  Package,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "Lessive Pro 5L",
    category: "Produits chimiques",
    stock: 2,
    minStock: 5,
    unit: "bidons",
    lastMovement: "Sortie - Hier",
  },
  {
    id: 2,
    name: "Détachant textile",
    category: "Produits chimiques",
    stock: 8,
    minStock: 3,
    unit: "flacons",
    lastMovement: "Entrée - Lundi",
  },
  {
    id: 3,
    name: "Cintres standards",
    category: "Fournitures",
    stock: 150,
    minStock: 100,
    unit: "pièces",
    lastMovement: "Sortie - Aujourd'hui",
  },
  {
    id: 4,
    name: "Housses pressing",
    category: "Emballage",
    stock: 45,
    minStock: 50,
    unit: "pièces",
    lastMovement: "Sortie - Hier",
  },
  {
    id: 5,
    name: "Assouplissant Pro",
    category: "Produits chimiques",
    stock: 12,
    minStock: 5,
    unit: "bidons",
    lastMovement: "Entrée - Vendredi",
  },
];

const recentMovements = [
  { id: 1, type: "sortie", product: "Lessive Pro 5L", qty: 2, date: "Hier 14:30" },
  { id: 2, type: "entree", product: "Cintres standards", qty: 50, date: "Lundi 10:00" },
  { id: 3, type: "sortie", product: "Housses pressing", qty: 30, date: "Hier 16:00" },
];

export default function Stocks() {
  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stocks</h1>
          <p className="text-muted-foreground">
            Gestion des produits et fournitures
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lowStockCount > 0 && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              {lowStockCount} stock(s) bas
            </Badge>
          )}
          <Button>
            <Plus className="h-4 w-4" />
            Mouvement
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{products.length}</p>
              <p className="text-sm text-muted-foreground">Références</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{lowStockCount}</p>
              <p className="text-sm text-muted-foreground">Stock bas</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <ArrowDownRight className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Mouvements (7j)</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Products List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un produit..." className="pl-10" />
          </div>

          <Card>
            <div className="divide-y">
              {products.map((product, index) => {
                const isLow = product.stock <= product.minStock;
                const percentage = Math.min((product.stock / product.minStock) * 100, 100);

                return (
                  <div
                    key={product.id}
                    className="p-4 hover:bg-muted/50 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{product.name}</p>
                          {isLow && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Stock bas
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={cn("text-lg font-bold", isLow && "text-destructive")}>
                          {product.stock}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.unit} (min: {product.minStock})
                        </p>
                      </div>
                    </div>
                    <Progress
                      value={percentage}
                      className={cn("h-2", isLow && "[&>div]:bg-destructive")}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {product.lastMovement}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Recent Movements */}
        <Card className="h-fit">
          <div className="p-6 border-b">
            <h2 className="font-semibold">Derniers mouvements</h2>
          </div>
          <div className="divide-y">
            {recentMovements.map((mvt, index) => (
              <div
                key={mvt.id}
                className="p-4 animate-slide-up"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      mvt.type === "entree" ? "bg-success/10" : "bg-destructive/10"
                    )}
                  >
                    {mvt.type === "entree" ? (
                      <ArrowDownRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{mvt.product}</p>
                    <p className="text-xs text-muted-foreground">{mvt.date}</p>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      mvt.type === "entree" ? "text-success" : "text-destructive"
                    )}
                  >
                    {mvt.type === "entree" ? "+" : "-"}{mvt.qty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
