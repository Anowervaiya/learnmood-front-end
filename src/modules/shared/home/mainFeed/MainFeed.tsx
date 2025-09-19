'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUserInfoQuery } from '@/redux/api/auth/auth.api';
import Image from 'next/image';
import CreatePostModal from './CreatePostModal';
import { UserInfoResponse } from '@/interfaces/global.interfaces';
import PostCard from './PostCard';
import { useAllPostQuery } from '@/redux/api/post/post.api';

export interface IPost {
  _id?: string;
  user: any;
  content: string;
  media?: { url: string, type: string}[] ;
  tag?: string[];
  visibility: string;
}

function MainFeed() {
  const { data: UserData } = useUserInfoQuery(undefined) as UserInfoResponse;
  const { data: PostData } = useAllPostQuery(undefined)

  if (PostData?.length === 0) {
    return "loadinggg....."
  }

  return (
    <>
      <div className="max-w-xl mx-auto">
        {/* Create Post */}
        <div className="overflow-hidden border-none shadow-sm py-3 px-4 mb-4 rounded-lg bg-white dark:bg-gray-800">
          <div className="flex gap-3">
            <Avatar className="border-2 border-blue-200 dark:border-blue-900">
              <AvatarImage src={UserData?.data?.image?.profile} alt="User" />
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

        {/* show Post */}
        <>
          {PostData?.data?.map((post: IPost, idx: number) => (
            <PostCard key={idx} post={post} />
          ))}
        </>
      </div>
    </>
  );
}

export default MainFeed;
