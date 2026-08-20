import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { WeeklyInputForm } from "@/components/weekly-input-form"
import { KpiCards } from "@/components/kpi-cards"
import { ForecastChart, ChartLegend } from "@/components/forecast-chart"
import { PredictionAdjustment } from "@/components/prediction-adjustment"

export default function PredictionPage() {
  return (
    <div className="min-h-dvh">
      <PageHeader
        title="Prediction"
        subtitle="Enter the current week's data and generate an updated body-fat forecast."
      />
      <div className="space-y-6 px-6 py-6 lg:px-8">
        <WeeklyInputForm />
        <KpiCards />
        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle className="text-base">16-Week Body Fat Forecast</CardTitle>
            <ChartLegend />
          </CardHeader>
          <CardContent>
            <ForecastChart />
          </CardContent>
        </Card>
        <PredictionAdjustment />
      </div>
    </div>
  )
}
