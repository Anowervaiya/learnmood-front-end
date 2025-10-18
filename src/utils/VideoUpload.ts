import config from "@/config/config";
import { toast } from "sonner";

export const handleVideoUpload = async (file: File) => {
  if (!file) {
    return toast.error('Select a video file');
  }

  const res = await fetch(`${config.baseUrl}/video/get-upload-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });
  if (!res.ok) {
    toast.error('❌ Failed to get upload URL');
    return;
  }
  const { data } = await res.json();

  const upload = await fetch(data?.uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!upload.ok) {
    toast.error('❌ Failed to get upload URL');
    return;
  }
  toast.success("video upload successfully")
};

export  const getVideosKeys = async () => {
    try {
      const res = await fetch(`${config.baseUrl}/video/all-video-key`)
      const {data} = await res.json();
      return data;
    } catch (error:any) {
      toast.error(error)
    }
  }
