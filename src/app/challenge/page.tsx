import { IChallenge } from "@/interfaces/challenge.interface"
import ChallengeCard from "@/modules/seller/challenge/challengeCard"
import ChallengeFilters from "@/modules/seller/challenge/challengeFilter"

export const metadata = {
  title: "All Challenges | LearnMood",
  description:
    "Explore all challenges including academic, personal growth, and productivity — join one today to level up your life.",
  openGraph: {
    title: "All Challenges | LearnMood",
    description: "Discover trending and upcoming challenges from various categories.",
    url: "https://yourdomain.com/challenges",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1721322524/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Challenges Feed",
      },
    ],
  },
}

export default async function ChallengesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/challenge`, {
    cache: "no-store",
  })
  const challengesData = await res.json()
  const challenges: IChallenge[] = challengesData?.data || []

  return (
    <main className="px-6 py-4 max-w-7xl mx-auto">
      {/* ✅ Client Component for Filters + Feed */}
      <ChallengeFilters challenges={challenges} />
    </main>
  )
}
