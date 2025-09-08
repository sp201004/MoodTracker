"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EntryCard } from "@/components/entries/entry-card"
import { EntryForm } from "@/components/entries/entry-form"
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

interface RecentEntriesProps {
  entries: Entry[]
  onEntriesChange: () => void
}

export function RecentEntries({ entries, onEntriesChange }: RecentEntriesProps) {
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null)
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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

      onEntriesChange()
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
      onEntriesChange()
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const recentEntries = entries.slice(0, 6)

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>Your latest wellness tracking entries</CardDescription>
          </div>
          <Button asChild>
            <Link href="/entries/new">+ New Entry</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentEntries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No entries yet</p>
              <Button asChild>
                <Link href="/entries/new">Create your first entry</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {entries.length > 6 && (
                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/entries">View all entries</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

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
                date: editingEntry.date.split("T")[0], // Format date for input
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
