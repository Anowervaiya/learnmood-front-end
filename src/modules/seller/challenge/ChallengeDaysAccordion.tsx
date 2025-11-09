"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BookOpenIcon, FileIcon, VideoIcon } from "lucide-react";

interface ChallengeDaysAccordionProps {
  days: any[];
}

export default function ChallengeDaysAccordion({ days }: ChallengeDaysAccordionProps) {
  const handleSelect = (type: string, content: any) => {
    if ((window as any).handleSelectContent) {
      (window as any).handleSelectContent({ type, content });
    }
  };

  return (
    <Accordion type="single" collapsible className="space-y-3">
      {days?.length > 0 ? (
        days.map((day: any, index: number) => (
          <AccordionItem
            key={day._id}
            value={`day-${index}`}
            className="border rounded-xl shadow-sm bg-white/80 backdrop-blur-sm"
          >
            <AccordionTrigger className="px-4 py-3 text-lg font-medium">{day.title}</AccordionTrigger>
            <AccordionContent className="p-4 space-y-3">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleSelect("article", day.article || "No article")}
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
  );
}
