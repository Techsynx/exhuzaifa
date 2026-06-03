import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => (
  <div className="relative flex flex-col h-screen w-full overflow-hidden">
    <video
      autoPlay
      muted
      loop
      className="rotate-180 absolute top-[-200px] md:top-[-60px] left-0 w-full h-full object-cover -z-20 md:object-[center_50%]"
    >
      <source src="/videos/blackhole.webm" type="video/webm" />
    </video>
    <HeroContent />
  </div>
);
