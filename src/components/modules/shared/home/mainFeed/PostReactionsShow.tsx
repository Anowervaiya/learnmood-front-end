// components/posts/PostReactions.tsx
'use client';

import { ReactType } from "@/constants/constant";
import { ThumbsUp, Heart, Laugh, Frown, Angry } from "lucide-react";
import { JSX } from "react";

const reactionIcons = {
  like: <span className="text-xl">👍</span>,
  love: <span className="text-xl">❤</span>,
  haha: <span className="text-xl">😂</span>,
  sad: <span className="text-xl">😢</span>,
  angry: <span className="text-xl">😡</span>
};

interface Props {
  reactions?: Record<ReactType, number>;
}

export default function PostReactionsShow({ reactions }: Props) {
  const sortedReactions = Object.entries(reactions || {})
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  const topReactions = sortedReactions.slice(0, 3);
  const totalCount = sortedReactions.reduce((sum, [, count]) => sum + count, 0);

  

  return (
    <div className="flex items-center gap-1">
      <div className="flex -space-x-2">
        {topReactions.map(([type], index) => (
          <span
            key={type}
            className="inline-flex items-center justify-center w-5 h-5 rounded-full  text-xs"
            style={{ zIndex: topReactions.length - index }}
          >
            {reactionIcons[type as ReactType]}
          </span>
        ))}
      </div>
      <span className="text-sm  ml-1 text-gray-600 dark:text-gray-300">
        {totalCount === 0 ? '0 like' : totalCount} 
      </span>
    </div>
  );
}
