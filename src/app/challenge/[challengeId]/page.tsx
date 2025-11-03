
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IChallenge } from "@/interfaces/challenge.interface";
import { Separator } from "@/components/ui/separator";
import { BookOpenIcon, CalendarIcon, FileIcon, GlobeIcon, StarIcon, VideoIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ChallengeDetails = async ({ params }: { params: Promise<{ challengeId: string }> }) => {
  const { challengeId } = await params;
// console.log(challengeId)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/challenge/${challengeId}`)
  const {data} = await res.json();

  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={data.challenge?.banner}
          alt={data.challenge?.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <h1 className="absolute bottom-5 left-5 text-3xl font-bold text-white">
          {data.challenge?.title}
        </h1>
      </div>

      {/* Basic Info */}
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between">
            <CardTitle className="text-2xl">{data.challenge?.title}</CardTitle>
            <Badge variant="secondary" className="capitalize">
              {data.challenge?.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>{data.challenge?.description}</p>
          <Separator />
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> 
              Starts: {new Date(data.challenge?.startsAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> 
              Ends: {new Date(data.challenge?.endsAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-yellow-500" /> 
              Ratings: {data.challenge?.ratings || 0}
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4" /> 
              {data.challenge?.isPublic ? "Public" : "Private"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Days List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5" />
          Challenge Days ({data?.days?.length})
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {data?.days?.length > 0 ? ( data?.days?.map((day: any, index: number) => (

            <AccordionItem key={day._id} value={`day-${index}`} className="border rounded-xl shadow-sm">
              <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                {day.title}
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-4">
                <p className="text-muted-foreground">{day.article}</p>

                {/* Notes Section */}
                {/* {day.notes && day.notes.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileIcon className="h-4 w-4" /> Notes
                    </h3>
                    {day.notes.map((note: string, idx: number) => (
                      <a
                        key={idx}
                        href={note}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        Download Note {idx + 1}
                      </a>
                    ))}
                  </div>
                )} */}

                {/* Video Section */}
                {/* {day.video && day.video.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <VideoIcon className="h-4 w-4" /> Video
                    </h3>
                    {day.video.map((v: any, i: number) => (
                      <video
                        key={i}
                        controls
                        src={v.url || v}
                        className="w-full rounded-xl shadow-md"
                      />
                    ))}
                  </div>
                )} */}
              </AccordionContent>
            </AccordionItem>
          ))) : "No day's found"}
          
        </Accordion>
      </div>

      {/* Join Button */}
      <div className="flex justify-center pt-4">
        <Button size="lg" className="px-10 text-lg font-semibold">
          Join Challenge
        </Button>
      </div>
    </div>
  );
}

export default ChallengeDetails
