// src/components/InfiniteMarquee.tsx
import React from "react";

type InfiniteMarqueeProps<T> = {
  items: T[];
  renderItem: (item: T, i: number) => React.ReactNode;
  /** seconds per full loop; higher = slower */
  speedSeconds?: number;
  /** pause the animation when hovering the row */
  pauseOnHover?: boolean;
  /** scroll right-to-left by default; set true to reverse */
  reverse?: boolean;
  /** Tailwind gap class, e.g. "gap-6" */
  gapClass?: string;
  className?: string;
  /** Optional gradient mask on edges */
  fadeEdges?: boolean;
};

export default function InfiniteMarquee<T>({
  items,
  renderItem,
  speedSeconds = 30,
  pauseOnHover = true,
  reverse = false,
  gapClass = "gap-6",
  className = "",
  fadeEdges = true,
}: InfiniteMarqueeProps<T>) {
  // Tailwind arbitrary styles let us pass CSS vars safely
  const durationStyle = { ["--dur" as any]: `${speedSeconds}s` };

  // Utility to render one copy of the content
  const List = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className={`flex ${gapClass} shrink-0`}
    >
      {items.map((it, i) => (
        <li key={`${ariaHidden ? "dup-" : ""}${i}`} className="shrink-0">
          {renderItem(it, i)}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={[
        "relative w-full overflow-hidden", // clip to container
        fadeEdges
          ? // nice edge fade using CSS mask (works in modern browsers)
            "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          : "",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "group", // enables hover pause
          "whitespace-nowrap", // no wrapping => true marquee
          "will-change-transform", // smoother on Safari
        ].join(" ")}
      >
        <div
          style={durationStyle}
          className={[
            "flex", // the moving track
            reverse
              ? "animate-[marquee-x-reverse_var(--dur)_linear_infinite]"
              : "animate-[marquee-x_var(--dur)_linear_infinite]",
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : "",
          ].join(" ")}
        >
          {/* Two identical copies back-to-back for seamless loop */}
          <List />
          <List ariaHidden />
        </div>
      </div>

      {/* Respect reduced motion */}
      <div className="sr-only motion-reduce:not-sr-only">
        Animations are reduced per system preferences.
      </div>
    </div>
  );
}
