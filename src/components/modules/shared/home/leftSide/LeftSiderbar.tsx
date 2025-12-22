"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRecommendedFriendsQuery } from "@/redux/api/user/user.api";
import Link from "next/link";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetAllPageQuery,
  useGetPageInfoQuery,
} from "@/redux/api/page/page.api";
import { IPage } from "@/interfaces/page.interface";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import RecommendedFriendLeftSideCard from "./RecommendedFriendLeftSideCard";
import { User } from "lucide-react";
import PostLoading from "../../posts/PostLoading";
import { FriendsSkeleton } from "../../friends/FriendsSkeleton";

function LeftSiderbar() {
  const { account, isPage, isUser, isLoading } = useCurrentAccount();
  const { data: userData } = useUserInfoQuery(
    isUser ? undefined : skipToken
  ) as any;

  const { data: pageData } = useGetPageInfoQuery(
    isPage ? undefined : skipToken
  );

  const { data: recommendFriends , isFetching: recommendFriendsFetching} = useRecommendedFriendsQuery(
    isUser ? undefined : skipToken
  );

  const { data: allPages } = useGetAllPageQuery(
    isPage ? { page: 1, limit: 10, searchTerm: "" } : skipToken
  );

  return (
    <>
      <aside
        className="
  hidden lg:block   col-span-3


  sticky top-20
  h-[calc(100vh-80px)]
  overflow-y-auto
  scrollbar-hover
"
      >
        {" "}
        {/* profile (top)  */}
        <div className=" bg-white dark:bg-gray-800   mx-4 border p-2 rounded-full">
          <Link
            href={`/${isUser ? "profile" : "page"}/${
              isUser ? userData?.data?._id : pageData?.data?._id
            }`}
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10   border-blue-500">
                <AvatarImage
                  className="object-cover"
                  src={
                    isUser
                      ? userData?.data?.image?.profile || "logo.png"
                      : pageData?.data?.image?.profile
                  }
                  alt="User"
                />
              </Avatar>
              <div>
                <h3 className="font-semibold">
                  {isUser ? userData?.data?.name : pageData?.data?.name}
                </h3>
              </div>
            </div>
          </Link>
        </div>
        {/* my learning path
        <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg   shadow-sm">
          <h3 className="font-semibold mb-3">My Learning Paths</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-4 w-4 text-teal-500" />
                <span className="font-medium text-sm">Web Development</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-teal-500" />
                <span className="font-medium text-sm">Data Science</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>32%</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* features  */}
        <div className="  p-4   ">
          <h3 className="font-semibold pb-4">Recommended</h3>

          <div className="flex flex-col gap-1">
       
              {recommendFriends?.data?.map((friend: any, idx: number) => (
                  <RecommendedFriendLeftSideCard key={idx} friend={friend} />
                ))}
           {recommendFriendsFetching &&
            Array.from({ length: 15 }).map((_, i) => 
            <FriendsSkeleton/>
            )}
                
           
            {allPages?.data &&
              allPages?.data?.map((page: IPage, idx: number) => (
                <div key={idx} className="border rounded-lg p-2">
                  <div className="flex justify-between">
                    {" "}
                    <div className="flex items-center gap-2">
                      <div className=" rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <Avatar className="w-8 h-8  border-2 border-blue-500">
                          <AvatarImage
                            className="object-cover"
                            src={page?.image?.profile}
                            alt="User"
                          />
                        </Avatar>
                      </div>
                      <div>
                        <p className="font-medium text-sm overflow-hidden">
                          {page?.name?.length > 10
                            ? page?.name.slice(0, 10) + ".."
                            : page?.name}
                        </p>

                        {/* <p className="text-[12px] text-gray-700">
                        {friend.designation}
                      </p> */}
                      </div>
                    </div>
                    {/* <Button
                    onClick={() => handleSendFriendRequest(page?._id)}
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-full"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default LeftSiderbar;
