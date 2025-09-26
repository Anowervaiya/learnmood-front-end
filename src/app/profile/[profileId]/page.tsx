import { Profile } from '@/modules/user/profile/Profile';
import React from 'react'

const ProfilePage = async ({ params }: { params: Promise<{ profileId: string }> }) => {
  const { profileId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user?_id=${profileId}`)
  const profile = await res.json();
  console.log(profile.data);
  return (
    <div>
      <Profile/>
    </div>
  )
}

export default ProfilePage
