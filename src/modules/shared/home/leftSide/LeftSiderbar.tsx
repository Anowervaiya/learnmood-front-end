'use client'
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Code,
  DivideCircle,
  PieChart,
  Plus,
  Send,
  UserPlus,
  Users,
} from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useUserInfoQuery } from '@/redux/api/auth/auth.api';
import { UserInfoResponse } from '@/interfaces/global.interfaces';
import { useAllUserQuery } from '@/redux/api/user/user.api';



function LeftSiderbar() {
  const { data : userData} = useUserInfoQuery(undefined) as UserInfoResponse;
  const { data: recommendFriends } = useAllUserQuery(undefined)
  // if (recommendFriends.length === 0) {
  //   return "loading......."
  // }
    return (
      <>
        <aside className="hidden lg:block w-[240px] sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
          {/* profile (top)  */}
          <div className="p-4 bg-white dark:bg-gray-800  rounded-t-lg  shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12  border-2 border-blue-500">
                <AvatarImage
                  className="object-cover"
                  src={userData?.data?.image?.profile}
                  alt="User"
                />
              </Avatar>
              <div>
                <h3 className="font-semibold">{userData?.data?.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Programmer
                </p>
              </div>
            </div>
          </div>

          {/* my learning path */}
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
          </div>

          {/* features  */}
          <div className="  p-4   ">
            <h3 className="font-semibold pb-4">Recommended</h3>

            <div className="flex flex-col gap-1">
              {recommendFriends?.data?.map((friend: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-2">
                  <div className="flex justify-between">
                    {' '}
                    <div className="flex items-center gap-2">
                      <div className=" rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <Avatar className="w-8 h-8  border-2 border-blue-500">
                          <AvatarImage
                            className="object-cover"
                            src={friend?.image?.profile}
                            alt="User"
                          />
                        </Avatar>
                      </div>
                      <div>
                        <p className="font-medium text-sm overflow-hidden">
                          {friend.name.length > 10
                            ? friend.name.slice(0, 10) + '..'
                            : friend.name}
                        </p>

                        {/* <p className="text-[12px] text-gray-700">
                        {friend.designation}
                      </p> */}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-full"
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
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
