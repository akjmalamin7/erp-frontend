import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export interface PieSlice {
  name: string;
  value: number;
}

const COLORS = ["#D69A2D", "#22A699", "#0F172A", "#EEC776", "#3FC1B0", "#334155"];

export default function SalesPieChart({
  data,
  valuePrefix = "",
}: {
  data: PieSlice[];
  valuePrefix?: string;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={64}
          outerRadius={98}
          paddingAngle={2}
          strokeWidth={0}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12 }}
          formatter={(value: number, name: string) => [
            `${valuePrefix}${value.toLocaleString()} (${total ? ((value / total) * 100).toFixed(0) : 0}%)`,
            name,
          ]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span className="text-xs text-ink-700">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
