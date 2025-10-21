
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IChallenge } from "@/interfaces/challenge.interface";

const ChallengeDetails = async ({ params }: { params: Promise<{ challengeId: string }> }) => {
  const { challengeId } = await params;
// console.log(challengeId)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/challenge/${challengeId}`)
  const challenge = await res.json();
console.log(challenge)
  // return (
  //   // <div className="max-w-4xl mx-auto my-8 p-4 space-y-6">

  //   //   {/* Banner */}
  //   //   <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
  //   //     <Image
  //   //       src={challenge.data[0].banner || "/banner-placeholder.jpg"}
  //   //       alt={challenge.data[0].title}
  //   //       fill
  //   //       className="object-cover"
  //   //     />
  //   //   </div>

  //   //   {/* Title and Category */}
  //   //   <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
  //   //     <h1 className="text-3xl font-bold">{challenge.data[0].title}</h1>
  //   //     <Badge variant="secondary" className="text-sm">{challenge.data[0].category}</Badge>
  //   //   </div>

  //   //   {/* Status and Dates */}
  //   //   <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
  //   //     <span>Status: <strong>{challenge.data[0].status}</strong></span>
  //   //     <span>Starts: {new Date(challenge.data[0].startsAt).toLocaleDateString()}</span>
  //   //     <span>Ends: {new Date(challenge.data[0].endsAt || "").toLocaleDateString()}</span>
  //   //     <span>Duration: {challenge.data[0].durationDays} {challenge.data[0].durationDays > 1 ? "days" : "day"}</span>
  //   //   </div>

  //   //   {/* Description */}
  //   //   <Card className="shadow-md">
  //   //     <CardContent>
  //   //       <h2 className="text-xl font-semibold mb-2">About this Challenge</h2>
  //   //       <p className="text-muted-foreground">{challenge.data[0].description}</p>
  //   //     </CardContent>
  //   //   </Card>

  //   //   {/* Enroll Button */}
  //   //   <div className="flex justify-center mt-6">
  //   //     <Button
  //   //       // onClick={() => onEnroll(challenge.data[0]._id)}
  //   //       className="px-8 py-3 text-lg"
  //   //     >
  //   //       Enroll Now
  //   //     </Button>
  //   //   </div>

  //   //   {/* Optional: Ratings or Participants */}
  //   //   <Card className="shadow-md mt-4">
  //   //     <CardContent>
  //   //       <h2 className="text-lg font-semibold mb-2">Challenge Info</h2>
  //   //       <div className="flex gap-4 text-sm text-muted-foreground">
  //   //         <span>Ratings: {challenge.data[0].ratings}</span>
  //   //         <span>Participants: {challenge.data[0]?.participants?.length || 0}</span>
  //   //       </div>
  //   //     </CardContent>
  //   //   </Card>
  //   // </div>
  // );
}

export default ChallengeDetails
