
import { Code, PieChart, Plus, Trophy, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useAllUserQuery } from '@/redux/api/user/user.api';
import { getUpcommingChallenge } from '@/server/user/challenge.server';
import { SimilarChallenge } from '@/components/modules/user/challenge/SimilarChallenge';
// import { recommendedfriends } from '../leftSide/LeftSiderbar';
async function RightSiderbar () {
const upcommingChallenge = await getUpcommingChallenge()

  return (
    <>
<aside className="
  hidden lg:block col-span-3
  sticky top-20
  h-[calc(100vh-80px)]
  overflow-y-auto
  scrollbar-hover
  
">       
          
        
           <SimilarChallenge/>
        
       

       
      </aside>
    </>
  );
}

export default RightSiderbar;
