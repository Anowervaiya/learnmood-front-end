import { IComment } from "@/interfaces/react.interface";
import { formateExactTime } from "@/utils/formateExactTime";




export default function CommentCard( {comment} : {comment:IComment}) {
  return (
    <div className="flex items-start gap-3 p-3 border-b border-gray-200 dark:border-gray-700">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
      
          <img
            src={comment?.accountId?.image?.profile || '/logo.png'}
            alt={comment?.accountId?.name}
            className="w-full h-full object-cover"
          />
       
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {/* Name + Time */}
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
            {comment?.accountId?.name || "Unknown User"}
          </p>
          <span className="text-xs text-gray-500">
            {formateExactTime(comment.createdAt)}
          </span>
        </div>

        {/* Comment Text */}
        <p className="text-sm  text-gray-700 dark:text-gray-300 mt-1">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
