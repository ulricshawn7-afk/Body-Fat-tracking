"use client"

import { useState } from "react"
import { Sparkles, Check, Loader2, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePrep } from "@/components/prep-provider"
import type { WeekEntry } from "@/lib/data"

type FormValues = WeekEntry & {
  mineral: number
  fat: number
  carbs: number
}

type Field = {
  key: keyof FormValues
  label: string
  step: string
}

const inBodyFields: Field[] = [
  { key: "weight", label: "Weight (kg)", step: "0.1" },
  { key: "smm", label: "SMM (kg)", step: "0.1" },
  { key: "actualBf", label: "BF (%)", step: "0.1" },
  { key: "tbw", label: "TBW (kg)", step: "0.1" },
  { key: "ecw", label: "ECW (kg)", step: "0.1" },
  { key: "mineral", label: "Mineral (kg)", step: "0.1" },
  { key: "visceralFat", label: "Visceral Fat", step: "1" },
]

const nutritionFields: Field[] = [
  { key: "dailyCalories", label: "Calories", step: "1" },
  { key: "protein", label: "Protein (g/kg/day)", step: "0.1" },
  { key: "fat", label: "Fat (g/kg/day)", step: "0.1" },
  { key: "carbs", label: "Carbs (g/kg/day)", step: "0.1" },
]

const lifestyleFields: Field[] = [
  { key: "weightTraining", label: "Weight Training (sessions/week)", step: "1" },
  { key: "cardio", label: "Cardio (hr/week)", step: "0.5" },
  { key: "steps", label: "Steps/day", step: "100" },
  { key: "sleep", label: "Sleep (hr/day)", step: "0.1" },
]

export function WeeklyInputForm() {
  const { athlete, currentWeekEntry, currentWeek, addWeek } = usePrep()
  const [values, setValues] = useState<FormValues>({
    ...currentWeekEntry,
    mineral: 3.4,
    fat: 0.8,
    carbs: 3.2,
  })
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")
  const [uploaded, setUploaded] = useState(false)

  const update = (key: keyof FormValues, raw: string) => {
    setStatus("idle")
    setValues((prev) => ({ ...prev, [key]: raw === "" ? 0 : Number(raw) }))
  }

  const uploadInBody = () => {
    setValues((prev) => ({
      ...prev,
      ...currentWeekEntry,
      mineral: 3.4,
    }))
    setUploaded(true)
    setStatus("idle")
  }

  const generate = () => {
    setStatus("loading")
    // Simulate a model call so the interaction feels functional.
    setTimeout(() => {
      const { bmi: _bmi, bmr: _bmr, ...predictionValues } = values
      // Keep the legacy record shape for tracking; projectForecast does not read BMI or BMR.
      addWeek({
        ...predictionValues,
        bmi: currentWeekEntry.bmi,
        bmr: currentWeekEntry.bmr,
        week: currentWeek,
      })
      setStatus("done")
    }, 650)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-base">Current Weekly Input</CardTitle>
            <CardDescription>
              {`Week ${currentWeek} is determined automatically. Update the measurements and regenerate the forecast.`}
            </CardDescription>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-xs text-muted-foreground sm:text-right">
            <span>Athlete</span>
            <span className="font-medium text-foreground">{athlete.name}</span>
            <span>Age / Height</span>
            <span className="font-medium text-foreground">{athlete.age} years · {athlete.height} cm</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-4" aria-labelledby="inbody-heading">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 id="inbody-heading" className="text-sm font-semibold text-foreground">InBody Measurements</h3>
              <p className="text-xs text-muted-foreground">Auto-filled from InBody, editable before submission.</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={uploadInBody} className="gap-1.5">
              <Upload className="size-3.5" aria-hidden="true" />
              Upload InBody
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {inBodyFields.map((field) => (
              <InputField key={field.key} field={field} value={values[field.key]} onChange={update} />
            ))}
            <ReferenceField label="BMI" value={values.bmi.toFixed(1)} />
            <ReferenceField label="BMR (kcal)" value={values.bmr.toLocaleString()} />
          </div>
          {uploaded ? <p className="text-xs font-medium text-chart-2">InBody measurements auto-filled.</p> : null}
        </section>

        <section className="space-y-4 border-t border-border pt-5" aria-labelledby="nutrition-heading">
          <div>
            <h3 id="nutrition-heading" className="text-sm font-semibold text-foreground">Nutrition <span className="font-normal text-muted-foreground">(Manual Input)</span></h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nutritionFields.map((field) => (
              <InputField key={field.key} field={field} value={values[field.key]} onChange={update} />
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t border-border pt-5" aria-labelledby="lifestyle-heading">
          <div>
            <h3 id="lifestyle-heading" className="text-sm font-semibold text-foreground">Training &amp; Lifestyle <span className="font-normal text-muted-foreground">(Manual Input)</span></h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lifestyleFields.map((field) => (
              <InputField key={field.key} field={field} value={values[field.key]} onChange={update} />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={generate} disabled={status === "loading"} className="gap-2">
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="size-4" aria-hidden="true" />
            )}
            {status === "loading" ? "Generating..." : "Generate Prediction"}
          </Button>
          {status === "done" ? (
            <span className="flex items-center gap-1.5 text-sm font-medium text-chart-2">
              <Check className="size-4" aria-hidden="true" />
              Forecast updated
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

function InputField({
  field,
  value,
  onChange,
}: {
  field: Field
  value: number
  onChange: (key: keyof FormValues, raw: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={`prediction-${String(field.key)}`} className="text-xs text-muted-foreground">
        {field.label}
      </Label>
      <Input
        id={`prediction-${String(field.key)}`}
        type="number"
        inputMode="decimal"
        step={field.step}
        value={value}
        onChange={(e) => onChange(field.key, e.target.value)}
      />
    </div>
  )
}

function ReferenceField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex h-8 items-center rounded-lg border border-input bg-muted/30 px-2.5 text-sm text-muted-foreground">
        {value}
      </div>
    </div>
  )
}
