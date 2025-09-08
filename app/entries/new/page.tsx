"use client"

import { useRouter } from "next/navigation"
import { EntryForm } from "@/components/entries/entry-form"

export default function NewEntryPage() {
  const router = useRouter()

  const handleSubmit = async (entryData: any) => {
    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("token=")[1]?.split(";")[0]}`,
      },
      body: JSON.stringify(entryData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to create entry")
    }

    router.push("/dashboard")
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-4xl mx-auto py-8">
        <EntryForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}
