import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import Image from "next/image";


function MainFeed() {
  return (
    <>
      <div className="flex-1 max-w-3xl mx-auto">
        {/* Content Filters */}
        <div className="mb-6">
          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="w-full bg-white dark:bg-gray-800 p-1 rounded-xl">
              <TabsTrigger value="recommended" className="rounded-lg flex-1">
                Recommended
              </TabsTrigger>
              <TabsTrigger value="trending" className="rounded-lg flex-1">
                Trending
              </TabsTrigger>
              <TabsTrigger value="following" className="rounded-lg flex-1">
                Following
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              <Badge
                variant="outline"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer py-2 px-4 rounded-full"
              >
                All Topics
              </Badge>
              <Badge
                variant="outline"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer py-2 px-4 rounded-full"
              >
                Programming
              </Badge>
              <Badge
                variant="outline"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer py-2 px-4 rounded-full"
              >
                Data Science
              </Badge>
              <Badge
                variant="outline"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer py-2 px-4 rounded-full"
              >
                UI/UX Design
              </Badge>
              <Badge
                variant="outline"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer py-2 px-4 rounded-full"
              >
                Career Growth
              </Badge>
              <Badge
                variant="outline"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer py-2 px-4 rounded-full"
              >
                Productivity
              </Badge>
            </div>

            <TabsContent value="recommended" className="mt-6 space-y-6">
              {/* Create Post */}
              <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex gap-3">
                    <Avatar className="border-2 border-teal-200 dark:border-teal-900">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-teal-400 to-emerald-400 text-white">
                        P
                      </AvatarFallback>
                    </Avatar>
                    <Input
                      placeholder="Share something productive..."
                      className="bg-gray-100 dark:bg-gray-700 rounded-lg focus-visible:ring-teal-500"
                    />
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between py-3">
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
                </CardFooter>
              </Card>

              {/* Learning Opportunity Card */}
              <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-800 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Free Workshop: Web Development Fundamentals
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Tomorrow • 3:00 PM • Online
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-300">
                      Learning
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Learn the fundamentals of modern web development in this
                    interactive workshop. Perfect for beginners!
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="flex -space-x-2">
                      <Avatar className="border-2 border-white dark:border-gray-800 h-6 w-6">
                        <AvatarFallback className="text-xs bg-teal-400 text-white">
                          U1
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="border-2 border-white dark:border-gray-800 h-6 w-6">
                        <AvatarFallback className="text-xs bg-teal-400 text-white">
                          U2
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="border-2 border-white dark:border-gray-800 h-6 w-6">
                        <AvatarFallback className="text-xs bg-teal-400 text-white">
                          U3
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      +42 attending
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-3">
                  <Button
                    variant="outline"
                    className="text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                  >
                    Learn More
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Register
                  </Button>
                </CardFooter>
              </Card>

              {/* Skill Post */}
              <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar className="border-2 border-teal-200 dark:border-teal-900">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="User"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-teal-400 to-emerald-400 text-white">
                          R
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Rahul Sharma</p>
                        <div className="flex items-center gap-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Data Scientist at TechCorp
                          </p>
                          <Badge className="text-[10px] py-0 h-4 bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-300">
                            Expert
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </Button>
                  </div>
                  <p className="pt-2">
                    Just published a new tutorial on data visualization with
                    Python. Check it out if you're looking to improve your data
                    science skills! #DataScience #Python #Tutorial
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <Image
                    src="/logo.png"
                    alt="A description of my logo"
                    width={500}
                    height={500}
                  />
                </CardContent>
                <CardFooter className="flex flex-col py-0">
                  <div className="flex justify-between items-center w-full py-3 px-4">
                    <div className="flex items-center gap-1">
                      <div className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        👍
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        128
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      24 comments • 36 saves
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between py-2 w-full">
                    <Button
                      variant="ghost"
                      className="flex-1 gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      <span>Helpful</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>Comment</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                      </svg>
                      <span>Save</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {/* Project Showcase */}
              <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar className="border-2 border-teal-200 dark:border-teal-900">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="User"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-teal-400 to-emerald-400 text-white">
                          A
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Ananya Patel</p>
                        <div className="flex items-center gap-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            UI Designer • Student
                          </p>
                          <Badge className="text-[10px] py-0 h-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-300">
                            Portfolio
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </Button>
                  </div>
                  <p className="pt-2">
                    Just completed my first major UI design project for a
                    productivity app! Looking for feedback from fellow
                    designers. #UIDesign #Portfolio #StudentProject
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-1">
                    <Image
                      src="/placeholder.svg?height=200&width=300&text=UI+Design+1"
                      alt="UI Design 1"
                      width={300}
                      height={200}
                      className="w-full object-cover"
                    />
                    <Image
                      src="/placeholder.svg?height=200&width=300&text=UI+Design+2"
                      alt="UI Design 2"
                      width={300}
                      height={200}
                      className="w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col py-0">
                  <div className="flex justify-between items-center w-full py-3 px-4">
                    <div className="flex items-center gap-1">
                      <div className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        👍
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        86
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      18 comments • 12 saves
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between py-2 w-full">
                    <Button
                      variant="ghost"
                      className="flex-1 gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      <span>Helpful</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>Feedback</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                      </svg>
                      <span>Save</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {/* Learning Resource */}
              <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar className="border-2 border-teal-200 dark:border-teal-900">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="User"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-teal-400 to-emerald-400 text-white">
                          T
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">TechLearn Academy</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Educational Platform
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300">
                      Free Resource
                    </Badge>
                  </div>
                  <p className="pt-2">
                    We've just released a comprehensive guide to machine
                    learning fundamentals. Perfect for students and beginners!
                    #MachineLearning #Education
                  </p>
                </CardHeader>
                <CardContent className="p-4 bg-gray-50 dark:bg-gray-700/50 border-y border-gray-100 dark:border-gray-700">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Machine Learning Fundamentals: A Beginner's Guide
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Learn the core concepts of machine learning with
                        practical examples and exercises.
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20V10" />
                            <path d="M18 20V4" />
                            <path d="M6 20v-6" />
                          </svg>
                          <span>Beginner</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>4 hours</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          <span>1,245 learners</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-3">
                  <Button
                    variant="ghost"
                    className="gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    </svg>
                    <span>Save</span>
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Access Resource
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="trending" className="mt-6">
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p>Trending content will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="following" className="mt-6">
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p>Content from people you follow will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default MainFeed