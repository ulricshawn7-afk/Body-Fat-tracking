"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePrep } from "@/components/prep-provider"
import { TOTAL_WEEKS } from "@/lib/data"

export function AthleteSummary() {
  const { athlete, currentWeek, currentWeekEntry } = usePrep()

  const stats: { label: string; value: string }[] = [
    { label: "Age", value: `${athlete.age}` },
    { label: "Height", value: `${athlete.height} cm` },
    { label: "Current Week", value: `Week ${currentWeek}` },
    { label: "Current Weight", value: `${currentWeekEntry.weight.toFixed(1)} kg` },
    { label: "Current Body Fat", value: `${currentWeekEntry.actualBf.toFixed(1)}%` },
    { label: "Skeletal Muscle Mass", value: `${currentWeekEntry.smm.toFixed(1)} kg` },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div className="flex items-center gap-3">
          <div
            className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary"
            aria-hidden="true"
          >
            {athlete.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <CardTitle className="text-base">{athlete.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{athlete.division}</p>
          </div>
        </div>
        <Badge variant="secondary" className="hidden sm:inline-flex">
          Week {currentWeek} / {TOTAL_WEEKS}
        </Badge>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="text-lg font-semibold text-foreground">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
