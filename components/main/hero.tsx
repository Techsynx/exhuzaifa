import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => (
  <div className="relative flex flex-col min-h-screen md:h-screen w-full overflow-x-hidden md:overflow-hidden">
    {/* Mobile — blackhole arc just below navbar */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="md:hidden rotate-180 pointer-events-none absolute left-1/2 -translate-x-1/2 -z-20 w-[125%] max-w-none object-cover top-[-44vh] h-[115vh] object-[50%_100%]"
    >
      <source src="/videos/blackhole.webm" type="video/webm" />
    </video>

    {/* Desktop — unchanged positioning */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="hidden md:block rotate-180 pointer-events-none absolute left-0 w-full h-full object-cover -z-20 top-[-250px] object-center"
    >
      <source src="/videos/blackhole.webm" type="video/webm" />
    </video>

    <HeroContent />
  </div>
);
