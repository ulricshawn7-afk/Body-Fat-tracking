"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { usePrep } from "@/components/prep-provider"
import { inputFields, round1, TOTAL_WEEKS, type WeekEntry } from "@/lib/data"

export function AddWeekDialog() {
  const { currentWeekEntry, currentWeek, addWeek } = usePrep()
  const [open, setOpen] = useState(false)

  const nextWeek = Math.min(currentWeek + 1, TOTAL_WEEKS)
  const atMax = currentWeek >= TOTAL_WEEKS

  // Seed sensible defaults from the latest week with a gentle prep trend.
  const seed = (): WeekEntry => ({
    ...currentWeekEntry,
    week: nextWeek,
    weight: round1(currentWeekEntry.weight - 0.6),
    actualBf: round1(currentWeekEntry.actualBf - 0.7),
    tbw: round1(currentWeekEntry.tbw - 0.2),
  })

  const [values, setValues] = useState<WeekEntry>(seed)

  const openChange = (o: boolean) => {
    if (o) setValues(seed())
    setOpen(o)
  }

  const update = (key: keyof WeekEntry, raw: string) => {
    setValues((prev) => ({ ...prev, [key]: raw === "" ? 0 : Number(raw) }))
  }

  const save = () => {
    addWeek({ ...values, week: nextWeek })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger
        render={<Button size="sm" className="gap-1.5" disabled={atMax} />}
      >
        <Plus className="size-4" aria-hidden="true" />
        Add New Weekly Data
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{atMax ? "Prep Complete" : `Add Week ${nextWeek} Data`}</DialogTitle>
          <DialogDescription>
            {atMax
              ? "All 16 weeks have been recorded."
              : "Enter this week's measurements. Saving will update the actuals and recalculate the forecast."}
          </DialogDescription>
        </DialogHeader>

        {!atMax ? (
          <div className="grid gap-4 py-2 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="new-actualBf" className="text-xs text-muted-foreground">
                Actual Body Fat (%)
              </Label>
              <Input
                id="new-actualBf"
                type="number"
                step="0.1"
                inputMode="decimal"
                value={values.actualBf}
                onChange={(e) => update("actualBf", e.target.value)}
              />
            </div>
            {inputFields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <Label htmlFor={`new-${field.key}`} className="text-xs text-muted-foreground">
                  {field.label}
                </Label>
                <Input
                  id={`new-${field.key}`}
                  type="number"
                  step={field.step}
                  inputMode="decimal"
                  value={values[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={save} disabled={atMax}>
            Save & Recalculate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
