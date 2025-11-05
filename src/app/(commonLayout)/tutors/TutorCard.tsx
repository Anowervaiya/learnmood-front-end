"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, GraduationCap, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TutorCard({ tutor }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="hover:shadow-lg shadow-md transition-all cursor-pointer overflow-hidden rounded-2xl">
        {/* 🧑‍🏫 Tutor Image */}
        <div className="relative">
          <img
            src={
              tutor?.userId?.image?.banner ||
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            }
            alt="Banner"
            className="h-32 w-full object-cover"
          />

          {/* Profile Avatar Overlapping */}
          <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
            <Avatar className="w-20 h-20 ring-4 ring-white shadow-md">
              <AvatarImage
                src={
                  tutor?.userId?.image?.profile ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                className="object-cover"
              />
              <AvatarFallback className="text-lg font-semibold">
                {tutor?.userId?.name?.charAt(0) || "T"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <CardContent className="p-4 mt-8 space-y-3">
          {/* Tutor Name and Rate */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-lg text-gray-800 flex items-center gap-1">
                <User size={16} className="text-blue-600" />
                {tutor?.userId?.name || "Unknown Tutor"}
              </h2>
              <p className="text-sm text-gray-500 flex justify-center items-center">
                <MapPin size={14} className="inline mr-1" />
                {tutor.location || "No location"}
              </p>
            </div>
            <Badge className="bg-blue-50 text-blue-600 border border-blue-200">
              ৳{tutor.monthlyRate}/month
            </Badge>
          </div>

          {/* Bio */}
          {tutor.bio && (
            <p className="text-sm text-gray-600 line-clamp-2">{tutor.bio}</p>
          )}

          {/* Subjects */}
          <div className="flex flex-wrap gap-2">
            {tutor.subject?.map((s: string) => (
              <Badge
                key={s}
                className="bg-gray-100 text-gray-700 border border-gray-200"
              >
                {s}
              </Badge>
            ))}
          </div>

          {/* Education, Duration, Experience */}
          <div className="flex flex-col gap-1 text-sm text-gray-500 pt-2 border-t border-gray-100">
            <p className="flex items-center gap-1">
              <GraduationCap size={14} className="text-indigo-500" />
              {tutor.education || "Not specified"}
            </p>
            <p className="flex items-center gap-1">
              <Clock size={14} className="text-orange-500" />
              Duration: {tutor.duration || "N/A"}
            </p>
            <p className="flex items-center gap-1">
              🧠 Experience: {tutor.experienceYears} year
              {tutor.experienceYears > 1 ? "s" : ""}
            </p>
          </div>
        </CardContent>
      </div>
    </motion.div>
  );
}
