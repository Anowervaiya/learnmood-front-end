import AffiliateBoard from '@/modules/user/profile/AffiliateBoard';
import Photos from '@/modules/user/profile/Photos';
import ProfileCard from '@/modules/user/profile/ProfileCard';
import { ProfileTabs } from '@/modules/user/profile/ProfileTabs';
import Image from 'next/image';
import React from 'react'

const ProfilePage = async ({ params }: { params: Promise<{ profileId: string }> }) => {
  const { profileId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user?_id=${profileId}`)
  const profile = await res.json();
 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-full gap-6 lg:gap-8 px-4 sm:px-6 lg:px-0">
      {/* Left Side */}
    
      <div className="lg:col-span-4 lg:sticky lg:top-20  lg:h-[calc(100vh-80px)] overflow-y-autospace-y-6 ">
          <ProfileCard profileData={profile?.data[0]} />
          <Photos />
        </div>
  



      {/* Right Side */}
      <div className="lg:col-span-8 space-y-6 lg:space-y-8">
        {/* Affiliate Board */}
        <AffiliateBoard />
        <ProfileTabs profileData={profile?.data[0]} />
      </div>
    </div>

  )
}

export default ProfilePage
