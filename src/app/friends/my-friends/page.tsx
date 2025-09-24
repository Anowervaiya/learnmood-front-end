'use client'
import MyFriendsTable from '@/components/MyFriendsTable'
import { useMyFriendsQuery } from '@/redux/api/user/user.api'
import React from 'react'

function MyFriends() {
  const { data } = useMyFriendsQuery(undefined);

  return (
    <div className='max-w-[500px]'>

      <MyFriendsTable data={data?.data?.friends} />

    </div>
  )
}

export default MyFriends