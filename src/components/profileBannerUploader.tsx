"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  ArrowLeftIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/cropper";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/server/user/user.server";

// --- Helper to create an image element from a URL
const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    image.src = url;
  });

// --- Helper to get cropped blob
async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  outputWidth = crop.width,
  outputHeight = crop.height
): Promise<Blob | null> {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      outputWidth,
      outputHeight
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}

// ---------------- BannerUploader Component ----------------
export default function ProfileBannerUploader({ entityType, profileOwnerId,
  fetchedbannerUrl,
  disabled}: any) {

  const maxSizeMB = 10;
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps },
  ] = useFileUpload({ accept: "image/*", maxSize });
const [submitting, setSubmitting] = useState(false);
  const previewUrl = files[0]?.preview || fetchedbannerUrl || null;
  const fileId = files[0]?.id;

  const [croppedArea, setCroppedArea] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [finalUrl, setFinalUrl] = useState<string | null>(fetchedbannerUrl);

  const prevFileIdRef = useRef<string | null>(null);

  // Open dialog when a new file is uploaded
  useEffect(() => {
    if (fileId && fileId !== prevFileIdRef.current) {
      setIsDialogOpen(true);
      setZoom(1);
      setCroppedArea(null);
    }
    prevFileIdRef.current = fileId;
  }, [fileId]);

  const handleApply = async () => {
    setSubmitting(true);
    if (!previewUrl || !croppedArea) return;

    const blob = await getCroppedImg(previewUrl, croppedArea);
    if (!blob) return;

    const file = new File([blob], files[0].file.name, { type: blob.type });
    
        const formData = new FormData();
        formData.append("banner", file);
    
        // Call server action
        const result = await updateProfile(entityType, profileOwnerId, formData);


     if (result.success) {
      setSubmitting(false);
    const newUrl = URL.createObjectURL(blob);
    if (finalUrl) URL.revokeObjectURL(finalUrl);
    setFinalUrl(newUrl);
    setIsDialogOpen(false);
      setIsDialogOpen(false);
    } else {
      console.error("Server action failed:", result.message);
    }
    setSubmitting(false);
  };



  return (
    <div className="flex flex-col gap-2">
      {/* Banner Upload Area */}
      <div className="relative">
        <div
        
          className="relative min-h-52 flex items-center justify-center rounded-xl border border-dashed p-4 hover:bg-accent/50"
          onClick={!disabled ? openFileDialog : undefined}
          onDragEnter={!disabled ? handleDragEnter : undefined}
          onDragLeave={!disabled ? handleDragLeave : undefined}
          onDragOver={!disabled ? handleDragOver : undefined}
          onDrop={!disabled ? handleDrop : undefined}
          
          data-dragging={isDragging || undefined}
        >
          <input {...getInputProps()} className="sr-only" />
          {finalUrl || previewUrl ? (
            <img src={finalUrl || previewUrl!} className="w-full h-52 object-cover rounded-xl" alt="Banner preview" />
          ) : (
            <div className="text-center text-muted-foreground">
              
            </div>
          )}
        </div>

      
      </div>

      {/* Cropper Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl p-0">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between border-b p-4">
              <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(false)}>
                <ArrowLeftIcon />
              </Button>
              <span>Crop Banner</span>
              <Button onClick={handleApply} disabled={!previewUrl || !croppedArea || submitting}>
              {submitting ? "Applying..." : "Apply"}
              </Button>
            </DialogTitle>
          </DialogHeader>

          {previewUrl && (
            <Cropper
              className="h-96 sm:h-[28rem]"
              image={previewUrl}
              onCropChange={setCroppedArea}
              onZoomChange={setZoom}
              zoom={zoom}
              aspectRatio={16 / 9}
            >
              <CropperDescription />
              <CropperImage />
              <CropperCropArea />
            </Cropper>
          )}

          <DialogFooter className="border-t px-4 py-4">
            <div className="flex items-center gap-2 w-full max-w-md mx-auto">
              <ZoomOutIcon className="opacity-60" />
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={[zoom]}
                onValueChange={(v) => setZoom(v[0])}
              />
              <ZoomInIcon className="opacity-60" />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
