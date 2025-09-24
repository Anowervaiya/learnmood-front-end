// src/components/reactions/ReactionButtons.tsx
"use client";

import { ReactType } from "@/constants/constant";
import { IReact } from "@/interfaces/react.interface";
import { useAddReactMutation, useGetReactsQuery, useRemoveReactMutation, useUpdateReactMutation } from "@/redux/api/react/react.api";
import { ThumbsUp, Heart, Laugh, Frown, Angry } from "lucide-react";
import { toast } from "sonner";

const reactionOptions = [
  { type: ReactType.LIKE, icon: <ThumbsUp className="w-5 h-5" />, label: "Like" },
  { type: ReactType.LOVE, icon: <Heart className="w-5 h-5 text-red-500" />, label: "Love" },
  { type: ReactType.HAHA, icon: <Laugh className="w-5 h-5 text-yellow-500" />, label: "Haha" },
  { type: ReactType.SAD, icon: <Frown className="w-5 h-5 text-blue-500" />, label: "Sad" },
  { type: ReactType.ANGRY, icon: <Angry className="w-5 h-5 text-orange-500" />, label: "Angry" },
];

interface ReactResponse {
  data: IReact[];
  message: string;
  success: boolean;
}

export default function ReactionButtons({
  entityId,
  entityType,
  currentUserId,
}: {
  entityId: string;
  entityType: string;
  currentUserId: string;
}) {
  const { data: reacts } = useGetReactsQuery({ entityId, entityType });
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
    <div className="flex items-center gap-2">
      {reactionOptions.map((r) => (
        <button
          key={r.type}
          onClick={() => handleReact(r.type)}
          // className={`flex items-center gap-1 px-2 py-1 rounded-lg border 
         
          //   `}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border 
            ${userReact?.reactType === r.type ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"}
            `}
        >
          {r.icon}
          {/* <span className="text-sm">{reacts?.filter((x) => x.reactType === r.type).length || 0}</span> */}
        </button>
      ))}
    </div>
  );
}
