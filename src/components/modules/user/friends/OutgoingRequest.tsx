'use client'
import OutgoingFriendCard from '@/components/modules/user/friends/OutgoingFriendCard';
import { useOutgoingFriendRequestQuery } from '@/redux/api/user/user.api';

function OutgoingRequest() {
  const { data } = useOutgoingFriendRequestQuery(undefined);
  return (
    <div>
      <div
        className="
            flex gap-2 flex-wrap"
      >
        {data?.data?.length>0 ? data?.data?.map((item: any, idx: number) => (
          <OutgoingFriendCard key={idx} item={item} />
        )) : 'No Outgoing Friends Found'}
      </div>
    </div>
  );
}

export default OutgoingRequest;
