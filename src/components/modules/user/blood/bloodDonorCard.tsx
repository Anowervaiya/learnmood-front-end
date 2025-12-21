import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Calendar, Droplet, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IUser } from '@/interfaces/user.interface';
import formatAge from '@/utils/calculateAge';
import Link from 'next/link';

function BloodDonorCard({ donor, setChatData }: { donor: IUser, setChatData: any }) {
  return (
   <Card
  key={donor._id}
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
          href={`/profile/${donor._id}`}
          className="flex items-center justify-between gap-4"
        >
          <div
            className="
              w-16 
              h-16 
              rounded-full 
              overflow-hidden 
              flex 
              items-center 
              justify-center 
              bg-gray-100
              dark:bg-neutral-800
            "
          >
            <Image
              src={donor?.image?.profile || '/logo.png'}
              alt="Profile"
              width={60}
              height={60}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
              {donor?.name}
            </h3>
          </div>
        </Link>

        <div
          className="
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
          "
        >
          <span className="text-2xl font-black text-red-600 dark:text-red-400">
            {donor?.bloodGroup ?? 'N/A'}
          </span>
        </div>
      </div>
    </div>

    <div
      className="
        space-y-2 
        mb-0 
        rounded-2xl 
        p-4
        bg-gray-50 
        dark:bg-neutral-800
      "
    >
      <div className="flex items-start">
        <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-600 dark:text-gray-400" />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Location
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
            {donor?.address || 'N/A'}
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Calendar className="w-5 h-5 mr-3 mt-0.5 text-gray-600 dark:text-gray-400" />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Age
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
            {formatAge(donor?.dob!)}
          </p>
        </div>
      </div>
    </div>

    <Button
      onClick={() =>
        setChatData({
          _id: donor._id as string,
          name: donor.name,
          image: donor.image,
        })
      }
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
      Message
    </Button>
  </CardContent>
</Card>

  )
}

export default BloodDonorCard;
