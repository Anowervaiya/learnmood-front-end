"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useCreateMentorMutation } from "@/redux/api/mentor/mentor.api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// ✅ Validation schema (zod)
const formSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  subject: z.string().min(2, "Enter at least one subject"),
  experienceYears: z.string().min(1, "Experience required"),
  education: z.string().min(2, "Education required"),
  location: z.string().min(2, "Location required"),
  duration: z.string().min(1, "Duration required"),
  monthlyRate: z.string().min(1, "Rate required"),
})

export default function BecomeTutorForm() {
  const [createMentor] = useCreateMentorMutation();
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
      subject: "",
      experienceYears: "",
      education: "",
      location: "",
      duration: "",
      monthlyRate: "",
    },
  })

  // ✅ Submit Handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    // Convert string → array and string → number where needed
    const payload = {
      ...values,
      subject: values.subject
        .toString()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      monthlyRate: Number(values.monthlyRate),
      experienceYears: Number(values.experienceYears),
    };

    try {

      const res = await createMentor(payload).unwrap();
      if (res.success) {
        toast.success('your submission is successful')
       router.push('/') 
      }
    } catch (error) {
      
    }
    // try {
    //   const res = await fetch("/api/mentors/become", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //     body: JSON.stringify({
    //       ...values,
    //       subject: values.subject.split(",").map(s => s.trim()), // convert comma separated → array
    //       experienceYears: Number(values.experienceYears),
    //       monthlyRate: Number(values.monthlyRate),
    //     }),
    //   })

    //   const data = await res.json()
    //   if (!res.ok) throw new Error(data.error || "Failed to submit")
    //   alert("Mentor application submitted successfully ✅")
    //   form.reset()
    // } catch (err: any) {
    //   alert(err.message)
    // }
  }

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Become a Mentor</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a short bio..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjects</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Math, Physics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experienceYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience (Years)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. BSc in Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Dhaka, Bangladesh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 2 hour" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Rate</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
