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
import PostMedia from './PostMedia';
import ReactInitialButton from '../../reacts/ReactInitialButton';
import CommentInitialButton from '../../comments/CommentInitialButton';
import { useState } from 'react';
import { useGetcommentsQuery } from '@/redux/api/comment/comment.api';
import CommentCard from '../../comments/CommentCard';
import { skip } from 'node:test';
import { IComment } from '@/interfaces/react.interface';
import CommentInitialInputButton from '../../comments/CommentInitialButton';
import { IPost } from '@/interfaces/post.interface';
import { formateExactTime } from '@/utils/formateExactTime';
import { PiShareFat } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { Share } from 'lucide-react';
import Link from 'next/link';
import PostReactionsShow from './PostReactionsShow';
function PostCard({ post, UserData }: { post: IPost, UserData: any }) {
 
const [showReactions, setShowReactions] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const { data: AllComments } = useGetcommentsQuery({ entityId: post?._id as string, entityType: 'Post' },
    // { skip: !showComment }
  )

  const handleComment = () => {
    setShowComment(!showComment)
  }
  // const { data } = useGetReactsQuery({ entityId: post._id!, entityType: 'Post' });


  return (
    <>
      <Card className=" border-none shadow-sm bg-white dark:bg-gray-800 pt-3 pb-1 gap-0 ">
        <CardHeader className="px-3 ">
          <div className="flex justify-between items-start">
            <Link href={`/profile/${post?.user?._id}`} className="flex gap-3">
              <Avatar className="border-2 border-blue-400 dark:border-teal-900 w-10 h-10">
                <AvatarImage
                  src={post?.user?.image?.profile}
                  alt="User"
                  className='object-cover '
                />

              </Avatar>
              <div>
                <p className="font-semibold">{post?.user?.name}</p>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {
                      
                      formateExactTime(post.createdAt as unknown as string)
                    
                    
                    }
                  </p>
                  <Badge className="text-[10px] py-0 h-4 bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-300">
                    Expert
                  </Badge>
                </div>
              </div>
            </Link>
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
          <p className="  max-w-full break-all pb-2">
            {post?.content}
          </p>
        </CardHeader>
        <PostMedia media={post?.media} />
        <CardFooter className="flex flex-col py-0 px-2 ">
          <div className="flex justify-between items-center w-full py-2 px-4">
            <PostReactionsShow reactions={post.reactions} />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {post.commentCount || 0} comments • {post.shareCount || 0} share
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-3 w-full relative">
            {/* React button  */}
            <div
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
          
              className=" flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer rounded-lg mt-1 py-1 text-gray-600 dark:text-gray-300"
           
            >
              <ReactInitialButton showReactions={showReactions} entityId={post?._id} entityType={'Post'} currentUserId={UserData?.data?._id} />
              
            
            </div>
           

            {/* Comment Button */}
            <div
              className="flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer rounded-lg mt-1 gap-2 py-1 text-gray-600 dark:text-gray-300"
              onClick={handleComment}
             
            >
              <FaRegComment size={20}  />  {/* Icon size 50px */}
              <span>Comment</span>
            </div>

            {/* Share Button */}
            <div
              // variant="ghost"
              className="flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer rounded-lg mt-1 gap-2 py-1 text-gray-600 dark:text-gray-300"
            >
              <PiShareFat size={23} />
              <span>Share</span>
              
            </div>
            {/* Comment input  */}
            {showComment && (
              <div className='col-span-3'>
                <CommentInitialInputButton entityId={post?._id as string} entityType={'Post'} />
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
