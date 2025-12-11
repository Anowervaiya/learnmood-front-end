'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Users,
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Mail,
  PlusIcon,
} from "lucide-react"
import CreatePostModal from "@/components/modules/shared/home/mainFeed/CreatePostModal"
import ProfileFeed from "@/components/modules/user/profile/ProfileFeed"
import { IPage } from "@/interfaces/page.interface"
import Link from "next/link"
import ChallengeCard from "../../user/challenge/challengeCard"
import { useEffect, useState } from "react"
import { useGetchallengesQuery } from "@/redux/api/challenge/challenge.api"
import { IChallenge } from "@/interfaces/challenge.interface"


const PageProfileTabs = ({ pageData }: { pageData: IPage }) => {
  const [activeTab, setActiveTab] = useState("posts");

  const { data: challenges, refetch: refetchChallenges, isLoading: loadingChallenge } = useGetchallengesQuery(
    { pageId: pageData._id },
    { skip: activeTab !== 'challenge' }
  )

  return (
    <Tabs defaultValue="posts" onValueChange={setActiveTab} className="w-full">
      {/* Tabs List */}
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="challenge">Challenge</TabsTrigger>
        <TabsTrigger value="service">Service</TabsTrigger>
        <TabsTrigger value="course">Course</TabsTrigger>
      </TabsList>

      {/* 🔹 POSTS TAB */}
      <TabsContent value="posts">
        <div className="overflow-hidden border-none shadow-sm py-3 px-4 mb-4 rounded-lg bg-white dark:bg-gray-800">
          <div className="flex gap-3">
            <Avatar className="border-2 border-blue-200 dark:border-blue-900">
              <AvatarImage src="/anower.jpg" alt="User" />
            </Avatar>
          </div>
          <div className="flex justify-between pt-3">
            <Button variant="ghost">Media</Button>
            <Button variant="ghost">Resource</Button>
            <Button variant="ghost">Achievement</Button>
          </div>
        </div>
      </TabsContent>

      {/* 🔹 ABOUT TAB */}
      <TabsContent value="about">

        this is about tabs
      </TabsContent>

      {/* 🔹 CHALLENGE TAB */}
      <TabsContent value="challenge">
        <div>
          <Link
            href={`/page/challenge?pageId=${pageData._id}`}
            className="inline-flex items-center w-full gap-2 px-4 py-2  hover:bg-blue-700 hover:text-white font-medium rounded-xl shadow-md transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <PlusIcon size={18} className="opacity-90" />
            <span>Create Challenge</span>
          </Link>

          {loadingChallenge ? (
            <p className="mt-6 text-muted-foreground text-sm">Loading challenges...</p>
          ) : challenges?.data?.length! > 0 ? (
            <div className="grid sm:grid-cols-2  gap-2 mt-6">
              {challenges?.data?.map((item: IChallenge) => (
                <ChallengeCard key={item._id} challenge={item} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-muted-foreground text-sm">No challenges found.</p>
          )}
        </div>
      </TabsContent>

      {/* 🔹 SERVICE TAB */}
      <TabsContent value="service">

        <p className="text-muted-foreground text-sm mt-3">
          List of services will be displayed here.
        </p>

      </TabsContent>

      {/* 🔹 COURSE TAB */}
      <TabsContent value="course">

        <p className="text-muted-foreground text-sm mt-3">
          List of courses will be displayed here.
        </p>

      </TabsContent>
    </Tabs>


  )
}

export default PageProfileTabs;