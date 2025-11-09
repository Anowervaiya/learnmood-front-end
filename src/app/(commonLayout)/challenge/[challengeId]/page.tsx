import ChallengeContent from "@/modules/seller/challenge/ChallengeContent";
import ChallengeDaysAccordion from "@/modules/seller/challenge/ChallengeDaysAccordion";

interface ChallengeDetailsPageProps {
  params: { challengeId: string };
}

const ChallengeDetailsPage = async ({ params }: ChallengeDetailsPageProps) => {
  const { challengeId } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/challenge/${challengeId}`);
  const { data } = await res.json();

  return (
    <div className="w-full p-6 space-y-8">
      <div className="grid grid-cols-3 gap-8 ">
        {/* Left side: Banner + Description + Dynamic content */}
        <div className=" col-span-2 space-y-6">
          <ChallengeContent challenge={data.challenge} days={data.days} />
        </div>

        {/* Right side: Accordion */}
        <div className="col-span-1">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            Challenge Days ({data?.days?.length})
          </h2>

          <ChallengeDaysAccordion days={data.days} />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailsPage;
