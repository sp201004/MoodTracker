"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Entry {
  id: string
  date: string
  sleep: number
  stress: number
  symptoms: number
  mood: number
  engagement: number
}

interface MoodTrendChartProps {
  entries: Entry[]
}

export function MoodTrendChart({ entries }: MoodTrendChartProps) {
  const processData = () => {
    return entries
      .slice()
      .reverse()
      .map((entry) => ({
        date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        mood: entry.mood,
        stress: entry.stress,
        engagement: entry.engagement,
      }))
  }

  const data = processData()

  return (
    <Card className="border-2 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>📈</span>
          <span>Mood & Wellness Trends</span>
        </CardTitle>
        <CardDescription>Track your mood, stress, and engagement levels over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis domain={[1, 10]} className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ fill: "#22c55e", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "#22c55e", strokeWidth: 2 }}
                name="😊 Mood"
              />
              <Line
                type="monotone"
                dataKey="stress"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "#ef4444", strokeWidth: 2 }}
                name="😰 Stress"
              />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2 }}
                name="🎯 Engagement"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
