"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
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

interface WeeklyAveragesProps {
  entries: Entry[]
}

export function WeeklyAverages({ entries }: WeeklyAveragesProps) {
  const processData = () => {
    const weeklyData: Record<string, { 
      sleep: number[], 
      mood: number[], 
      stress: number[], 
      engagement: number[],
      symptoms: number[] 
    }> = {}

    entries.forEach((entry) => {
      const date = new Date(entry.date)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      const weekKey = weekStart.toISOString().split('T')[0]

      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = { sleep: [], mood: [], stress: [], engagement: [], symptoms: [] }
      }

      weeklyData[weekKey].sleep.push(entry.sleep)
      weeklyData[weekKey].mood.push(entry.mood) 
      weeklyData[weekKey].stress.push(entry.stress)
      weeklyData[weekKey].engagement.push(entry.engagement)
      weeklyData[weekKey].symptoms.push(entry.symptoms)
    })

    return Object.entries(weeklyData)
      .map(([week, data]) => ({
        week: new Date(week).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        sleep: Math.round((data.sleep.reduce((a, b) => a + b, 0) / data.sleep.length) * 10) / 10,
        mood: Math.round((data.mood.reduce((a, b) => a + b, 0) / data.mood.length) * 10) / 10,
        stress: Math.round((data.stress.reduce((a, b) => a + b, 0) / data.stress.length) * 10) / 10,
        engagement: Math.round((data.engagement.reduce((a, b) => a + b, 0) / data.engagement.length) * 10) / 10,
        symptoms: Math.round((data.symptoms.reduce((a, b) => a + b, 0) / data.symptoms.length) * 10) / 10,
      }))
      .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime())
  }

  const data = processData()

  return (
    <Card className="border-2 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>📊</span>
          <span>Weekly Averages</span>
        </CardTitle>
        <CardDescription>Compare your weekly wellness metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis domain={[0, 10]} className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar 
                dataKey="sleep" 
                fill="#3b82f6" 
                name="😴 Sleep" 
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
              <Bar 
                dataKey="mood" 
                fill="#22c55e" 
                name="😊 Mood" 
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
              <Bar 
                dataKey="stress" 
                fill="#ef4444" 
                name="😰 Stress" 
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
              <Bar 
                dataKey="engagement" 
                fill="#f59e0b" 
                name="🎯 Engagement" 
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
              <Bar 
                dataKey="symptoms" 
                fill="#8b5cf6" 
                name="🤒 Symptoms" 
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
