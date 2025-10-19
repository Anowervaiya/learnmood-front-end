"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MultiVideoUploader from "@/components/mulltiVideoUploader";
import { handleVideoUpload } from "@/utils/VideoUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from "@/constants/challenge.constant";
import BannerImageUploader from "@/components/bannerImageUploader";
import { Switch } from "@/components/ui/switch";
import { useCreateChallengeMutation } from "@/redux/api/challenge/challenge.api";
import { IChallenge } from "@/interfaces/challenge.interface";

// -------------------- Schema --------------------
const challengeSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(1),
  status: z.string().min(1),
  isPublic:z.boolean(),
  startsAt: z.string().min(1),
  durationDays: z.number().min(1),
});
const daySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  article: z.string().min(10, "Article must be at least 10 characters")
});
type ChallengeFormValues = z.infer<typeof challengeSchema>;

type DayFormValues = z.infer<typeof daySchema>;


export default function CreateChallengeForm() {
  const [step, setStep] = useState(1);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [durationDays, setDurationDays] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [dayVideos, setDayVideos] = useState<{ file: { file: File } }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [ChallengeBanner, setChallengeBanner] = useState<File | null>(null);
  const [createChallenge] = useCreateChallengeMutation()

  const step1form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      status:'',
      startsAt: "",
      durationDays: 0,
      isPublic: true,
    },
  });
  const step2form = useForm<DayFormValues>({
    resolver: zodResolver(daySchema),
    defaultValues: { title: "", article: ""},
  });

 
  const handleNext = async (data: ChallengeFormValues) => {
    console.log(data)
      const formData = new FormData();
    const jsonData = JSON.stringify({...data});
     formData.append("data", jsonData);
    if (ChallengeBanner) {
      formData.append("file", ChallengeBanner);
    }



    
    try {
      const res = await createChallenge({ payload: formData }).unwrap();
      console.log(res)
      if (res.success) {
        
        toast.success("Challenge created!");
        // setChallengeId(res.data.challengeId);
        setDurationDays(data.durationDays);
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create challenge");
    }
  };

  const submitDay = async (data: DayFormValues) => {
    const VideosFiles = dayVideos.map(v => v.file.file)
    // if (!challengeId) return;
    try {
      setSubmitting(true);
      const UploadedVideosInfo = await Promise.all(
        VideosFiles.map((file) => handleVideoUpload(file))
      );
      const payload = {
        ...data,
        videos: UploadedVideosInfo
      }

      console.log(payload)
      toast.success(`Day ${currentDay} submitted!`);
      setDayVideos([]);
      if (currentDay < durationDays) setCurrentDay(currentDay + 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit day");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="max-w-3xl w-full mx-auto mt-8">
      {step === 1 && (
        <Form {...step1form}>
          <form onSubmit={step1form.handleSubmit(handleNext)} className="space-y-6 mt-4">
            <h2 className="text-xl font-semibold">Create Your Challenge</h2>
            {/* Media Upload */}
            <div>
              <FormLabel className={'mb-2'}>Challenge Banner / Media</FormLabel>
              {/* <BannerImageUploader setImage={setChallengeBanner} /> */}
              <BannerImageUploader setImage={setChallengeBanner} />
            </div>

            {/* Title */}
            <FormField
              control={step1form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 5-Day Fitness Challenge" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={step1form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a short description about your challenge..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex  gap-4 items-center">
              {/* Category */}
              
                <FormField
                  control={step1form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(CHALLENGE_CATEGORY).map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
              {/* Challenge Status */}
             
                <FormField
                  control={step1form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(CHALLENGE_STATUS).map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             
            </div>


            {/* Start Date */}
            <FormField
              control={step1form.control}
              name="startsAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              control={step1form.control}
              name="durationDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           

            

            {/* Public / Private */}
            <FormField
              control={step1form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Make Public?</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

         
            <div className="flex justify-end">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...step2form}>
          <form
            onSubmit={step2form.handleSubmit(submitDay)}
            className="space-y-6 mt-4"
          >
            <h2 className="text-lg font-semibold">
              Day {currentDay} of {durationDays}
            </h2>

            {/* Title */}
            <FormField
              control={step2form.control}
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
              control={step2form.control}
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

           

            <MultiVideoUploader
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
      )}
    </div>
  );
}
