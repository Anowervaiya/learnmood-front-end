"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IChallenge } from "@/interfaces/challenge.interface";
import Link from "next/link";


export default function ChallengeCard({ challenge }: { challenge: IChallenge }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="cursor-pointer"
     
    >
      <Link href={`/challenge/${challenge._id}`}>
        <Card className="overflow-hidden rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 p-0 gap-0">
          <div className="relative">
            <img
              src={challenge.banner}
              alt={challenge.title}
              className="h-48 w-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-black/70 text-white capitalize">
                {challenge.category}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge
                variant="outline"
                className={`capitalize ${challenge.status === "upcoming"
                  ? "text-blue-500 border-blue-500"
                  : challenge.status === "ongoing"
                    ? "text-green-500 border-green-500"
                    : "text-gray-500 border-gray-400"
                  }`}
              >
                {challenge.status}
              </Badge>
            </div>
          </div>

          <CardHeader className={'px-3 py-0 '}>
            <CardTitle className="text-lg mt-2 font-semibold text-gray-900 line-clamp-1 p-0">
              {challenge.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2   text-sm text-gray-700 px-3 pb-3">
            <p className="line-clamp-2">{challenge.description?.length! > 80 ? challenge.description?.slice(0, 80) + '...' : challenge.description}</p>

            <div className="flex justify-between items-center text-xs text-gray-600 mt-3">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>
                  {new Date(challenge.startsAt).toLocaleDateString()} →{" "}
                  {new Date(challenge.endsAt!).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{challenge.durationDays} Days</span>
              </div>
            </div>


          </CardContent>
        </Card></Link>
    </motion.div>
  );
}
