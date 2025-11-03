"use client"

import { useState, useEffect } from "react"
import ChallengeCard from "./challengeCard"
import ChallengeSearchBar from "./challengeSearchBar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IChallenge } from "@/interfaces/challenge.interface"

interface Props {
  challenges: IChallenge[]
}

export default function ChallengeFilters({ challenges }: Props) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("")
  const [filteredChallenges, setFilteredChallenges] = useState<IChallenge[]>(challenges)

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  useEffect(() => {
    let filtered = challenges

    if (search.trim()) {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category) {
      filtered = filtered.filter((c) => c.category === category)
    }

    if (status) {
      filtered = filtered.filter((c) => c.status === status)
    }

    setFilteredChallenges(filtered)
  }, [search, category, status, challenges])

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        {/* 🔍 YouTube-style searchbar */}
        <ChallengeSearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />

        {/* 🧭 Filters */}
        <div className="flex gap-3">
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="skill">Skill</SelectItem>
              <SelectItem value="academic study">Academic</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="mindset">Mindset</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 📦 Challenge Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8 w-full">
            No challenges found.
          </p>
        )}
      </div>
    </>
  )
}
