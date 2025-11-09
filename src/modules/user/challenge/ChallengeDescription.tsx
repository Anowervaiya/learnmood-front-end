'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IChallenge } from '@/interfaces/challenge.interface'
import { CalendarIcon, GlobeIcon, StarIcon } from 'lucide-react'
import React, { useState } from 'react'

function ChallengeDescription({ challenge }: { challenge: IChallenge }) {

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <Card className=" mt-6">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle className="text-2xl">{challenge?.title}</CardTitle>
          <Badge variant="secondary" className="capitalize">
            {challenge?.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground whitespace-pre-line">
        <div>
          <p
            className={` text-gray-800 ${expanded ? "" : "line-clamp-3"
              }`}
          >
            {challenge.description}
          </p>

          {challenge.description?.length! > 150 && (
            <button
              onClick={toggleExpand}
              className="text-blue-600 hover:cursor-pointer font-semibold mt-1 hover:underline"
            >
              {expanded ? "See Less" : "See More"}
            </button>
          )}
        </div>
        <Separator />
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Starts: {new Date(challenge?.startsAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Ends: {new Date(challenge?.endsAt!).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            Ratings: {challenge?.ratings || 0}
          </div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="h-4 w-4" />
            {challenge?.isPublic ? "Public" : "Private"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChallengeDescription
