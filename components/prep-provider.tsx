"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import {
  athlete as defaultAthlete,
  athleteWeeks,
  athletes,
  buildChartData,
  initialUpdatedForecast,
  initialWeeks,
  originalForecast,
  projectForecast,
  round1,
  TOTAL_WEEKS,
  type Athlete,
  type ChartPoint,
  type WeekEntry,
} from "@/lib/data"

type PrepState = {
  athlete: Athlete
  athletes: Athlete[]
  selectAthlete: (name: string) => void
  weeks: WeekEntry[]
  updatedForecast: number[]
  currentWeek: number
  currentWeekEntry: WeekEntry
  chartData: ChartPoint[]
  nextWeekPrediction: number
  currentActualBf: number
  week16Prediction: number
  originalWeek16: number
  addWeek: (entry: WeekEntry) => void
}

const PrepContext = createContext<PrepState | null>(null)

export function PrepProvider({ children }: { children: ReactNode }) {
  const [selectedAthleteName, setSelectedAthleteName] = useState(defaultAthlete.name)
  const [weeks, setWeeks] = useState<WeekEntry[]>(initialWeeks)
  const [updatedForecast, setUpdatedForecast] = useState<number[]>(initialUpdatedForecast)

  const addWeek = (entry: WeekEntry) => {
    setWeeks((prev) => {
      const next = [...prev.filter((w) => w.week !== entry.week), entry].sort(
        (a, b) => a.week - b.week,
      )
      // Recalculate the forward-looking forecast from the new data.
      setUpdatedForecast(projectForecast(next))
      return next
    })
  }

  const selectAthlete = (name: string) => {
    const nextWeeks = athleteWeeks[name]
    const nextAthlete = athletes.find((item) => item.name === name)
    if (!nextWeeks || !nextAthlete) return
    setSelectedAthleteName(name)
    setWeeks(nextWeeks)
    setUpdatedForecast(projectForecast(nextWeeks))
  }

  const value = useMemo<PrepState>(() => {
    const sorted = [...weeks].sort((a, b) => a.week - b.week)
    const latest = sorted[sorted.length - 1]
    const currentWeek = latest.week
    const chartData = buildChartData(sorted, updatedForecast)
    const nextIdx = Math.min(currentWeek, TOTAL_WEEKS - 1) // week currentWeek+1 (0-based)
    return {
      athlete: athletes.find((item) => item.name === selectedAthleteName) ?? defaultAthlete,
      athletes,
      selectAthlete,
      weeks: sorted,
      updatedForecast,
      currentWeek,
      currentWeekEntry: latest,
      chartData,
      nextWeekPrediction: round1(updatedForecast[nextIdx]),
      currentActualBf: round1(latest.actualBf),
      week16Prediction: round1(updatedForecast[TOTAL_WEEKS - 1]),
      originalWeek16: originalForecast[TOTAL_WEEKS - 1],
      addWeek,
    }
  }, [weeks, updatedForecast, selectedAthleteName])

  return <PrepContext.Provider value={value}>{children}</PrepContext.Provider>
}

export function usePrep() {
  const ctx = useContext(PrepContext)
  if (!ctx) throw new Error("usePrep must be used within a PrepProvider")
  return ctx
}
