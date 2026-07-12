import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface RevenuePoint {
  label: string;
  value: number;
}

export default function RevenueAreaChart({ data }: { data: RevenuePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D69A2D" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#D69A2D" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "#64748B" }}
          axisLine={{ stroke: "#E2E8F0" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#64748B" }}
          axisLine={false}
          tickLine={false}
          width={56}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 10,
            border: "1px solid #E2E8F0",
            fontSize: 12,
          }}
          formatter={(value: number) => [`৳ ${value.toLocaleString()}`, "Revenue"]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#B37E1F"
          strokeWidth={2.5}
          fill="url(#revenueFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
