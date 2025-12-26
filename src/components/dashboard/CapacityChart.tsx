import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  { jour: "Lun", charge: 85, capacite: 100 },
  { jour: "Mar", charge: 92, capacite: 100 },
  { jour: "Mer", charge: 78, capacite: 100 },
  { jour: "Jeu", charge: 110, capacite: 100 },
  { jour: "Ven", charge: 95, capacite: 100 },
  { jour: "Sam", charge: 120, capacite: 100 },
];

export function CapacityChart() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Charge vs Capacité</h3>
        <p className="text-sm text-muted-foreground">Articles par jour cette semaine</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="jour"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <ReferenceLine
              y={100}
              stroke="hsl(var(--destructive))"
              strokeDasharray="5 5"
              label={{
                value: "Capacité max",
                position: "right",
                fill: "hsl(var(--destructive))",
                fontSize: 11,
              }}
            />
            <Bar
              dataKey="charge"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
              name="Charge"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Charge actuelle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-6 bg-destructive" style={{ borderStyle: "dashed" }} />
          <span className="text-muted-foreground">Capacité maximale</span>
        </div>
      </div>
    </div>
  );
}
