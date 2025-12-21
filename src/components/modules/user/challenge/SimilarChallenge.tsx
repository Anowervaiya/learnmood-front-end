import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SimilarChallengeCard from "./SimilarChallengeCard";
import { getUpcommingChallenge } from "@/server/user/challenge.server";
import { IChallenge } from "@/interfaces/challenge.interface";


export const SimilarChallenge = async() => {
  const UpcommingChallenge = await getUpcommingChallenge()
  return (
    <div className="p-0 gap-0">
      
        <div className="text-xl mb-4 font-bold">Upcomming Challenge</div>
     
      <div className="space-y-4">
        {UpcommingChallenge?.data?.map((challenge: IChallenge, index:number) => (
          <SimilarChallengeCard key={index} challenge={challenge}/>
        ))}
      </div>
    </div>
  );
};
