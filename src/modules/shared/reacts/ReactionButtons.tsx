// src/components/reactions/ReactionButtons.tsx
"use client";

import { ReactType } from "@/constants/constant";
import { IReact } from "@/interfaces/react.interface";
import { useAddReactMutation, useGetReactsQuery, useRemoveReactMutation, useUpdateReactMutation } from "@/redux/api/react/react.api";
import { ThumbsUp, Heart, Laugh, Frown, Angry } from "lucide-react";
import { toast } from "sonner";

const reactionOptions = [
  { type: ReactType.LIKE, icon: <span>👍</span>, label: "Like" },
  { type: ReactType.LOVE, icon: <span>❤</span>, label: "Love" },
  { type: ReactType.HAHA, icon: <span>😂</span>, label: "Haha" },
  { type: ReactType.SAD, icon: <span>😢</span>, label: "Sad" },
  { type: ReactType.ANGRY, icon: <span>😡</span>, label: "Angry" },
];

interface ReactResponse {
  data: IReact[];
  message: string;
  success: boolean;
}

export default function ReactionButtons({
  reacts,
  entityId,
  entityType,
  currentUserId,
}: {
    reacts: ReactResponse,
  entityId: string;
  entityType: string;
  currentUserId: string;
}) {
  // const { data: reacts } = useGetReactsQuery({ entityId, entityType });
  const [addReact] = useAddReactMutation();
  const [updateReact] = useUpdateReactMutation();
  const [removeReact] = useRemoveReactMutation();

  const userReact = reacts?.data?.find(
    (react) => react.user === currentUserId
  );

  const handleReact = async (type: string) => {
    

    if (userReact) {
      if (userReact.reactType === type) {
        // remove if same reaction clicked again
        await removeReact({id:userReact._id , entityId});
      } else {
      
       await updateReact({ id: userReact?._id, reactType: type ,entityId});
        
      }
    } else {
      
      await addReact({
        entityId,
        entityType,
        reactType: type as ReactType,
        user: currentUserId,
      });
    }
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
