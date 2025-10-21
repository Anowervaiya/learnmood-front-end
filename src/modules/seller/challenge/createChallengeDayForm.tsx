"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MultiVideoUploader from "@/components/mulltiVideoUploader";
import MultiFileUploader from "@/components/multiFileUploader";
import { useRef } from "react";

const daySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  article: z.string().min(10, "Article must be at least 10 characters")
});

export type DayFormValues = z.infer<typeof daySchema>;

function CreateChallengeDayForm({ submitDay, durationDays, currentDay, setDayVideos, setCurrentDay, submitting, setDayNotes }: any) {

  const videoUploaderRef = useRef<{ clearAllVideos: () => void }>(null);
  const fileUploaderRef = useRef<{ clearAllFiles: () => void }>(null);

  const form = useForm<DayFormValues>({
    resolver: zodResolver(daySchema),
    defaultValues: { title: "", article: "" },
  });

  const handleSubmit = async (data :DayFormValues) => {
    await submitDay(data);
    form.reset();
    videoUploaderRef.current?.clearAllVideos();
    fileUploaderRef.current?.clearAllFiles();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-4"
      >
        <h2 className="text-lg font-semibold">
          Day {currentDay} of {durationDays}
        </h2>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder={`Day ${currentDay} Title`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Article */}
        <FormField
          control={form.control}
          name="article"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article / Notes</FormLabel>
              <FormControl>
                <Textarea placeholder={`Day ${currentDay} article`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <MultiFileUploader setFiles={setDayNotes} ref={fileUploaderRef} />
        <MultiVideoUploader
          ref={videoUploaderRef} 
          setVideos={setDayVideos}
        />



        <div className="flex justify-between">
          {currentDay > 1 && (
            <Button
              variant="outline"
              type="button"
              onClick={() => setCurrentDay(currentDay - 1)}
            >
              Previous Day
            </Button>
          )}
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Day"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateChallengeDayForm
