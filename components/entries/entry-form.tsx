"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/layout/loading-spinner"

interface Entry {
  id?: string
  date: string
  sleep: number
  stress: number
  symptoms: number
  mood: number
  engagement: number
  drugs: string
  notes: string
}

interface EntryFormProps {
  entry?: Entry
  onSubmit: (entry: Omit<Entry, "id">) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export function EntryForm({ entry, onSubmit, onCancel, isLoading }: EntryFormProps) {
  const [formData, setFormData] = useState<Omit<Entry, "id">>({
    date: entry?.date || new Date().toISOString().split("T")[0],
    sleep: entry?.sleep || 8,
    stress: entry?.stress || 5,
    symptoms: entry?.symptoms || 1,
    mood: entry?.mood || 5,
    engagement: entry?.engagement || 5,
    drugs: entry?.drugs || "",
    notes: entry?.notes || "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.sleep < 0 || formData.sleep > 24) {
      setError("Sleep hours must be between 0 and 24")
      return
    }

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getScaleLabel = (value: number, type: "mood" | "stress" | "symptoms" | "engagement") => {
    const labels = {
      mood: ["😢", "😔", "😐", "😊", "😄"],
      stress: ["😌", "😐", "😰", "😫", "🤯"],
      symptoms: ["💚", "🟡", "🟠", "🔴", "🚨"],
      engagement: ["😴", "😑", "🙂", "😊", "🤩"],
    }
    const index = Math.min(Math.floor((value - 1) / 2), 4)
    return labels[type][index]
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2">
          {entry ? "Edit Entry" : "New Wellness Entry"}
          {isLoading && <LoadingSpinner size="sm" />}
        </CardTitle>
        <CardDescription>Track your daily wellness metrics and reflections</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => updateField("date", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Sleep Hours */}
          <div className="space-y-3">
            <Label htmlFor="sleep">Sleep Hours: {formData.sleep}h</Label>
            <Slider
              id="sleep"
              min={0}
              max={12}
              step={0.5}
              value={[formData.sleep]}
              onValueChange={([value]) => updateField("sleep", value)}
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>

          {/* Stress Level */}
          <div className="space-y-3">
            <Label htmlFor="stress">
              Stress Level: {formData.stress}/10 {getScaleLabel(formData.stress, "stress")}
            </Label>
            <Slider
              id="stress"
              min={1}
              max={10}
              step={1}
              value={[formData.stress]}
              onValueChange={([value]) => updateField("stress", value)}
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Low</span>
              <span>Moderate</span>
              <span>Very High</span>
            </div>
          </div>

          {/* Symptoms */}
          <div className="space-y-3">
            <Label htmlFor="symptoms">
              Symptoms: {formData.symptoms}/10 {getScaleLabel(formData.symptoms, "symptoms")}
            </Label>
            <Slider
              id="symptoms"
              min={1}
              max={10}
              step={1}
              value={[formData.symptoms]}
              onValueChange={([value]) => updateField("symptoms", value)}
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>None</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-3">
            <Label htmlFor="mood">
              Mood: {formData.mood}/10 {getScaleLabel(formData.mood, "mood")}
            </Label>
            <Slider
              id="mood"
              min={1}
              max={10}
              step={1}
              value={[formData.mood]}
              onValueChange={([value]) => updateField("mood", value)}
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Low</span>
              <span>Neutral</span>
              <span>Very High</span>
            </div>
          </div>

          {/* Engagement */}
          <div className="space-y-3">
            <Label htmlFor="engagement">
              Engagement: {formData.engagement}/10 {getScaleLabel(formData.engagement, "engagement")}
            </Label>
            <Slider
              id="engagement"
              min={1}
              max={10}
              step={1}
              value={[formData.engagement]}
              onValueChange={([value]) => updateField("engagement", value)}
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Low</span>
              <span>Moderate</span>
              <span>Very High</span>
            </div>
          </div>

          {/* Medications/Drugs */}
          <div className="space-y-2">
            <Label htmlFor="drugs">Medications/Supplements (optional)</Label>
            <Input
              id="drugs"
              type="text"
              value={formData.drugs}
              onChange={(e) => updateField("drugs", e.target.value)}
              placeholder="e.g., Vitamin D, Melatonin, etc."
              disabled={isLoading}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes & Reflections (optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="How are you feeling today? Any thoughts or observations..."
              rows={4}
              disabled={isLoading}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1 flex items-center gap-2">
              {isLoading && <LoadingSpinner size="sm" />}
              {isLoading ? "Saving..." : entry ? "Update Entry" : "Save Entry"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
