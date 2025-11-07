import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ChallengeSearchBar({  handleSubmit }: any) {


  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <Input
        type="text"
        name="search"
        placeholder="Search challenges..."
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
