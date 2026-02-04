import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crown, User, Phone, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NewClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientCreated?: (client: NewClientData) => void;
}

export interface NewClientData {
  name: string;
  phone: string;
  email: string;
  isVip: boolean;
}

export function NewClientDialog({ open, onOpenChange, onClientCreated }: NewClientDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isVip, setIsVip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setIsVip(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du client est obligatoire",
        variant: "destructive",
      });
      return;
    }

    if (!phone.trim()) {
      toast({
        title: "Erreur",
        description: "Le numéro de téléphone est obligatoire",
        variant: "destructive",
      });
      return;
    }

    // Validate phone format (basic)
    const phoneRegex = /^[\d\s]+$/;
    if (!phoneRegex.test(phone)) {
      toast({
        title: "Erreur",
        description: "Le format du numéro de téléphone est invalide",
        variant: "destructive",
      });
      return;
    }

    // Validate email if provided
    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: "Erreur",
          description: "Le format de l'email est invalide",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const newClient: NewClientData = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || "",
        isVip,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      onClientCreated?.(newClient);

      toast({
        title: "Client créé",
        description: `${newClient.name} a été ajouté avec succès${isVip ? " en tant que VIP" : ""}`,
      });

      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le client",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Nouveau client
          </DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau client à votre base de données
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Ex: Marie Koné"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="Ex: 07 12 34 56 78"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Ex: marie.kone@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Client VIP</p>
                <p className="text-sm text-muted-foreground">
                  Accès aux avantages privilégiés
                </p>
              </div>
            </div>
            <Switch checked={isVip} onCheckedChange={setIsVip} />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer le client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
