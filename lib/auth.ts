import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import { db } from "./db"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

export async function createToken(userId: string) {
  return new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload.userId as string
  } catch {
    return null
  }
}

export async function getCurrentUser(request: Request) {
  const token =
    request.headers.get("authorization")?.replace("Bearer ", "") ||
    request.headers.get("cookie")?.split("token=")[1]?.split(";")[0]

  if (!token) return null

  const userId = await verifyToken(token)
  if (!userId) return null

  const user = await db.findUserById(userId)
  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  }
}
