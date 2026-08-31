"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/8 bg-[#101014]">
        <img
          key={active}
          src={images[active]}
          alt={`${name} — image ${active + 1}`}
          className="h-full w-full object-cover"
          style={{ animation: "cl-fade 0.25s ease" }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full glass text-white/80 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full glass text-white/80 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                i === active ? "border-purple-400/70" : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes cl-fade {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}