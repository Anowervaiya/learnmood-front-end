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
  useGetMessageQuery,
  useSendMessageMutation,
} from '@/redux/api/messages/message.api';
import { toast } from 'sonner';
import { formatMessageTime } from '@/lib/utils';
import { useUserInfoQuery } from '@/redux/api/auth/auth.api';

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
      receiverId: selectedUser?._id
    };

    const formData = new FormData();

    formData.append('data', JSON.stringify(payload));

    try {
      const res = await sendMessage(formData).unwrap();
      if ((res as { success?: boolean }).success) {
        // toast.success('message sent successfully');
         form.reset({ content: '', media: [] });

      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <Card className="w-[350px] rounded-2xl gap-0 shadow-lg p-0">
      {/* Header */}
      <div className="flex p-3  flex-row items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <img
            src={selectedUser?.image?.profile || '/logo.png'}
            alt="profile"
            className="w-8 h-8 rounded-full"
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

      <CardContent className="h-[400px] overflow-y-auto bg-gray-100">
        <div className="flex flex-col space-y-3 p-3">
          {messages?.data?.map((message: any, index: number) => {

       
            const isMe =  message?.senderId?._id === userMe?.data?._id;
         

            return (
              <div
                key={message._id || index}
                ref={messageEndRef}
                className={`flex  ${isMe ? 'justify-end ' : 'justify-start'}`}
              >
                {/* Friend Avatar (left side only) */}
                {!isMe && (
                  <img
                    src={selectedUser?.image?.profile || '/logo.png'}
                    alt="friend"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}

                {/* Chat Bubble */}
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl shadow-sm ${
                    isMe
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-900 rounded-bl-none'
                  }`}
                >
                  {/* {message?.media?.length > 0 && (
                    <img
                      src={message.media[0]}
                      alt="Attachment"
                      className="max-w-[180px] rounded-md mb-1"
                    />
                  )} */}

                  {message.content && (
                    <p className="text-sm">{message.content}</p>
                  )}

                  <p className="text-[10px] opacity-70 mt-1 text-right">
                    {formatMessageTime(message.createdAt)}
                  </p>
                </div>

                {/* My Avatar (right side only) */}
                {isMe && (
                  <img
                    src={userMe?.data?.image?.profile || '/logo.png'}
                    alt="me"
                    className="w-8 h-8 rounded-full ml-2"
                  />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Input */}
      <div className="flex items-center gap-2 border-t p-2">
        <Form {...form}>
          <form
            id="create-message"
            className="w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="rounded-full"
                      placeholder="message"
                      {...field}
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
          form="create-message"
          // disabled={!input.trim()}
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
