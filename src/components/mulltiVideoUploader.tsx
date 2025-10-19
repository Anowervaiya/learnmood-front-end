"use client"

import { FileVideoIcon, Trash2Icon, UploadIcon, AlertCircleIcon } from "lucide-react"
import { useFileUpload, type FileWithPreview, formatBytes } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"

export default function MultiVideoUploader({ setVideos }:any) {
  const maxSizeMB = 500
  const maxSize = maxSizeMB * 1024 * 1024
  const maxFiles = 6

  const [
    { files, errors, isDragging },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, clearFiles, getInputProps },
  ] = useFileUpload({
    multiple: true,
    accept: ".mp4",
    maxFiles,
    maxSize,
    onFilesAdded: (addedFiles: FileWithPreview[]) => {
      // just send file name and size to parent
      const filesData = addedFiles.map(file => ({
       file
      }))
      setVideos(filesData)
    }
  })

  const handleRemove = (fileId: string) => {
    removeFile(fileId)
    const remainingFiles = files.filter(f => f.id !== fileId).map(f => ({ name: f.file.name, size: f.file.size }))
    setVideos(remainingFiles)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed border-input p-4"
      >
        <input {...getInputProps()} className="sr-only" />
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            {files.map(f => (
              <div key={f.id} className="flex items-center justify-between border rounded p-2">
                <div className="flex items-center gap-3">
                  <FileVideoIcon className="size-5 opacity-60" />
                  <div className="flex flex-col">
                    <span>{f.file.name}</span>
                    <span className="text-xs text-muted-foreground">{formatBytes(f.file.size)}</span>
                  </div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => handleRemove(f.id)}>
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <FileVideoIcon className="size-8 opacity-60 mb-2" />
            <p>Drop your .mp4 files here</p>
            <p className="text-xs text-muted-foreground">Max {maxFiles} files ∙ Up to {maxSizeMB}MB</p>
            <Button type="button" className="mt-2" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 opacity-60" /> Select files
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-destructive" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
}
