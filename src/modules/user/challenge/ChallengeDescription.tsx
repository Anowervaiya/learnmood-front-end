'use client'

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ChallengeDescription = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <div className={`text-sm leading-relaxed text-muted-foreground ${!isExpanded ? 'line-clamp-3' : ''}`}>
          <p className="mb-4">
            This comprehensive course is designed to help you master the language of business law and contract law.
            Whether you're a legal professional, business person, or student, this course will give you the English
            skills you need to succeed in the international business and legal environment.
          </p>
          {isExpanded && (
            <>
              <p className="mb-4">
                You'll learn essential terminology, phrases, and language structures used in contract drafting,
                negotiation, and dispute resolution. Through practical examples and real-world scenarios, you'll
                develop the confidence to communicate effectively in legal business contexts.
              </p>
              <p>
                By the end of this course, you'll be able to understand complex legal documents, participate in
                contract negotiations, and use appropriate legal English in professional settings.
              </p>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          className="mt-4 p-0 h-auto text-primary "
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>Show less <ChevronUp className="ml-1 h-4 w-4" /></>
          ) : (
            <>Show more <ChevronDown className="ml-1 h-4 w-4" /></>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
