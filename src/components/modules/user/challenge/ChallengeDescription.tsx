'use client'

import { useState } from "react";

export const ChallengeDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Optional: limit only if long
  const isLong = description.length > 180;

  return (
    <div onClick={() => setIsExpanded(!isExpanded)} className="text-sm bg-gray-100 rounded-lg  p-4  leading-relaxed text-muted-foreground whitespace-pre-wrap hover:cursor-pointer">
      {isExpanded ? (
        <>
          {description}
          <span
            onClick={() => setIsExpanded(false)}
            className="text-primary cursor-pointer select-none"
          >
            {" "}See less
          </span>
        </>
      ) : (
        <>
          {isLong ? (
            <>
              {description.slice(0, 180)}{/* Approx 3 lines */}
              <span
                onClick={() => setIsExpanded(true)}
                className="text-primary cursor-pointer select-none"
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
