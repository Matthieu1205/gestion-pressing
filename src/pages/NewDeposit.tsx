import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Search,
  Plus,
  Trash2,
  Zap,
  Clock,
  CreditCard,
  Smartphone,
  Banknote,
  User,
  Phone,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";

const articleTypes = [
  { id: "chemise", name: "Chemise", price: 1500 },
  { id: "pantalon", name: "Pantalon", price: 2000 },
  { id: "costume", name: "Costume (2 pièces)", price: 5000 },
  { id: "robe", name: "Robe", price: 3000 },
  { id: "manteau", name: "Manteau", price: 4500 },
  { id: "couette", name: "Couette", price: 8000 },
];

const services = [
  { id: "nettoyage", name: "Nettoyage à sec" },
  { id: "lavage", name: "Lavage & Repassage" },
  { id: "repassage", name: "Repassage seul" },
  { id: "detachage", name: "Détachage spécial" },
];

interface DepositLine {
  id: string;
  type: string;
  service: string;
  quantity: number;
  color: string;
  remarks: string;
  unitPrice: number;
}

export default function NewDeposit() {
  const [client, setClient] = useState({ name: "", phone: "" });
  const [isExpress, setIsExpress] = useState(false);
  const [lines, setLines] = useState<DepositLine[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  const addLine = () => {
    setLines([
      ...lines,
      {
        id: crypto.randomUUID(),
        type: "",
        service: "nettoyage",
        quantity: 1,
        color: "",
        remarks: "",
        unitPrice: 0,
      },
    ]);
  };

  const updateLine = (id: string, field: keyof DepositLine, value: any) => {
    setLines(
      lines.map((line) => {
        if (line.id === id) {
          const updated = { ...line, [field]: value };
          if (field === "type") {
            const article = articleTypes.find((a) => a.id === value);
            updated.unitPrice = article?.price || 0;
          }
          return updated;
        }
        return line;
      })
    );
  };

  const removeLine = (id: string) => {
    setLines(lines.filter((line) => line.id !== id));
  };

  const subtotal = lines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0
  );
  const expressFee = isExpress ? subtotal * 0.5 : 0;
  const total = subtotal + expressFee;

  const promiseDate = isExpress
    ? "Demain, 18:00"
    : "Mercredi 25 Déc, 18:00";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nouveau dépôt</h1>
          <p className="text-muted-foreground">
            Enregistrer un nouveau dépôt client
          </p>
        </div>
        <Badge variant="outline" className="text-base px-4 py-2">
          <CalendarDays className="h-4 w-4 mr-2" />
          Date promesse : {promiseDate}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Section */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informations client
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="Ex: 07 00 00 00 00"
                    className="pl-10"
                    value={client.phone}
                    onChange={(e) =>
                      setClient({ ...client, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom du client</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Rechercher ou créer"
                    className="pl-10"
                    value={client.name}
                    onChange={(e) =>
                      setClient({ ...client, name: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Express Toggle */}
          <Card className="p-4">
            <button
              onClick={() => setIsExpress(!isExpress)}
              className={cn(
                "w-full flex items-center justify-between rounded-lg border-2 p-4 transition-all",
                isExpress
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-primary/30"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    isExpress ? "bg-accent text-accent-foreground" : "bg-muted"
                  )}
                >
                  <Zap className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Service Express</p>
                  <p className="text-sm text-muted-foreground">
                    +50% sur le total, livraison sous 24h
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "h-6 w-11 rounded-full transition-colors",
                  isExpress ? "bg-accent" : "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "h-5 w-5 rounded-full bg-card shadow-md transition-transform mt-0.5",
                    isExpress ? "translate-x-5 ml-0.5" : "translate-x-0.5"
                  )}
                />
              </div>
            </button>
          </Card>

          {/* Articles Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Articles</h2>
              <Button onClick={addLine} size="sm">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Aucun article ajouté
                </p>
                <Button onClick={addLine} variant="link" className="mt-2">
                  Ajouter le premier article
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {lines.map((line, index) => (
                  <div
                    key={line.id}
                    className="grid gap-4 p-4 rounded-lg border bg-muted/30 animate-scale-in"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Article #{index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeLine(line.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-4">
                      <Select
                        value={line.type}
                        onValueChange={(v) => updateLine(line.id, "type", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type d'article" />
                        </SelectTrigger>
                        <SelectContent>
                          {articleTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name} - {type.price.toLocaleString()} F
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={line.service}
                        onValueChange={(v) => updateLine(line.id, "service", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) =>
                          updateLine(line.id, "quantity", parseInt(e.target.value) || 1)
                        }
                        placeholder="Qté"
                      />
                      <Input
                        value={line.color}
                        onChange={(e) =>
                          updateLine(line.id, "color", e.target.value)
                        }
                        placeholder="Couleur"
                      />
                    </div>
                    <Textarea
                      value={line.remarks}
                      onChange={(e) =>
                        updateLine(line.id, "remarks", e.target.value)
                      }
                      placeholder="Remarques (taches, défauts...)"
                      className="resize-none"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Récapitulatif</h2>

            {/* Price breakdown */}
            <div className="space-y-3 pb-4 border-b">
              {lines.map((line, index) => {
                const article = articleTypes.find((a) => a.id === line.type);
                if (!article) return null;
                return (
                  <div key={line.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {article.name} x{line.quantity}
                    </span>
                    <span>
                      {(line.unitPrice * line.quantity).toLocaleString()} F
                    </span>
                  </div>
                );
              })}
              {lines.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Ajoutez des articles pour voir le détail
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-3 py-4 border-b">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
              </div>
              {isExpress && (
                <div className="flex justify-between text-accent">
                  <span className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Supplément Express
                  </span>
                  <span>+{expressFee.toLocaleString()} FCFA</span>
                </div>
              )}
            </div>

            <div className="flex justify-between py-4 text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{total.toLocaleString()} FCFA</span>
            </div>

            {/* Payment method */}
            <div className="space-y-3 pt-4 border-t">
              <Label>Mode de paiement</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "especes", label: "Espèces", icon: Banknote },
                  { id: "mobile", label: "Mobile Money", icon: Smartphone },
                  { id: "carte", label: "Carte", icon: CreditCard },
                  { id: "differe", label: "Différé", icon: Clock },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all",
                      paymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <method.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full mt-6" size="lg" disabled={lines.length === 0}>
              Valider le dépôt
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
