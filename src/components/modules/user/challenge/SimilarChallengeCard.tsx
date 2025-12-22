import { IChallenge } from '@/interfaces/challenge.interface'
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function SimilarChallengeCard({challenge} : {challenge:IChallenge}) {
  return (
    <Link href={`/challenge/${challenge?._id}`}><div className="flex my-2 gap-3 pb-4 border-b last:border-0 last:pb-0 cursor-pointer hover:bg-muted/50  rounded-lg transition-colors">
            <img
              src={challenge.banner}
              alt={challenge.title}
              className="w-32 h-20 object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm line-clamp-2 ">{challenge.title}</h4>
              <p className="text-normal text-muted-foreground ">{challenge?.createdBy?.name}</p>
              {/* <div className="flex items-center gap-1 "> */}
                {/* <span className="text-xs font-bold text-warning">5</span>
                <Star className="h-3 w-3 fill-warning text-warning" /> */}
                {/* <span className="text-xs text-muted-foreground">({challenge.participantCount})</span>
              </div> */}
              <div className="flex items-baseline gap-2">
           <span className='text-md text-muted-foreground '>{challenge.price} tk</span>
                {/* <span className="text-xs text-muted-foreground line-through">{challenge.price}</span> */}
              </div>
            </div>
          </div></Link>
  )
}

export default SimilarChallengeCard