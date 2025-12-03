"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical, Edit2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AIActions } from "@/components/AIActions"

type FieldType = "text" | "textarea" | "date" | "tags"

interface Field {
  id: string
  label: string
  type: FieldType
  value: string | string[]
}

interface Section {
  id: string
  title: string
  fields: Field[]
}

interface SectionEditorProps {
  section: Section
  onSectionChange: (updatedSection: Section) => void
}

export function SectionEditor({ section, onSectionChange }: SectionEditorProps) {
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null)
  const [tempLabel, setTempLabel] = useState("")
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({})

  const updateField = (fieldId: string, updates: Partial<Field>) => {
    console.log("[v0] Field updated:", fieldId, updates)
    const updatedFields = section.fields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field))
    const updatedSection = { ...section, fields: updatedFields }
    onSectionChange(updatedSection)
  }

  const addField = () => {
    const newField: Field = {
      id: `field-${Date.now()}`,
      label: "New Field",
      type: "text",
      value: "",
    }
    onSectionChange({ ...section, fields: [...section.fields, newField] })
  }

  const removeField = (fieldId: string) => {
    const updatedFields = section.fields.filter((field) => field.id !== fieldId)
    onSectionChange({ ...section, fields: updatedFields })
  }

  const startEditingLabel = (field: Field) => {
    setEditingLabelId(field.id)
    setTempLabel(field.label)
  }

  const saveLabel = (fieldId: string) => {
    if (tempLabel.trim()) {
      updateField(fieldId, { label: tempLabel.trim() })
    }
    setEditingLabelId(null)
    setTempLabel("")
  }

  const addTag = (fieldId: string) => {
    const field = section.fields.find((f) => f.id === fieldId)
    const tagValue = tagInputs[fieldId]?.trim()

    if (field && tagValue) {
      const currentTags = Array.isArray(field.value) ? field.value : []
      updateField(fieldId, { value: [...currentTags, tagValue] })
      setTagInputs({ ...tagInputs, [fieldId]: "" })
    }
  }

  const removeTag = (fieldId: string, tagIndex: number) => {
    const field = section.fields.find((f) => f.id === fieldId)
    if (field && Array.isArray(field.value)) {
      const updatedTags = field.value.filter((_, index) => index !== tagIndex)
      updateField(fieldId, { value: updatedTags })
    }
  }

  const renderFieldInput = (field: Field) => {
    switch (field.type) {
      case "textarea":
        return (
          <div>
            <Textarea
              value={field.value as string}
              onChange={(e) => updateField(field.id, { value: e.target.value })}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="min-h-[100px] resize-none bg-white/50 border-white/20 focus:border-indigo-500/50 focus:ring-indigo-500/20"
            />
            <AIActions
              value={field.value as string}
              onChange={(newValue) => updateField(field.id, { value: newValue })}
              fieldLabel={field.label}
            />
          </div>
        )

      case "date":
        return (
          <Input
            type="date"
            value={field.value as string}
            onChange={(e) => updateField(field.id, { value: e.target.value })}
            className="bg-white/50 border-white/20 focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        )

      case "tags":
        const tags = Array.isArray(field.value) ? field.value : []
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-white/30 rounded-lg border border-white/20">
              {tags.length === 0 ? (
                <span className="text-sm text-gray-400">No tags added yet</span>
              ) : (
                tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-indigo-500/20 text-indigo-700 hover:bg-indigo-500/30 gap-1 px-3 py-1"
                  >
                    {tag}
                    <button onClick={() => removeTag(field.id, index)} className="ml-1 hover:text-indigo-900">
                      ×
                    </button>
                  </Badge>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInputs[field.id] || ""}
                onChange={(e) => setTagInputs({ ...tagInputs, [field.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag(field.id)
                  }
                }}
                placeholder="Type and press Enter"
                className="bg-white/50 border-white/20 focus:border-indigo-500/50 focus:ring-indigo-500/20"
              />
              <Button
                type="button"
                onClick={() => addTag(field.id)}
                size="sm"
                className="bg-indigo-500 hover:bg-indigo-600 text-white shrink-0"
              >
                Add
              </Button>
            </div>
          </div>
        )

      case "text":
      default:
        return (
          <div>
            <Input
              type="text"
              value={field.value as string}
              onChange={(e) => updateField(field.id, { value: e.target.value })}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="bg-white/50 border-white/20 focus:border-indigo-500/50 focus:ring-indigo-500/20"
            />
            <AIActions
              value={field.value as string}
              onChange={(newValue) => updateField(field.id, { value: newValue })}
              fieldLabel={field.label}
            />
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      {section.fields.map((field) => (
        <div
          key={field.id}
          className="group relative p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start gap-3">
            {/* Drag handle */}
            <div className="mt-8 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
              <GripVertical className="w-4 h-4" />
            </div>

            {/* Field content */}
            <div className="flex-1 space-y-2">
              {/* Label with edit functionality */}
              <div className="flex items-center gap-2">
                {editingLabelId === field.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={tempLabel}
                      onChange={(e) => setTempLabel(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveLabel(field.id)
                        if (e.key === "Escape") setEditingLabelId(null)
                      }}
                      className="h-8 bg-white/50 border-indigo-500/50"
                      autoFocus
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => saveLabel(field.id)}
                      className="h-8 w-8 p-0 bg-indigo-500 hover:bg-indigo-600"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Label className="text-sm font-medium text-gray-700">{field.label}</Label>
                    <button
                      onClick={() => startEditingLabel(field)}
                      className="text-gray-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              {/* Field type selector */}
              <Select
                value={field.type}
                onValueChange={(value: FieldType) =>
                  updateField(field.id, {
                    type: value,
                    value: value === "tags" ? [] : "",
                  })
                }
              >
                <SelectTrigger className="w-[140px] h-8 text-xs bg-white/50 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="textarea">Text Area</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="tags">Tags</SelectItem>
                </SelectContent>
              </Select>

              {/* Field input */}
              {renderFieldInput(field)}
            </div>

            {/* Delete button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeField(field.id)}
              className="mt-8 text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Add field button */}
      <Button
        type="button"
        onClick={addField}
        variant="outline"
        className="w-full border-dashed border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-all bg-transparent"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Field
      </Button>
    </div>
  )
}
