'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { IPost } from './MainFeed';
import PostMedia from './PostMedia';
function PostCard({post}:{post: IPost}) {

  return (
    <>
      <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-gray-800">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <Avatar className="border-2 border-blue-400 dark:border-teal-900">
                <AvatarImage
                  src={post?.user?.image?.profile}
                  alt="User"
                />
                
              </Avatar>
              <div>
                <p className="font-semibold">{post?.user?.name}</p>
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
           {post?.content}
          </p>
        </CardHeader>
        <PostMedia media={post?.media}/>
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
    </>
  );
}

export default PostCard;
