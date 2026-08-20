import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { FeatureImportanceChart } from "@/components/feature-importance-chart"
import { CoachingInsights } from "@/components/coaching-insights"

export default function InsightsPage() {
  return (
    <div className="min-h-dvh">
      <PageHeader
        title="Model Insights"
        subtitle="How the prediction is driven and what it means for coaching."
      />
      <div className="space-y-6 px-6 py-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Factors Affecting Prediction</CardTitle>
            <p className="text-sm text-muted-foreground">Relative Feature Importance</p>
          </CardHeader>
          <CardContent>
            <FeatureImportanceChart />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <CoachingInsights />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">About This Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground text-pretty">
              <p>
                This prototype uses a gradient-style feature-attribution mock to estimate how
                each weekly measurement contributes to the projected body-fat trajectory over a
                16-week natural contest prep.
              </p>
              <p>
                Predictions are recalculated whenever a new weekly check-in is recorded, blending
                the recent rate of change with the original baseline forecast.
              </p>
              <p>
                Feature importance values are illustrative and intended to support coach
                interpretation, not to replace professional judgment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
