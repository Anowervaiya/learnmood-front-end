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
    <div className="mt-2  *: dark:bg-gray-800  rounded-md ">
      <div className="flex  items-center gap-2 border-t p-2">
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
                      className="w-full resize-none rounded-md border px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
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
          className="rounded-full bg-blue-700"
          type="submit"
          form={`create-comment-${entityId}`}
          disabled={!form.watch("content")?.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
