'use client'
import { Avatar,  AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { IPost } from './MainFeed';
import PostMedia from './PostMedia';
import ReactInitialButton from '../../reacts/ReactInitialButton';
import { useGetReactsQuery } from '@/redux/api/react/react.api';
import CommentInitialButton from '../../comments/CommentInitialButton';
import { useState } from 'react';
import { useGetcommentsQuery } from '@/redux/api/comment/comment.api';
import CommentCard from '../../comments/CommentCard';
import { skip } from 'node:test';
import { IComment } from '@/interfaces/react.interface';
function PostCard({ post, UserData }: { post: IPost, UserData: any }) {
  const [showComment, setShowComment] = useState(false);
  const { data: AllComments } = useGetcommentsQuery({ entityId: post?._id as string, entityType: 'POST' },
    // { skip: !showComment }
  )

 

  const handleComment = () => {
    setShowComment(!showComment)
  }
  const { data } = useGetReactsQuery({ entityId: post._id!, entityType: 'POST' });

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
          <p className="pt-2 max-w-full break-all">
            {post?.content}
          </p>
        </CardHeader>
        <PostMedia media={post?.media} />
        <CardFooter className="flex flex-col py-0">
          <div className="flex justify-between items-center w-full py-3 px-4">
            <div className="flex items-center gap-1">
              <div className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                👍
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {data?.meta?.total}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {AllComments?.meta?.total} comments • 36 share
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-3 w-full">
            {/* React button  */}
            <ReactInitialButton entityId={post?._id} entityType={'POST'} currentUserId={UserData?.data?._id} />

            {/* Comment Button */}
            <Button
              variant="ghost"
              className="flex-1 gap-2 text-gray-600 dark:text-gray-300"
              onClick={handleComment}
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
            {/* Share Button */}
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
            {/* Comment input  */}
            {showComment && (
              <div className='col-span-3'>
                <CommentInitialButton entityId={post?._id as string} entityType={'POST'} />
                <div>
                  {AllComments?.data?.map((comment: IComment) => (<CommentCard key={comment?._id} comment={comment} />))}
                </div>

              </div>

            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default PostCard;
