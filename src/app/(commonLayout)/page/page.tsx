'use client'

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import ProfileImageUpload from "@/components/profileImageUpload";
import BannerImageUploader from "@/components/bannerImageUploader";
import { useCreatePageMutation } from "@/redux/api/page/page.api";
import { PAGE_CATEGORY } from "@/constants/page.constant";
import { useRouter } from "next/navigation";


const pageSchema = z.object({
  name: z.string().min(3, "Page name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Select a category"),
});

type PageFormValues = z.infer<typeof pageSchema> & {
  profileImage?: File | null;
  bannerImage?: File | null;
};

const categories = Object.values(PAGE_CATEGORY)

export default function PageCreationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [profileImage, setprofileImage] = useState<File | null>(null);
  const [bannerImage, setbannerImage] = useState<File | null>(null);
  const [createPage] = useCreatePageMutation()
  const router = useRouter()

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      profileImage: null,
      bannerImage: null,
    },
  });
  const onSubmit = async (data: PageFormValues) => {
    setSubmitting(true);

    const formData = new FormData();
    const jsonData = JSON.stringify({
      name: data?.name,
      description: data?.description,
      category: data?.category,
    });
    formData.append("data", jsonData);

    if (profileImage) {
      formData.append("profile", profileImage);
    }
    if (bannerImage) {
      formData.append("banner", bannerImage);
    }

    try {

      const res = await createPage({ formData }).unwrap();

      if (res.success) {
        toast.success("Page created successfully");
        router.push(`/page/${res.data._id}`)
      }
    } catch (err : any) {
      toast.error(err.data?.message);
    } finally {
      setSubmitting(false);
      
    }
  };

  return (
    <Card className="max-w-3xl w-full mx-auto mt-8 shadow-lg">
      <CardHeader>
        <BannerImageUploader setImage={setbannerImage} />
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <h1>Profile image </h1>
          {/* Profile Image Upload */}
          <ProfileImageUpload
            setImage={setprofileImage}
          />

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">



              {/* Page Name + Category */}
              <div className="md:col-span-2 grid grid-cols-1 gap-4">
                {/* Page Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. LearnReact Community" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe the page..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="flex items-center justify-end gap-3">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create Page"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
