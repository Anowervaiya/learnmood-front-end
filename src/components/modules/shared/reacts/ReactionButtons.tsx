// src/components/reactions/ReactionButtons.tsx
"use client";

import { ReactType } from "@/constants/constant";
import { IReact } from "@/interfaces/react.interface";
import { useAddReactMutation} from "@/redux/api/react/react.api";


const reactionOptions = [
  { type: ReactType.like, icon: <span>👍</span>, label: "Like" },
  { type: ReactType.love, icon: <span>❤</span>, label: "Love" },
  { type: ReactType.haha, icon: <span>😂</span>, label: "Haha" },
  { type: ReactType.sad, icon: <span>😢</span>, label: "Sad" },
  { type: ReactType.angry, icon: <span>😡</span>, label: "Angry" },
];

interface ReactResponse {
  data: IReact[];
  message: string;
  success: boolean;
}

export default function ReactionButtons({

  entityId,
  entityType,
}: {
  entityId: string;
  entityType: string;
}) {
  const [addReact] = useAddReactMutation();

const handleReact = async (type: ReactType) => {
  await addReact({
    entityId,
    entityType,
    reactType: type,
  });
};

  return (
    <div className="  flex items-center gap-2 shadow-2xl  border rounded-full   dark:bg-gray-800 bg-white">
      {reactionOptions.map((r) => (
        <button
          key={r.type}
          onClick={() => handleReact(r.type)}
          // className={`flex items-center gap-1 px-2 py-1 rounded-lg border 
         
          //   `}
          className={`flex items-center p-1  text-2xl  rounded-full 
        hover:bg-blue-200 hover:scale-125 hover:cursor-pointer 
            `}
        >
          {r.icon}
          {/* <span className="text-sm">{reacts?.filter((x) => x.reactType === r.type).length || 0}</span> */}
        </button>
      ))}
    </div>
  );
}
