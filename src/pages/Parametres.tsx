import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Users,
  Tag,
  Calendar,
  Shield,
  Bell,
  Printer,
} from "lucide-react";

export default function Parametres() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Configuration de votre pressing
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="general">
            <Building className="h-4 w-4 mr-2" />
            Général
          </TabsTrigger>
          <TabsTrigger value="tarifs">
            <Tag className="h-4 w-4 mr-2" />
            Tarifs
          </TabsTrigger>
          <TabsTrigger value="capacite">
            <Calendar className="h-4 w-4 mr-2" />
            Capacité
          </TabsTrigger>
          <TabsTrigger value="utilisateurs">
            <Users className="h-4 w-4 mr-2" />
            Utilisateurs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Informations du pressing
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'établissement</Label>
                <Input id="name" defaultValue="PressingPro Abidjan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue="07 00 00 00 00" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" defaultValue="123 Rue du Commerce, Plateau, Abidjan" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS de confirmation</p>
                  <p className="text-sm text-muted-foreground">
                    Envoyer un SMS au client à la réception
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS article prêt</p>
                  <p className="text-sm text-muted-foreground">
                    Notifier le client quand sa commande est prête
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertes stock</p>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des alertes de stock bas
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Printer className="h-5 w-5 text-primary" />
              Impression
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Format ticket</Label>
                <Input defaultValue="80mm" />
              </div>
              <div className="space-y-2">
                <Label>Imprimante par défaut</Label>
                <Input defaultValue="EPSON TM-T88" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tarifs" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Tarification par article</h2>
            <div className="space-y-4">
              {[
                { name: "Chemise", price: "1 500" },
                { name: "Pantalon", price: "2 000" },
                { name: "Costume (2 pièces)", price: "5 000" },
                { name: "Robe", price: "3 000" },
                { name: "Manteau", price: "4 500" },
                { name: "Couette", price: "8 000" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label>{item.name}</Label>
                  </div>
                  <Input className="w-32" defaultValue={item.price} />
                  <span className="text-sm text-muted-foreground">FCFA</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Packs (Parkage)</h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Seuil (nb articles)</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label>Prix du pack</Label>
                  <Input defaultValue="6 500" />
                </div>
                <div className="space-y-2">
                  <Label>Types inclus</Label>
                  <Input defaultValue="Chemise, Pantalon" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Supplément Express</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Pourcentage</Label>
                <Input type="number" defaultValue="50" />
              </div>
              <div className="space-y-2">
                <Label>Délai garanti</Label>
                <Input defaultValue="24 heures" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="capacite" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Capacité journalière</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Articles par jour</Label>
                <Input type="number" defaultValue="100" />
              </div>
              <div className="space-y-2">
                <Label>Quota Express (%)</Label>
                <Input type="number" defaultValue="20" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Horaires d'ouverture</h2>
            <div className="space-y-4">
              {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"].map(
                (jour) => (
                  <div key={jour} className="flex items-center gap-4">
                    <div className="w-24">
                      <Label>{jour}</Label>
                    </div>
                    <Input className="w-24" defaultValue="08:00" type="time" />
                    <span>-</span>
                    <Input className="w-24" defaultValue="18:00" type="time" />
                    <Switch defaultChecked />
                  </div>
                )
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="utilisateurs" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Gestion des utilisateurs
              </h2>
              <Button>Ajouter un utilisateur</Button>
            </div>
            <div className="space-y-4">
              {[
                { name: "Jean Dupont", role: "Manager", email: "jean@pressing.com" },
                { name: "Marie Koné", role: "Réceptionniste", email: "marie@pressing.com" },
                { name: "Amadou Diallo", role: "Chef d'atelier", email: "amadou@pressing.com" },
              ].map((user) => (
                <div
                  key={user.email}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{user.role}</span>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Rôles et permissions</h2>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Réceptionniste</p>
                <p className="text-muted-foreground">
                  Créer dépôts, remise ≤ seuil, encaissements, livraisons
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Chef d'atelier</p>
                <p className="text-muted-foreground">
                  Planifier, statuts production, consommation stock
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Caissier</p>
                <p className="text-muted-foreground">
                  Encaissements, clôture caisse, remises de fonds
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Manager</p>
                <p className="text-muted-foreground">
                  Tous droits, paramétrages, remises illimitées, rapports
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Annuler</Button>
        <Button>Enregistrer les modifications</Button>
      </div>
    </div>
  );
}
