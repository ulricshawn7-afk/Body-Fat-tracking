"use client"

import { Info, MoonStar, TrendingDown, Dumbbell, Utensils } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePrep } from "@/components/prep-provider"

export function CoachingInsights() {
  const { currentWeekEntry, week16Prediction, originalWeek16 } = usePrep()

  // Neutral, decision-support messaging. A couple of items react to the data.
  const insights: { icon: typeof Info; text: string }[] = []

  insights.push({
    icon: TrendingDown,
    text:
      week16Prediction > originalWeek16
        ? "Current fat loss is slower than the original predicted trajectory."
        : "Current fat loss is tracking at or ahead of the original trajectory.",
  })

  if (currentWeekEntry.sleep < 7) {
    insights.push({
      icon: MoonStar,
      text: "Average sleep is below the recommended target.",
    })
  }

  insights.push({
    icon: Utensils,
    text: "Consider reviewing calorie intake and weekly cardio volume.",
  })

  insights.push({
    icon: Dumbbell,
    text: "Muscle mass remains relatively stable.",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Coaching Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-2.5">
          {insights.map((insight, i) => {
            const Icon = insight.icon
            return (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2.5"
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-foreground text-pretty">
                  {insight.text}
                </span>
              </li>
            )
          })}
        </ul>
        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground text-pretty">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          These insights support coach decision-making and do not prescribe medical or
          nutrition treatment.
        </p>
      </CardContent>
    </Card>
  )
}
