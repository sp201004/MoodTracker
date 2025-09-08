import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const entries = await db.getEntries(user.id)
    return NextResponse.json(entries)
  } catch (error) {
    console.error("Get entries error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { date, sleep, stress, symptoms, mood, engagement, drugs, notes } = data

    // Validation
    if (!date || sleep === undefined || !stress || !symptoms || !mood || !engagement) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (sleep < 0 || sleep > 24) {
      return NextResponse.json({ error: "Sleep hours must be between 0 and 24" }, { status: 400 })
    }

    const validateScale = (value: number, name: string) => {
      if (value < 1 || value > 10) {
        throw new Error(`${name} must be between 1 and 10`)
      }
    }

    validateScale(stress, "Stress")
    validateScale(symptoms, "Symptoms")
    validateScale(mood, "Mood")
    validateScale(engagement, "Engagement")

    const entry = await db.createEntry({
      date: date,
      sleep: Number.parseFloat(sleep),
      stress: Number.parseInt(stress),
      symptoms: Number.parseInt(symptoms),
      mood: Number.parseInt(mood),
      engagement: Number.parseInt(engagement),
      drugs: drugs || undefined,
      notes: notes || undefined,
      userId: user.id,
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error("Create entry error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
