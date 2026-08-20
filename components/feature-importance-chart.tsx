"use client"

import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { featureImportance } from "@/lib/data"

export function FeatureImportanceChart() {
  const data = [...featureImportance].sort((a, b) => b.importance - a.importance)
  const max = data[0]?.importance ?? 100

  return (
    <div style={{ height: data.length * 40 + 16 }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
          barCategoryGap={10}
        >
          <XAxis type="number" domain={[0, max]} hide />
          <YAxis
            type="category"
            dataKey="feature"
            width={148}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--foreground)", fontSize: 12 }}
          />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]} maxBarSize={18}>
            {data.map((entry, index) => (
              <Cell
                key={entry.feature}
                fill="var(--chart-1)"
                fillOpacity={index === 0 ? 1 : 0.35 + (entry.importance / max) * 0.35}
              />
            ))}
            <LabelList
              dataKey="importance"
              position="right"
              formatter={(v: number) => `${v}%`}
              fill="var(--muted-foreground)"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
