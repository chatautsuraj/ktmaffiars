"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
}

export function StatCard({ label, value, change }: StatCardProps) {
  return (
    <div className="p-4 border border-border bg-background">
      <p className="text-xs text-muted uppercase tracking-wider mb-1">{label}</p>
      <p className="font-serif text-2xl font-bold">{value}</p>
      {change !== undefined && (
        <p className={`text-xs mt-1 ${change >= 0 ? "text-green-600" : "text-red-500"}`}>
          {change >= 0 ? "+" : ""}{change}% YoY
        </p>
      )}
    </div>
  );
}

interface TradeChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ["#0A1E3F", "#C9A227", "#2D2D2D", "#6B7280"];

export function SectorChart({ data }: TradeChartProps) {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={safeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
            {safeData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartProps {
  data: { label: string; value: number }[];
}

export function StatsBarChart({ data }: BarChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#C9A227" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
