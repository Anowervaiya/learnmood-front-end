import config from '@/config/config';
import React, { useEffect, useState } from 'react'

function VideoPreview({ filekey }: { filekey: string}) {

  const [url, setUrl] = useState<string>('');
  const getPreviewUrl = async (key: string) => {
    const res = await fetch(`${config.baseUrl}/video/get-preview-url/${key}`)
    const { data } = await res.json();
    return data;
  }
  

  useEffect(() => {
    const previewUrlfn = async () => {
      
      const previewUrl = await getPreviewUrl(filekey);
      setUrl(previewUrl)
    }
    previewUrlfn();
  }, [filekey, getPreviewUrl])

  return (
    <div style={{ marginBottom: 30 }}>
      <p>
        <strong>{filekey}</strong>
      </p>
      {url ? (
        <video
          width="600"
          controls
          loop
          src={url}
          style={{ border: "1px solid #ccc", borderRadius: 6 }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default VideoPreview
