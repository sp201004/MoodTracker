"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { MoodTrendChart } from "@/components/reports/mood-trend-chart"
import { SleepMoodCorrelation } from "@/components/reports/sleep-mood-correlation"
import { WeeklyAverages } from "@/components/reports/weekly-averages"
import { WellnessSummary } from "@/components/reports/wellness-summary"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface User {
  id: string
  email: string
  createdAt: string
}

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

export default function ReportsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  const fetchData = async () => {
    try {
      const token = document.cookie.split("token=")[1]?.split(";")[0]
      if (!token) {
        router.push("/login")
        return
      }

      const [userResponse, entriesResponse] = await Promise.all([
        fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/entries", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      if (!userResponse.ok || !entriesResponse.ok) {
        throw new Error("Failed to fetch data")
      }

      const userData = await userResponse.json()
      const entriesData = await entriesResponse.json()

      setUser(userData)
      setEntries(entriesData)
    } catch (err) {
      console.error("Fetch error:", err)
      setError("Failed to load reports data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-16 bg-muted"></div>
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-96 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar userEmail={user?.email} />
        <div className="max-w-7xl mx-auto p-6">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userEmail={user?.email} />

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">Wellness Reports</h1>
          <p className="text-muted-foreground">
            Analyze your wellness patterns and discover insights from your mood tracking journey.
          </p>
        </div>

        {entries.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Data Available</CardTitle>
              <CardDescription>Start tracking your wellness to see reports and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/entries/new">Create Your First Entry</Link>
              </Button>
            </CardContent>
          </Card>
        ) : entries.length < 3 ? (
          <Card>
            <CardHeader>
              <CardTitle>More Data Needed</CardTitle>
              <CardDescription>
                You need at least 3 entries to generate meaningful reports. Keep tracking your wellness!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/entries/new">Add Another Entry</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Wellness Summary - Temporarily disabled */}
            {/* <WellnessSummary entries={entries} /> */}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <MoodTrendChart entries={entries} />
              </div>

              <SleepMoodCorrelation entries={entries} />
              <WeeklyAverages entries={entries} />
            </div>

            {/* Action Card */}
            <Card>
              <CardHeader>
                <CardTitle>Keep Tracking</CardTitle>
                <CardDescription>
                  The more data you collect, the better insights you'll get into your wellness patterns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/entries/new">Add Today's Entry</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Back to Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
