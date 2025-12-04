import AffiliateBoard from '@/components/modules/user/profile/AffiliateBoard';
import Photos from '@/components/modules/user/profile/Photos';
import ProfileCard from '@/components/modules/user/profile/ProfileCard';
import { ProfileTabs } from '@/components/modules/user/profile/ProfileTabs';
import { getUserProfile } from '@/server/user/user.server';
import Image from 'next/image';
import React from 'react'

const ProfilePage = async ({ params }: { params: Promise<{ profileId: string }> }) => {
  const { profileId } = await params;

const profileData = await getUserProfile(profileId);
const profile = profileData.data[0];

 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-full gap-6 lg:gap-8 px-4 sm:px-6 lg:px-0">
      {/* Left Side */}
    
      <div className="lg:col-span-5 lg:sticky lg:top-20  lg:h-[calc(100vh-80px)] overflow-y-auto space-y-6 ">
          <ProfileCard profileData={profile} />
        <Photos profileData={profile} />
        </div>
  



      {/* Right Side */}
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        {/* Affiliate Board */}
        <AffiliateBoard />
        <ProfileTabs profileData={profile} />
      </div>
    </div>

  )
}

export default ProfilePage
