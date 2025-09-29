import CascadePage from "@/components/CascadePage";

type Photo = {
  src: string;
  alt?: string;
};

const photos: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop",
    alt: "Portrait in shadow",
  },
  {
    src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
    alt: "Studio portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    alt: "City skyline at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    alt: "Ocean waves",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    alt: "Mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200&auto=format&fit=crop",
    alt: "Foggy forest",
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop",
    alt: "Close-up portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    alt: "Laptop workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop",
    alt: "Desert dunes",
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop",
    alt: "Bridge in fog",
  },
  {
    src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
    alt: "Galaxy night sky",
  },
  {
    src: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?q=80&w=1200&auto=format&fit=crop",
    alt: "Camping in forest",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    alt: "Snowy peaks",
  },
  {
    src: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
    alt: "Urban neon lights",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
    alt: "Calm lake reflection",
  },
  {
    src: "https://images.unsplash.com/photo-1526318472351-bc6fa96c8f3f?q=80&w=1200&auto=format&fit=crop",
    alt: "Street photography",
  },
  {
    src: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
    alt: "Desert road",
  },
  {
    src: "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1200&auto=format&fit=crop",
    alt: "Palm trees sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
    alt: "Abstract building",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    alt: "Hiking trail",
  },
  {
    src: "https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?q=80&w=1200&auto=format&fit=crop",
    alt: "Old rustic door",
  },
  {
    src: "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?q=80&w=1200&auto=format&fit=crop",
    alt: "Concert crowd",
  },
  {
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop",
    alt: "Dog in the wild",
  },
  {
    src: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1200&auto=format&fit=crop",
    alt: "Abstract neon glow",
  },
];

export default function Photography() {
  return (
    <main className="">
      <CascadePage images={photos} className="text-white" />
    </main>
  );
}
