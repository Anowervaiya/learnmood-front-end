'use client'
import OutgoingFriendCard from '@/components/modules/shared/friends/OutgoingFriendCard';
import { useOutgoingFriendRequestQuery } from '@/redux/api/user/user.api';
import React from 'react';

function OutgoingRequest() {
  const { data } = useOutgoingFriendRequestQuery(undefined);

 

  return (
    <div>
      <div
        className="
            flex gap-2 flex-wrap
            "
      >
        {data?.data?.map((item: any, idx: number) => (
          <OutgoingFriendCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

export default OutgoingRequest;
