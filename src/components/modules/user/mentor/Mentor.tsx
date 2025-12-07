'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IMentor } from '@/interfaces/mentor.interface';
import PostLoading from '@/components/modules/shared/home/mainFeed/PostLoading';
import { useAllMentorQuery } from '@/redux/api/mentor/mentor.api';
import { Zap, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import BecomeTutorForm from '@/components/modules/user/become-tutor-form/BecomeTutorForm';
import { toast } from 'sonner';
import { IChat } from '@/components/modules/shared/layout/Navbar';
import ChatCard from '@/components/modules/shared/messages/ChatCard';
import MentorCard from './MentorCard';


const Mentor = () => {
 const [chatData, setChatData] = useState<IChat | null>(null);
  const [AllTutors, setAllTutors] = useState<IMentor[]>([])
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3;
  const [open, setOpen] = useState(false)
  const {data: AllMentorData , isFetching: TutorLoading} = useAllMentorQuery({page,limit , searchTerm: search})


  // submit the search
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearch(e.target.location.value);
    setPage(1);
  };

 // ✅ Handle chat popup
  const handleChatData = (tutor: IMentor) => {
    if (!tutor.userId) return;
    setChatData({
      _id: tutor.userId._id as string,
      name: tutor.userId.name,
      image: tutor.userId.image
    });
  };

  
     // ✅ Infinite Scroll (Requests)
    const observerRef = useRef<IntersectionObserver | null>(null);
    const setLoadMoreRef = (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;
  
      observerRef.current = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !TutorLoading && AllMentorData?.meta?.page! < AllMentorData?.meta?.totalPage!) {
          setPage(prev => prev + 1);
        }
      }, { threshold: 0.1 });
  
      observerRef.current.observe(node);
    };

    // ✅ Merge incoming request data
    useEffect(() => {
      if (!AllMentorData?.data) return;
  
      if (page === 1) setAllTutors(AllMentorData.data);
      else setAllTutors(prev => [
        ...prev,
        ...AllMentorData.data.filter((req: any) => !prev.some(p => p._id === req._id))
      ]);
    }, [AllMentorData, page]);
  
     // ✅ Cleanup observers
    useEffect(() => {
      return () => {
        observerRef.current?.disconnect();
      };
    }, []);

  return (
      <>
      <div className="max-w-7xl mx-auto px-4 ">

       {/* ✅ CTA Section */}
        <Card className="mb-8 p-0 border-2 border-gray-100 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center bg-gradient-to-br from-blue-50 to-purple-50">
            <Zap className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Mentor</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Share your expertise and earn money while helping others grow. Join our community of expert mentors.
            </p>
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full px-10 shadow-lg"
            >
              Apply as Mentor
            </Button>
          </CardContent>
        </Card>

        {/* ✅ Dialog for Tutor Form */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="rounded-3xl max-w-xl  max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-semibold">Become a Tutor</DialogTitle>
            </DialogHeader>
            <BecomeTutorForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>

        {/* ✅ Search and Filter */}
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Search by name, subject, location"
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
        </div>

        {/* ✅ Mentors Grid */}
        <div className="grid grid-cols-1 pt-6 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AllTutors.length > 0 ? (
            AllTutors.map((tutor: any) => <MentorCard key={tutor._id} handleChatData={handleChatData} mentor={tutor} />)
          ) : !TutorLoading ? (
            <p className="col-span-full text-center text-gray-500">No Tutor Found</p>
          ) : null}

          {TutorLoading && Array.from({ length: limit }).map((_, i) => <PostLoading key={i} />)}
        </div>

        <div ref={setLoadMoreRef} className="h-40" />
      </div>

       {/* Chat Window */}
            <div className="fixed bottom-4 right-4 z-50 flex gap-2">
              {chatData && (
                <div className="relative">
            <ChatCard user={chatData} setChatData={setChatData} />
                </div>
              )}
            </div></>
   
  );
};

export default Mentor;