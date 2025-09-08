import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

interface User {
  id: string
  email: string
  password: string
  createdAt: Date | string
}

interface Entry {
  id: string
  date: Date | string
  sleep: number
  stress: number
  symptoms: number
  mood: number
  engagement: number
  drugs?: string | null
  notes?: string | null
  userId: string
  createdAt: Date | string
  updatedAt: Date | string
}

class Database {
  async createUser(email: string, password: string): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        createdAt: new Date().toISOString(),
      },
    })
    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.findUserByEmail(email)
  }

  async getUserById(id: string): Promise<User | null> {
    return this.findUserById(id)
  }

  async createEntry(data: {
    date: string
    sleep: number
    stress: number
    symptoms: number
    mood: number
    engagement: number
    drugs?: string
    notes?: string
    userId: string
  }): Promise<Entry> {
    const entry = await prisma.entry.create({
      data: {
        ...data,
        date: new Date(data.date).toISOString(),
        drugs: data.drugs || undefined,
        notes: data.notes || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    })
    return entry
  }

  async getEntries(userId: string): Promise<Entry[]> {
    const entries = await prisma.entry.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    })
    return entries
  }

  async findEntries(userId: string): Promise<Entry[]> {
    return this.getEntries(userId)
  }

  async getEntry(id: string, userId: string): Promise<Entry | null> {
    const entry = await prisma.entry.findFirst({
      where: {
        id,
        userId,
      },
    })
    return entry
  }

  async findEntryById(id: string, userId: string): Promise<Entry | null> {
    return this.getEntry(id, userId)
  }

  async updateEntry(
    id: string,
    data: {
      date?: string
      sleep?: number
      stress?: number
      symptoms?: number
      mood?: number
      engagement?: number
      drugs?: string
      notes?: string
    },
    userId: string
  ): Promise<Entry | null> {
    try {
      console.log("Updating entry - ID:", id, "UserID:", userId, "Data:", data)
      
      const entry = await prisma.entry.updateMany({
        where: {
          id,
          userId,
        },
        data: {
          ...data,
          drugs: data.drugs || undefined,
          notes: data.notes || undefined,
          updatedAt: new Date().toISOString(),
        },
      })

      console.log("Update result count:", entry.count)

      if (entry.count === 0) return null

      return await this.getEntry(id, userId)
    } catch (error) {
      console.error("Update entry error:", error)
      return null
    }
  }

  async deleteEntry(id: string, userId: string): Promise<boolean> {
    try {
      const result = await prisma.entry.deleteMany({
        where: {
          id,
          userId,
        },
      })
      return result.count > 0
    } catch (error) {
      return false
    }
  }
}

export const db = new Database()
