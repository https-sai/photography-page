import CascadeCard from '../components/CascadeCard';

export default function Videography({
  items = Array.from({ length: 24 }).map((_, i) => ({ id: i })),
  className = "",
}: {
  items?: { id: string | number }[];
  className?: string;
}) {
  return (
    <section
      className={`min-h-screen w-full bg-slate-950 text-white ${className}`}
    >
      {/* Gallery grid */}
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <CascadeCard key={item.id} index={i} />
        ))}
      </div>
    </section>
  );
}
