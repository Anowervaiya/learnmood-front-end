import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, FileText, Clock } from "lucide-react";

const sections = [
  {
    title: "Introduction to Contract Law",
    lectures: 5,
    duration: "42min",
    items: [
      { title: "Welcome to the course", type: "video", duration: "2:45" },
      { title: "Course overview", type: "video", duration: "5:30" },
      { title: "What is a contract?", type: "video", duration: "12:15" },
      { title: "Essential elements", type: "video", duration: "15:20" },
      { title: "Section quiz", type: "quiz", duration: "6:10" }
    ]
  },
  {
    title: "Contract Formation",
    lectures: 8,
    duration: "1hr 15min",
    items: [
      { title: "Offer and acceptance", type: "video", duration: "18:30" },
      { title: "Consideration", type: "video", duration: "14:25" }
    ]
  },
  {
    title: "Contract Terms and Interpretation",
    lectures: 6,
    duration: "58min",
    items: []
  }
];

export const ChallengeContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Course content</CardTitle>
        <p className="text-sm text-muted-foreground">
          19 sections • 127 lectures • 21h 2m total length
        </p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-semibold text-left">{section.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {section.lectures} lectures • {section.duration}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between py-2 text-sm">
                      <div className="flex items-center gap-2">
                        {item.type === "video" ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                        <span>{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
