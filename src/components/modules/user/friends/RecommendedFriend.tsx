'use client';
import SendFriendCard from '@/components/modules/user/friends/SendFriendCard';
import { useRecommendedFriendsQuery } from '@/redux/api/user/user.api';
import React from 'react';

function RecommendedFriend() {
  const { data } = useRecommendedFriendsQuery(undefined);



  return (
    <div>
      <div
        className="
      flex gap-2 flex-wrap
      "
      >
        {data?.data?.length> 0 ? data?.data?.map((item: any, idx: number) => (
          <SendFriendCard key={idx} item={item} />
        )) : 'No Recommend Friend Found'}
      </div>
    </div>
  );
}

export default RecommendedFriend;
