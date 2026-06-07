import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => (
  <div className="relative flex flex-col w-full max-md:overflow-x-hidden md:h-screen md:overflow-hidden">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="rotate-180 pointer-events-none absolute left-0 w-full object-cover -z-20
        top-[-200px] h-[calc(100%+200px)] object-[50%_100%]
        md:top-[-270px] md:h-full md:object-center
        max-md:top-[-250px] max-md:h-[60%]"
    >
      <source src="/videos/blackhole.webm" type="video/webm" />
    </video>
    <HeroContent />
  </div>
);
