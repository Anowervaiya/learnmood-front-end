"use client"

import { useState, KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface TagInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  maxTags?: number // ✅ optional prop if you want to make it configurable
}

export function TagInput({ value, onChange, placeholder, maxTags = 6 }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault()

      // ✅ Stop adding if limit reached
      if (value.length >= maxTags) return

      const newTag = inputValue.trim()
      if (!value.includes(newTag)) {
        onChange([...value, newTag])
      }
      setInputValue("")
    }

    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag))
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2 border rounded-md p-2 
                 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
    >
      {value.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          {tag}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault() // prevent input focus loss
              removeTag(tag)
            }}
            className="cursor-pointer"
          >
            <X className="w-3 h-3 hover:text-red-500" />
          </button>
        </Badge>

      ))}

      {/* ✅ Disable input when limit reached */}
      {value.length < maxTags && (
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="border-none shadow-none focus-visible:ring-0 p-0 flex-1 min-w-[100px]"
        />
      )}
    </div>
  )
}
