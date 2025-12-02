"use client";
import { useState } from "react";
import { toast } from "sonner";
import { handleVideoUpload } from "@/utils/VideoUpload";
import { useCreateChallengeDayMutation, useCreateChallengeMutation } from "@/redux/api/challenge/challenge.api";
import CreateChallengeDayForm, { DayFormValues } from "@/components/modules/seller/challenge/createChallengeDayForm";
import CreateChallengeForm, { ChallengeFormValues } from "@/components/modules/seller/challenge/createChallengeForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";

export default function CreateChallenge() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [durationDays, setDurationDays] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [dayVideos, setDayVideos] = useState<File[]>([]);
  const [dayNotes, setDayNotes] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [ChallengeBanner, setChallengeBanner] = useState<File | null>(null);
  const [createChallenge] = useCreateChallengeMutation()
  const [createChallengeDay] = useCreateChallengeDayMutation()
  const pageId = searchParams.get('pageId')

 
  const handleNext = async (data: ChallengeFormValues) => {
    setSubmitting(true);
    const payload = { 
      createdBy: pageId,
      ...data
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (ChallengeBanner) {
      formData.append("file", ChallengeBanner);
    }
    try {
      const res = await createChallenge({ payload: formData }).unwrap();
     
      if (res.success) {

        toast.success("Challenge created!");
        setChallengeId(res.data._id);
        setDurationDays(data.durationDays);
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create challenge");
    }
    finally {
      setSubmitting(false);
    }
  };

  const submitDay = async (data: DayFormValues) => {
 
   
    try {
      setSubmitting(true);
      const UploadedVideosInfo = await Promise.all(
        dayVideos.map((file) => handleVideoUpload(file))
      );
     
      const payload = {
        title: data.title,
        article:data.article,
        challengeId: challengeId,
        dayNumber:currentDay,
        video: UploadedVideosInfo
      }
      const formData = new FormData()
      formData.append("data", JSON.stringify(payload));
      if (dayNotes){
        dayNotes.forEach((file) => formData.append("files", file));
      }

      const res = await createChallengeDay({ payload: formData }).unwrap();
      if (res.success) {
        toast.success(`Day ${currentDay} submitted!`);
        setDayVideos([]);
        setDayNotes([])
      
         setCurrentDay(currentDay + 1);
        
        if (currentDay === durationDays) {
          console.log('hello' , currentDay, durationDays)
           window.location.href = `/challenge/${challengeId}`;
        }
        
      }



      
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
        <CreateChallengeForm
          handleNext={handleNext}
          setChallengeBanner={setChallengeBanner}
          submitting={submitting}
        />
      )}

      {step === 2 && (
        <CreateChallengeDayForm
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        durationDays={durationDays}
        setDayVideos={setDayVideos}
        setDayNotes={setDayNotes}
        submitting={submitting}
        submitDay={submitDay}
        />
      )}
    </div>
  );
}
