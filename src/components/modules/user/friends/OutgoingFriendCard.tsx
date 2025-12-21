'use client';
import React, { useState } from 'react';

import { X } from 'lucide-react';
import { toast } from 'sonner';
import { FRIEND_REQUEST_STATUS } from '@/constants/constant';
import { useFilterByStatusRequestMutation } from '@/redux/api/user/user.api';

export default function OutgoingFriendCard({ item }: any) {
    const [cancelReq, setCancelReqSubmit] = useState(false);
  
  const [changeStatusRequest] = useFilterByStatusRequestMutation();

  const handleCancelRequest = async (id: string) => {
    setCancelReqSubmit(true)
    try {
      const payload = {
        status: FRIEND_REQUEST_STATUS.CANCELLED,
        id,
      };
      const res = await changeStatusRequest(payload).unwrap();
      if (res.success) {
        setCancelReqSubmit(false)
      }
    } catch (error: any) {
             setCancelReqSubmit(false)

    }
  };

  return (
  <div
  className="max-w-2xl sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm
             bg-white dark:bg-neutral-900
             shadow-md dark:shadow-neutral-800/40
             rounded-lg
             text-gray-900 dark:text-gray-100
             relative"
>
  {/* Banner */}
  <div className="rounded-t-lg w-full h-24 overflow-hidden">
    <img
      className="object-cover object-top w-full h-full"
      src={item?.recipient?.image?.banner || '/banner.jpg'}
      alt="Banner"
    />
  </div>

  {/* Profile Image */}
  <div
    className="mx-auto w-24 h-24 relative -mt-16
               border-4 border-white dark:border-neutral-900
               rounded-full overflow-hidden bg-white dark:bg-neutral-900"
  >
    <img
      className="object-cover object-center w-full h-full"
      referrerPolicy="no-referrer"
      src={item?.recipient?.image?.profile || '/logo.png'}
      alt={item?.recipient?.name}
    />
  </div>

  {/* Name */}
  <div className="text-center mt-2 pb-2">
    <h2 className="font-semibold text-gray-900 dark:text-gray-100">
      {item?.recipient?.name}
    </h2>
  </div>

  {/* Cancel Button */}
  <div className="p-3">
    <button
      disabled={cancelReq}
      onClick={() => handleCancelRequest(item?._id)}
      className="flex items-center justify-center w-full px-4 py-2 rounded-lg
                 bg-red-600 hover:bg-red-700
                 disabled:bg-red-400 disabled:cursor-not-allowed
                 text-white hover:cursor-pointer font-medium transition"
    >
      {cancelReq ? 'Cancelling...' : 'Cancel Request'}
    </button>
  </div>

  {/* Close Icon */}
  {/* <span
    className="absolute top-2 right-2 p-1 rounded-full
               bg-gray-200 dark:bg-neutral-700
               text-gray-700 dark:text-gray-200
               hover:bg-red-600 hover:text-white
               transition cursor-pointer"
  >
    <X />
  </span> */}
</div>

  );
}
