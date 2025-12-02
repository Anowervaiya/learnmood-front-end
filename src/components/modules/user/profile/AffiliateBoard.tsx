import Image from 'next/image'
import React from 'react'

function AffiliateBoard() {
  return (
    <div className="relative h-64  rounded-2xl overflow-hidden mb-8">
      <Image src="/banner.jpg" alt="Cover" fill className="object-cover " />
    </div>
  )
}

export default AffiliateBoard
