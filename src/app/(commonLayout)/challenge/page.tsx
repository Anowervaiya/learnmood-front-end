"use client"

import { useState, useEffect, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IChallenge } from "@/interfaces/challenge.interface"
import { useGetAllChallengesQuery } from "@/redux/api/challenge/challenge.api"
import PostLoading from "@/modules/shared/home/mainFeed/PostLoading"
import ChallengeSearchBar from "@/modules/seller/challenge/challengeSearchBar"
import ChallengeCard from "@/modules/seller/challenge/challengeCard"



export default function ChallengesPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const limit = 10;
  const [AllChallenge, setAllChallenge] = useState<IChallenge[]>([])

  const { data: ChallengeData, isFetching } = useGetAllChallengesQuery({ page, limit, searchTerm: search })

  // submit the search
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    setPage(1);
  };



  // ✅ Infinite Scroll (Requests)
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setLoadMoreRef = (node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node) return;

    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isFetching && ChallengeData?.meta?.page! < ChallengeData?.meta?.totalPage!) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 0.1 });

    observerRef.current.observe(node);
  };

  // ✅ Merge incoming request data
  useEffect(() => {
    if (!ChallengeData?.data) return;

    if (page === 1) setAllChallenge(ChallengeData.data);
    else setAllChallenge(prev => [
      ...prev,
      ...ChallengeData.data.filter((challenge: any) => !prev.some(p => p._id === challenge._id))
    ]);
  }, [ChallengeData, page]);

  // ✅ Cleanup observers
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);


  return (
    <main className="px-6 py-4 w-full max-w-7xl mx-auto">
      
     
  
        <div className="flex items-center justify-center w-full mb-6">
          {/* 🔍 YouTube-style searchbar */}
          <ChallengeSearchBar search={search} setSearch={setSearch} handleSubmit={handleSubmit} />

  
        </div>

        {/* 📦 Challenge Grid */}
        <div className="grid gap-y-5 gap-x-3 sm:grid-cols-2 lg:grid-cols-3">
          {AllChallenge.length > 0 ? (
            AllChallenge.map((challenge: IChallenge) => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))
          ) : (!isFetching &&
            <p className="text-center col-span-full  text-gray-500 mt-8 w-full">
              No challenges found.
            </p>
          )}
          {isFetching && Array.from({ length: limit }).map((_, i) => <PostLoading key={i} />)}

        </div>
        <div ref={setLoadMoreRef} className="h-40" />

    </main>
  )
}
