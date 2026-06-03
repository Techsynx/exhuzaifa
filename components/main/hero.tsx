import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => (
  <div className="relative flex flex-col min-h-screen w-full overflow-hidden">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="rotate-180 pointer-events-none absolute left-0 w-full object-cover -z-20 top-[-200px] h-[115%] md:top-auto md:bottom-[-8%] md:h-[72vh] md:object-[center_45%]"
    >
      <source src="/videos/blackhole.webm" type="video/webm" />
    </video>

    {/* Gradients keep hero text readable over the bright video glow */}
    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#030014] via-[#030014]/75 to-[#030014]/20 md:via-[#030014]/55" />
    <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block bg-gradient-to-r from-[#030014] via-[#030014]/85 to-transparent w-[60%]" />
    <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 -z-10 bg-gradient-to-t from-[#030014] to-transparent" />

    <HeroContent />
  </div>
);
