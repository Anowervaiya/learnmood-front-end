import ChallengeCard from "@/components/modules/user/challenge/challengeCard";
import MyTutorTable from "@/components/modules/user/mentor/MyTutorTable";
import MyFriendsTable from "@/components/MyFriendsTable";
import { IChallenge } from "@/interfaces/challenge.interface";
import { IMentor } from "@/interfaces/mentor.interface";
import { getMyChallenge } from "@/server/user/challenge.server";
import { getMyTutors } from "@/server/user/tutor.server";

export default async function MyTutorsPage() {

  const response = await getMyTutors();
  const tutors: IMentor[] = response?.data || [];

 

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tutors</h1>
        <p className="text-muted-foreground mt-2">
          View all your tutors those you hired
        </p>
      </div>
    
      <div className="grid gap-y-5 gap-x-3 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.length > 0 ? (
        
            // <ChallengeCard key={item._id} challenge={item} />
            <MyTutorTable mentors={tutors} />
         
        ) : (
          <p className="text-center col-span-full text-gray-500 mt-8 w-full">
            No Tutors found.
          </p>
        )}
      </div>
    </div>
  );
}
