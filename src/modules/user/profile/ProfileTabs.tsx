"use client"

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
} from "lucide-react"
import CreatePostModal from "@/modules/shared/home/mainFeed/CreatePostModal"
import { useUserInfoQuery } from "@/redux/api/auth/auth.api"
export function ProfileTabs() {
    const { data: UserData } = useUserInfoQuery(undefined) as any;
  return (


    <Tabs defaultValue="posts" className="w-full ">
      {/* Tab Buttons */}
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
      </TabsList>

      {/* Tab Contents */}
      <TabsContent value="posts">
   
          <section id="posts">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Create Post */}
           
            <div className="overflow-hidden border-none shadow-sm py-3 px-4 mb-4 rounded-lg bg-white dark:bg-gray-800">
              <div className="flex gap-3">
                <Avatar className="border-2 border-blue-200 dark:border-blue-900">
                  <AvatarImage src='/anower.jpg' className="object-cover" alt="User" />
                </Avatar>
                <CreatePostModal data={UserData} />
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
            </div>


            {/* Sample Post */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src="/professional-man.jpg" />
                    <AvatarFallback>AH</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">Anower Hossen</h4>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 text-pretty">
                      Learnmood এর সাথে আমি ১৫% এর বেশি ছাড় পেয়েছি। তাই আমি এই কোর্স টি কিনেছি। Learnmood এর সাথে থাকুন এবং
                      ভাল কিছু শিখুন। 🚀
                    </p>

                    {/* Learnmood Card */}
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                              <span className="text-primary-foreground font-bold text-sm">L</span>
                            </div>
                            <h5 className="font-bold text-lg">Learnmood</h5>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Learn something new today with our comprehensive courses
                          </p>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Platform
                          </Button>
                        </div>
                        <div className="hidden md:block">
                          <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📚</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center space-x-6 pt-4 border-t border-border">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Heart className="w-4 h-4 mr-2" />
                        <span className="text-xs">24</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        <span className="text-xs">8</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Share2 className="w-4 h-4 mr-2" />
                        <span className="text-xs">Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
    
      </TabsContent>

      <TabsContent value="about">
     
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-primary" />
                  Experience
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Software Engineer</h4>
                      <span className="text-xs text-muted-foreground">2024 — Present</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Leads Agency</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Full Stack Developer</h4>
                      <span className="text-xs text-muted-foreground">2022 — 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Software Company</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Location & Education
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Mirpur, Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Sonargaon Govt. College</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a href="#" className="text-sm text-primary hover:underline">
                      linkedin.com/in/anowerhossen
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>



      </TabsContent>

      <TabsContent value="experience">
        <div>
          <h2 className="font-bold text-lg mb-2">Experience</h2>
          <p className="text-muted-foreground text-sm">
            Work experience details go here.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="projects">
        <div >
          <h2 className="font-bold text-lg mb-2">Projects</h2>
          <p className="text-muted-foreground text-sm">
            List of projects will be displayed here.
          </p>
        </div>
      </TabsContent>


    </Tabs>


  )
}
