"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  name: string;
  badge?: string;
};

export default function CarGallery({ images, name, badge }: Props) {
  const [active, setActive] = useState(0);

  const hasImages = images.length > 0;

  function prev() {
    setActive((i) => (i - 1 + images.length) % images.length);
  }
  function next() {
    setActive((i) => (i + 1) % images.length);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0c0c0c] border border-[#1e1e1e] overflow-hidden aspect-[4/3]">
        {badge && (
          <span className="absolute top-4 left-4 z-10 bg-[#c9a84c] text-black text-[9px] font-bold px-3 py-1 tracking-widest uppercase">
            {badge}
          </span>
        )}

        {hasImages ? (
          <>
            <Image
              key={active}
              src={images[active]}
              alt={`${name} — фото ${active + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              unoptimized
              priority
            />

            {/* Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 tracking-wider">
              {active + 1} / {images.length}
            </div>

            {/* Arrows (only when >1 image) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 transition-colors z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 transition-colors z-10"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </>
        ) : (
          /* No images — show MB star placeholder */
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 38 38" fill="none" className="opacity-[0.07]">
              <circle cx="19" cy="19" r="18" stroke="white" strokeWidth="0.6" />
              <circle cx="19" cy="19" r="14" stroke="white" strokeWidth="0.3" />
              <path d="M19 1 L20.9 17.3 L35.6 27.5 L19 21.5 L2.4 27.5 L17.1 17.3 Z" fill="white" />
            </svg>
          </div>
        )}
      </div>

      {/* Thumbnails strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, idx) => (
            <button
              key={url + idx}
              onClick={() => setActive(idx)}
              className={`relative shrink-0 w-20 h-14 border-2 overflow-hidden transition-all ${
                idx === active
                  ? "border-[#c9a84c]"
                  : "border-[#1e1e1e] opacity-60 hover:opacity-100 hover:border-[#333]"
              }`}
            >
              <Image src={url} alt={`thumb ${idx + 1}`} fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
