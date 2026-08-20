"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePrep } from "@/components/prep-provider"

const dashboardAthleteData: Record<string, { currentBf: number; benchmark: number; currentWeek: number }> = {
  "Shawn Ulric": { currentBf: 13.0, benchmark: 8.0, currentWeek: 16 },
  "Jeff the G": { currentBf: 16.0, benchmark: 9.0, currentWeek: 8 },
  "Lil Simp": { currentBf: 18.5, benchmark: 7.5, currentWeek: 4 },
}

export function DashboardAthleteSummary() {
  const { athlete } = usePrep()
  const data = dashboardAthleteData[athlete.name] ?? dashboardAthleteData["Shawn Ulric"]
  const gap = data.currentBf - data.benchmark
  const progress = Math.round((data.currentWeek / 16) * 100)
  const kpis = [
    { label: "Current BF", value: `${data.currentBf.toFixed(1)}%`, hint: "Actual · Week 16" },
    { label: "WNBF Benchmark", value: `${data.benchmark.toFixed(1)}%`, hint: "Benchmark at completion" },
    { label: "Progress Gap", value: `${gap >= 0 ? "+" : ""}${gap.toFixed(1)}%`, hint: "Above WNBF Benchmark" },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Athlete
          </p>
          <CardTitle className="mt-1 text-lg">{athlete.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{athlete.division}</p>
        </div>
        <div className="rounded-md bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
          16-week cutting phase
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border border-border bg-secondary/20 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {kpi.label}
            </p>
            <p
              className={`mt-1 font-semibold tracking-tight text-foreground ${
                kpi.label === "Current BF" ? "text-[1.65rem]" : "text-2xl"
              }`}
            >
              {kpi.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{kpi.hint}</p>
            {kpi.label === "Current BF" ? (
              <>
                <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                  <span className="font-medium text-muted-foreground">Cutting Progress</span>
                  <span className="font-medium text-primary">{progress}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary" aria-label={`${progress}% cutting progress`}>
                  <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                </div>
              </>
            ) : null}
          </div>
        ))}

        <div className="rounded-lg border border-border bg-secondary/20 px-4 py-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Prep Status
            </p>
          </div>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Week {data.currentWeek} / 16</p>
          <p className="mt-1 text-xs font-medium text-chart-2">
            {data.currentWeek === 16 ? "Completed" : "In progress"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
