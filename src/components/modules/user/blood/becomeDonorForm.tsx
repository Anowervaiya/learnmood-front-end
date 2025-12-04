"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Loader2, HeartPulseIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BLOOD_GROUP } from "@/constants/blood.constant";

// ✅ Validation Schema
const donorSchema = z.object({
  bloodGroup: z.string().nonempty("Please select your blood group"),
  location: z.string().min(3, "Location is required"),
  quantity: z.string().optional(),
  lastDonationDate: z.string().optional(),
});

type DonorFormValues = z.infer<typeof donorSchema>;

export default function BecomeDonorForm({setOpen} : any) {
  const [loading, setLoading] = useState(false);
  const form = useForm<DonorFormValues>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      bloodGroup: "",
      location: "",
      quantity: "",
      lastDonationDate: "",
    },
  });

  const onSubmit = async (data: DonorFormValues) => {
    setLoading(true);
    try {
      // 🔥 Replace with your backend API endpoint
      const res = await fetch("/api/blood/become-donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
     
      alert("You are now a blood donor! ❤️");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-white p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full max-w-lg shadow-lg rounded-2xl border border-red-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold flex justify-center items-center gap-2 text-red-600">
            <HeartPulseIcon className="w-6 h-6 text-red-500" />
            Become a Donor
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            Help save lives by sharing your information
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Blood Group */}
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Select
                onValueChange={(val) => form.setValue("bloodGroup", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your blood group" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(BLOOD_GROUP).map(
                    (group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              {form.formState.errors.bloodGroup && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.bloodGroup.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="e.g., Dhaka Medical College"
                {...form.register("location")}
              />
              {form.formState.errors.location && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label>Quantity (Bags/Units)</Label>
              <Input
                type="number"
                placeholder="e.g., 1"
                {...form.register("quantity")}
              />
            </div>

            {/* Last Donation Date */}
            <div className="space-y-2">
              <Label>Last Donation Date</Label>
              <Input type="date" {...form.register("lastDonationDate")} />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
