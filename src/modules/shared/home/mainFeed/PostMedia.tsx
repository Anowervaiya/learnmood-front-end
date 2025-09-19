import { useState } from 'react';
import { CardContent } from '@/components/ui/card';

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
    <CardContent className="p-0">
      {/* 1 IMAGE */}
      {images.length === 1 && (
        <img
          src={images[0].url || '/placeholder.svg'}
          alt="Post media 1"
          className="object-cover rounded-lg w-full h-[400px]"
        />
      )}

      {/* 2 IMAGES */}
      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((item, idx) => (
            <img
              key={idx}
              src={item.url || '/placeholder.svg'}
              alt={`Post media ${idx + 1}`}
              className="object-cover rounded-lg w-full h-[300px]"
            />
          ))}
        </div>
      )}

      {/* 3 IMAGES */}
      {images.length === 3 && (
        <div className="grid gap-2">
          {/* Top big image */}
          <img
            src={images[0].url || '/placeholder.svg'}
            alt="Post media 1"
            className="object-cover rounded-lg w-full h-[300px]"
          />

          {/* Bottom two side-by-side */}
          <div className="grid grid-cols-2 gap-2">
            {images.slice(1).map((item, idx) => (
              <img
                key={idx + 1}
                src={item.url || '/placeholder.svg'}
                alt={`Post media ${idx + 2}`}
                className="object-cover rounded-lg w-full h-[200px]"
              />
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
                  <img
                    src={item.url || '/placeholder.svg'}
                    alt={`Post media ${idx + 1}`}
                    className="object-cover rounded-lg w-full h-[200px]"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <span className="text-white text-xl font-semibold">
                      +{extraCount}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <img
                key={idx}
                src={item.url || '/placeholder.svg'}
                alt={`Post media ${idx + 1}`}
                className="object-cover rounded-lg w-full h-[200px]"
              />
            );
          })}
        </div>
      )}
    </CardContent>
  );
}
