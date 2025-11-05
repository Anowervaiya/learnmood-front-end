'use client'

import {Search } from 'lucide-react';
import BloodHeroBanner from '@/modules/user/blood/bloodHeroBanner';
import { useGetbloodDonorQuery, useGetbloodRequestQuery } from '@/redux/api/blood/blood.api';
import {  IBloodRequest } from '@/interfaces/blood.interface';
import { BLOOD_GROUP } from '@/constants/blood.constant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useRef, useState } from 'react';
import { IChat } from '@/modules/shared/layout/Navbar';
import ChatCard from '@/modules/shared/messages/ChatCard';
import { IUser } from '@/interfaces/user.interface';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PostLoading from '@/modules/shared/home/mainFeed/PostLoading';
import BloodReqCard from '@/modules/user/blood/bloodReqCard';
import BloodDonorCard from '@/modules/user/blood/bloodDonorCard';

const Blood = () => {
  const [chatData, setChatData] = useState<IChat | null>(null);
  const [AllBloodRequestData, setAllBloodRequestData] = useState<IBloodRequest[]>([]);
  const [AllBloodDonorData, setAllBloodDonorData] = useState<IUser[]>([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState<BLOOD_GROUP | string>("");
  const [bloodRequestPage, setBloodRequestPage] = useState(1);
  const [donorPage, setDonorPage] = useState(1);
  const limit = 3;

  // ✅ Queries
  const { data: BloodRequestData, isFetching: BloodRequestLoading } = useGetbloodRequestQuery({
    page: bloodRequestPage,
    limit,
    location: searchLocation,
    bloodGroup: filterBloodGroup,
  });

  const { data: BloodDonorData, isFetching: BloodDonorLoading } = useGetbloodDonorQuery({
    page: donorPage,
    limit,
    location: searchLocation,
    bloodGroup: filterBloodGroup,
  });

  // ✅ Handle chat popup
  const handleChatData = (request: IBloodRequest) => {
    if (!request.requestedBy) return;
    setChatData({
      _id: request.requestedBy._id as string,
      name: request.requestedBy.name,
      image: request.requestedBy.image
    });
  };

  // submit the search
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchLocation(e.target.location.value);
    setBloodRequestPage(1);
    setDonorPage(1);
  };

  // ✅ Infinite Scroll (Requests)
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setLoadMoreBloodReqRef = (node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node) return;

    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !BloodRequestLoading && BloodRequestData?.meta?.page! < BloodRequestData?.meta?.totalPage!) {
        setBloodRequestPage(prev => prev + 1);
      }
    }, { threshold: 0.1 });

    observerRef.current.observe(node);
  };

  // ✅ Infinite Scroll (Donors)
  const donorObserverRef = useRef<IntersectionObserver | null>(null);
  const setLoadMoreDonorRef = (node: HTMLDivElement | null) => {
    if (donorObserverRef.current) donorObserverRef.current.disconnect();
    if (!node) return;

    donorObserverRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !BloodDonorLoading && BloodDonorData?.meta?.page! < BloodDonorData?.meta?.totalPage!) {
        setDonorPage(prev => prev + 1);
      }
    }, { threshold: 0.1 });

    donorObserverRef.current.observe(node);
  };

  // ✅ Merge incoming request data
  useEffect(() => {
    if (!BloodRequestData?.data) return;

    if (bloodRequestPage === 1) setAllBloodRequestData(BloodRequestData.data);
    else setAllBloodRequestData(prev => [
      ...prev,
      ...BloodRequestData.data.filter((req: any) => !prev.some(p => p._id === req._id))
    ]);
  }, [BloodRequestData, bloodRequestPage]);

  // ✅ Merge incoming donor data
  useEffect(() => {
    if (!BloodDonorData?.data) return;

    if (donorPage === 1) setAllBloodDonorData(BloodDonorData.data);
    else setAllBloodDonorData(prev => [
      ...prev,
      ...BloodDonorData.data.filter((donor: any) => !prev.some(p => p._id === donor._id))
    ]);
  }, [BloodDonorData, donorPage]);

  
  // ✅ Cleanup observers
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      donorObserverRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <div className="px-1">
        <BloodHeroBanner />

        {/* search and filter */}
        <div className="flex justify-between items-center">
          <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Search by location..."
              name="location"
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 bg-[#f8f8f8] hover:bg-white focus:border-gray-400 focus:ring-0 focus:outline-none shadow-sm transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Search size={18} />
            </button>
          </form>

          <div className="flex gap-3 mt-4">
            <Select
              onValueChange={(value) => {
                setFilterBloodGroup(value);
                setBloodRequestPage(1);
                setDonorPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Blood Group" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(BLOOD_GROUP).map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="blood-request" className="w-full py-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="blood-request">Blood Request</TabsTrigger>
            <TabsTrigger value="donor-list">Donor List</TabsTrigger>
          </TabsList>

          {/*  Blood Request Tab */}
          <TabsContent value="blood-request">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
              {AllBloodRequestData.length > 0 ? (
                AllBloodRequestData.map((request) => (
                  <BloodReqCard request={request} handleChatData={handleChatData}/>
                ))
              ) : (
                !BloodRequestLoading && <p className="col-span-full text-center text-gray-500">No Blood Request Found</p>
              )}
              {BloodRequestLoading && Array.from({ length: limit }).map((_, i) => <PostLoading key={i} />)}
            </div>
            <div ref={setLoadMoreBloodReqRef} className="h-40" />
          </TabsContent>

          {/*  Donor List Tab */}
          <TabsContent value="donor-list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
              {AllBloodDonorData.length > 0 ? (
                AllBloodDonorData.map((donor) => (
                  <BloodDonorCard donor={donor} setChatData={setChatData}/>
                ))
              ) : (
                !BloodDonorLoading && <p className="col-span-full text-center text-gray-500">No Donor Found</p>
              )}

              {BloodDonorLoading && Array.from({ length: limit }).map((_, i) => <PostLoading key={i} />)}
            </div>
            <div ref={setLoadMoreDonorRef} className="h-40" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Window */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-4">
        {chatData && (
          <div className="relative">
            <ChatCard user={chatData} />
            <button
              onClick={() => setChatData(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blood;
