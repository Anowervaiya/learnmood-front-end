'use client';
import Link from 'next/link';

import React, { useState } from 'react';
import {
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  Code,
  Film,
  Flame,
  House,
  Lightbulb,
  MessageSquare,
  Moon,
  Palette,
  PieChart,
  Plus,
  Search,
  SquarePlay,
  Sun,
  Trophy,
  Users,
  Users2,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
function Navbar() {
  const [activeMode, setActiveMode] = useState('growth');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 mx-auto max-w-7xl">
          {/* right side  */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center ">
                <Image
                  src="/logo.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </div>
            </Link>
            <div className="hidden md:flex items-center justify-center flex-1 max-w-md ">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for skills, people..."
                  className="pl-9 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-700 border-none rounded-full focus-visible:ring-blue-500"
                />
              </div>
            </div>
          </div>
          {/* middle */}
          <div className="flex items-center gap-3 md:gap-6 lg:gap-12">
            <Link
              href={'/'}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {' '}
              <House />
            </Link>
            <Link
              href={'/friends'}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {' '}
              <Users />
            </Link>
            <Link
              href={'/course'}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {' '}
              <SquarePlay />
            </Link>
            <Link
              href={'/challenge'}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {' '}
              <Trophy />
            </Link>
          </div>
          {/* left side */}
          <div className="flex items-center gap-5">
            <span
              onClick={toggleTheme}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDark ? <Sun /> : <Moon />}
            </span>

            <span className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <MessageSquare />
            </span>

            <span className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Bell />
            </span>

            {/* avatar  */}
            <div className="flex items-center gap-4">
          
      
                <Button variant={'ghost'}>
                  <Link href={'/login'}>Login</Link>
                </Button>
              
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
