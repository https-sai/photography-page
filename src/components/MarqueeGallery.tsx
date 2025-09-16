// MarqueeGallery.tsx
import React from "react";

export type Photo = { src: string; alt?: string };
type Aspect = `${number}/${number}` | "square";

type RowConfig = {
  items: Photo[];
  speedSec?: number;
  reverse?: boolean;
  tileWidth?: number;
  aspect?: Aspect;
};

type Props =
  | { rows: RowConfig[]; items?: never }                                  // old API
  | { items: Photo[]; rowsCount?: number; tileWidth?: number;             // new API
      aspect?: Aspect; baseSpeedSec?: number };

function MarqueeRow({
  items,
  speedSec = 40,
  reverse = false,
  tileWidth = 260,
  aspect = "16/9",
}: Required<Pick<RowConfig,"speedSec"|"reverse"|"tileWidth"|"aspect">> & { items: Photo[] }) {
  const aspectClass = aspect === "square" ? "aspect-square" : `aspect-[${aspect}]`;
  const doubled = [...items, ...items]; // seamless loop

  return (
    <div className="group relative overflow-hidden">
      {/* edge fades (optional) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 [mask-image:linear-gradient(to_right,black,transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 [mask-image:linear-gradient(to_left,black,transparent)]" />

      <ul
        className={`flex w-[200%] gap-0 select-none 
          ${reverse ? "animate-marquee-reverse" : "animate-marquee"} 
          group-hover:animation-paused motion-reduce:animation-paused`}
        style={{ ["--marquee-duration" as any]: `${speedSec}s` }}
      >
        {doubled.map((p, i) => (
          <li key={i} className="flex-none relative overflow-hidden" style={{ width: tileWidth }}>
            <div className={`relative ${aspectClass} overflow-hidden`}>
              <img
                src={p.src}
                alt={p.alt ?? ""}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover 
                           transition-transform duration-300 ease-out 
                           hover:scale-[1.08] will-change-transform"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MarqueeGallery(props: Props) {
  const rows: RowConfig[] =
    "rows" in props
      ? props.rows
      : buildRowsFromItems(
          props.items,
          props.rowsCount ?? 3,
          props.tileWidth ?? 260,
          props.aspect ?? "16/9",
          props.baseSpeedSec ?? 42
        );

  return (
    <section className="w-full space-y-4">
      {rows.map((r, idx) => (
        <MarqueeRow
          key={idx}
          items={r.items}
          speedSec={r.speedSec ??  (idx % 2 ? 50 : 40)} // stagger speeds
          reverse={r.reverse ?? (idx % 2 === 1)}        // alternate directions
          tileWidth={r.tileWidth ?? 260}
          aspect={r.aspect ?? "16/9"}
        />
      ))}
    </section>
  );
}

function buildRowsFromItems(
  items: Photo[],
  rowsCount: number,
  tileWidth: number,
  aspect: Aspect,
  baseSpeedSec: number
): RowConfig[] {
  // Evenly distribute photos across N rows: 0,1,2,0,1,2,...
  const buckets: Photo[][] = Array.from({ length: rowsCount }, () => []);
  items.forEach((p, i) => buckets[i % rowsCount].push(p));

  return buckets.map((row, idx) => ({
    items: row.length ? row : items,            // fallback if a row ends up empty
    speedSec: baseSpeedSec + idx * 8,           // slight variation looks nice
    reverse: idx % 2 === 1,
    tileWidth,
    aspect,
  }));
}
