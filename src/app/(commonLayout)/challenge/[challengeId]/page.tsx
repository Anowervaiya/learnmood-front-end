
import { ChallengeContent } from "@/components/modules/user/challenge/ChallengeContent";
import { ChallengeDescription } from "@/components/modules/user/challenge/ChallengeDescription";
import { PricingCard } from "@/components/modules/user/challenge/PriicingCard";
import { ReviewsSection } from "@/components/modules/user/challenge/ReviewSection";
import { SimilarChallenge } from "@/components/modules/user/challenge/SimilarChallenge";
import { VideoMetadata } from "@/components/modules/user/challenge/VideoMetaData";
import { VideoPlayer } from "@/components/modules/user/challenge/VideoPlayer";



const ChallengeDetailsPage = async ({ params }: { params: { challengeId: string } }) => {
  const { challengeId } =  params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/challenge/${challengeId}`);
  const { data } = await res.json();

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Video & Content */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer video={data.challenge.banner} />
          <VideoMetadata metaData={{createdBy: data.challenge.createdBy , title: data.challenge.title}} />
          <ChallengeDescription description={data.challenge.description} />
          <ChallengeContent days={data.days} />
          <ReviewsSection />
        </div>

        {/* Right Column - Course Overview & Similar Courses */}
        <div className="lg:col-span-1 space-y-6">
          <PricingCard />
          <SimilarChallenge />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailsPage;
