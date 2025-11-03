import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ChallengeSearchBar({ search, setSearch, onSearch }: any) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(search)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Search challenges..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 bg-[#f8f8f8] hover:bg-white focus:border-gray-400 focus:ring-0 focus:outline-none shadow-sm transition-all"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        <Search size={18} />
      </button>
    </form>
  )
}
