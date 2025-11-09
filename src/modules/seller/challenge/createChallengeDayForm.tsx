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
        className="space-y-6 mb-8 bg-white shadow-lg border border-gray-200 rounded-2xl p-6 transition-all duration-300"
      >
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
          Day { currentDay<=durationDays ? currentDay :( currentDay-1 )} of {durationDays}
        </h2>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder={`Day ${currentDay} Title`}
                  {...field}
                  className="bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                />
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
              <FormLabel className="text-gray-700 font-medium">Article</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Day ${currentDay} article`}
                  {...field}
                  className="bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <div>
          <FormLabel className="text-gray-700 font-medium">Notes</FormLabel>
          <div className="border border-dashed border-gray-300 p-4 rounded-lg hover:border-blue-400 transition-all duration-300 bg-gray-50/50">
            <MultiFileUploader setFiles={setDayNotes} ref={fileUploaderRef} />
          </div>
        </div>

        {/* Videos */}
        <div>
          <FormLabel className="text-gray-700 font-medium">Videos</FormLabel>
          <div className="border border-dashed border-gray-300 p-4 rounded-lg hover:border-blue-400 transition-all duration-300 bg-gray-50/50">
            <MultiVideoUploader ref={videoUploaderRef} setVideos={setDayVideos} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            disabled={submitting || currentDay>durationDays}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-300"
          >
            {submitting ? "Submitting..." : "Submit Day"}
          </Button>
        </div>
      </form>
    </Form>


  )
}

export default CreateChallengeDayForm
