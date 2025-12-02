import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Calendar, Droplet, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IUser } from '@/interfaces/user.interface';
import formatAge from '@/utils/calculateAge';

function BloodDonorCard({ donor, setChatData }: { donor: IUser, setChatData: any }) {
  return (
    <Card key={donor._id} className="hover:bg-gradient-to-r from-red-50/50 to-pink-50/50 hover-lift transition-all rounded-3xl overflow-hidden pt-0">
      <div className="h-2 bg-gradient-to-r from-red-500 to-pink-500"></div>
      <CardContent>
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center justify-between w-full space-x-4">
            <div className="flex items-center justify-between gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                <Image
                  src={donor?.image?.profile || '/logo.png'}
                  alt="Profile"
                  width={60}
                  height={60}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{donor?.name}</h3>
              </div>
           </div>

            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-md">
              <span className="text-2xl font-black text-red-600">{donor?.blood ?? 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-0 rounded-2xl p-4">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Location</p>
              <p className="text-sm text-gray-900 font-semibold">{donor?.address || 'N/A'}</p>
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

        <Button
          onClick={() => setChatData({ _id: donor._id as string, name: donor.name, image: donor.image })}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full shadow-md py-5 font-bold"
        >
          <Droplet className="w-5 h-5 mr-2 fill-current" />
          Message
        </Button>
      </CardContent>
    </Card>
  )
}

export default BloodDonorCard;
