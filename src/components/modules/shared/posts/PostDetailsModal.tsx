'use client'

import { IPost } from "@/interfaces/post.interface";
import { useRouter } from "next/navigation";
import PostCard from "./PostCard";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetPageInfoQuery } from "@/redux/api/page/page.api";


export default  function PostDetailsModal({ postData } : {postData: IPost}) {
 const router = useRouter();
 const { account, isPage, isUser, isLoading } = useCurrentAccount();

  const { data: userData } = useUserInfoQuery(
    isUser ? undefined : skipToken
  ) as any
  
  const { data: pageData } = useGetPageInfoQuery(
    isPage ? undefined: skipToken
  );

  const accountData = isUser ? userData : pageData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={() => router.push("/")} className="absolute inset-0 bg-black/40" />

      <div className="relative bg-white  dark:bg-neutral-900 w-[95%] max-w-xl rounded-xl p-6">
        <button onClick={() => router.push("/") } className="absolute hover:cursor-pointer top-3 right-3">✕</button>

        {/* Post Content */}
        <PostCard post={postData} accountData={accountData}/>
      </div>
    </div>
  );
}
