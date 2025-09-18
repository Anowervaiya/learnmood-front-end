import { Button } from '@/components/ui/button';

import { Code, PieChart, Plus, Trophy, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { recommendedfriends } from './LeftSiderbar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
function RightSiderbar() {
  return (
    <>
      <aside className="hidden xl:block w-[280px] sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
        <Card className="border-none shadow-sm bg-white dark:bg-gray-800">
          <CardHeader>
            <h3 className="font-semibold">Upcoming Challenges</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="font-medium text-sm">
                    30-Day Coding Challenge
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Build one small project every day for 30 days
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Starts in 2 days
                  </p>
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                    500 XP
                  </Badge>
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="font-medium text-sm">
                    Data Visualization Hackathon
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Create innovative data visualizations for social impact
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Next weekend
                  </p>
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                    750 XP
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Frequent Chat  */}
        <div className=" shadow-sm p-4   ">
          <h3 className="font-semibold pb-4">Frequent Chat </h3>

          <div className="flex flex-col gap-1">
            {recommendedfriends.map((friend, idx) => (
              <div key={idx} className="border rounded-lg p-2">
                <div className="flex justify-between">
                  {' '}
                  <div className="flex items-center gap-2">
                    <div className=" rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Avatar className="w-8 h-8  border-2 border-blue-500">
                        <AvatarImage
                          className="object-cover"
                          src={friend.image}
                          alt="User"
                        />
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium text-sm overflow-hidden">
                        {friend.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default RightSiderbar;
