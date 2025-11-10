
import { ChallengeContent } from "@/modules/user/challenge/ChallengeContent";
import { ChallengeDescription } from "@/modules/user/challenge/ChallengeDescription";
import { PricingCard } from "@/modules/user/challenge/PriicingCard";
import { ReviewsSection } from "@/modules/user/challenge/ReviewSection";
import { SimilarChallenge } from "@/modules/user/challenge/SimilarChallenge";
import { VideoMetadata } from "@/modules/user/challenge/VideoMetaData";
import { VideoPlayer } from "@/modules/user/challenge/VideoPlayer";

interface ChallengeDetailsPageProps {
  params: { challengeId: string };
}

const ChallengeDetailsPage = async ({ params }: ChallengeDetailsPageProps) => {
  const { challengeId } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/challenge/${challengeId}`);
  const { data } = await res.json();

  return (
    <div className="min-h-screen bg-background">
      

      <div className="container px-4">

        

      
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Video & Content */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer />
            <VideoMetadata/>
            <ChallengeDescription />
            <ChallengeContent />
            <ReviewsSection />
          </div>

          {/* Right Column - Course Overview & Similar Courses */}
          <div className="lg:col-span-1 space-y-6">
            <PricingCard />
            <SimilarChallenge />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChallengeDetailsPage;
