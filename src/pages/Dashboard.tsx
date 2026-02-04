import { StatCard } from "@/components/dashboard/StatCard";
import { CapacityChart } from "@/components/dashboard/CapacityChart";
import { RecentDeposits } from "@/components/dashboard/RecentDeposits";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { Button } from "@/components/ui/button";
import {
  Package,
  Users,
  Wallet,
  Clock,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue ! Voici l'activité de votre pressing aujourd'hui.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Button size="sm" onClick={() => navigate("/nouveau-depot")}>
            <Plus className="h-4 w-4" />
            Nouveau dépôt
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Dépôts du jour"
          value={24}
          change={12}
          icon={<Package className="h-6 w-6" />}
          variant="primary"
        />
        <StatCard
          title="Articles en cours"
          value={156}
          icon={<Clock className="h-6 w-6" />}
          variant="accent"
        />
        <StatCard
          title="Chiffre du jour"
          value="245 000 FCFA"
          change={8}
          icon={<Wallet className="h-6 w-6" />}
          variant="success"
        />
        <StatCard
          title="Clients actifs"
          value={89}
          change={-3}
          icon={<Users className="h-6 w-6" />}
          variant="default"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <CapacityChart />
          <RecentDeposits />
        </div>
        <div className="space-y-6">
          <AlertsList />
          
          {/* Quick Actions */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
            <div className="grid gap-3">
              <Button variant="outline" className="justify-start h-12">
                <Package className="h-5 w-5 mr-3 text-primary" />
                Rechercher un dépôt
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <Users className="h-5 w-5 mr-3 text-primary" />
                Nouveau client
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <Wallet className="h-5 w-5 mr-3 text-primary" />
                Clôture de caisse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
