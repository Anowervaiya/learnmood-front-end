'use client';
import React, { useState } from 'react';

import { X } from 'lucide-react';
import { toast } from 'sonner';
import { FRIEND_REQUEST_STATUS } from '@/constants/constant';
import { useFilterByStatusRequestMutation } from '@/redux/api/user/user.api';

export default function OutgoingFriendCard({ item }: any) {
  const [changeStatusRequest] = useFilterByStatusRequestMutation();

  const handleCancelRequest = async (id: string) => {
    try {
      const payload = {
        status: FRIEND_REQUEST_STATUS.CANCELLED,
        id,
      };
      const res = await changeStatusRequest(payload).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-2xl  sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm   bg-white shadow-md  rounded-lg text-gray-900 relative">
      <div className="rounded-t-lg w-full h-24 overflow-hidden">
        <img
          className="object-cover object-top w-[200px]"
          src={item?.recipient?.image?.banner || '/banner.jpg'}
          alt="Mountain"
        />
      </div>
      <div className="mx-auto w-24 h-24 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center w-full h-32"
          referrerPolicy="no-referrer"
          src={item?.recipient?.image?.profile || '/anower.jpg'}
          alt="Woman looking front"
        />
      </div>
      <div className="text-center mt-2 pb-2">
        <h2 className="font-semibold">{item?.recipient?.name}</h2>
        <p className="text-gray-500"> Student || Dhaka University</p>
      </div>
      <div className="p-3">
        <button
          onClick={() => handleCancelRequest(item?._id)}
          className="flex items-center hover:cursor-pointer   bg-red-500 px-4 py-2 w-full justify-center rounded-lg text-white  "
        >
          <span>Cancel Request</span>
        </button>
      </div>

      <span className=" hover:bg-red-600 hover:text-white hover:cursor-pointer absolute  top-2 right-2 bg-gray-200 rounded-full p-1">
        {' '}
        <X />
      </span>
    </div>
  );
}
