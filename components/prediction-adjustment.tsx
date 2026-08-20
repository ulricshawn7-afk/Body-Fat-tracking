"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePrep } from "@/components/prep-provider"

export function PredictionAdjustment() {
  const { originalWeek16, week16Prediction, currentWeek } = usePrep()
  const diff = week16Prediction - originalWeek16
  const diffLabel = `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`

  const rows = [
    { label: "Original Forecast", value: `${originalWeek16.toFixed(1)}%`, tone: "muted" as const },
    { label: "Updated Forecast", value: `${week16Prediction.toFixed(1)}%`, tone: "primary" as const },
    { label: "Difference", value: diffLabel, tone: "diff" as const },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Prediction Adjustment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {`Based on the latest Week ${currentWeek} data, the predicted Week 16 body fat has been adjusted from ${originalWeek16.toFixed(
            1,
          )}% to ${week16Prediction.toFixed(1)}%.`}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="rounded-lg border border-border bg-secondary/40 px-4 py-3"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {row.label}
              </p>
              <p
                className={
                  row.tone === "primary"
                    ? "mt-1 text-xl font-semibold text-primary"
                    : row.tone === "diff"
                      ? "mt-1 text-xl font-semibold text-chart-4"
                      : "mt-1 text-xl font-semibold text-foreground"
                }
              >
                {row.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
