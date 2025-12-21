import CreateChallenge from "@/components/modules/seller/challenge/createChallenge";
import { Suspense } from "react";


export default function CreateChallengePage() {
  return (
    <Suspense fallback={<div>Loading Create Challenge...</div>}>
      <CreateChallenge />
    </Suspense>
  );
}