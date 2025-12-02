import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { IMentor } from '@/interfaces/mentor.interface'
import { Star, Users, Clock, MessageCircle, Award, Zap, Search, Clock1, Map, MapPin } from 'lucide-react';
import Link from 'next/link';

function TutorCard({ tutor, handleChatData }: { tutor: IMentor, handleChatData: any }) {
  return (
   
      <Card
        key={tutor._id}
        className="hover-lift p-0 border-2 border-gray-100 hover:border-purple-200 transition-all rounded-3xl overflow-hidden h-full"
      >
        <CardContent className="p-4 h-full flex flex-col justify-between">
          {/* ✅ Top Section */}
        
            <div className="flex flex-col justify-start items-center text-center">
            <div className='w-full '>
            <Link  href={`/profile/${tutor.userId._id}`}>
                <div className="flex justify-start w-full items-center">
                  <div className="relative mb-5">
                    <Avatar className="w-18 h-18 ring-4  ring-gray-100 shadow-lg">
                      <AvatarImage className='object-cover' src={tutor?.userId?.image?.profile || '/logo.png'} />
                      <AvatarFallback>{tutor?.userId?.name}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-start pl-5">
                    <h3 className="font-bold text-xl text-gray-900 mb-1">{tutor?.userId?.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 font-medium">{tutor.education}</p>
                  </div>
                </div>

              </Link>
            </div>

              <div className="mb-4 w-full px-4">
                <div className="flex items-center justify-between space-x-4 mb-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1.5 text-blue-600" />
                    <span className="font-semibold">student</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
                    <span className="font-semibold">{tutor?.experienceYears}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock1 className="w-4 h-4 mr-1.5 text-blue-600" />
                    <span className="font-semibold">{tutor?.duration}/day</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5 text-blue-600" />
                  <span className="text-sm text-gray-600 text-start">{tutor.location}</span>
                </div>
              </div>

              {/* ✅ Subjects Section */}
              <div className="flex flex-wrap gap-2 justify-start w-full px-4 mb-5">
                {tutor?.subject?.map((subject: any, index: number) => (
                  <Badge key={index} variant="outline" className="border-2 border-gray-200 rounded-full px-3 py-1">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
        

          {/* ✅ Bottom Section (Always at Bottom) */}
          <div>
            <div className="w-full bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">Monthly Rate</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {tutor?.monthlyRate}
                </span>
              </div>
            </div>

            <div className="flex space-x-3 w-full">
            <Button onClick={() => handleChatData(tutor)} className="flex-1 bg-gradient-to-r  hover:cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-md">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" className="flex-1 border-2 hover:cursor-pointer rounded-xl">
                Hire me
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
   

  )
}

export default TutorCard
