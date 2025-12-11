"use client";

import ProfileBannerUploader from "@/components/profileBannerUploader";
import ProfileImageUploader from "@/components/profileImageUploader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import { IPage } from "@/interfaces/page.interface";
import { IUser } from "@/interfaces/user.interface";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { useGetPageInfoQuery } from "@/redux/api/page/page.api";
import { getUserInfo } from "@/server/user/user.server";
import { skipToken } from "@reduxjs/toolkit/query";
import { Github, Linkedin, Mail, Twitter, User, User2 } from "lucide-react";

function ProfileCard({
  profileData,
  entityType,
}: {
  entityType: string;
  profileData: any;
}) {
  const { account, isPage, isUser, isLoading } = useCurrentAccount();

  const { data: loggedinUserInfo } = useUserInfoQuery(
    isUser ? undefined : skipToken
  ) as any;

  const { data: pageData } = useGetPageInfoQuery(
    isPage ? undefined : skipToken
  );

  let isOwner = false;
  if (isUser) {
    isOwner =
      isUser &&
      loggedinUserInfo?.data?._id ===
        (entityType === "user" ? profileData?._id : profileData?.owner);
  }
  if (isPage) {
    isOwner =
      isPage &&
      pageData?.data?.owner ===
        (entityType === "user" ? profileData?._id : profileData?.owner);
  }
  
  return (
    <Card className="border-border overflow-hidden py-0">
      {/* Banner */}
      <div className="relative">
        {/* <img
          src={profileData?.image?.banner || "/banner.jpg"}
          alt="Banner"
          className="h-32 w-full object-cover"
        /> */}
        <ProfileBannerUploader
          entityType={entityType}
          profileOwnerId={profileData?._id}
          fetchedbannerUrl={profileData?.image?.banner}
          disabled={!isOwner}
        />
        {/* Profile Avatar overlapping */}
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
          {/* {profileData?.image?.profile ? 
          <Avatar className="w-24 h-24 ring-4 ring-white shadow-md">
            <AvatarImage src={profileData?.image?.profile} className="object-cover" />
            <AvatarFallback className="text-lg">{profileData?.name}</AvatarFallback>
          </Avatar> : <User2 className="w-24 rounded-full h-24 ring-4 ring-white shadow-md" />} */}
          <ProfileImageUploader
            entityType={entityType}
            fetchedImageUrl={profileData?.image?.profile}
            disabled={!isOwner}
            profileOwnerId={profileData?._id}
          />
        </div>
      </div>

      {/* Content */}
      <CardContent className="pt-9 pb-6 px-6 text-center">
        <h1 className="text-xl font-bold mb-1">{profileData?.name}</h1>

        <p className="text-sm text-muted-foreground mb-4">
          {/* User bio / tagline */}
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-2 mb-4">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
          >
            <Github className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
          >
            <Linkedin className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
          >
            <Twitter className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
          >
            <Mail className="w-4 h-4" />
          </Button>
        </div>

        {/* Followers */}
        <div className="text-sm text-gray-600 mb-3">
          <span>1.2K Followers • 3.2K Followings</span>
        </div>

        {/* Mini Avatars */}
        <div className="flex justify-center -space-x-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Avatar key={i} className="w-8 h-8 border-2 border-white">
              <AvatarImage src={`/anower.jpg`} className="object-cover" />
              <AvatarFallback className="text-xs">U{i}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
