"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { usePrep } from "@/components/prep-provider"
import type { ChartPoint } from "@/lib/data"

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number | null; color: string; dataKey: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1.5 font-semibold text-popover-foreground">Week {label}</p>
      <div className="flex flex-col gap-1">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-medium text-popover-foreground">
              {entry.value === null ? "—" : `${entry.value.toFixed(1)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ForecastChart() {
  const { chartData, currentWeek } = usePrep()

  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData as ChartPoint[]}
          margin={{ top: 8, right: 16, left: -8, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickFormatter={(v) => `W${v}`}
          />
          <YAxis
            domain={[8, 22]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickFormatter={(v) => `${v}%`}
            width={44}
          />
          <Tooltip content={<ChartTooltip />} />
          <ReferenceLine
            x={currentWeek}
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            label={{
              value: `Today · Week ${currentWeek}`,
              position: "top",
              fill: "var(--foreground)",
              fontSize: 11,
              fontWeight: 600,
            }}
          />
          <Line
            name="Original 16-Week Forecast"
            dataKey="original"
            stroke="var(--chart-3)"
            strokeWidth={2}
            strokeDasharray="2 4"
            dot={false}
            isAnimationActive={false}
          />
          <Line
            name="Updated Prediction"
            dataKey="updated"
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            strokeDasharray="6 4"
            dot={{ r: 2.5, fill: "var(--chart-1)" }}
            connectNulls
            isAnimationActive={false}
          />
          <Line
            name="Actual Body Fat"
            dataKey="actual"
            stroke="var(--chart-2)"
            strokeWidth={3}
            dot={{ r: 3.5, fill: "var(--chart-2)" }}
            connectNulls
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ChartLegend() {
  const items = [
    { label: "Actual Body Fat", color: "var(--chart-2)", dashed: false },
    { label: "Updated Prediction", color: "var(--chart-1)", dashed: true },
    { label: "Original 16-Week Forecast", color: "var(--chart-3)", dashed: true },
  ]
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className="inline-block h-0.5 w-6 rounded-full"
            style={{
              backgroundColor: item.color,
              backgroundImage: item.dashed
                ? `repeating-linear-gradient(to right, ${item.color} 0 6px, transparent 6px 10px)`
                : undefined,
            }}
            aria-hidden="true"
          />
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
