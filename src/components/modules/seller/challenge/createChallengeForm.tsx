"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from "@/constants/challenge.constant";
import BannerImageUploader from "@/components/bannerImageUploader";
import { Switch } from "@/components/ui/switch";

const challengeSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(1),
  isPublic: z.boolean(),
  startsAt: z.string().min(1),
  durationDays: z.number().min(1),
  price: z.number().min(0).optional(),
});

export type ChallengeFormValues = z.infer<typeof challengeSchema>;

function CreateChallengeForm({ handleNext, setChallengeBanner, submitting }: any) {
  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      startsAt: "",

      price: 0,
      durationDays: undefined,
      isPublic: true,
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleNext)}
        className="space-y-8  bg-gradient-to-b mb-8 p-8 rounded-2xl shadow-md border "
      >
        <h2 className="text-2xl font-bold   text-center mb-6">
          🚀 Create Your Challenge
        </h2>

        {/* Media Upload */}
        <div>
          <FormLabel className="mb-2   font-semibold">
            Challenge Banner / Media
          </FormLabel>
          <BannerImageUploader setImage={setChallengeBanner} />
        </div>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="  font-medium">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 5-Day Fitness Challenge"
                  {...field}
                  className="  focus:border-blue-500 focus:ring-blue-400 bg-white/70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="  font-medium">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short description about your challenge..."
                  {...field}
                  className="  focus:border-blue-500 focus:ring-blue-400 bg-white/70 min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-6 justify-between items-center">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem >
                <FormLabel className="  font-medium">Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="  focus:ring-blue-400 focus:border-blue-500 bg-white/70">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(CHALLENGE_CATEGORY).map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="  font-medium">Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="  focus:ring-blue-400 focus:border-blue-500 bg-white/70">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(CHALLENGE_STATUS).map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
      
        {/* Start Date */}
        <FormField
          control={form.control}
          name="startsAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="  font-medium">Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className="  focus:border-blue-500 focus:ring-blue-400 bg-white/70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="durationDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="  font-medium">Duration (days)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                 
                  {...field}
                  placeholder="Duration days"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="  focus:border-blue-500 focus:ring-blue-400 bg-white/70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="  font-medium">Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                 
                  {...field}
                  placeholder="Price"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="  focus:border-blue-500 focus:ring-blue-400 bg-white/70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {/* Public / Private */}
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
              <FormLabel className="  font-semibold">
                Make Public?
              </FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md px-6 py-2 rounded-lg transition-all"
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>

  )
}

export default CreateChallengeForm
