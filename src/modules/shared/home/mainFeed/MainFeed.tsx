'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUserInfoQuery } from '@/redux/api/auth/auth.api';
import Image from 'next/image';
import CreatePostModal from './CreatePostModal';
import { UserInfoResponse } from '@/interfaces/global.interfaces';
import PostCard from './PostCard';
import { useAllPostQuery } from '@/redux/api/post/post.api';
import { useEffect, useRef, useState } from 'react';
import { PostLoading } from './PostLoading';
import { IPost } from '@/interfaces/post.interface';


function MainFeed() {
  const { data: UserData } = useUserInfoQuery(undefined) as any;
  const limit = 10;
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const { data: PostData, isFetching } = useAllPostQuery({ page, limit });

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
      <div className="max-w-xl lg:w-2xl xl:w-3xl 2xl:w-5xl mx-auto px-2 sm:px-4 md:px-6">
        {Array.from({ length: limit }).map((_, i) => (
          <PostLoading key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className=" 
    max-w-xl   
    lg:w-2xl 
    xl:w-3xl 
    2xl:w-5xl 
    mx-auto
    px-2 sm:px-4 md:px-6 ">
        {/* Create Post */}
        <div className="overflow-hidden border-none shadow-sm py-3 px-4 mb-4 rounded-lg bg-white dark:bg-gray-800">
          <div className="flex gap-3">
            <Avatar className="border-2 border-blue-200 dark:border-blue-900">
              <AvatarImage src={UserData?.data?.image?.profile} alt="User" className='object-cover' />
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

          {/* show Posts */}
        <div className='flex flex-col gap-4'>
          {allPosts.map((post, idx) => (
            <PostCard key={post._id || idx} post={post} UserData={UserData} />
          ))}
        </div>

        {isFetching && Array.from({ length: limit }).map((_, i) => <PostLoading key={i} />)}
        
          {/* sentinel div for infinite scroll */}
          <div ref={setLoadMoreRef} className="h-40" />
      
      </div>
    </>
  );
}

export default MainFeed;
