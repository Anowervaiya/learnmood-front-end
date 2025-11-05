"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FilterProps {
  search: string;
  setSearch: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
}

export default function Filters({
  search,
  setSearch,
  location,
  setLocation,
  priceRange,
  setPriceRange,
}: FilterProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label>Search by Subject</Label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g. Math, English"
          className="mt-2"
        />
      </div>

      <div>
        <Label>Location</Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Dhaka, Chittagong"
          className="mt-2"
        />
      </div>

      <div>
        <Label>Monthly Cost (৳)</Label>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          min={0}
          max={20000}
          step={500}
          onValueChange={(val) => setPriceRange([val[0], val[1]])}
          className="mt-4"
        />
        <p className="text-sm text-gray-600 mt-1">
          ৳{priceRange[0]} - ৳{priceRange[1]}
        </p>
      </div>
    </div>
  );
}
