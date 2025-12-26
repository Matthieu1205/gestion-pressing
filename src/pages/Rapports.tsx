import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  Package,
  Download,
  Calendar,
  FileText,
  PieChart,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { mois: "Jan", montant: 2400000 },
  { mois: "Fév", montant: 2100000 },
  { mois: "Mar", montant: 2800000 },
  { mois: "Avr", montant: 3200000 },
  { mois: "Mai", montant: 2900000 },
  { mois: "Juin", montant: 3500000 },
];

const serviceData = [
  { name: "Nettoyage à sec", value: 45, color: "hsl(var(--primary))" },
  { name: "Lavage & Repassage", value: 30, color: "hsl(var(--accent))" },
  { name: "Repassage seul", value: 15, color: "hsl(var(--success))" },
  { name: "Détachage", value: 10, color: "hsl(var(--warning))" },
];

const reports = [
  {
    id: 1,
    title: "Rapport des ventes",
    description: "Chiffre d'affaires par période",
    icon: BarChart3,
  },
  {
    id: 2,
    title: "Remises accordées",
    description: "Détail des remises et motifs",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Productivité atelier",
    description: "Performance et délais",
    icon: Package,
  },
  {
    id: 4,
    title: "Fidélité clients",
    description: "Analyse des clients VIP",
    icon: Users,
  },
];

export default function Rapports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rapports</h1>
          <p className="text-muted-foreground">
            Analyses et statistiques de votre activité
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Évolution du chiffre d'affaires</h3>
            <p className="text-sm text-muted-foreground">
              Revenus mensuels sur les 6 derniers mois
            </p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="mois"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} FCFA`, "Montant"]}
                />
                <Area
                  type="monotone"
                  dataKey="montant"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorMontant)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Service Distribution */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Répartition services</h3>
            <p className="text-sm text-muted-foreground">Par type de prestation</p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {serviceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Rapports disponibles</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reports.map((report, index) => (
            <Card
              key={report.id}
              className="p-5 cursor-pointer hover:shadow-lg transition-all hover:border-primary/30 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <report.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{report.title}</h3>
              <p className="text-sm text-muted-foreground">{report.description}</p>
              <Button variant="link" className="px-0 mt-2">
                <FileText className="h-4 w-4 mr-1" />
                Générer
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
