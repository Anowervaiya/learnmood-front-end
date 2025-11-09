"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FileIcon, VideoIcon, BookOpenIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ChallengeDays({ data }: any) {
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const handleSelect = (type: string, content: any) => {
    setSelectedContent({ type, content });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Left side: Accordion */}
      <div className="space-y-3">
        <Accordion type="single" collapsible className="space-y-3">
          {data?.days?.length > 0 ? (
            data.days.map((day: any, index: number) => (
              <AccordionItem
                key={day._id}
                value={`day-${index}`}
                className="border rounded-xl shadow-sm bg-white/80 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                  {day.title}
                </AccordionTrigger>
                <AccordionContent className="p-4 space-y-3">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        handleSelect("article", day.article || "No article")
                      }
                      className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition"
                    >
                      <BookOpenIcon className="h-4 w-4 text-blue-500" />
                      <span>Read Article</span>
                    </button>

                    {day.notes?.length > 0 && (
                      <button
                        onClick={() => handleSelect("notes", day.notes)}
                        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition"
                      >
                        <FileIcon className="h-4 w-4 text-green-500" />
                        <span>View Notes</span>
                      </button>
                    )}

                    {day.video?.length > 0 && (
                      <button
                        onClick={() => handleSelect("videos", day.video)}
                        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition"
                      >
                        <VideoIcon className="h-4 w-4 text-red-500" />
                        <span>Watch Videos</span>
                      </button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p className="text-gray-500">No days found</p>
          )}
        </Accordion>
      </div>

      {/* Right side: Content Viewer */}
      <div className="bg-white/90 backdrop-blur-sm border rounded-2xl shadow-lg p-6">
        {selectedContent ? (
          <>
            {selectedContent.type === "article" && (
              <div>
                <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5 text-blue-500" /> Article
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {selectedContent.content}
                </p>
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
                    <video
                      key={i}
                      controls
                      src={v.url || v}
                      className="w-full rounded-xl shadow-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 italic text-center">
            Select an article, note, or video to view
          </p>
        )}
      </div>
    </div>
  );
}
