import { Chatbot } from "@/components/main/chatbot";
import { CodeShowcase } from "@/components/main/code-showcase";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
        <CodeShowcase />
        <Chatbot />
      </div>
    </main>
  );
}
