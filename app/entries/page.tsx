"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { EntryCard } from "@/components/entries/entry-card"
import { EntryForm } from "@/components/entries/entry-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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

export default function EntriesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null)
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
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
      setFilteredEntries(entriesData)
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [router])

  useEffect(() => {
    const filtered = entries.filter(
      (entry) =>
        entry.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.drugs?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(entry.date).toLocaleDateString().includes(searchTerm),
    )
    setFilteredEntries(filtered)
  }, [searchTerm, entries])

  const handleEdit = (entry: Entry) => {
    setEditingEntry(entry)
  }

  const handleDelete = (id: string) => {
    setDeletingEntryId(id)
  }

  const confirmDelete = async () => {
    if (!deletingEntryId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/entries/${deletingEntryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${document.cookie.split("token=")[1]?.split(";")[0]}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete entry")
      }

      fetchData()
    } catch (error) {
      console.error("Delete error:", error)
    } finally {
      setIsLoading(false)
      setDeletingEntryId(null)
    }
  }

  const handleEditSubmit = async (entryData: any) => {
    if (!editingEntry) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/entries/${editingEntry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("token=")[1]?.split(";")[0]}`,
        },
        body: JSON.stringify(entryData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update entry")
      }

      setEditingEntry(null)
      fetchData()
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-16 bg-muted"></div>
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar userEmail={user?.email} />

        <main className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">All Entries</h1>
              <p className="text-muted-foreground">Manage and review your wellness tracking history</p>
            </div>
            <Button asChild>
              <Link href="/entries/new">+ New Entry</Link>
            </Button>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search entries</Label>
            <Input
              id="search"
              placeholder="Search by notes, medications, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Entries */}
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No entries match your search" : "No entries yet"}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/entries/new">Create your first entry</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingEntry} onOpenChange={() => setEditingEntry(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
          </DialogHeader>
          {editingEntry && (
            <EntryForm
              entry={{
                ...editingEntry,
                date: editingEntry.date.split("T")[0],
              }}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditingEntry(null)}
              isLoading={isLoading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingEntryId} onOpenChange={() => setDeletingEntryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
