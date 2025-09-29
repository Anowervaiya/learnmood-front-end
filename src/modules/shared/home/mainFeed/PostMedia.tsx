import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function PostMedia({
  media,
}: {
  media?: { url: string; type: string }[];
}) {
  if (!media?.length) return null;

  const [showAll, setShowAll] = useState(false);

  const images = showAll ? media : media.slice(0, 5);
  const extraCount = media.length - 4;

  return (
    <CardContent className="p-0 ">
      {/* 1 IMAGE */}
      {images.length === 1 && (
        <div className="relative w-full h-[400px]">
          <Image
            src={images[0].url}
            alt="Post media 1"
            fill
            className="object-cover  "
          />
        </div>
      )}

      {/* 2 IMAGES */}
      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((item, idx) => (
            <div key={idx} className="relative w-full h-[300px]">
              <Image
                src={item.url}
                alt={`Post media ${idx + 1}`}
                fill
                className="object-cover   "
              />
            </div>
          ))}
        </div>
      )}

      {/* 3 IMAGES */}
      {images.length === 3 && (
        <div className="grid gap-2">
          {/* Top big image */}
          <div className="relative w-full h-[300px]">
            <Image
              src={images[0].url}
              alt="Post media 1"
              fill
              className="object-cover  "
            />
          </div>
          {/* Bottom two side-by-side */}
          <div className="grid grid-cols-2 gap-2">
            {images.slice(1).map((item, idx) => (
              <div key={idx + 1} className="relative w-full h-[200px]">
                <Image
                  src={item.url}
                  alt={`Post media ${idx + 2}`}
                  fill
                  className="object-cover  "
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4+ IMAGES */}
      {images.length >= 4 && (
        <div className="grid grid-cols-2 gap-2">
          {images.slice(0, 4).map((item, idx) => {
            // Last image gets overlay if there are more
            if (idx === 3 && extraCount > 0 && !showAll) {
              return (
                <div
                  key={idx}
                  className="relative cursor-pointer"
                  onClick={() => setShowAll(true)}
                >
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={item.url}
                      alt={`Post media ${idx + 1}`}
                      fill
                      className="object-cover  "
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center  ">
                    <span className="text-white text-xl font-semibold">
                      +{extraCount}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div key={idx} className="relative w-full h-[200px]">
                <Image
                  src={item.url}
                  alt={`Post media ${idx + 1}`}
                  fill
                  className="object-cover   "
                />
              </div>
            );
          })}
        </div>
      )}
    </CardContent>
  );
}
