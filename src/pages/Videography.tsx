import { useState } from 'react';
import CascadeCard from '../components/CascadeCard';
import ImageModal from '../components/ImageModal';
import PhotoGrid from '@/components/PhotoGrid';
import { photos } from '@/data/projects';
import { id } from 'zod/v4/locales';
import { Photo } from '@/components/PhotoGrid';
import MarqueeGallery from '@/components/MarqueeGallery';

export default function Videography() {

  const gallery: Photo[] = photos.map(({ src, alt }) => ({ src, alt }));

  
  return (
    


    <div>
      <div className='h-20'/>
      <PhotoGrid items={gallery} minWidth={220} aspect="16/9" />
      <MarqueeGallery items={gallery} rowsCount={1} tileWidth={240} aspect="16/9" />
    </div>




  );
}
