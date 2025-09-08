import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await context.params
    const entryId = params.id

    const entry = await db.getEntry(entryId, user.id)
    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    return NextResponse.json(entry)
  } catch (error) {
    console.error("Get entry error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await context.params
    const entryId = params.id

    console.log("PUT request - Entry ID:", entryId, "User ID:", user.id)

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

    const updatedEntry = await db.updateEntry(entryId, {
      date: date ? new Date(date).toISOString() : undefined,
      sleep: Number.parseFloat(sleep),
      stress: Number.parseInt(stress),
      symptoms: Number.parseInt(symptoms),
      mood: Number.parseInt(mood),
      engagement: Number.parseInt(engagement),
      drugs: drugs || undefined,
      notes: notes || undefined,
    }, user.id)

    console.log("Update result:", updatedEntry)

    if (!updatedEntry) {
      return NextResponse.json({ error: "Entry not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json(updatedEntry)
  } catch (error) {
    console.error("Update entry error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await context.params
    const entryId = params.id

    const deleted = await db.deleteEntry(entryId, user.id)
    if (!deleted) {
      return NextResponse.json({ error: "Entry not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete entry error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
