"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Entry {
  id: string
  date: string
  sleep: number
  stress: number
  symptoms: number
  mood: number
  engagement: number
}

interface WellnessSummaryProps {
  entries: Entry[]
}

export function WellnessSummary({ entries }: WellnessSummaryProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wellness Summary</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const calculateStats = () => {
    const totalEntries = entries.length
    const avgSleep = entries.reduce((sum, entry) => sum + entry.sleep, 0) / totalEntries
    const avgMood = entries.reduce((sum, entry) => sum + entry.mood, 0) / totalEntries
    const avgStress = entries.reduce((sum, entry) => sum + entry.stress, 0) / totalEntries
    const avgSymptoms = entries.reduce((sum, entry) => sum + entry.symptoms, 0) / totalEntries
    const avgEngagement = entries.reduce((sum, entry) => sum + entry.engagement, 0) / totalEntries

    // Calculate trends (last 7 days vs previous 7 days)
    const recent = entries.slice(0, 7)
    const previous = entries.slice(7, 14)

    const getTrend = (field: keyof Entry) => {
      if (recent.length === 0 || previous.length === 0) return 0
      const recentAvg = recent.reduce((sum, entry) => sum + (entry[field] as number), 0) / recent.length
      const previousAvg = previous.reduce((sum, entry) => sum + (entry[field] as number), 0) / previous.length
      return recentAvg - previousAvg
    }

    return {
      totalEntries,
      avgSleep: Math.round(avgSleep * 10) / 10,
      avgMood: Math.round(avgMood * 10) / 10,
      avgStress: Math.round(avgStress * 10) / 10,
      avgSymptoms: Math.round(avgSymptoms * 10) / 10,
      avgEngagement: Math.round(avgEngagement * 10) / 10,
      trends: {
        mood: getTrend("mood"),
        sleep: getTrend("sleep"),
        stress: getTrend("stress"),
        engagement: getTrend("engagement"),
      },
    }
  }

  const stats = calculateStats()

  const getTrendIcon = (trend: number) => {
    if (Math.abs(trend) < 0.1) return "→"
    return trend > 0 ? "↗" : "↘"
  }

  const getTrendColor = (trend: number, isPositive = true) => {
    if (Math.abs(trend) < 0.1) return "text-muted-foreground"
    const isGoodTrend = isPositive ? trend > 0 : trend < 0
    return isGoodTrend ? "text-green-600" : "text-red-600"
  }

  const wellnessScore = Math.round(((stats.avgMood + stats.avgEngagement + (10 - stats.avgStress)) / 3) * 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wellness Summary</CardTitle>
        <CardDescription>Overview of your wellness journey ({stats.totalEntries} entries)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Wellness Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Wellness Score</span>
            <span className="text-2xl font-bold text-primary">{wellnessScore}%</span>
          </div>
          <Progress value={wellnessScore} className="h-2" />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Sleep</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{stats.avgSleep}h</span>
                <span className={`text-sm ${getTrendColor(stats.trends.sleep, true)}`}>
                  {getTrendIcon(stats.trends.sleep)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Average Mood</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{stats.avgMood}/10</span>
                <span className={`text-sm ${getTrendColor(stats.trends.mood, true)}`}>
                  {getTrendIcon(stats.trends.mood)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Average Stress</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{stats.avgStress}/10</span>
                <span className={`text-sm ${getTrendColor(stats.trends.stress, false)}`}>
                  {getTrendIcon(stats.trends.stress)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Symptoms</span>
              <span className="font-semibold">{stats.avgSymptoms}/10</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Average Engagement</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{stats.avgEngagement}/10</span>
                <span className={`text-sm ${getTrendColor(stats.trends.engagement, true)}`}>
                  {getTrendIcon(stats.trends.engagement)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Tracking Streak</span>
              <span className="font-semibold">{Math.min(stats.totalEntries, 30)} days</span>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Quick Insights</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            {stats.avgSleep < 7 && <p>• Consider aiming for 7-9 hours of sleep for better wellness</p>}
            {stats.avgStress > 7 && <p>• Your stress levels are high - consider stress management techniques</p>}
            {stats.avgMood > 7 && <p>• Great job maintaining a positive mood!</p>}
            {stats.avgEngagement < 5 && <p>• Try engaging in activities that bring you joy</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
