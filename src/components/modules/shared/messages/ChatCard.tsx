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

export default function ChatCard({ user: selectedUser, setChatData }: any) {
  const { data: userMe } = useUserInfoQuery(undefined ) as any;
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
    <Card
  className="
    w-[350px] 
    max-h-[500px] 
    rounded-2xl 
    gap-0 
    p-0 
    shadow-lg
    bg-white 
    border border-gray-200
    dark:bg-neutral-900 
    dark:border-neutral-800
  "
>
  {/* Header */}
  <div className="
    flex 
    p-3 
    flex-row 
    items-center 
    justify-between 
    border-b
    border-gray-200
    dark:border-neutral-800
  ">
    <div className="flex items-center gap-2">
      <img
        src={selectedUser?.image?.profile || '/logo.png'}
        alt="profile"
        className="w-8 h-8 object-cover rounded-full"
      />
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {selectedUser?.name}
        </h3>
        <p className="text-xs text-green-600">Active now</p>
      </div>
    </div>

    <div className="
      flex 
      items-center 
      gap-2 
      text-gray-500 
      dark:text-gray-400
    ">
      <Phone className="w-4 h-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" />
      <Video className="w-4 h-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" />
      <X
        className="w-4 h-4 cursor-pointer hover:text-red-500"
        onClick={() => setChatData(null)}
      />
    </div>
  </div>

  {/* Messages */}
  <CardContent className="
    h-[400px] 
    p-3 
    overflow-y-auto
    bg-gray-100 
    dark:bg-neutral-800
  ">
    <div className="flex flex-col space-y-3">
      {messages?.data?.map((message: any, index: number) => {
        const isMe =
          typeof message.senderId === 'string'
            ? message.senderId === userMe?.data?._id
            : message?.senderId?._id === userMe?.data?._id;

        return (
          <div
            key={message._id || index}
            ref={messageEndRef}
            className={`flex ${
              isMe ? 'justify-end items-end' : 'justify-start items-end'
            }`}
          >
            {/* Friend Avatar */}
            {!isMe && (
              <img
                src={selectedUser?.image?.profile || '/logo.png'}
                alt="friend"
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
            )}

            {/* Chat Bubble */}
            <div
              className={`
                relative 
                max-w-[200px] 
                px-2 
                py-1.5 
                rounded-md 
                shadow-xs
                transition-all
                ${
                  isMe
                    ? 'bg-blue-600 text-white rounded-br-none ml-auto'
                    : 'bg-white text-gray-900 rounded-bl-none mr-auto border border-gray-200 dark:bg-neutral-900 dark:text-gray-100 dark:border-neutral-700'
                }
              `}
            >
              {/* Text */}
              {message?.content && (
                <p className="text-sm leading-snug break-words whitespace-pre-wrap">
                  {message.content}
                </p>
              )}

              {/* Media */}
              {message?.media?.length > 0 && (
                <img
                  src={message.media[0]}
                  alt="Attachment"
                  className="max-w-[200px] rounded-lg mt-2 shadow-sm"
                />
              )}

              {/* Time */}
              <p
                className={`
                  text-[10px] 
                  mt-1 
                  opacity-70 
                  text-right
                  ${
                    isMe
                      ? 'text-gray-200'
                      : 'text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {message?.createdAt &&
                  formatMessageTime(message.createdAt)}
              </p>

              {/* Bubble Tail */}
              <span
                className={`
                  absolute 
                  bottom-0 
                  w-0 
                  h-0 
                  border-t-8
                  ${
                    isMe
                      ? 'border-r-8 border-t-blue-600 right-0 translate-x-full'
                      : 'border-l-8 border-t-white dark:border-t-neutral-900 left-0 -translate-x-full'
                  }
                `}
              />
            </div>
          </div>
        );
      })}
    </div>
  </CardContent>

  {/* Input */}
  <div className="
    flex 
    items-center 
    gap-2 
    border-t 
    p-2
    border-gray-200
    dark:border-neutral-800
  ">
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
                  className="
                    w-full 
                    resize-none 
                    rounded-md 
                    border 
                    px-4 
                    py-2 
                    text-sm
                    bg-white 
                    text-gray-900
                    focus:outline-none 
                    focus:ring-1 
                    focus:ring-gray-200
                    dark:bg-neutral-900 
                    dark:text-gray-100 
                    dark:border-neutral-700 
                    dark:focus:ring-neutral-700
                  "
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
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
      className="
        rounded-full 
        bg-blue-700 
        hover:bg-blue-800
        text-white
      "
      type="submit"
      form={`create-message-${selectedUser?._id}`}
      disabled={!form.watch('content')?.trim()}
    >
      <Send className="w-4 h-4" />
    </Button>
  </div>
</Card>

  );
}
