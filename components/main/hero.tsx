import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => (
  <div className="relative flex flex-col min-h-screen md:h-screen w-full overflow-x-hidden md:overflow-hidden">
    {/* Mobile — original responsive offset */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="md:hidden rotate-180 absolute left-0 w-full h-full object-cover -z-20 top-[-200px]"
    >
      <source src="/videos/blackhole.webm" type="video/webm" />
    </video>

    {/* Desktop — unchanged */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="hidden md:block rotate-180 absolute left-0 w-full h-full object-cover -z-20 top-[-250px] object-center"
    >
      <source src="/videos/blackhole.webm" type="video/webm" />
    </video>

    <HeroContent />
  </div>
);
