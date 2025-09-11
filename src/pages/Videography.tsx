// src/pages/PhotoGallery.tsx
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

// 1) Grab every image file as a URL at build time
const modules = import.meta.glob<{ default: string }>(
  "/src/assets/photos/**/*.{jpg,jpeg,png,webp,avif,gif,svg}",
  { eager: true }
);

// 2) Turn that object into an array with nice labels
type Photo = { src: string; alt: string; id: string };
const photos: Photo[] = Object.entries(modules).map(([path, mod]) => ({
  src: mod.default,
  alt: toTitle(path),
  id: path,
}));

function toTitle(path: string) {
  const file = path.split("/").pop() || "";
  const base = file.replace(/\.[^.]+$/, "");           // remove extension
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function PhotoGallery() {
  return (
    <section className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-semibold">Gallery</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <Card
              key={p.id}
              className="group overflow-hidden rounded-2xl border bg-card text-card-foreground"
            >
              {/* Image area */}
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              {/* Footer / caption */}
              <CardContent className="flex items-center justify-between p-3 text-sm">
                <span className="truncate font-medium">{p.alt}</span>
                <span className="opacity-60">in view</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}