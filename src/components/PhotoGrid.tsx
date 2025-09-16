// TightPhotoGrid.tsx
import React from "react";

export type Photo = { src: string; alt?: string };

export default function PhotoGrid({
  items,
  minWidth = 220,          // px: tile’s minimum width before wrapping
  aspect = "16/9",          // keep tiles uniform (prevents layout jitter)
}: {
  items: Photo[];
  minWidth?: number;
  aspect?: `${number}/${number}` | "square";
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" : `aspect-[${aspect}]`;

  return (
    <div
      className="grid gap-0"
      style={{
        // responsive, gapless columns like Netflix rows
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
      }}
    >
      {items.map((p, i) => (
        <figure
          key={i}
          className={`group relative ${aspectClass} hover:z-50`}
        >
          <img
            src={p.src}
            alt={p.alt ?? ""}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.08] will-change-transform"
          />
        </figure>
      ))}
    </div>
  );
}
