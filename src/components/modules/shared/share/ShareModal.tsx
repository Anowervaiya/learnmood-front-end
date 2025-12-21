import { PiLinkSimpleBold, PiXBold } from "react-icons/pi";
import { useState } from "react";

const ShareModal = ({ open, onClose, entityId , entityType } : any) => {

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/${entityType}/${entityId}`);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-sm rounded-2xl bg-white dark:bg-neutral-900 p-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Share Post
          </h3>
          <button onClick={onClose}>
            <PiXBold size={20} />
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="
            w-full flex items-center justify-center gap-2
            rounded-full py-3
            bg-gray-100 dark:bg-neutral-800
            hover:bg-gray-200 dark:hover:bg-neutral-700
            transition
            font-medium
          "
        >
          <PiLinkSimpleBold size={20} />
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
