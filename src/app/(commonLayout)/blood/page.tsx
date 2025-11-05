'use client'

import { Droplet, MapPin, Phone, Calendar, AlertCircle, Heart, Shield, Users as UsersIcon, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BloodHeroBanner from '@/modules/user/blood/bloodHeroBanner';
import { useGetbloodDonorQuery, useGetbloodRequestQuery } from '@/redux/api/blood/blood.api';
import { IBloodDonor, IBloodRequest } from '@/interfaces/blood.interface';
import { BLOOD_GROUP, BLOOD_URGENCY_LEVEL } from '@/constants/blood.constant';
import { formateExactTime } from '@/utils/formateExactTime';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image';
import { useState } from 'react';
import { IChat } from '@/modules/shared/layout/Navbar';
import ChatCard from '@/modules/shared/messages/ChatCard';
import { IUser } from '@/interfaces/user.interface';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import formatAge from '@/utils/calculateAge';

const Blood = () => {
  const [chatData, setChatData] = useState<IChat | null>(null);

  const [searchLocation, setSearchLocation] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState<BLOOD_GROUP | string>("");



  const [page, setPage] = useState(1);

  const { data: BloodRequestData, isLoading } = useGetbloodRequestQuery({
    page,
    limit: 10,
    location: searchLocation,
    bloodGroup: filterBloodGroup,
  });

  const { data: BloodDonorData } = useGetbloodDonorQuery({
    page,
    limit: 50,
    location: searchLocation,
    bloodGroup: filterBloodGroup
  })


  


  const handleChatData = (request: IBloodRequest) => {
    if (!request.requestedBy) return;
    setChatData({_id: request.requestedBy._id as string, name: request.requestedBy.name, image: request.requestedBy.image})
  }

  const handleSubmit = (e: any) => {
     e.preventDefault();
     setSearchLocation(e.target.location.value)
  }

  return (
    <>
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <div className=" px-4 py-8">
       
        {/* Hero Banner */}
          <BloodHeroBanner />
          
         {/* search and filter options */}

          <div className='flex justify-between items-center'>
            <form
              onSubmit={(e) => {
                handleSubmit(e)
                setPage(1); // reset to first page when searching
              }}
              className="relative w-full max-w-md"
            >
              <Input
                type="text"
                placeholder="Search by location..."
                // value={searchLocation}
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
                  setPage(1);
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

        <Tabs defaultValue="blood-request" className="w-full py-2  ">
      {/* Tab Buttons */}
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="blood-request">Blood Request</TabsTrigger>
        <TabsTrigger value="donor-list">Donor list</TabsTrigger>
      </TabsList>

      {/* Blood Request */}
          <TabsContent value="blood-request">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-8">
                {

                  BloodRequestData?.data?.length! > 0 ? BloodRequestData?.data?.map((request: IBloodRequest) => (
                    <Card key={request._id} className="hover-lift border-2 border-gray-100 hover:border-red-200 transition-all rounded-3xl overflow-hidden pt-0">
                      <div className={`h-2 bg-gradient-to-r 
                             ${request.urgencyLevel === BLOOD_URGENCY_LEVEL.critical && 'from-red-500 to-pink-500'}
                             ${request.urgencyLevel === BLOOD_URGENCY_LEVEL.medium && 'from-yellow-500 to-orange-500'}
                             ${request.urgencyLevel === BLOOD_URGENCY_LEVEL.normal && 'from-green-500 to-emerald-500'}
                `}></div>
                      <CardContent className="">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center justify-between  w-full space-x-4">
                            <div className=" flex rounded-full items-center justify-center shadow-md">
                              <Image src={request?.requestedBy?.image?.profile || '/logo.png'} alt="Logo" className='rounded-full object-cover' width={60} height={60} />

                            </div>


                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{request?.requestedBy!.name}</h3>
                              <Badge className={`bg-gradient-to-r 
                           ${request.urgencyLevel === BLOOD_URGENCY_LEVEL.critical && 'from-red-500 to-pink-500'}
                           ${request.urgencyLevel === BLOOD_URGENCY_LEVEL.medium && 'from-yellow-500 to-orange-500'}
                           ${request.urgencyLevel === BLOOD_URGENCY_LEVEL.normal && 'from-green-500 to-emerald-500'}
                           text-white mt-1.5 rounded-full px-3 py-1 font-bold`}

                              >
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {request.urgencyLevel}
                              </Badge>
                            </div>

                            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-2xl font-black text-red-600">{request.bloodGroup }</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 mb-6 bg-gray-50 rounded-2xl p-4">
                          <div className="flex items-start">
                            <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-600" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Location</p>
                              <p className="text-sm text-gray-900 font-semibold">{request.location}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Phone className="w-5 h-5 mr-3 mt-0.5 text-gray-600" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Contact</p>
                              <p className="text-sm text-gray-900 font-semibold">{request.contactNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Calendar className="w-5 h-5 mr-3 mt-0.5 text-gray-600" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Posted</p>
                              <p className="text-sm text-gray-900 font-semibold">{formateExactTime(request.createdAt as string)}</p>
                            </div>
                          </div>
                        </div>

                        <Button onClick={() => handleChatData(request)} className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl shadow-md py-6 font-bold">
                          <Droplet className="w-5 h-5 mr-2 fill-current" />



                          I Can Donate
                        </Button>
                      </CardContent>
                    </Card>

                  )) : 'No Blood Request Found for your query'
                  
              }
            </div>
          </TabsContent>

            
      {/* Donor List */}

          <TabsContent value="donor-list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-8">

                { BloodDonorData?.data?.length! > 0 ?
                  BloodDonorData?.data?.map((donor: IUser) => (
                  <Card key={donor._id} className="hover-lift border-2 border-gray-100 hover:border-red-200 transition-all rounded-3xl overflow-hidden pt-0">
                    <div className={`h-2 bg-gradient-to-r  from-red-500 to-pink-500
               
                `}></div>
                  <CardContent className="">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center justify-between  w-full space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-2xl font-black text-red-600">{donor?.blood ? donor?.blood : 'N/A'}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{donor?.name}</h3>
                        
                        </div>
                        
                        <div className=" flex rounded-full items-center justify-center shadow-md">
                        
                            <Image src={donor?.image?.profile || '/logo.png'} alt="Logo" className='rounded-full' width={60} height={60} />
                       
                          
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6 bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Location</p>
                            <p className="text-sm text-gray-900 font-semibold">{ donor?.address ? donor?.address : "N/A"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 mr-3 mt-0.5 text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Age</p>
                            <p className="text-sm text-gray-900 font-semibold">{formatAge(donor?.dob!)}</p>
                        </div>
                      </div>
                    </div>

                        <Button onClick={() => setChatData({ _id: donor._id as string, name: donor.name, image: donor.image })} className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl shadow-md py-6 font-bold">
                      <Droplet className="w-5 h-5 mr-2 fill-current" />
                      Message
                    </Button>
                  </CardContent>
                </Card>
                  )) : 'No Blood Donor Found for your query'
                }
            </div>
          </TabsContent>
          




        </Tabs>






        {/* Blood Requests */}
     

      </div>


      {/* Bottom Single Chat  */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-4">
        {chatData &&
          <div className="relative">
              <ChatCard user={chatData} />
              <button
                onClick={() => setChatData(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          }
      </div>
      </div>
      
      </>
  );
};

export default Blood;