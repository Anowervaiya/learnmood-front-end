'use client';

import { useState } from "react";
import ReactionButtons from "./ReactionButtons";
import { Button } from "@/components/ui/button";
import { Angry, Frown, Heart, Laugh, ThumbsUp } from "lucide-react";
import { useGetUserAddedReactQuery } from "@/redux/api/react/react.api";

export default function ReactInitialButton({ showReactions, entityId, entityType, currentUserId }: any) {
  
   // ✅ এখানে কল করো
  const { data: userReactData } = useGetUserAddedReactQuery({ 
    entityId, 
    entityType, 
    accountId: currentUserId 
  });

  // console.log({ 
  //   entityId, 
  //   entityType, 
  //   accountId: currentUserId 
  // }, 'user reaction')
const userReact = userReactData?.data?.reactType;
  return (
    <div

    >
      {/* Like Button */}
      {
        userReact === 'like' && <div className="flex items-center justify-center gap-2"> <span className="text-xl">👍</span> <span>Like</span></div>
    }
      {
        userReact === 'love' && <div className="flex items-center justify-center gap-2"> <span className="text-xl">❤</span>  <span>Love</span></div>
    }
      {
        userReact === 'haha' && <div className="flex items-center justify-center gap-2">  <span className="text-xl">😂</span> <span>Haha</span></div>
    }
      {
        userReact === 'sad' && <div className="flex items-center justify-center gap-2">  <span className="text-xl">😢</span> <span>Sad</span></div>
    }
      {
        userReact === 'angry' && <div className="flex items-center justify-center gap-2">  <span className="text-xl">😡</span> <span>Angry</span></div>
      }
      {
        !userReact && <div className="flex items-center justify-center gap-2"> <ThumbsUp size={20} /> <span>Like</span></div>
      }
      

      {/* Reaction Buttons (appear above other content) */}
      {showReactions && (
        <div className="absolute p-1 left-0 -top-11 z-50"
        >
    
          <ReactionButtons
            entityId={entityId}
            entityType={entityType}
            currentUserId={currentUserId}
          />
        </div>
      )}
    </div>
  );
}
