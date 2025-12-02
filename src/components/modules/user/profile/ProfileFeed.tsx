'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUserInfoQuery } from '@/redux/api/auth/auth.api';
import Image from 'next/image';
import { UserInfoResponse } from '@/interfaces/global.interfaces';

import { useAllPostQuery, useMypostQuery } from '@/redux/api/post/post.api';
import { useEffect, useRef, useState } from 'react';
import PostLoading from '@/components/modules/shared/home/mainFeed/PostLoading';
import CreatePostModal from '@/components/modules/shared/home/mainFeed/CreatePostModal';
import PostCard from '@/components/modules/shared/home/mainFeed/PostCard';
import { IUser } from '@/interfaces/user.interface';
import { skip } from 'node:test';
import { IPost } from '@/interfaces/post.interface';




function ProfileFeed({ user }: { user: IUser }) {
  const { data: UserMe } = useUserInfoQuery(undefined) as UserInfoResponse;
  const limit = 4;
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const { data: PostData, isFetching } = useMypostQuery({ page, limit, userId : user?._id  } , {skip: !user?._id});

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
        {Array.from({ length: limit }).map((_, i) => (
          <PostLoading key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
   
   

          {/* show Posts */}
        <div className='flex flex-col gap-4'>
          {allPosts.map((post, idx) => (
            <PostCard key={post._id || idx} post={post} UserData={UserMe} />
          ))}
        </div>

        {isFetching && Array.from({ length: limit }).map((_, i) => <PostLoading key={i} />)}
        
          {/* sentinel div for infinite scroll */}
          <div ref={setLoadMoreRef} className="h-40" />
      
      
    </>
  );
}

export default ProfileFeed;
