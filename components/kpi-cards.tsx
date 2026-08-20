"use client"

import { ArrowDownRight, Flag, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { usePrep } from "@/components/prep-provider"

export function KpiCards() {
  const { nextWeekPrediction, currentActualBf, week16Prediction } = usePrep()

  const cards = [
    {
      label: "Next Week Predicted Body Fat",
      value: `${nextWeekPrediction.toFixed(1)}%`,
      hint: "Model projection for the upcoming check-in",
      icon: ArrowDownRight,
      accent: true,
    },
    {
      label: "Current Actual Body Fat",
      value: `${currentActualBf.toFixed(1)}%`,
      hint: "Latest measured value",
      icon: Target,
      accent: false,
    },
    {
      label: "Predicted Week 16 Body Fat",
      value: `${week16Prediction.toFixed(1)}%`,
      hint: "Forecast at contest week",
      icon: Flag,
      accent: false,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card
            key={card.label}
            className={card.accent ? "border-primary/30 bg-primary/[0.04]" : undefined}
          >
            <CardContent className="space-y-3 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground text-pretty">
                  {card.label}
                </p>
                <span
                  className={
                    card.accent
                      ? "flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
                      : "flex size-8 items-center justify-center rounded-md bg-secondary text-muted-foreground"
                  }
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <p className="text-3xl font-semibold tracking-tight text-foreground">
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground">{card.hint}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
