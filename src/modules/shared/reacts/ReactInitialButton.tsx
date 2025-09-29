'use client';

import { useState } from "react";
import ReactionButtons from "./ReactionButtons";
import { Button } from "@/components/ui/button";
import { useGetReactsQuery } from "@/redux/api/react/react.api";
import { Angry, Frown, Heart, Laugh, ThumbsUp } from "lucide-react";

export default function ReactInitialButton({ showReactions, entityId, entityType, currentUserId }: any) {
  
  const { data: reacts } = useGetReactsQuery({ entityId, entityType });
  const userReact = reacts?.data?.find(
    (react) => react.user === currentUserId
  );

  return (
    <div

    >
      {/* Like Button */}
      {
        userReact?.reactType === 'LIKE' && <div className="flex items-center justify-center gap-2"> <span className="text-xl">👍</span> <span>Like</span></div>
    }
      {
        userReact?.reactType === 'LOVE' && <div className="flex items-center justify-center gap-2"> <span className="text-xl">❤</span>  <span>Love</span></div>
    }
      {
        userReact?.reactType === 'HAHA' && <div className="flex items-center justify-center gap-2">  <span className="text-xl">😂</span> <span>Haha</span></div>
    }
      {
        userReact?.reactType === 'SAD' && <div className="flex items-center justify-center gap-2">  <span className="text-xl">😢</span> <span>Sad</span></div>
    }
      {
        userReact?.reactType === 'ANGRY' && <div className="flex items-center justify-center gap-2">  <span className="text-xl">😡</span> <span>Angry</span></div>
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
            reacts={reacts!}
            entityType={entityType}
            currentUserId={currentUserId}
          />
        </div>
      )}
    </div>
  );
}
