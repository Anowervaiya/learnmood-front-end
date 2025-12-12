'use client'
import { Card, CardContent } from '@/components/ui/card'
import { IPost } from '@/interfaces/post.interface'
import { IUser } from '@/interfaces/user.interface';
import { useMypostQuery } from '@/redux/api/post/post.api';
import Image from 'next/image'
import React from 'react'

function Photos({profileData} : {profileData: IUser}) {
  const page = 1
  const limit = 20
  const { data, isFetching } = useMypostQuery({ page, limit, accountId: profileData?._id }, { skip: !profileData?._id });
  const imageUrls  = [] as string[];
  // Loop through each post in the data
  data?.data.forEach((post: IPost) => {
    // Check if the post has a media array and if it's not empty
   
    if (post.media && post.media.length > 0) {
      // Loop through the media items and collect the image URLs
      post.media.forEach((mediaItem: any) => {
        if (mediaItem.type) { // Only collect image type media
          imageUrls.push(mediaItem.url);
        }
      });
    }
  });

  if(data?.data.length === 0){
    return <></>
  }
 
  return (
    <div className="">
      <div className="p-4 ">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Photos</h3>
          <a href="#" className="text-blue-600 text-sm hover:underline">
            See All Photos
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {imageUrls.slice(0,9).map((img) => (
            <div key={img} className="relative aspect-square bg-gray-200 ">
              <Image
                src={img}
                alt={`Photo ${img}`}
                fill
                className="object-cover hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Photos
