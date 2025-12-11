import ChallengeCard from "@/components/modules/user/challenge/challengeCard";
import { IChallenge } from "@/interfaces/challenge.interface";
import { getMyChallenge } from "@/server/user/challenge.server";

export default async function MyChallengePage() {
  const response = await getMyChallenge();
  const challenge: IChallenge[] = response?.data || [];

  console.log(challenge, "my challenge");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Challenges</h1>
        <p className="text-muted-foreground mt-2">
          View all your challenges what you purchased
        </p>
      </div>
    
      <div className="grid gap-y-5 gap-x-3 sm:grid-cols-2 lg:grid-cols-3">
        {challenge.length > 0 ? (
          challenge?.map((item) => (
            <ChallengeCard key={item._id} challenge={item} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 mt-8 w-full">
            No challenges found.
          </p>
        )}
      </div>
      {/* <UserChallengesList challenges={challenge} /> */}
    </div>
  );
}
