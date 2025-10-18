'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import config from '@/config/config';
import axios from 'axios';
import Error from 'next/error';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import VideoPreview from './VideoPreview';
import { getVideosKeys, handleVideoUpload } from '@/utils/VideoUpload';

function Video() {

  const [file, setFile] = useState<File | null>(null);
  const [videosKeys, setVideosKeys] = useState<{ key: string }[]>([])
  
  useEffect(() => {
    (async () => {
      const result = await getVideosKeys();
      setVideosKeys(result)
      
    })()
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Private S3 Video Upload & Playback</h1>

      <Input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0]!)} />
      <Button onClick={() => handleVideoUpload(file!)}>Upload</Button>

      <h2>Uploaded Videos:</h2>
      {videosKeys?.map((vk) => (
        <VideoPreview key={vk.key} filekey={vk?.key.substring(7)}  />
      ))}
    </div>
  )
}

export default Video
