'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, ThumbsUp, Phone, Video, X } from 'lucide-react';

interface Message {
  id: string;
  text?: string;
  type: 'text' | 'audio' | 'emoji';
  sender: 'me' | 'other';
  time?: string;
}

export default function ChatCard(user : any) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'ki koros',
      type: 'text',
      sender: 'me',
    },
    {
      id: '2',
      type: 'audio',
      sender: 'other',
      time: 'Fri 19:00',
    },
    {
      id: '3',
      type: 'emoji',
      sender: 'other',
      text: '👍',
      time: 'Sat 16:56',
    },
    {
      id: '4',
      text: 'Hello',
      type: 'text',
      sender: 'me',
      time: 'Sent 17h ago',
    },
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now().toString(), text: input, type: 'text', sender: 'me' },
    ]);
    setInput('');
  };

  return (
    <Card className="w-[300px] rounded-2xl gap-0 shadow-lg p-0">
      {/* Header */}
      <div className="flex p-3  flex-row items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <img
            src={user?.user?.image?.profile || '/logo.png'}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="text-sm font-semibold">{user?.user?.name }</h3>
            <p className="text-xs text-green-600">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4 cursor-pointer" />
          <Video className="w-4 h-4 cursor-pointer" />
          <X className="w-4 h-4 cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <CardContent className="h-[200px] overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${
                msg.sender === 'me'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.type === 'text' && msg.text}
              {msg.type === 'emoji' && (
                <span className="text-2xl">{msg.text}</span>
              )}
              {msg.type === 'audio' && (
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                    ▶
                  </button>
                  <span className="text-xs">0:02</span>
                </div>
              )}
              {msg.time && (
                <p className="text-[10px] mt-1 opacity-70">{msg.time}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>

      {/* Input */}
      <div className="flex items-center gap-2 border-t p-2">
        <Input
          placeholder="Aa"
          className="rounded-full"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button
          size="icon"
          className="rounded-full"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <ThumbsUp className="w-5 h-5 text-blue-600" />
        </Button>
      </div>
    </Card>
  );
}
