"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { GripVertical, Pencil, Trash2, Plus } from "lucide-react"

export interface Section {
  id: string
  title: string
  isCustom: boolean
}

interface SectionsManagerProps {
  initialSections?: Section[]
  onSectionsChange?: (sections: Section[]) => void
}

const defaultSections: Section[] = [
  { id: "contact", title: "Contact Info", isCustom: false },
  { id: "summary", title: "Summary", isCustom: false },
  { id: "experience", title: "Experience", isCustom: false },
  { id: "education", title: "Education", isCustom: false },
  { id: "skills", title: "Skills", isCustom: false },
  { id: "projects", title: "Projects", isCustom: false },
  { id: "certifications", title: "Certifications", isCustom: false },
]

export function SectionsManager({ initialSections = defaultSections, onSectionsChange }: SectionsManagerProps) {
  const [sections, setSections] = useState<Section[]>(initialSections)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const updateSections = (newSections: Section[]) => {
    setSections(newSections)
    onSectionsChange?.(newSections)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()

    if (draggedIndex === null || draggedIndex === index) return

    const newSections = [...sections]
    const draggedItem = newSections[draggedIndex]

    // Remove from old position
    newSections.splice(draggedIndex, 1)
    // Insert at new position
    newSections.splice(index, 0, draggedItem)

    setSections(newSections)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    onSectionsChange?.(sections)
  }

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return

    const newSection: Section = {
      id: `custom-${Date.now()}`,
      title: newSectionTitle.trim(),
      isCustom: true,
    }

    updateSections([...sections, newSection])
    setNewSectionTitle("")
    setIsAddDialogOpen(false)
  }

  const handleEditSection = () => {
    if (!editingSection || !editTitle.trim()) return

    const updatedSections = sections.map((section) =>
      section.id === editingSection.id ? { ...section, title: editTitle.trim() } : section,
    )

    updateSections(updatedSections)
    setEditingSection(null)
    setEditTitle("")
    setIsEditDialogOpen(false)
  }

  const handleDeleteSection = (id: string) => {
    updateSections(sections.filter((section) => section.id !== id))
  }

  const openEditDialog = (section: Section) => {
    setEditingSection(section)
    setEditTitle(section.title)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">CV Sections</h2>
          <p className="text-sm text-muted-foreground mt-1">Drag to reorder, click to edit or delete</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Section</DialogTitle>
              <DialogDescription>
                Create a new section for your CV. You can always rename or delete it later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="section-name">Section Name</Label>
                <Input
                  id="section-name"
                  placeholder="e.g., Volunteer Work, Publications, Languages"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddSection()
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  setNewSectionTitle("")
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddSection} disabled={!newSectionTitle.trim()}>
                Add Section
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {sections.map((section, index) => (
          <Card
            key={section.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`
              p-4 cursor-move transition-all duration-200
              ${draggedIndex === index ? "opacity-50 scale-95" : "opacity-100 scale-100"}
              hover:shadow-md hover:border-primary/50
            `}
          >
            <div className="flex items-center gap-3">
              <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              <span className="font-medium text-foreground flex-1">{section.title}</span>

              {section.isCustom && (
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Custom</span>
              )}

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(section)}>
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteSection(section.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sections.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No sections yet</p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Section
          </Button>
        </Card>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>Change the name of this section.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-section-name">Section Name</Label>
              <Input
                id="edit-section-name"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditSection()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false)
                setEditingSection(null)
                setEditTitle("")
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEditSection} disabled={!editTitle.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
