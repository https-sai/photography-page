import CascadeCard from '../components/CascadeCard';
import Gallery from '@/components/Gallery';

export default function Photography({
  items = Array.from({ length: 24 }).map((_, i) => ({ id: i })),
  className = "",
}: {
  items?: { id: string | number }[];
  className?: string;
}) {
  return (
    <Gallery/>
  );
}
