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
  User,
} from "lucide-react"
import CreatePostModal from "@/components/modules/shared/posts/CreatePostModal"
import ProfileFeed from "@/components/modules/user/profile/ProfileFeed"
import { IPage } from "@/interfaces/page.interface"
import Link from "next/link"
import ChallengeCard from "../../user/challenge/challengeCard"
import { useEffect, useState } from "react"
import { useGetchallengesQuery } from "@/redux/api/challenge/challenge.api"
import { IChallenge } from "@/interfaces/challenge.interface"
import { useUserInfoQuery } from "@/redux/api/auth/auth.api"
import { useGetPageInfoQuery } from "@/redux/api/page/page.api"
import { is } from "zod/v4/locales"


const PageProfileTabs = ({ pageData  }: { pageData: IPage  }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const { data: challenges, refetch: refetchChallenges, isLoading: loadingChallenge } = useGetchallengesQuery(
    { pageId: pageData?._id },
    { skip: activeTab !== 'challenge' }
  )

  const { data: pageInfo } = useGetPageInfoQuery(undefined) as any //self created page
 

 const isOwner = pageInfo?.data?._id === pageData?._id;

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
          {/* Create Post */}

          {isOwner && <div className="overflow-hidden border-none shadow-sm py-3 px-4 mb-4 rounded-lg bg-white dark:bg-gray-800">
            <div className="flex gap-3">
              { pageData?.image?.profile ?
                <Avatar className="w-10 h-10">
                  <AvatarImage src={pageData?.image?.profile} className="object-cover" />
                  <AvatarFallback className="text-lg">{pageData?.name}</AvatarFallback>
                </Avatar> : <User className="w-10 h-10 rounded-full" />}
               <CreatePostModal data={ pageData} />
            </div>

            <div className="flex justify-between pt-3">
              <Button
                variant="ghost"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-teal-500 mr-2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                Media
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-teal-500 mr-2"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Resource
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-teal-500 mr-2"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Achievement
              </Button>
            </div>
          </div>}

          {/* My Posts */}
        <ProfileFeed accountId={pageData._id} />
        
      </TabsContent>

      {/* 🔹 ABOUT TAB */}
      <TabsContent value="about">

        this is about tabs
      </TabsContent>

      {/* 🔹 CHALLENGE TAB */}
      <TabsContent value="challenge">
        <div>
          {isOwner && <Link
            href={`/page/challenge?pageId=${pageData._id}`}
            className="inline-flex items-center w-full gap-2 px-4 py-2  hover:bg-blue-700 hover:text-white font-medium rounded-xl shadow-md transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <PlusIcon size={18} className="opacity-90" />
            <span>Create Challenge</span>
          </Link>}

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