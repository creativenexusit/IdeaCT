"use client";

import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  Tooltip, CartesianGrid, Cell,
} from "recharts";

// Bar colors pulled from the IdeAcT logo's ray palette
const BAR_COLORS = ["#135492", "#39a93d", "#24aada", "#f37b28", "#6a3d8d", "#840d2c"];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="text-text-secondary font-medium mb-1">{label}</p>
      <p className="text-primary font-bold">{payload[0].name}: {payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export function DashboardChart({
  title,
  data,
  dataKey,
}: {
  title: string;
  data: Array<{ label: string; value: number }>;
  dataKey: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-sm font-bold text-text-primary mb-5">{title}</p>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e6ee" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#8a93a3" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#8a93a3" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(19,84,146,0.05)" }} />
            <Bar dataKey="value" name={dataKey} radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
