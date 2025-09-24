'use client';

import { useState } from "react";
import ReactionButtons from "./ReactionButtons";
import { Button } from "@/components/ui/button";

export default function ReactInitialButton({ entityId, entityType, currentUserId }: any) {
  const [showReactions, setShowReactions] = useState(false);
  
  return (
    <div
      className="relative flex"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      {/* Like Button */}
      <Button
        variant="ghost"
        className="flex gap-2 text-gray-600 dark:text-gray-300 justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
        <span>Like</span>
      </Button>

      {/* Reaction Buttons (appear above other content) */}
      {showReactions && (
        <div
          className="absolute bottom-full  left-0   z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2"
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
