
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { IMentor } from '@/interfaces/mentor.interface'
import { useUserInfoQuery } from '@/redux/api/auth/auth.api';
import { createBooking } from '@/server/user/tutor.server';
import { Star, Users, Clock, MessageCircle, Award, Zap, Search, Clock1, Map, MapPin } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

function MentorCard({ mentor, handleChatData }: { mentor: IMentor, handleChatData: any }) {
  const [submitting, setSubmitting] =  React.useState(false);
  const {data:userMe} = useUserInfoQuery(undefined) as any



  const handleHireMe = async (mentorId: string) => {

    if(mentor?.userId._id== userMe?.data?._id) {
      return toast.error('you can not book yourself ')
    }
    setSubmitting(true);
    const result = await createBooking(mentorId, 'Mentor');
    if (result.success) {
      setSubmitting(false);
      redirect(result?.data?.paymentUrl);

    } else  {
      console.log(result.error);
      setSubmitting(false);
    }
  }
  return (
   
     <Card
  key={mentor._id}
  className="hover-lift p-0 border-2 border-gray-100 dark:border-neutral-700 hover:border-purple-200 dark:hover:border-purple-400 transition-all rounded-3xl overflow-hidden h-full bg-white dark:bg-neutral-900"
>
  <CardContent className="p-4 h-full flex flex-col justify-between">
    {/* ✅ Top Section */}
    <div className="flex flex-col justify-start items-center text-center">
      <div className='w-full '>
        <Link href={`/profile/${mentor.userId._id}`}>
          <div className="flex justify-start w-full items-center">
            <div className="relative mb-5">
              <Avatar className="w-18 h-18 ring-4 ring-gray-100 dark:ring-neutral-700 shadow-lg">
                <AvatarImage className='object-cover' src={mentor?.userId?.image?.profile || '/logo.png'} />
                <AvatarFallback>{mentor?.userId?.name}</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-start pl-5">
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-1">{mentor?.userId?.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium">{mentor.education}</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mb-4 w-full px-4">
        <div className="flex items-center justify-between space-x-4 mb-1 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1.5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">{mentor.studentCount}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">{mentor?.experienceYears}</span>
          </div>
          <div className="flex items-center">
            <Clock1 className="w-4 h-4 mr-1.5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">{mentor?.duration}/day</span>
          </div>
        </div>

        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1.5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300 text-start">{mentor.location}</span>
        </div>
      </div>

      {/* ✅ Subjects Section */}
      <div className="flex flex-wrap gap-2 justify-start w-full px-4 mb-5">
        {mentor?.subject?.map((subject: any, index: number) => (
          <Badge
            key={index}
            variant="outline"
            className="border-2 border-gray-200 dark:border-neutral-700 rounded-full px-3 py-1 text-gray-700 dark:text-gray-300"
          >
            {subject}
          </Badge>
        ))}
      </div>
    </div>

    {/* ✅ Bottom Section (Always at Bottom) */}
    <div>
      <div className="w-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl p-4 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Monthly Rate</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {mentor?.monthlyRate}
          </span>
        </div>
      </div>

      <div className="flex space-x-3 w-full">
        <Button
          onClick={() => handleChatData(mentor)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-md text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </Button>
        <Button
          disabled={submitting || mentor?.userId._id === userMe?.data?._id}
          onClick={() => handleHireMe(mentor._id)}
          variant="outline"
          className="flex-1 border-2 hover:cursor-pointer dark:border-neutral-700 hover:border-purple-400 rounded-xl text-gray-900 dark:text-gray-100"
        >
          {submitting ? 'Processing...' : 'Hire Me'}
        </Button>
      </div>
    </div>
  </CardContent>
</Card>

   

  )
}

export default MentorCard
