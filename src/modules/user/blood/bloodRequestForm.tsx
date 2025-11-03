"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2, Droplet } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { BLOOD_GROUP, BLOOD_URGENCY_LEVEL } from "@/constants/blood.constant";
import { useCreatebloodRequestMutation } from "@/redux/api/blood/blood.api";
import { IBloodRequest } from "@/interfaces/blood.interface";

// ✅ Validation Schema
const requestSchema = z.object({
  hospitalName: z.string().min(3, "hospital name is required"),
  bloodType: z.string().min(1, "blood group is required"),
  location: z.string().min(3, "Location is required"),
  urgency: z.string().min(1, "urgency level is required"),
  contact: z.string().min(11, "Valid contact number is required"),
  details: z.string().optional(),
});

type RequestFormValues = z.infer<typeof requestSchema>;

export default function BloodRequestForm() {
  const [createBloodRequest] = useCreatebloodRequestMutation();
  const [loading, setLoading] = useState(false);
  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      hospitalName: "",
      bloodType: "",
      location: "",
      urgency: "",
      contact: "",
      details: "",
    },
  });

  const onSubmit = async (data: RequestFormValues) => {
    setLoading(true);

const payload : IBloodRequest = {
      bloodGroup: data.bloodType as BLOOD_GROUP,
      contactNumber: data.contact,
      location: data.location,
      urgencyLevel: data.urgency as BLOOD_URGENCY_LEVEL,
      details: data.details,
      hospital: data.hospitalName,
      
}
    try {
      const res = await createBloodRequest({payload})
      toast.success("✅ Blood request submitted successfully!");
      console.log(res);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 to-white p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full max-w-lg shadow-lg rounded-2xl border border-red-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold flex justify-center items-center gap-2 text-red-600">
            <Droplet className="w-6 h-6 text-red-500" />
            Blood Request Form
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            Request blood from our verified donor network
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
           
              

              <div className="flex justify-between items-center ">
                {/* Blood Type */}
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(BLOOD_GROUP).map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Urgency */}
                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={`${BLOOD_URGENCY_LEVEL.normal}`}>Normal</SelectItem>
                          <SelectItem value={`${BLOOD_URGENCY_LEVEL.medium}`}>Medium</SelectItem>
                          <SelectItem value={`${BLOOD_URGENCY_LEVEL.critical}`}>Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              {/* hospital name */}
              <FormField
                control={form.control}
                name="hospitalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hospital name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Dhaka Medical College" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

             

              {/* Contact Number */}
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+8801XXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional Details */}
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any specific requirements or hospital info" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
