"use client";

import dynamic from "next/dynamic";

import { Chatbot } from "@/components/main/chatbot";
import { CodeShowcase } from "@/components/main/code-showcase";
import { ContactForm } from "@/components/main/contact-form";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";

const EnduranceModel = dynamic(() => import("@/components/EnduranceModel"), {
  ssr: false,
  loading: () => <div style={{ height: "100vh" }} />,
});

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-2">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
        <CodeShowcase />
        <Chatbot />
        <ContactForm />
        <EnduranceModel />
      </div>
    </main>
  );
}
