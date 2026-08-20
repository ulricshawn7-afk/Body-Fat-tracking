export const TOTAL_WEEKS = 16

export type WeekEntry = {
  week: number
  weight: number
  smm: number
  visceralFat: number
  tbw: number
  ecw: number
  bmi: number
  bmr: number
  dailyCalories: number
  protein: number
  weightTraining: number
  cardio: number
  steps: number
  sleep: number
  actualBf: number
}

export type Athlete = {
  name: string
  age: number
  height: number
  division: string
  contestDate: string
  goalBf: number
}

export const athlete: Athlete = {
  name: "Shawn Ulric",
  age: 30,
  height: 173,
  division: "Men's Physique (Natural)",
  contestDate: "Week 16 - Cutting",
  goalBf: 11,
}

export const initialWeeks: WeekEntry[] = [
  {
    week: 1,
    weight: 73.0,
    smm: 34.6,
    visceralFat: 8,
    tbw: 44.0,
    ecw: 16.8,
    bmi: 24.4,
    bmr: 1720,
    dailyCalories: 2600,
    protein: 170,
    weightTraining: 4,
    cardio: 2,
    steps: 8000,
    sleep: 7.0,
    actualBf: 20.0,
  },
  {
    week: 2,
    weight: 72.2,
    smm: 34.7,
    visceralFat: 8,
    tbw: 43.7,
    ecw: 16.7,
    bmi: 24.1,
    bmr: 1710,
    dailyCalories: 2500,
    protein: 175,
    weightTraining: 4,
    cardio: 3,
    steps: 8500,
    sleep: 6.8,
    actualBf: 19.7,
  },
  {
    week: 3,
    weight: 71.5,
    smm: 34.9,
    visceralFat: 7,
    tbw: 43.4,
    ecw: 16.6,
    bmi: 23.9,
    bmr: 1700,
    dailyCalories: 2450,
    protein: 178,
    weightTraining: 5,
    cardio: 3,
    steps: 9000,
    sleep: 6.6,
    actualBf: 19.3,
  },
  {
    week: 4,
    weight: 70.8,
    smm: 35.0,
    visceralFat: 7,
    tbw: 43.1,
    ecw: 16.5,
    bmi: 23.7,
    bmr: 1695,
    dailyCalories: 2400,
    protein: 180,
    weightTraining: 5,
    cardio: 4,
    steps: 9500,
    sleep: 6.4,
    actualBf: 19.0,
  },
]

// Fixed original forecast produced at the start of prep: linear 20% (W1) -> 10% (W16).
export const originalForecast: number[] = Array.from({ length: TOTAL_WEEKS }, (_, i) => {
  const value = 20 - (10 / (TOTAL_WEEKS - 1)) * i
  return round1(value)
})

// The updated forecast that reflects the demo's Week 4 recalculation.
// Weeks 1-4 mirror actuals, Week 5 = 17.8, declining linearly to 11.8 at Week 16.
export const initialUpdatedForecast: number[] = buildInitialUpdated()

function buildInitialUpdated(): number[] {
  const arr: number[] = []
  const actualByWeek = [20.0, 19.7, 19.3, 19.0]
  for (let w = 1; w <= 4; w++) arr.push(actualByWeek[w - 1])
  const startW5 = 17.8
  const endW16 = 11.8
  const steps = TOTAL_WEEKS - 5 // from week 5 to 16
  for (let w = 5; w <= TOTAL_WEEKS; w++) {
    const t = (w - 5) / steps
    arr.push(round1(startW5 + (endW16 - startW5) * t))
  }
  return arr
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10
}

/**
 * Mock "model" projection. Given the recorded weeks, project the updated
 * body-fat forecast from the latest week through to Week 16.
 * The recent weekly fat-loss rate is extrapolated with a mild intensification
 * factor to reflect how contest prep typically accelerates toward peak week.
 */
export function projectForecast(weeks: WeekEntry[]): number[] {
  const sorted = [...weeks].sort((a, b) => a.week - b.week)
  const forecast: number[] = []

  // Past weeks: use recorded actuals.
  const actualMap = new Map<number, number>()
  sorted.forEach((w) => actualMap.set(w.week, w.actualBf))

  const latest = sorted[sorted.length - 1]
  const currentWeek = latest.week
  const currentBf = latest.actualBf

  // Recent weekly rate over up to the last 3 recorded weeks.
  const window = sorted.slice(-Math.min(4, sorted.length))
  const first = window[0]
  const span = latest.week - first.week || 1
  const recentRate = (latest.actualBf - first.actualBf) / span // negative

  // Intensify slightly toward peak week, keep it grounded.
  const intensified = recentRate * 1.35
  const futureRate = clamp(intensified, -1.1, -0.35)

  const projectedW16 = clamp(currentBf + futureRate * (TOTAL_WEEKS - currentWeek), 8.5, 14)

  for (let w = 1; w <= TOTAL_WEEKS; w++) {
    if (w <= currentWeek && actualMap.has(w)) {
      forecast.push(actualMap.get(w)!)
    } else if (w <= currentWeek) {
      forecast.push(round1(currentBf))
    } else {
      const t = (w - currentWeek) / (TOTAL_WEEKS - currentWeek)
      forecast.push(round1(currentBf + (projectedW16 - currentBf) * t))
    }
  }
  return forecast
}

// Demo athlete roster used by the Athlete Management master-detail view.
export const athletes: Athlete[] = [
  athlete,
  {
    name: "Jeff the G",
    age: 27,
    height: 180,
    division: "Men's Physique (Natural)",
    contestDate: "Week 16 - Cutting",
    goalBf: 9.5,
  },
  {
    name: "Lil Simp",
    age: 24,
    height: 168,
    division: "Men's Physique (Natural)",
    contestDate: "Week 16 - Cutting",
    goalBf: 10.5,
  },
]

function extendWeeks(weeks: WeekEntry[], totalWeeks: number, targetBf: number): WeekEntry[] {
  const result = [...weeks]
  while (result.length < totalWeeks) {
    const previous = result[result.length - 1]
    const remainingWeeks = totalWeeks - previous.week
    const nextBf = round1(previous.actualBf + (targetBf - previous.actualBf) / remainingWeeks)
    result.push({
      ...previous,
      week: previous.week + 1,
      weight: round1(previous.weight - 0.5),
      actualBf: nextBf,
      tbw: round1(previous.tbw - 0.2),
      ecw: round1(previous.ecw - 0.1),
      bmi: round1(previous.bmi - 0.2),
      bmr: previous.bmr - 8,
      dailyCalories: previous.dailyCalories - 25,
      steps: previous.steps + 150,
    })
  }
  return result
}

// Sensible sample measurements for the additional demo athletes.
export const athleteWeeks: Record<string, WeekEntry[]> = {
  [athlete.name]: extendWeeks(initialWeeks, 16, 13.0),
  "Jeff the G": extendWeeks(initialWeeks.map((week) => ({
    ...week,
    weight: round1(week.weight + 7.5),
    smm: round1(week.smm + 2.2),
    actualBf: round1(week.actualBf - 2.0),
    bmi: round1(week.bmi + 1.2),
    bmr: week.bmr + 140,
    dailyCalories: week.dailyCalories + 250,
    protein: week.protein + 15,
  })), 8, 16.0),
  "Lil Simp": initialWeeks.map((week) => ({
    ...week,
    weight: round1(week.weight - 6.5),
    smm: round1(week.smm - 1.8),
    actualBf: round1(week.actualBf - 0.5),
    bmi: round1(week.bmi - 1.5),
    bmr: week.bmr - 120,
    dailyCalories: week.dailyCalories - 180,
    protein: week.protein - 10,
  })),
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

export type FeatureImportance = { feature: string; importance: number }

export const featureImportance: FeatureImportance[] = [
  { feature: "Visceral Fat", importance: 26 },
  { feature: "Skeletal Muscle Mass", importance: 20 },
  { feature: "Weight", importance: 16 },
  { feature: "Total Body Water", importance: 12 },
  { feature: "Calories", importance: 9 },
  { feature: "Sleep", importance: 7 },
  { feature: "Steps", importance: 5 },
  { feature: "Other", importance: 5 },
]

export type ChartPoint = {
  week: number
  label: string
  actual: number | null
  updated: number | null
  original: number
}

export function buildChartData(
  weeks: WeekEntry[],
  updated: number[],
): ChartPoint[] {
  const sorted = [...weeks].sort((a, b) => a.week - b.week)
  const currentWeek = sorted[sorted.length - 1]?.week ?? 1
  const actualMap = new Map<number, number>()
  sorted.forEach((w) => actualMap.set(w.week, w.actualBf))

  return Array.from({ length: TOTAL_WEEKS }, (_, i) => {
    const week = i + 1
    return {
      week,
      label: `W${week}`,
      actual: actualMap.has(week) ? actualMap.get(week)! : null,
      // Updated prediction line begins at the current week so it visually
      // continues from the last actual point into the future.
      updated: week >= currentWeek ? updated[i] : null,
      original: originalForecast[i],
    }
  })
}

export const inputFields: {
  key: keyof Omit<WeekEntry, "week">
  label: string
  step?: string
}[] = [
  { key: "weight", label: "Weight (kg)", step: "0.1" },
  { key: "smm", label: "SMM / Skeletal Muscle Mass (kg)", step: "0.1" },
  { key: "visceralFat", label: "Visceral Fat", step: "1" },
  { key: "tbw", label: "Total Body Water (kg)", step: "0.1" },
  { key: "ecw", label: "ECW (kg)", step: "0.1" },
  { key: "bmi", label: "BMI", step: "0.1" },
  { key: "bmr", label: "BMR (kcal)", step: "1" },
  { key: "dailyCalories", label: "Daily Calories (kcal)", step: "10" },
  { key: "protein", label: "Protein Intake (g)", step: "1" },
  { key: "weightTraining", label: "Weight Training Sessions / Week", step: "1" },
  { key: "cardio", label: "Cardio Sessions / Week", step: "1" },
  { key: "steps", label: "Steps / Day", step: "100" },
  { key: "sleep", label: "Sleep Hours / Day", step: "0.1" },
]
