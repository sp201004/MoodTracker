"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Entry {
  id: string
  date: string
  sleep: number
  mood: number
}

interface SleepMoodCorrelationProps {
  entries: Entry[]
}

export function SleepMoodCorrelation({ entries }: SleepMoodCorrelationProps) {
  const data = entries.map((entry) => ({
    sleep: entry.sleep,
    mood: entry.mood,
    date: new Date(entry.date).toLocaleDateString(),
  }))

  return (
    <Card className="border-2 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>😴💭</span>
          <span>Sleep vs Mood Correlation</span>
        </CardTitle>
        <CardDescription>How your sleep quality affects your mood</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number" 
                dataKey="sleep" 
                domain={[1, 10]} 
                name="Sleep Quality" 
                className="text-xs" 
              />
              <YAxis 
                type="number" 
                dataKey="mood" 
                domain={[1, 10]} 
                name="Mood" 
                className="text-xs" 
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => [
                  value,
                  name === "sleep" ? "😴 Sleep Quality" : "😊 Mood"
                ]}
              />
              <Scatter 
                dataKey="mood" 
                fill="#8b5cf6" 
                fillOpacity={0.7}
                stroke="#8b5cf6"
                strokeWidth={2}
                r={8}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
