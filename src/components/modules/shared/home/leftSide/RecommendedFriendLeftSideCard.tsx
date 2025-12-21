'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useSendFriendRequestMutation } from '@/redux/api/user/user.api';
import { UserPlus } from 'lucide-react';
import React, { useState } from 'react'

function RecommendedFriendLeftSideCard({friend}: any) {
     const [reqSubmit, setReqSubmit] = useState(false);
    
      const [sendFriendRequest] = useSendFriendRequestMutation();
    
      const handleSendFriendRequest = async (reciepentId: string) => {
        setReqSubmit(true);
        try {
          const res = await sendFriendRequest(reciepentId).unwrap();
          if (res.success) {
            setReqSubmit(false);
          }
        } catch (error: any) {
          setReqSubmit(false);
        }
      };
  return (
    <div>
        
        <div  className="border rounded-lg p-2">
                            <div className="flex justify-between">
                              {" "}
                              <div className="flex items-center gap-2">
                                <div className=" rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                  <Avatar className="w-8 h-8  border-2 border-blue-500">
                                    <AvatarImage
                                      className="object-cover"
                                      src={friend?.image?.profile}
                                      alt="User"
                                    />
                                  </Avatar>
                                </div>
                                <div>
                                  <p className="font-medium text-sm overflow-hidden">
                                    {friend.name.length > 10
                                      ? friend.name.slice(0, 16) + ".."
                                      : friend.name}
                                  </p>
        
                                  {/* <p className="text-[12px] text-gray-700">
                                {friend.designation}
                              </p> */}
                                </div>
                              </div>
                              <Button
                              disabled={reqSubmit}
                                onClick={() => handleSendFriendRequest(friend?._id)}
                                size="sm"
                                variant="outline"
                                className="h-8 rounded-full"
                              >
                                {reqSubmit ? '...' :<UserPlus className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
    </div>
  )
}

export default RecommendedFriendLeftSideCard