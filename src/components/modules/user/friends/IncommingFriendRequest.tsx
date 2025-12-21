'use client'
import IncomingFriendCard from '@/components/modules/user/friends/IncommingFriendCard';

import { useIncommingFriendRequestQuery } from '@/redux/api/user/user.api';
import React from 'react';

function IncommingRequest() {
    const { data } = useIncommingFriendRequestQuery(undefined);
  return (
    <div>
      <div>
        <div
          className="
            flex gap-2 flex-wrap
            "
        >
          {data?.data?.incomingReqs?.length> 0 ? data?.data?.incomingReqs?.map((item: any, idx: number) => (
            <IncomingFriendCard key={idx} item={item} />
          )) : 'No Incomming Frinds Found'}
        </div>
      </div>
    </div>
  );
}

export default IncommingRequest;
