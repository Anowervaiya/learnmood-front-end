'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Share2, Clock, Trophy, Smartphone, Tv } from "lucide-react";
import  { useState } from "react";
import { createBooking } from "@/server/user/mentor.server";
import { redirect } from "next/navigation";
import { IChallenge } from "@/interfaces/challenge.interface";

export const PricingCard = ({challenge} : {challenge: IChallenge}) => {
   const [submitting, setSubmitting] =  useState(false);
    const handlePurchase= async (challengeId: string) => {
      setSubmitting(true);
      const result = await createBooking(challengeId, 'Challenge');
      if (result.success) {
        setSubmitting(false);
        redirect(result?.data?.paymentUrl);
  
      } else  {
        console.log(result.error);
        setSubmitting(false);
      }
    }

  return (
    <Card >
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold">Price: {challenge.price} Tk.</span>
            <span className="text-lg text-muted-foreground line-through">£84.99</span>
          </div>
     
        </div>

        <div className="space-y-2 mb-4">
        
          <Button disabled={submitting} onClick={()=>handlePurchase(challenge._id)} variant="secondary" className="w-full hover:cursor-pointer" size="lg">
           {submitting ? 'Processing...' : ' Buy now'}
          </Button>
        </div>

        

        <div className="space-y-3 text-sm">
          <h3 className="font-semibold">This course includes:</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tv className="h-4 w-4" />
              <span>20 Days Total Duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Certificate of completion</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span>Access on mobile and TV</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Full lifetime access</span>
            </div>
          </div>
        </div>

        
      </CardContent>
    </Card>
  );
};
