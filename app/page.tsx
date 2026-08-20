import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { DashboardAthleteSummary } from "@/components/dashboard-athlete-summary"
import { DashboardProgressChart } from "@/components/dashboard-progress-chart"
import { FeatureImportanceChart } from "@/components/feature-importance-chart"
import { CoachingInsights } from "@/components/coaching-insights"
import { WeeklyProgressTable } from "@/components/weekly-progress-table"

export default function DashboardPage() {
  return (
    <div className="min-h-dvh">
      <PageHeader
        title="AI Cutting Phase Prediction"
        subtitle="Athlete progress and WNBF benchmark overview"
      />

      <div className="space-y-6 px-6 py-5 lg:px-8">
        <DashboardAthleteSummary />

        <section aria-label="Athlete progress versus WNBF benchmark">
          <DashboardProgressChart />
        </section>

        <section className="grid gap-6 lg:grid-cols-2" aria-label="Model factors and insights">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Factors Affecting Prediction</CardTitle>
              <p className="text-sm text-muted-foreground">Relative Feature Importance</p>
            </CardHeader>
            <CardContent>
              <FeatureImportanceChart />
            </CardContent>
          </Card>

          <CoachingInsights />
        </section>

        <WeeklyProgressTable />
      </div>
    </div>
  )
}
