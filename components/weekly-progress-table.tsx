"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePrep } from "@/components/prep-provider"
import { originalForecast } from "@/lib/data"
import { AddWeekDialog } from "@/components/add-week-dialog"

export function WeeklyProgressTable() {
  const { weeks } = usePrep()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <CardTitle className="text-base">Weekly Progress</CardTitle>
        <AddWeekDialog />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Week</TableHead>
                <TableHead className="text-right">Weight</TableHead>
                <TableHead className="text-right">Actual BF %</TableHead>
                <TableHead className="text-right">Predicted BF %</TableHead>
                <TableHead className="text-right">Calories</TableHead>
                <TableHead className="text-right">Training</TableHead>
                <TableHead className="text-right">Cardio</TableHead>
                <TableHead className="text-right">Steps</TableHead>
                <TableHead className="text-right">Sleep</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeks.map((w) => (
                <TableRow key={w.week}>
                  <TableCell className="font-medium">Week {w.week}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {w.weight.toFixed(1)} kg
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums text-chart-2">
                    {w.actualBf.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {originalForecast[w.week - 1].toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {w.dailyCalories.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{w.weightTraining}x</TableCell>
                  <TableCell className="text-right tabular-nums">{w.cardio}x</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {w.steps.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{w.sleep.toFixed(1)}h</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
