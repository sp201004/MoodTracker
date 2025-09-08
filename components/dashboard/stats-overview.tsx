"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Entry {
  id: string
  date: string
  sleep: number
  stress: number
  symptoms: number
  mood: number
  engagement: number
  drugs?: string
  notes?: string
}

interface StatsOverviewProps {
  entries: Entry[]
}

export function StatsOverview({ entries }: StatsOverviewProps) {
  const calculateAverage = (field: keyof Pick<Entry, "sleep" | "stress" | "symptoms" | "mood" | "engagement">) => {
    if (entries.length === 0) return 0
    const sum = entries.reduce((acc, entry) => acc + entry[field], 0)
    return Math.round((sum / entries.length) * 10) / 10
  }

  const getRecentTrend = (field: keyof Pick<Entry, "sleep" | "stress" | "symptoms" | "mood" | "engagement">) => {
    if (entries.length < 2) return "neutral"
    const recent = entries.slice(0, 3)
    const older = entries.slice(3, 6)

    if (recent.length === 0 || older.length === 0) return "neutral"

    const recentAvg = recent.reduce((acc, entry) => acc + entry[field], 0) / recent.length
    const olderAvg = older.reduce((acc, entry) => acc + entry[field], 0) / older.length

    const diff = recentAvg - olderAvg
    if (Math.abs(diff) < 0.5) return "neutral"
    return diff > 0 ? "up" : "down"
  }

  const getTrendIcon = (trend: string, isPositiveMetric = true) => {
    if (trend === "neutral") return "→"
    if (trend === "up") return isPositiveMetric ? "↗" : "↗"
    return isPositiveMetric ? "↘" : "↘"
  }

  const getTrendColor = (trend: string, isPositiveMetric = true) => {
    if (trend === "neutral") return "text-muted-foreground"
    if (trend === "up") return isPositiveMetric ? "text-green-600" : "text-red-600"
    return isPositiveMetric ? "text-red-600" : "text-green-600"
  }

  const stats = [
    {
      title: "Average Sleep",
      value: `${calculateAverage("sleep")}h`,
      trend: getRecentTrend("sleep"),
      isPositive: true,
    },
    {
      title: "Average Mood",
      value: `${calculateAverage("mood")}/10`,
      trend: getRecentTrend("mood"),
      isPositive: true,
    },
    {
      title: "Average Stress",
      value: `${calculateAverage("stress")}/10`,
      trend: getRecentTrend("stress"),
      isPositive: false,
    },
    {
      title: "Total Entries",
      value: entries.length.toString(),
      trend: "neutral",
      isPositive: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <span className={`text-sm ${getTrendColor(stat.trend, stat.isPositive)}`}>
              {getTrendIcon(stat.trend, stat.isPositive)}
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
