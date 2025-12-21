'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import TextareaAutosize from 'react-textarea-autosize'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useAddcommentMutation } from "@/redux/api/comment/comment.api";

export default function CommentInitialInputButton({ entityType, entityId }: {entityType:string, entityId:string}) {
  const [addComment] = useAddcommentMutation();
  const form = useForm({
    defaultValues: {
      content: '',
      entityType: entityType,
      entityId: entityId,
      media: [],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async inputData => {

    const payload = {
      entityType,
      entityId,
      ...inputData
    }
      
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    try {
      const res = await addComment({ formData, entityId: entityId }).unwrap();
      if ((res as { success?: boolean }).success) {
        form.reset({ content: '', media: [] });
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };


  return (
    <div
  className="
    mt-2 
    rounded-md
    bg-white
    border border-gray-200
    dark:bg-neutral-900
    dark:border-neutral-800
  "
>
  <div
    className="
      flex items-center gap-2 
      border-t border-gray-200 
      p-2
      dark:border-neutral-800
    "
  >
    <Form {...form}>
      <form
        id={`create-comment-${entityId}`}
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }: any) => (
            <FormItem className="flex w-full items-center">
              <FormControl className="flex-1">
                <TextareaAutosize
                  {...field}
                  minRows={1}
                  maxRows={9}
                  placeholder="Type a comment..."
                  className="
                    w-full resize-none rounded-md 
                    border 
                    px-4 py-2 
                    text-sm
                    bg-white 
                    text-gray-900
                    placeholder:text-gray-500
                    focus:outline-none 
                    focus:ring-1 
                    focus:ring-blue-500
                    border-gray-300
                    dark:bg-neutral-900 
                    dark:text-gray-100
                    dark:placeholder:text-gray-500
                    dark:border-neutral-700
                    dark:focus:ring-blue-400
                  "
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      form.handleSubmit(onSubmit)()
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>

    <Button
      size="icon"
      type="submit"
      form={`create-comment-${entityId}`}
      disabled={!form.watch('content')?.trim()}
      className="
        rounded-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        disabled:opacity-50
        disabled:cursor-not-allowed
        dark:bg-blue-500
        dark:hover:bg-blue-600
      "
    >
      <Send className="w-4 h-4" />
    </Button>
  </div>
</div>

  );
}
