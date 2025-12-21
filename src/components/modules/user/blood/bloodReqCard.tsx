import { IBloodRequest } from '@/interfaces/blood.interface'
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { BLOOD_URGENCY_LEVEL } from '@/constants/blood.constant';
import { AlertCircle, Calendar, Droplet, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formateExactTime } from '@/utils/formateExactTime';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function BloodReqCard({ request, handleChatData }: { request: IBloodRequest, handleChatData: any }) {
  return (
    <Card
  key={request._id}
  className="
    transition-all 
    rounded-3xl 
    overflow-hidden 
    pt-0
    bg-white 
    hover:bg-gray-50
    border border-gray-200
    dark:bg-neutral-900 
    dark:border-neutral-800 
    dark:hover:bg-neutral-800
  "
>
  <CardContent className="pt-6">
    <div className="flex items-start justify-between mb-1">
      <div className="flex items-center justify-between w-full space-x-4">
        <Link
          href={`/profile/${request?.requestedBy?._id}`}
          className="flex items-center justify-between gap-4"
        >
          <div className="
            w-16 
            h-16 
            rounded-full 
            overflow-hidden 
            flex 
            items-center 
            justify-center 
            bg-gray-100
            dark:bg-neutral-800
          ">
            <Image
              src={request?.requestedBy?.image?.profile || '/logo.png'}
              alt="Profile"
              width={60}
              height={60}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
              {request?.requestedBy!.name}
            </h3>

            <Badge
              className={`
                bg-gradient-to-r 
                text-white 
                mt-1.5 
                rounded-full 
                px-3 
                py-1 
                font-bold
                ${
                  request.urgencyLevel === BLOOD_URGENCY_LEVEL.critical &&
                  'from-red-500 to-pink-500'
                }
                ${
                  request.urgencyLevel === BLOOD_URGENCY_LEVEL.medium &&
                  'from-yellow-500 to-orange-500'
                }
                ${
                  request.urgencyLevel === BLOOD_URGENCY_LEVEL.normal &&
                  'from-green-500 to-emerald-500'
                }
              `}
            >
              <AlertCircle className="w-3 h-3 mr-1" />
              {request.urgencyLevel}
            </Badge>
          </div>
        </Link>

        <div className="
          w-16 
          h-16 
          rounded-full 
          flex 
          items-center 
          justify-center 
          shadow-md
          bg-gradient-to-br 
          from-red-100 
          to-pink-100
          dark:from-red-900/40 
          dark:to-pink-900/40
        ">
          <span className="text-2xl font-black text-red-600 dark:text-red-400">
            {request.bloodGroup}
          </span>
        </div>
      </div>
    </div>

    <div className="
      space-y-2 
      mb-0 
      rounded-2xl 
      p-4
      bg-gray-50 
      dark:bg-neutral-800
    ">
      <div className="flex items-start">
        <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-600 dark:text-gray-400" />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Location
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
            {request.location}
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Phone className="w-5 h-5 mr-3 mt-0.5 text-gray-600 dark:text-gray-400" />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Contact
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
            {request.contactNumber}
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Calendar className="w-5 h-5 mr-3 mt-0.5 text-gray-600 dark:text-gray-400" />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Posted
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
            {formateExactTime(request.createdAt as string)}
          </p>
        </div>
      </div>
    </div>

    <Button
      onClick={() => handleChatData(request)}
      className="
        w-full 
        rounded-full 
        shadow-md 
        py-5 
        font-bold
        bg-red-600 
        hover:bg-red-700
        text-white
      "
    >
      <Droplet className="w-5 h-5 mr-2 fill-current" />
      I Can Donate
    </Button>
  </CardContent>
</Card>

  )
}

export default BloodReqCard
