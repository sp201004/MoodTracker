import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { hashPassword, createToken } from "@/lib/auth"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const existingUser = await db.findUserByEmail(email.toLowerCase())
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    const user = await db.createUser(email.toLowerCase(), hashedPassword)

    const token = await createToken(user.id)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
