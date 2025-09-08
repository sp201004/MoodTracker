"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { RecentEntries } from "@/components/dashboard/recent-entries"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  const fetchUserData = async () => {
    try {
      const token = document.cookie.split("token=")[1]?.split(";")[0]
      if (!token) {
        router.push("/login")
        return
      }

      // Fetch user info and entries
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
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [router])

  const handleEntriesChange = () => {
    fetchUserData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-16 bg-muted"></div>
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-muted rounded"></div>
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
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">Welcome back, {user?.email?.split("@")[0]}</h1>
          <p className="text-muted-foreground">
            Track your wellness journey and discover patterns in your mood and health.
          </p>
        </div>

        {/* Stats Overview */}
        <StatsOverview entries={entries} />

        {/* Recent Entries */}
        <RecentEntries entries={entries} onEntriesChange={handleEntriesChange} />
      </main>
    </div>
  )
}
