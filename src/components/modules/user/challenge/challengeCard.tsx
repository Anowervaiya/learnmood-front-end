"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IChallenge } from "@/interfaces/challenge.interface";
// TypeScript interface for Challenge


// Helper function to calculate time ago
function getTimeAgo(date: string) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}


function getChallengeStatus(startsAt: string, endsAt: string) {
  const now = new Date();
  const startDate = new Date(startsAt);
  const endDate = new Date(endsAt);

  // Before start → show countdown
  if (now < startDate) {
    const diffTime = startDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
  }

  // During the challenge → running
  if (now >= startDate && now <= endDate) {
    return "Running";
  }

  // After end date → completed
  if (now > endDate) {
    return "Completed";
  }
}

export default function ChallengeCard({ challenge }: { challenge: IChallenge }) {
  return (
   <motion.div
  whileHover={{ scale: 1.02 }}
  className="cursor-pointer"
>
  <Link href={`/challenge/${challenge._id}`}>
    <Card className="
      overflow-hidden 
      rounded-xl 
      transition-all 
      duration-200 
      border 
      p-0 
      gap-3
      bg-white 
      border-gray-200 
      hover:shadow-md
      dark:bg-neutral-900 
      dark:border-neutral-800 
      dark:hover:shadow-neutral-800/50
    ">
      {/* Thumbnail Section */}
      <div className="relative">
        <img
          src={challenge.banner}
          alt={challenge.title}
          className="w-full aspect-video object-cover"
        />
      </div>

      {/* Content Section */}
      <CardContent className="px-3 pb-4">
        <div className="flex gap-3">
          {/* Creator Avatar */}
          <div className="flex-shrink-0">
            <img
              src={challenge.createdBy?.image?.profile || '/logo.png'}
              alt={challenge.createdBy?.name}
              className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-neutral-700"
            />
          </div>

          {/* Title and Metadata */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3
              className="
                font-semibold 
                text-sm 
                leading-snug 
                line-clamp-2
                text-gray-900 
                dark:text-gray-100
              "
              title={challenge.title}
            >
              {challenge.title}
            </h3>

            {/* Creator Name */}
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">
              {challenge.createdBy?.name}
            </p>

            {/* Metadata Row */}
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
              {/* <span>
                {challenge.participantCount} participant
              </span> */}
              {/* <span>•</span> */}
              <span>{challenge.durationDays} days</span>
              {/* <span>•</span>
              <span>
                {getChallengeStatus(
                  challenge.startsAt,
                  challenge.endsAt as string
                )}
              </span> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
</motion.div>

  );
}