'use client'
import IncomingFriendCard from '@/components/modules/shared/friends/IncommingFriendCard';

import { useIncommingFriendRequestQuery } from '@/redux/api/user/user.api';
import React from 'react';

function IncommingRequest() {
    const { data } =
      useIncommingFriendRequestQuery(undefined);
  

  return (
    <div>
      <div>
        <div
          className="
            flex gap-2 flex-wrap
            "
        >
          {data?.data?.incomingReqs?.map((item: any, idx: number) => (
            <IncomingFriendCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default IncommingRequest;
