"use client";
import React, { useEffect, useState } from "react";

import { X } from "lucide-react";
import { useSendFriendRequestMutation } from "@/redux/api/user/user.api";

export default function SendFriendCard({ item }: any) {
  const [reqSubmit, setReqSubmit] = useState(false);

  const [sendFriendRequest] = useSendFriendRequestMutation();

  const handleSendFriendRequest = async (reciepentId: string) => {
    setReqSubmit(true);
    try {
      const res = await sendFriendRequest(reciepentId).unwrap();
      if (res.success) {
        setReqSubmit(false)
       
      }
    } catch (error: any) {
        setReqSubmit(false)
    }
  };

  return (
    <div className="max-w-2xl sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm 
                bg-white dark:bg-neutral-900 
                shadow-md dark:shadow-neutral-800/40
                rounded-lg 
                text-gray-900 dark:text-gray-100 
                relative">

  {/* Banner */}
  <div className="rounded-t-lg w-full h-24 overflow-hidden">
    <img
      className="object-cover object-top w-full h-full"
      src={item?.image?.banner || "/banner.jpg"}
      alt="Banner"
    />
  </div>

  {/* Profile Image */}
  <div className="mx-auto w-24 h-24 relative -mt-16 
                  border-4 border-white dark:border-neutral-900 
                  rounded-full overflow-hidden bg-white dark:bg-neutral-900">
    <img
      className="object-cover object-center w-full h-full"
      referrerPolicy="no-referrer"
      src={item?.image?.profile || "/anower.jpg"}
      alt={item?.name}
    />
  </div>

  {/* Name */}
  <div className="text-center mt-2 pb-2">
    <h2 className="font-semibold text-gray-900 dark:text-gray-100">
      {item?.name}
    </h2>
  </div>

  {/* Action Button */}
  <div className="p-3">
    <button
      disabled={reqSubmit}
      onClick={() => handleSendFriendRequest(item?._id)}
      className="flex items-center justify-center w-full px-4 py-2 rounded-lg
                 bg-blue-600 hover:bg-blue-700
                 disabled:bg-blue-400 disabled:cursor-not-allowed
                 text-white hover:cursor-pointer font-medium transition"
    >
      {reqSubmit ? "Sending Request..." : "Send Request"}
    </button>
  </div>

  {/* Close Button */}
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
