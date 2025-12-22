"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";
import { useGetcommentsQuery } from "@/redux/api/comment/comment.api";
import { skip } from "node:test";
import { IComment } from "@/interfaces/react.interface";
import { IPost } from "@/interfaces/post.interface";
import { formateExactTime } from "@/utils/formateExactTime";
import { PiShareFat } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { Share } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeletePostMutation } from "@/redux/api/post/post.api";
import { toast } from "sonner";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import PostMedia from "./PostMedia";
import PostReactionsShow from "./PostReactionsShow";
import ReactInitialButton from "../reacts/ReactInitialButton";
import ShareModal from "../share/ShareModal";
import CommentInitialInputButton from "../comments/CommentInitialButton";
import CommentCard from "../comments/CommentCard";

function PostCard({ post, accountData }: { post: IPost; accountData?: any }) {
  const [openShare, setOpenShare] = useState(false);
  const { isUser } = useCurrentAccount();
  const [showReactions, setShowReactions] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const { data: AllComments } = useGetcommentsQuery(
    { entityId: post?._id as string, entityType: "Post" }
    // { skip: !showComment }
  );
  const [deletePost] = useDeletePostMutation();

  const handleComment = () => {
    setShowComment(!showComment);
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const res = await deletePost(postId).unwrap();
    } catch (error) {
      toast.error("Failed to delete the post.");
    }
  };

  const isOwner = accountData?.data?._id === post?.accountId?._id;
  return (
    <>
      <Card className=" border-none shadow-sm bg-white dark:bg-gray-800 pt-3 pb-1 gap-0 ">
        <CardHeader className="px-3 ">
          <div className="flex justify-between items-start">
            <div
              // href={`${isUser ? "/profile" : "/page"}/${post?.accountId?._id}`}
              className="flex gap-3"
            >
              <Avatar className="border-2 border-blue-400 dark:border-teal-900 w-10 h-10">
                <AvatarImage
                  src={post?.accountId?.image?.profile}
                  alt="User"
                  className="object-cover "
                />
              </Avatar>
              <div>
                <p className="font-semibold">{post?.accountId?.name}</p>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formateExactTime(post.createdAt as unknown as string)}
                  </p>
                 
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
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
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                {isOwner && (
                  <DropdownMenuItem onClick={() => console.log("Edit clicked")}>
                    Edit Post
                  </DropdownMenuItem>
                )}
                {isOwner && (
                  <DropdownMenuItem
                    onClick={() => handleDeletePost(post?._id as string)}
                    className="text-red-500"
                  >
                    Delete Post
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => console.log("Report clicked")}>
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="  max-w-full break-all pb-2">{post?.content}</p>
        </CardHeader>
        <PostMedia media={post?.media} />
        <CardFooter className="flex flex-col py-0 px-2 ">
          <div className="flex justify-between items-center w-full py-2 px-4">
            <PostReactionsShow reactions={post?.reactions} />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {post?.commentCount! > 0 && (
                <span>{post?.commentCount} comments</span>
              )}{" "}
              {post?.shareCount! > 0 && <span>{post?.shareCount} • share</span>}
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-3 w-full relative">
            {/* React Button */}
            <div
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
              className="
    flex justify-center items-center
    rounded-lg mt-1 py-1
    text-gray-600 dark:text-gray-300
    hover:bg-gray-100 dark:hover:bg-neutral-800
    transition-colors
    cursor-pointer
    px-2
  "
            >
              <ReactInitialButton
                showReactions={showReactions}
                entityId={post?._id}
                entityType={"Post"}
              />
            </div>
            {/* Comment Button */}
            <div
              onClick={handleComment}
              className="
    flex justify-center items-center gap-2
    rounded-lg mt-1 py-1 px-2
    text-gray-600 dark:text-gray-300
    hover:bg-gray-100 dark:hover:bg-neutral-800
    transition-colors
    cursor-pointer
  "
            >
              <FaRegComment size={20} />
              <span>Comment</span>
            </div>
            {/* Share Button */}
            <div
              onClick={() => setOpenShare(true)}
              className="
    flex justify-center items-center gap-2
    rounded-lg mt-1 py-1 px-2
    text-gray-600 dark:text-gray-300
    hover:bg-gray-100 dark:hover:bg-neutral-800
    transition-colors
    cursor-pointer
  "
            >
              <PiShareFat size={23} />
              <span>Share</span>
            </div>

            <ShareModal
              entityType={"post"}
              entityId={post?._id}
              open={openShare}
              onClose={() => setOpenShare(false)}
            />
            {/* Comment input  */}
            {showComment && (
              <div className="col-span-3">
                <CommentInitialInputButton
                  entityId={post?._id as string}
                  entityType={"Post"}
                />
                <div>
                  {AllComments?.data?.map((comment: IComment) => (
                    <CommentCard key={comment?._id} comment={comment} />
                  ))}
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
