"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { motion } from "framer-motion";
import { TagInput } from "@/components/TagInput"
import { useState } from 'react'
import { Spinner } from "@/components/ui/spinner"


// ✅ Validation schema (zod)
const formSchema = z.object({
  subject: z.array(z.string()).min(1, "Enter at least one subject"),
  experienceYears: z.string(),
  education: z.string().min(2, "Education required"),
  location: z.string().min(2, "Location required"),
  duration: z.string().min(1, "Duration required"),
  monthlyRate: z.string().min(1, "Rate required"),
})

export default function BecomeTutorForm({ setOpen }: any) {
  const [submit, setSubmit] = useState(false)
  const [createMentor] = useCreateMentorMutation();
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: [],
      experienceYears: "",
      education: "",
      location: "",
      duration: "",
      monthlyRate: "",
    },
  })

  // ✅ Submit Handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmit(true)

    const payload = {
      ...values,
      monthlyRate: Number(values.monthlyRate),
    };
    try {

      const res = await createMentor(payload).unwrap();
      if (res.success) {
        setSubmit(false)
        setOpen(false)
        toast.success('your submission is successful')
      }
    } catch (error: any) {
      setSubmit(false)
      toast.error(error.data.message)
    }
  }

  return (

    <motion.div
      className="flex justify-center items-center  bg-gradient-to-br  p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full max-w-lg shadow-lg rounded-2xl border border-red-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold flex justify-center items-center gap-2 text-blue-600">
            Become a Tutor
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            Share your knowledge
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjects</FormLabel>
                    <FormControl>
                      <TagInput
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="Type a subject and press Enter"
                      />
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
                      <Input placeholder="e.g. 2 year " {...field} />
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
                      <Input placeholder="e.g. CSE at BUET" {...field} />
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
                      <Input placeholder="e.g. Mirpur, Dhaka, Bangladesh" {...field} />
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
                    <FormLabel>Monthly Rate (Taka)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {submit ? <Button disabled className="w-full rounded-full">
                <Spinner />
                Loading...
              </Button> : (<Button type="submit" className="w-full rounded-full" >Submit</Button>)}



            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>

  )
}
