
import { ChallengeContent } from "@/components/modules/user/challenge/ChallengeContent";
import { ChallengeDescription } from "@/components/modules/user/challenge/ChallengeDescription";
import { PricingCard } from "@/components/modules/user/challenge/PriicingCard";
import { ReviewsSection } from "@/components/modules/user/challenge/ReviewSection";
import { SimilarChallenge } from "@/components/modules/user/challenge/SimilarChallenge";
import { VideoMetadata } from "@/components/modules/user/challenge/VideoMetaData";
import { VideoPlayer } from "@/components/modules/user/challenge/VideoPlayer";
import { getChallengeDetailsInfo } from "@/server/user/challenge.server";
import { getFollowStatus } from "@/server/user/follow.server";



const ChallengeDetailsPage = async ({ params }: { params: Promise<{ challengeId: string }> }) => {
  const { challengeId } = await params;

  const {data} = await getChallengeDetailsInfo(challengeId);

  const followingId = data?.challenge?.createdBy?._id;

  
  const {data:followStatus} = await getFollowStatus(followingId);


  


  return (
    <div className="min-h-screen w-full bg-background">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Video & Content */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer video={data.challenge.banner} />
          <VideoMetadata metaData={{createdBy: data.challenge.createdBy , title: data.challenge.title, followStatus: followStatus.isFollowing}} />
          <ChallengeDescription description={data.challenge.description} />
          <ChallengeContent days={data.days} />
          <ReviewsSection />
        </div>

        {/* Right Column - Course Overview & Similar Courses */}
        <div className="lg:col-span-1 space-y-6">
          <PricingCard challenge={data.challenge} />
          <SimilarChallenge />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailsPage;
