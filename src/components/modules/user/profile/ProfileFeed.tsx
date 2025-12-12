'use client'
import { useUserInfoQuery } from '@/redux/api/auth/auth.api';
import {  useMypostQuery } from '@/redux/api/post/post.api';
import { useEffect, useRef, useState } from 'react';
import PostLoading from '@/components/modules/shared/home/mainFeed/PostLoading';
import PostCard from '@/components/modules/shared/home/mainFeed/PostCard';
import { IUser } from '@/interfaces/user.interface';
import { IPost } from '@/interfaces/post.interface';
import { useCurrentAccount } from '@/hooks/useCurrentAccount';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetPageInfoQuery } from '@/redux/api/page/page.api';



function ProfileFeed({ accountId }: { accountId: string }) {
   const { account, isPage, isUser, isLoading } = useCurrentAccount();
  
    const { data: userData } = useUserInfoQuery(
      isUser ? undefined : skipToken
    ) as any
    
    const { data: pageData } = useGetPageInfoQuery(
      isPage ? undefined: skipToken
    );
  

  const limit = 4;
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const { data: PostData, isFetching } = useMypostQuery({ page, limit, accountId }, { skip: !accountId });

  const observerRef = useRef<IntersectionObserver | null>(null);

  // attach sentinel div
  const setLoadMoreRef = (node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node) return;

    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting && !isFetching && PostData?.meta?.page! < PostData?.meta?.totalPage!) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 0.1 });

    observerRef.current.observe(node);
  };

  // merge incoming posts
  useEffect(() => {
    if (!PostData?.data) return;

    if (page === 1) setAllPosts(PostData.data);
    else setAllPosts(prev => [
      ...prev,
      ...PostData.data.filter((p: any) => !prev.some(prevPost => prevPost._id === p._id))
    ]);
  }, [PostData, page]);


  useEffect(() =>
    () => observerRef.current?.disconnect(),
    []);

  

  if (allPosts.length === 0) {
    return (
      <div>
        No Post Available
      </div>
    );
  }

  const accountData = isUser ? userData : pageData;

  return (
    <>
      {/* show Posts */}
        <div className='flex flex-col gap-4'>
          {allPosts.map((post, idx) => (
            <PostCard key={post._id || idx} post={post} accountData={accountData} />
          ))}
        </div>

        {isFetching && Array.from({ length: limit }).map((_, i) => <PostLoading key={i} />)}
        
          {/* sentinel div for infinite scroll */}
          <div ref={setLoadMoreRef} className="h-40" />
    </>
  );
}

export default ProfileFeed;
