'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, ThumbsUp, Phone, Video, X } from 'lucide-react';
import { FileMetadata } from '@/hooks/use-file-upload';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  messageApi,
  useGetMessageQuery,
  useSendMessageMutation,
} from '@/redux/api/messages/message.api';
import { toast } from 'sonner';
import { formatMessageTime } from '@/lib/utils';
import { useUserInfoQuery } from '@/redux/api/auth/auth.api';

import  TextareaAutosize from 'react-textarea-autosize'

export default function ChatCard({ user: selectedUser }: any) {
  const { data: userMe } = useUserInfoQuery(undefined) as any;
  const [images, setImage] = useState<(File | FileMetadata)[] | []>([]);
  const { data: messages } = useGetMessageQuery(
    {
      userToChatId: selectedUser?._id,
      authUserId: userMe?.data?._id,
    },
    { skip: !userMe?.data?._id }
  ) as any;
  
  const [sendMessage] = useSendMessageMutation();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const form = useForm({
    defaultValues: {
      receiverId: selectedUser?._id,
      content: '',
      media: [],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async inputData => {
    const payload = {
      ...inputData,
      receiverId: selectedUser?._id,
    };
    form.reset({ content: '', media: [] });
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));

    try {
      const res = await sendMessage(formData).unwrap();
      if ((res as { success?: boolean }).success) {
        form.reset({ content: '', media: [] });
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <Card className="w-[350px] max-h-[500px]  rounded-2xl gap-0 shadow-lg p-0">
      {/* Header */}
      <div className="flex p-3  flex-row items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <img
            src={selectedUser?.image?.profile || '/logo.png'}
            alt="profile"
            className="w-8 h-8 object-cover rounded-full"
          />
          <div>
            <h3 className="text-sm font-semibold">{selectedUser?.name}</h3>
            <p className="text-xs text-green-600">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4 cursor-pointer" />
          <Video className="w-4 h-4 cursor-pointer" />
          <X className="w-4 h-4 cursor-pointer" />
        </div>
      </div>

      <CardContent className="h-[400px] p-3 overflow-y-auto bg-gray-100">
        <div className="flex flex-col space-y-3 ">
          {messages?.data?.map((message: any, index: number) => {
            // const isMe = message?.senderId?._id === userMe?.data?._id;

            const isMe =
              typeof message.senderId === 'string'
                ? message.senderId === userMe?.data?._id
                : message?.senderId?._id === userMe?.data?._id;

            return (
              <div
                key={message._id || index}
                ref={messageEndRef}
                className={`flex  ${isMe ? 'justify-end items-end' : 'justify-start items-end'}`}
              >
                {/* Friend Avatar (left side only) */}
                {!isMe && (
                  <img
                    src={selectedUser?.image?.profile || '/logo.png'}
                    alt="friend"
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                )}

                {/* Chat Bubble */}
                <div
                  className={`relative max-w-[200px] px-2 py-1.5 rounded-md shadow-xs transition-all ${isMe ? 'bg-blue-600 text-white rounded-br-none ml-auto' : 'bg-white text-gray-900 rounded-bl-none mr-auto border'
                    } `}
                >
                  {/* Message Content */}
                  {message?.content && (
                    <p className="text-sm leading-snug break-words whitespace-pre-wrap">
                      {message.content}
                    </p>
                  )}

                  {/* Media (if exists) */}
                  {message?.media?.length > 0 && (
                    <img
                      src={message.media[0]}
                      alt="Attachment"
                      className="max-w-[200px] rounded-lg mt-2 shadow-sm"
                    />
                  )}

                  {/* Timestamp */}
                  <p
                    className={`   text-[10px] mt-1 opacity-70 
                         ${isMe ? 'text-gray-200 text-right' : 'text-gray-500 text-right'}
                             `}
                  >
                    {message?.createdAt && formatMessageTime(message.createdAt)}
                  </p>

                  {/* Bubble Tail */}
                  <span className={` absolute bottom-0 w-0 h-0 border-t-8  ${isMe
                        ? 'border-r-8 border-t-blue-600 right-0 translate-x-full'
                        : 'border-l-8 border-t-white left-0 -translate-x-full'
                      }`}
                  />
                </div>

             
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Input */}
      <div className="flex items-center gap-2 border-t p-2">
        <Form {...form}>
          <form
            id={`create-message-${selectedUser?._id}`}
            className="w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex w-full items-center">
                  <FormControl className="flex-1">
                    <TextareaAutosize
                      {...field}
                      minRows={1}
                      maxRows={9}
                      placeholder="Type a message"
                      className="w-full  resize-none rounded-md border px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
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
          form={`create-message-${selectedUser?._id}`}
          disabled={!form.watch("content")?.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
        {/* <Button size="icon" variant="ghost">
          <ThumbsUp className="w-5 h-5 text-blue-600" />
        </Button> */}
      </div>
    </Card>
  );
}
