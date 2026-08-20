"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { usePrep } from "@/components/prep-provider"
import { TOTAL_WEEKS } from "@/lib/data"
import { Pencil, Plus } from "lucide-react"

export default function ProfilePage() {
  const { athlete, athletes, selectAthlete, currentWeek, currentWeekEntry, weeks } = usePrep()
  const start = weeks[0]

  const profile: { label: string; value: string }[] = [
    { label: "Name", value: athlete.name },
    { label: "Age", value: `${athlete.age} years` },
    { label: "Height", value: `${athlete.height} cm` },
    { label: "Division", value: athlete.division },
    { label: "Target", value: athlete.contestDate },
    { label: "Goal Body Fat", value: `${athlete.goalBf.toFixed(1)}%` },
  ]

  const composition: { label: string; value: string; sub?: string }[] = [
    {
      label: "Current Weight",
      value: `${currentWeekEntry.weight.toFixed(1)} kg`,
      sub: `${(currentWeekEntry.weight - start.weight).toFixed(1)} kg since Week 1`,
    },
    {
      label: "Current Body Fat",
      value: `${currentWeekEntry.actualBf.toFixed(1)}%`,
      sub: `${(currentWeekEntry.actualBf - start.actualBf).toFixed(1)}% since Week 1`,
    },
    {
      label: "Skeletal Muscle Mass",
      value: `${currentWeekEntry.smm.toFixed(1)} kg`,
      sub: `${(currentWeekEntry.smm - start.smm >= 0 ? "+" : "")}${(currentWeekEntry.smm - start.smm).toFixed(1)} kg since Week 1`,
    },
    { label: "BMI", value: currentWeekEntry.bmi.toFixed(1) },
    { label: "Visceral Fat", value: `${currentWeekEntry.visceralFat}` },
    { label: "Total Body Water", value: `${currentWeekEntry.tbw.toFixed(1)} kg` },
    { label: "BMR", value: `${currentWeekEntry.bmr.toLocaleString()} kcal` },
    { label: "Daily Calories", value: `${currentWeekEntry.dailyCalories.toLocaleString()} kcal` },
  ]

  return (
    <div className="min-h-dvh">
      <PageHeader
        title="Athlete Management"
        subtitle="Select an athlete to view baseline information and current body composition."
      />
      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">Athletes</CardTitle>
                <p className="text-sm text-muted-foreground">{athletes.length} active athletes</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Plus className="size-3.5" aria-hidden="true" />
                Add Athlete
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {athletes.map((item) => {
              const selected = item.name === athlete.name
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => selectAthlete(item.name)}
                  className={`w-full rounded-lg border px-3 py-3 text-left transition-colors ${
                    selected
                      ? "border-primary/40 bg-primary/[0.06] ring-1 ring-primary/10"
                      : "border-border hover:bg-secondary/60"
                  }`}
                  aria-current={selected ? "true" : undefined}
                >
                  <span className="block font-medium text-foreground">{item.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{item.division}</span>
                </button>
              )
            })}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
              <div className="flex items-center gap-4">
                <div
                  className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary"
                  aria-hidden="true"
                >
                  {athlete.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-lg">{athlete.name}</CardTitle>
                  <Badge variant="secondary">
                    Week {currentWeek} of {TOTAL_WEEKS}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="size-3.5" aria-hidden="true" />
                Edit Profile
              </Button>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                {profile.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="text-sm font-semibold text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Current Body Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {composition.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border bg-secondary/30 px-4 py-3"
                  >
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-foreground">{item.value}</dd>
                    {item.sub ? (
                      <dd className="text-xs text-muted-foreground">{item.sub}</dd>
                    ) : null}
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
