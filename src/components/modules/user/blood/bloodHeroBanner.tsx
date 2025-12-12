"use client";

import { Droplet, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BecomeDonorForm from "./becomeDonorForm";
import BloodRequestForm from "./bloodRequestForm";
import { useState } from "react";

export default function BloodHeroBanner() {
  const [open, setOpen] = useState(false)
  return (
    <Card className="mb-6 p-0 overflow-hidden border-2 border-red-200 shadow-md rounded-3xl">
      <div className="relative bg-gradient-to-br p-6 from-red-500 via-pink-500 to-red-600 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Droplet className="w-10 h-10 text-white fill-current" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold">Be a Hero</h2>
                  <p className="text-red-100 text-lg">
                    One donation can save three lives
                  </p>
                </div>
              </div>

              <p className="text-lg text-red-50 mb-6 max-w-2xl">
                Join our community of life-savers. Every donation makes a
                difference in someone's life. Register as a donor or post a
                blood requirement to get instant help from our verified donor
                network.
              </p>

              <div className="flex flex-wrap gap-4 ">
                {/* ✅ Blood Request Dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className=" text-white-600 hover:bg-red-50 rounded-full px-8 shadow-lg font-bold"
                    >
                      <Droplet className="w-5 h-5 mr-2" />
                      Request Blood
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Request Blood Donation
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <BloodRequestForm setOpen={setOpen} />
                    </div>
                  </DialogContent>
                </Dialog>

                {/* ✅ Become Donor Dialog */}
                {/* <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 font-bold backdrop-blur-sm"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Become a Donor
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl max-w-xl  max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center text-red-600">
                        Become a Blood Donor ❤️
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {/* 👇 Insert your awesome donor form here */}
                      {/* <BecomeDonorForm setOpen={setOpen} />
                    </div> */}
                  {/* </DialogContent>
                </Dialog> */} 
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
