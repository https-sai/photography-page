import { useState } from 'react';
import CascadeCard from '../components/CascadeCard';
import ImageModal from '../components/ImageModal';

export default function Photography({
  items = Array.from({ length: 24 }).map((_, i) => ({ id: i })),
  className = "",
}: {
  items?: { id: string | number }[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  return (
    <>
      <section
        className={`min-h-screen w-full bg-slate-950 text-white ${className}`}
      >
        {/* Gallery grid */}
        <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <CascadeCard 
              key={item.id} 
              index={i} 
              hovered={hovered}
              setHovered={setHovered}
              onClick={(index) => setSelectedImage(index)}
            />
          ))}
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage !== null ? `https://picsum.photos/800/600?random=${selectedImage + 1}` : ''}
        title={selectedImage !== null ? `Frame ${selectedImage + 1}` : ''}
      />
    </>
  );
}
