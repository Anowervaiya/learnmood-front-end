'use client';
import SendFriendCard from '@/components/modules/shared/friends/SendFriendCard';
import { useRecommendedFriendsQuery } from '@/redux/api/user/user.api';
import React from 'react';

function Recommended() {
  const { data } = useRecommendedFriendsQuery(undefined);

  return (
    <div>
      <div
        className="
      flex gap-2 flex-wrap
      "
      >
        {data?.data?.map((item: any, idx: number) => (
          <SendFriendCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Recommended;
