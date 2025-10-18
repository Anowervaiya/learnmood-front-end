"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TutorCard from "./TutorCard";
import Filters from "./Filters";
import { IMentor } from "@/interfaces/mentor.interface";
import { Loader2 } from "lucide-react";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<IMentor[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<IMentor[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🧠 Fetch data directly from backend
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mentor`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch tutors");
        const {data} = await res.json();
        setTutors(data);
        setFilteredTutors(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  // 🧩 Filter tutors dynamically
  useEffect(() => {
    const results = tutors.filter((tutor) => {
      const matchesLocation = location
        ? tutor.location?.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesSearch = search
        ? tutor.subject?.some((s) =>
          s.toLowerCase().includes(search.toLowerCase())
        )
        : true;
      const matchesPrice =
        tutor.monthlyRate >= priceRange[0] &&
        tutor.monthlyRate <= priceRange[1];
      return matchesLocation && matchesSearch && matchesPrice;
    });
    setFilteredTutors(results);
  }, [search, location, priceRange, tutors]);
  console.log(filteredTutors)
  // 🧭 Render
  return (
    <main className="min-h-screen flex flex-col lg:flex-row gap-6 p-4 sm:p-6 bg-gray-50">
      {/* Left Filter Section */}
      <aside className="w-full lg:w-1/4 bg-white p-4 rounded-2xl shadow-md h-fit sticky top-4">
        <Filters
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </aside>

      {/* Right Tutor List */}
      <section className="flex-1">
       

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="animate-spin text-gray-500" size={28} />
            <span className="ml-2 text-gray-600">Loading tutors...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {/* Tutors List */}
        {!loading && !error && (
          <>
            {filteredTutors?.length === 0 ? (
              <p className="text-gray-500">No tutors found...</p>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1  lg:grid-cols-2 gap-4"
              >
                {filteredTutors?.map((tutor) => (
                  <TutorCard key={tutor._id} tutor={tutor} />
                ))}
              </motion.div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
