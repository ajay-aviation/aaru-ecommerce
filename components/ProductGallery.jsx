"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const gallery = images && images.length > 0 ? images : [];

  return (
    <div>
      <div className="relative aspect-square bg-white border border-gray-200 rounded-md overflow-hidden group">
        <Image
          src={gallery[active]}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      {gallery.length > 1 && (
        <div className="flex gap-2 mt-2">
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-16 w-16 rounded border overflow-hidden bg-white shrink-0 transition-colors ${
                active === i ? "border-brand border-2" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image src={img} alt={`${name} view ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
