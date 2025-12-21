'use client'

import { useState } from "react";

export const ChallengeDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Optional: limit only if long
  const isLong = description.length > 180;

  return (
    <div
  onClick={() => setIsExpanded(!isExpanded)}
  className="
    text-sm 
    p-4 
    rounded-lg 
    leading-relaxed 
    whitespace-pre-wrap 
    cursor-pointer
    transition-colors
    bg-gray-100 
    text-gray-700 
    hover:bg-gray-200
    dark:bg-neutral-900 
    dark:text-gray-300 
    dark:hover:bg-neutral-800
  "
>
  {isExpanded ? (
    <>
      {description}
      <span
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(false);
        }}
        className="
          ml-1 
          text-primary 
          font-medium 
          cursor-pointer 
          select-none
        "
      >
        See less
      </span>
    </>
  ) : (
    <>
      {isLong ? (
        <>
          {description.slice(0, 180)}
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            className="
              ml-1 
              text-primary 
              font-medium 
              cursor-pointer 
              select-none
            "
          >
            ...See more
          </span>
        </>
      ) : (
        description
      )}
    </>
  )}
</div>

  );
};
