'use client';

import { useState } from "react";
import ReactionButtons from "./ReactionButtons";
import { Button } from "@/components/ui/button";
import { useGetReactsQuery } from "@/redux/api/react/react.api";
import { Angry, Frown, Heart, Laugh, ThumbsUp } from "lucide-react";

export default function ReactInitialButton({ entityId, entityType, currentUserId }: any) {
  const [showReactions, setShowReactions] = useState(false);
  const { data: reacts } = useGetReactsQuery({ entityId, entityType });
  const userReact = reacts?.data?.find(
    (react) => react.user === currentUserId
  );

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      {/* Like Button */}
      {
        userReact?.reactType === 'LIKE' && <div className="flex items-center justify-center gap-2"><ThumbsUp /> <span>Like</span></div>
    }
      {
        userReact?.reactType === 'LOVE' && <div className="flex items-center justify-center gap-2"><Heart /> <span>Love</span></div>
    }
      {
        userReact?.reactType === 'HAHA' && <div className="flex items-center justify-center gap-2"> <Laugh /> <span>Haha</span></div>
    }
      {
        userReact?.reactType === 'SAD' && <div className="flex items-center justify-center gap-2"> <Frown/> <span>Sad</span></div>
    }
      {
        userReact?.reactType === 'ANGRY' && <div className="flex items-center justify-center gap-2"> <Angry /> <span>Angry</span></div>
    }

      {/* Reaction Buttons (appear above other content) */}
      {showReactions && (
        <div
          className="absolute bottom-full  left-0   z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2"
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
