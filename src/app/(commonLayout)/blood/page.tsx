
import { Droplet, MapPin, Phone, Calendar, AlertCircle, Heart, Shield, Users as UsersIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mockBloodDonations } from '@/utils/mockData';
import BloodHeroBanner from '@/modules/user/blood/bloodHeroBanner';

interface UrgencyColors {
  [key: string]: string;
}

interface UrgencyLevels {
  Critical: string;
  Moderate: string;
  Normal: string;
}

const Blood = () => {
  const getUrgencyColor = (urgency: keyof UrgencyLevels): string => {
    const colors: UrgencyColors = {
      'Critical': 'from-red-500 to-pink-500',
      'Moderate': 'from-yellow-500 to-orange-500',
      'Normal': 'from-green-500 to-emerald-500'
    };
    return colors[urgency] || 'from-gray-500 to-gray-600';
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <div className=" px-4 py-8">
        {/* Hero Section
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold rounded-full">
              ❤️ Community Care
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Blood <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Donation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save lives by donating blood or requesting donors from our community
          </p>
        </div> */}

        {/* Hero Banner */}
       <BloodHeroBanner/>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Heart, label: 'Lives Saved', value: '10,000+', color: 'red' },
            { icon: UsersIcon, label: 'Active Donors', value: '5,000+', color: 'blue' },
            { icon: Droplet, label: 'Donations', value: '15,000+', color: 'pink' },
            { icon: Shield, label: 'Success Rate', value: '98%', color: 'green' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="border-2 border-gray-100 shadow-md hover-lift rounded-2xl">
                <CardContent className="pt-6 text-center">
                  <Icon className={`w-10 h-10 mx-auto mb-3 text-${stat.color}-600`} />
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Blood Requests */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Blood Requests</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBloodDonations.map((request:any) => (
            <Card key={request.id} className="hover-lift border-2 border-gray-100 hover:border-red-200 transition-all rounded-3xl overflow-hidden pt-0">
              <div className={`h-2 bg-gradient-to-r ${getUrgencyColor(request.urgency)}`}></div>
              <CardContent className="">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-2xl font-black text-red-600">{request.bloodType}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{request.name}</h3>
                      <Badge className={`bg-gradient-to-r ${getUrgencyColor(request.urgency)} text-white mt-1.5 rounded-full px-3 py-1 font-bold`}>
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {request.urgency}
                      </Badge>
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
                      <p className="text-sm text-gray-900 font-semibold">{request.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 mt-0.5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Posted</p>
                      <p className="text-sm text-gray-900 font-semibold">{request.date}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl shadow-md py-6 font-bold">
                  <Droplet className="w-5 h-5 mr-2 fill-current" />
                  I Can Donate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blood;