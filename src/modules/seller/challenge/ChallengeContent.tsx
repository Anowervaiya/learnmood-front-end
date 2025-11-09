"use client";

import Image from "next/image";
import { useState } from "react";
import { BookOpenIcon, FileIcon, VideoIcon } from "lucide-react";
import ChallengeDescription from "@/modules/user/challenge/ChallengeDescription";

interface ChallengeContentWrapperProps {
  challenge: any;
  days: any[];
}

export default function ChallengeContent({ challenge, days }: ChallengeContentWrapperProps) {
  const [selectedContent, setSelectedContent] = useState<any>(null);

  // Expose setter globally so accordion can call it
  (window as any).handleSelectContent = setSelectedContent;

  return (
    <div className="bg-white/90 backdrop-blur-sm border rounded-2xl shadow-lg p-6 min-h-[300px]">
      {selectedContent ? (
        <>
          {selectedContent.type === "article" && (
            <div>
              <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-blue-500" /> Article
              </h3>
              <p className="text-gray-700 whitespace-pre-line">{selectedContent.content}</p>
            </div>
          )}

          {selectedContent.type === "notes" && (
            <div>
              <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                <FileIcon className="h-5 w-5 text-green-500" /> Notes
              </h3>
              <div className="space-y-2">
                {selectedContent.content.map((note: string, idx: number) => (
                  <a
                    key={idx}
                    href={note}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 underline text-sm"
                  >
                    Download Note {idx + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

          {selectedContent.type === "videos" && (
            <div>
              <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                <VideoIcon className="h-5 w-5 text-red-500" /> Videos
              </h3>
              <div className="space-y-3">
                {selectedContent.content.map((v: any, i: number) => (
                  <video key={i} controls src={v.url || v} className="w-full rounded-xl shadow-md" />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Initially show banner + description */}
          <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-4">
            <Image
              src={challenge.banner}
              alt={challenge.title}
              fill
              className="object-cover"
            />
          </div>

          <ChallengeDescription challenge={challenge} />
        </>
      )}
    </div>
  );
}
