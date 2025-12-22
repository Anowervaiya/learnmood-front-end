'use client';
import SendFriendCard from '@/components/modules/user/friends/SendFriendCard';
import { useRecommendedFriendsQuery } from '@/redux/api/user/user.api';
import React from 'react';

function RecommendedFriend() {
  const { data } = useRecommendedFriendsQuery(undefined);

  return (
    <div className="w-full ">
      {data?.data?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.data.map((item: any, idx: number) => (
            <SendFriendCard key={idx} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No Recommend Friend Found</p>
      )}
    </div>
  );
}

export default RecommendedFriend;