import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

function Photos() {
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="relative aspect-square bg-gray-200 ">
              <Image
                src="/anower.jpg"
                alt={`Photo ${i}`}
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
