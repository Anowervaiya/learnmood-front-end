'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserInfoResponse } from '@/interfaces/global.interfaces';
import { VISIBILITY } from '@/constants/constant';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, UserRoundPen } from 'lucide-react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import MultiImgUploader from '@/components/MultiImgUploader';
import { FileMetadata } from '@/hooks/use-file-upload';
import { useCreatePostMutation } from '@/redux/api/post/post.api';

const CreatePostModal = ({ data }: UserInfoResponse) => {
    const [open, setOpen] = useState(false);
  // adjust import path if needed
  const [createPost] = useCreatePostMutation();

  const router = useRouter();
  const [images, setImage] = useState<(File | FileMetadata)[] | []>([]);


  const form = useForm({
    defaultValues: {
      visibility: '',
      content: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async inputData => {
    const formData = new FormData();

    formData.append('data', JSON.stringify(inputData));

    images.forEach((img, idx) => {
      if (img instanceof File) {
        formData.append('files', img);
      }
    });

    try {
      const res = await createPost(formData).unwrap();
      if ((res as { success?: boolean }).success) {
        // router.push('/');
        toast.success('post created successfully');
        setOpen(false)
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full text-start border  rounded-full p-1.5  bg-gray-100 hover:cursor-pointer ">
          <span className="pl-2 ">
            Hey! {data?.data?.name?.split(' ')[0]}, Share Something Productive
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
              <hr />
              <div className="flex gap-3 pt-2 items-center">
                <Avatar className="border-2 border-blue-200 dark:border-blue-900">
                  <AvatarImage src={data?.data?.image?.profile} alt="User" />
                </Avatar>
                <div>
                  <h1 className="text-[14px] pb-1 font-semibold">
                    {data?.data?.name}
                  </h1>

                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={VISIBILITY.PUBLIC} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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
                            data?.data?.name?.split(' ')[0]
                          }, Share Something Productive`}
                          className="h-32 border-0 shadow-none  resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex  gap-5">
                <Button
                  type="button"
                  variant="outline"
                  className="hover:cursor-pointer"
                >
                  {' '}
                  <ImagePlus />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="hover:cursor-pointer"
                >
                  {' '}
                  <UserRoundPen />
                </Button>
              </div>
            </div>
          </form>
          <MultiImgUploader onChange={setImage} />
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="secondary"
            className="hover:cursor-pointer"
            type="submit"
            form="create-post"
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreatePostModal;
