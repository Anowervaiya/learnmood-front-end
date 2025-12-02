"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayCircle, FileText, LinkIcon, Clock, FileTextIcon, FileIcon } from "lucide-react";
import { IChallengeDay } from "@/interfaces/challenge.interface";
import Link from "next/link";

export const ChallengeContent = ({ days }: { days: IChallengeDay[] }) => {
  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold">Course content</h1>
        <p className="text-sm text-muted-foreground">
          {days.length} days •{" "}
          {days.reduce((acc, d) => acc + (d.video?.length || 0), 0)} videos •{" "}
          {days.reduce((acc, d) => acc + (d.notes?.length || 0), 0)} notes
        </p>
      </div>

      {/* Accordion */}
      <div className="border px-4 bg-gray-50 py-1 rounded-lg">
        <Accordion type="single" collapsible className="w-full">
          {days.map((day, index) => (
            <AccordionItem key={day._id || index} value={`section-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-semibold text-left">
                    {day.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {(day.video?.length || 0) + (day.notes?.length || 0) + (day.article ? 1 : 0)} items
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="space-y-3 pl-4">
                  {/* 📖 Article */}
                  {day.article && (
                
                    <div className="flex items-start gap-2 text-sm  pt-2 border-t mt-2">
                      <FileText className="h-4 w-4 mt-1" />
                      <span>Article</span>
                    </div>
                  
                  )}
                  {/* 🎬 Videos */}
                  {day.video && day.video.length > 0 && (
                    <div className="space-y-1">
                      {day.video.map((v, vIndex) => (
                        <div
                          key={vIndex}
                          className="flex items-center justify-between py-1 text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <PlayCircle className="h-4 w-4 text-primary" />
                            <span>{v.fileName}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">Video</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 📝 Notes */}
                  {day.notes && day.notes.length > 0 && (
                    <div className="space-y-1">
                      {day.notes.map((note, nIndex) => (
                        <div
                          key={nIndex}
                          className="flex items-center gap-2 text-sm py-1"
                        >
                          <LinkIcon className="h-4 w-4 " />
                          <a
                            href={note}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" "
                          >
                            Note {nIndex + 1}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* 📝 Notes */}
                  {day.notes && day.notes.length > 0 && (
                    <div className="space-y-1">
                   
                        <div
                       
                          className="flex items-center gap-2 text-sm py-1"
                        >
                          <FileIcon className="h-4 w-4 " />
                          <a
                            href={"#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" "
                          >
                            Quiz
                          </a>
                        </div>
                   
                    </div>
                  )}

                
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
