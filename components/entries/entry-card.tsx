"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
  createdAt: string
}

interface EntryCardProps {
  entry: Entry
  onEdit: (entry: Entry) => void
  onDelete: (id: string) => void
}

export function EntryCard({ entry, onEdit, onDelete }: EntryCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric", 
      month: "long",
      day: "numeric",
    })
  }

  const getMetricColor = (value: number, reverse = false) => {
    if (reverse) {
      if (value <= 3) return "bg-green-100 text-green-800 border border-green-200"
      if (value <= 6) return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      return "bg-red-100 text-red-800 border border-red-200"
    } else {
      if (value <= 3) return "bg-red-100 text-red-800 border border-red-200"
      if (value <= 6) return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      return "bg-green-100 text-green-800 border border-green-200"
    }
  }

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-primary">
              📅 {formatDate(entry.date)}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(entry.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(entry)}>
              ✏️ Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(entry.id)}>
              🗑️ Delete  
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Sleep Card */}
          <div className={`p-3 rounded-lg ${getMetricColor(entry.sleep)} shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between">
              <div className="text-xl">😴</div>
              <div className="text-right">
                <div className="text-xl font-bold">{entry.sleep}/10</div>
                <div className="text-xs opacity-70">Sleep Quality</div>
              </div>
            </div>
          </div>

          {/* Mood Card */}
          <div className={`p-3 rounded-lg ${getMetricColor(entry.mood)} shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between">
              <div className="text-xl">😊</div>
              <div className="text-right">
                <div className="text-xl font-bold">{entry.mood}/10</div>
                <div className="text-xs opacity-70">Mood</div>
              </div>
            </div>
          </div>

          {/* Stress Card */}
          <div className={`p-3 rounded-lg ${getMetricColor(entry.stress, true)} shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between">
              <div className="text-xl">😰</div>
              <div className="text-right">
                <div className="text-xl font-bold">{entry.stress}/10</div>
                <div className="text-xs opacity-70">Stress Level</div>
              </div>
            </div>
          </div>

          {/* Symptoms Card */}
          <div className={`p-3 rounded-lg ${getMetricColor(entry.symptoms, true)} shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between">
              <div className="text-xl">🤒</div>
              <div className="text-right">
                <div className="text-xl font-bold">{entry.symptoms}/10</div>
                <div className="text-xs opacity-70">Symptoms</div>
              </div>
            </div>
          </div>

          {/* Engagement Card */}
          <div className={`p-3 rounded-lg ${getMetricColor(entry.engagement)} shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between">
              <div className="text-xl">🎯</div>
              <div className="text-right">
                <div className="text-xl font-bold">{entry.engagement}/10</div>
                <div className="text-xs opacity-70">Engagement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Drugs */}
        {(entry.notes || entry.drugs) && (
          <div className="space-y-2 pt-2 border-t">
            {entry.drugs && (
              <div className="flex items-start space-x-2">
                <span className="text-lg">💊</span>
                <div>
                  <span className="font-medium text-sm">Medications:</span>
                  <p className="text-sm text-muted-foreground">{entry.drugs}</p>
                </div>
              </div>
            )}
            {entry.notes && (
              <div className="flex items-start space-x-2">
                <span className="text-lg">📝</span>
                <div>
                  <span className="font-medium text-sm">Notes:</span>
                  <p className="text-sm text-muted-foreground">{entry.notes}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
