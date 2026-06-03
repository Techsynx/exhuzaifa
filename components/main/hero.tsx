import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => (
  <div className="relative flex flex-col h-screen w-full overflow-hidden">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="rotate-180 pointer-events-none absolute left-0 w-full object-cover -z-20 top-[-280px] h-[calc(100%+280px)] object-[50%_82%] md:top-[-250px] md:h-full md:object-center"
    >
      <source src="/videos/blackhole.webm" type="video/webm" />
    </video>
    <HeroContent />
  </div>
);
