"use client";

import {
  ThumbsUp,
  Heart,
  Share2,
  ThumbsDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IPage } from "@/interfaces/page.interface";
import { useState } from "react";
import { handleFollowing, handleUnFollowing } from "@/server/user/follow.server";
import { FaHeart } from "react-icons/fa";

export const VideoMetadata = ({
  metaData,
}: {
  metaData: { createdBy: Partial<IPage>; title: string ; followStatus:boolean };
}) => {
  const [isFollowing, setIsFollowing] = useState(metaData.followStatus);

  const [submitting, setSubmitting] = useState(false);

  const handleFollow = async (followingId: string) => {
    setSubmitting(true);
    try {
      const result = await handleFollowing(followingId);
        if (result.success) setIsFollowing(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnFollow = async (followingId: string) => {
    setSubmitting(true);
    try {
      const result = await handleUnFollowing(followingId);
       if (result.success) setIsFollowing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="  bg-card p-0">
      {/* Video Title with Rating */}
      <div className="">
        <h1 className="text-2xl font-bold mb-2 text-foreground leading-tight">
          {metaData?.title}
        </h1>
      </div>

      {/* Instructor Info and Actions */}
      <div className="flex items-center justify-between gap-5 pt-2 ">
        {/* Instructor Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarImage
              src={metaData?.createdBy?.image?.profile}
              alt="Hablu Programmer"
            />
            <AvatarFallback>HP</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">
                {metaData?.createdBy?.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {metaData.createdBy?.followersCount} Followers
            </p>
          </div>
          <div>
            {
              isFollowing ? ( <Button
              disabled={submitting}
              onClick={() => handleUnFollow(metaData?.createdBy?._id as string)}
              variant="outline"
              size="sm"
              className="bg-secondary rounded-full hover:bg-secondary/90 text-black"
            >
              <FaHeart  className="h-4 w-4" />
              Following
            </Button>) : ( <Button
              disabled={submitting}
              onClick={() => handleFollow(metaData?.createdBy?._id as string)}
              variant="outline"
              size="sm"
              className="bg-secondary rounded-full hover:bg-secondary/90 text-black"
            >
              <Heart className="h-4 w-4" />
              Follow
            </Button>)
            }
           
           
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center  gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="bg-secondary rounded-full hover:bg-secondary/90 text-black "
          >
            <span className="flex items-center justify-center gap-2 ">
              <ThumbsUp className="h-4 w-4" />
              Like (2K)
            </span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-secondary rounded-full hover:bg-secondary/90 text-black "
          >
            <span className="flex items-center justify-center gap-2">
              <ThumbsDown className="h-4 w-4" />
              Dislike{" "}
            </span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-secondary rounded-full hover:bg-secondary/90 text-black"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};
