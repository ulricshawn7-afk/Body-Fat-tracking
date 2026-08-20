import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { WeeklyProgressTable } from "@/components/weekly-progress-table"
import { ForecastChart, ChartLegend } from "@/components/forecast-chart"

export default function TrackingPage() {
  return (
    <div className="min-h-dvh">
      <PageHeader
        title="Weekly Tracking"
        subtitle="Log weekly check-ins and monitor progress against the forecast."
      />
      <div className="space-y-6 px-6 py-6 lg:px-8">
        <WeeklyProgressTable />
        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle className="text-base">Actual vs. Forecast</CardTitle>
            <ChartLegend />
          </CardHeader>
          <CardContent>
            <ForecastChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
