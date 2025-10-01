export default function HeroVideo() {
  const videoSrc =
    "https://www.pexels.com/video/a-photographer-setting-up-his-digital-camera-to-take-a-photo-of-chicago-theater-s-frontage-3804693/"; // swap with any link above

  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        poster="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" /* tiny placeholder */
      />
      {/* Optional overlay + heading */}
      <div className="relative z-10 flex h-full items-center bg-black/30">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h1 className="text-3xl md:text-5xl font-semibold text-white drop-shadow">
            Your Narrative Title
          </h1>
          <p className="mt-3 max-w-xl text-white/80">
            A short subtitle over the looping background video.
          </p>
        </div>
      </div>
    </section>
  );
}
