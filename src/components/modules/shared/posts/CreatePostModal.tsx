"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserInfoResponse } from "@/interfaces/global.interfaces";
import { VISIBILITY } from "@/constants/constant";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, UserCircle, UserRoundPen } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import MultiImgUploader from "@/components/MultiImgUploader";
import { FileMetadata } from "@/hooks/use-file-upload";
import { useCreatePostMutation } from "@/redux/api/post/post.api";
import { IUser } from "@/interfaces/user.interface";
import { fi } from "zod/v4/locales";

const CreatePostModal = ({ data }: { data: any }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [createPost] = useCreatePostMutation();
  const [images, setImage] = useState<(File | FileMetadata)[] | []>([]);
  const form = useForm({
    defaultValues: {
      visibility: VISIBILITY.PUBLIC,
      content: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (inputData) => {
    setIsSubmit(true);
    const formData = new FormData();

    formData.append("data", JSON.stringify(inputData));
    // formData.append("upload_preset", "unsigned_preset");
    images.forEach((img, idx) => {
      if (img instanceof File) {
        formData.append("files", img);
      }
    });

    try {
      const res = await createPost(formData).unwrap();
      if ((res as { success?: boolean }).success) {
        // router.push('/');
        form.reset({
          visibility: VISIBILITY.PUBLIC,
          content: "",
        });

        toast.success("post created successfully");
        setIsSubmit(false);
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <div
      className="
        w-full 
        text-start 
        border 
        rounded-full 
        p-1.5
        cursor-pointer
        transition-colors
        bg-gray-100 
        border-gray-300
        text-gray-700
        hover:bg-gray-200
        dark:bg-neutral-900 
        dark:border-neutral-800 
        dark:text-gray-300
        dark:hover:bg-neutral-800
      "
    >
      <span className="pl-2">
        Hey! {data?.name?.split(' ')[0]}, Share Something Productive
      </span>
    </div>
  </DialogTrigger>

  <DialogContent
    className="
      sm:max-w-[425px]
      bg-white 
      text-gray-900
      border 
      border-gray-200
      dark:bg-neutral-900 
      dark:text-gray-100 
      dark:border-neutral-800
    "
  >
    <Form {...form}>
      <form
        id="create-post"
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DialogHeader>
          <DialogTitle className="text-center pb-3">
            Create Post
          </DialogTitle>

          <hr className="border-gray-200 dark:border-neutral-800" />

          <div className="flex gap-3 pt-2 items-center">
            {data?.data?.image?.profile ? (
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={data?.data?.image?.profile}
                  className="object-cover"
                />
                <AvatarFallback className="text-lg">
                  {data?.name}
                </AvatarFallback>
              </Avatar>
            ) : (
              <UserCircle className="w-10 h-10 rounded-full text-gray-500 dark:text-gray-400" />
            )}

            <div>
              <h1 className="text-[14px] pb-1 font-semibold text-gray-900 dark:text-gray-100">
                {data?.data?.name}
              </h1>

              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={VISIBILITY.PUBLIC}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="
                            bg-white 
                            border-gray-300
                            text-gray-900
                            dark:bg-neutral-900 
                            dark:border-neutral-700 
                            dark:text-gray-100
                          "
                        >
                          <SelectValue placeholder={VISIBILITY.PUBLIC} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent
                        className="
                          bg-white 
                          border border-gray-200
                          dark:bg-neutral-900 
                          dark:border-neutral-700
                        "
                      >
                        <SelectItem value={VISIBILITY.PUBLIC}>
                          Public
                        </SelectItem>
                        <SelectItem value={VISIBILITY.FRIENDS}>
                          Friends
                        </SelectItem>
                        <SelectItem value={VISIBILITY.FOLLOWERS}>
                          Followers
                        </SelectItem>
                        <SelectItem value={VISIBILITY.ONLY_ME}>
                          Only me
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={`Hey! ${
                        data?.name?.split(' ')[0]
                      }, Share Something Productive`}
                      className="
                        h-32 
                        resize-none 
                        border-0 
                        shadow-none
                        bg-white 
                        text-gray-900
                        placeholder:text-gray-500
                        focus:ring-0
                        dark:bg-neutral-900 
                        dark:text-gray-100
                        dark:placeholder:text-gray-500
                      "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>

      <MultiImgUploader onChange={setImage} />
    </Form>

    <DialogFooter>
      <DialogClose asChild>
        <Button
          type="button"
          variant="outline"
          className="
            border-gray-300
            dark:border-neutral-700
            dark:text-gray-300
          "
        >
          Cancel
        </Button>
      </DialogClose>

      <Button
        variant="secondary"
        className="cursor-pointer"
        type="submit"
        form="create-post"
        disabled={isSubmit}
      >
        {isSubmit ? 'Posting...' : 'Post'}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};
export default CreatePostModal;
