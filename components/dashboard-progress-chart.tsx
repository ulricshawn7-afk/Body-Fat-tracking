"use client"

import {
  CartesianGrid,
  Area,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePrep } from "@/components/prep-provider"

// Week 0 is the baseline input used to establish the Week 1 values.
// It is intentionally not included in the visible chart.
const week0Baseline = { week: 0, actual: 20.5, benchmark: 20.0 }

const progressProfiles: Record<string, { actual: number[]; benchmark: number[] }> = {
  "Shawn Ulric": {
    actual: [20.0, 19.7, 19.4, 19.0, 18.5, 18.1, 17.5, 17.0, 16.5, 16.0, 15.5, 15.0, 14.5, 14.0, 13.5, 13.0],
    benchmark: [19.5, 18.8, 17.9, 17.0, 16.1, 15.4, 14.7, 14.0, 13.3, 12.6, 11.8, 11.0, 10.2, 9.4, 8.7, 8.0],
  },
  "Jeff the G": {
    actual: [21.0, 20.6, 20.2, 19.7, 19.2, 18.7, 18.2, 17.7, 17.2, 16.7, 16.2, 15.7, 15.2, 14.8, 14.4, 14.0],
    benchmark: [20.0, 19.3, 18.5, 17.7, 17.0, 16.3, 15.6, 14.9, 14.2, 13.5, 12.8, 12.1, 11.4, 10.7, 9.8, 9.0],
  },
  "Lil Simp": {
    actual: [19.0, 18.6, 18.1, 17.7, 17.2, 16.7, 16.2, 15.7, 15.2, 14.8, 14.3, 13.9, 13.5, 13.1, 12.8, 12.5],
    benchmark: [18.5, 17.7, 16.8, 16.0, 15.2, 14.4, 13.7, 13.0, 12.3, 11.6, 10.9, 10.2, 9.5, 8.8, 8.1, 7.5],
  },
}

type ProgressPoint = {
  week: number
  actual: number | null
  benchmark: number | null
  gap: number | null
  range: number[] | null
}

function getProgressData(name: string) {
  const profile = progressProfiles[name] ?? progressProfiles["Shawn Ulric"]
  const currentWeek = name === "Jeff the G" ? 8 : name === "Lil Simp" ? 4 : 16
  const benchmarkEndWeek = name === "Jeff the G" ? 9 : name === "Lil Simp" ? 5 : 16
  return profile.actual.map<ProgressPoint>((actual, index) => {
    const visibleBenchmark = index < benchmarkEndWeek ? profile.benchmark[index] : null
    const visibleActual = index < currentWeek ? actual : null
    return {
      week: index + 1,
      actual: visibleActual,
      benchmark: visibleBenchmark,
      gap: visibleActual === null || visibleBenchmark === null ? null : visibleActual - visibleBenchmark,
      range:
        visibleActual === null || visibleBenchmark === null
          ? null
          : [visibleBenchmark, visibleActual],
    }
  })
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string; payload?: ProgressPoint }[]
  label?: number
}) {
  if (!active || !payload?.length) return null

  const point = payload[0].payload
  if (!point) return null

  const rows = [
    { name: "Actual BF", value: point.actual, color: "var(--primary)", signed: false },
    { name: "WNBF Benchmark", value: point.benchmark, color: "var(--chart-2)", signed: false },
    { name: "Progress Gap", value: point.gap, color: "var(--chart-4)", signed: true },
  ]

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1.5 font-semibold text-popover-foreground">Week {label}</p>
      <div className="space-y-1">
        {rows.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-medium text-popover-foreground">
              {entry.value === null ? "—" : `${entry.signed && entry.value > 0 ? "+" : ""}${entry.value.toFixed(1)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="size-2.5 rounded-full bg-primary" />
        Actual Progress
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="size-2.5 rounded-full bg-chart-2" />
        WNBF Benchmark
      </div>
    </div>
  )
}

export function DashboardProgressChart() {
  const { athlete } = usePrep()
  const progressData = getProgressData(athlete.name)

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <CardTitle className="text-base">Athlete Progress vs WNBF Benchmark</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Body fat percentage across the complete 16-week cutting phase</p>
        </div>
        <Legend />
      </CardHeader>
      <CardContent>
        <div className="h-[440px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData} margin={{ top: 18, right: 18, left: -6, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(week) => `W${week}`}
              />
              <YAxis
                domain={[7, 21]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                width={44}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="range"
                stroke="none"
                fill="var(--primary)"
                fillOpacity={0.08}
                isAnimationActive={false}
              />
              <Line
                name="Actual Progress"
                dataKey="actual"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ r: 3, fill: "var(--primary)" }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
                connectNulls={false}
              />
              <Line
                name="WNBF Benchmark"
                dataKey="benchmark"
                stroke="var(--chart-2)"
                strokeWidth={3}
                dot={{ r: 3, fill: "var(--chart-2)" }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
