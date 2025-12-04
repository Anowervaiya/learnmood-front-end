"use client"

import { useEffect } from "react"
import { CircleUserRoundIcon, XIcon } from "lucide-react"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"

export default function SingleImageUpload({ setImage  }: any) {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024 // 5MB default
  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize
  })


  const previewUrl = files[0]?.preview 

  useEffect(() => {
    if (files.length > 0) {
      setImage(files[0].file);
    } else {
      setImage(null);
    }
  }, [files]);

  const handleRemove = () => {
    if (files[0]) removeFile(files[0].id)
    setImage(null)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        <button
          type="button"
          className="relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-dashed border-input transition-colors outline-none hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none data-[dragging=true]:bg-accent/50"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt="Uploaded image"
              width={64}
              height={64}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <CircleUserRoundIcon className="size-4 opacity-60" />
          )}
        </button>

        {previewUrl &&  (
          <Button
            onClick={handleRemove}
            size="icon"
            type="button"
            className="absolute -top-1 -right-1 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input {...getInputProps()} className="sr-only" />
      </div>
    </div>
  )
}
