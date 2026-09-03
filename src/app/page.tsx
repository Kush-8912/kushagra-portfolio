import { cookies } from "next/headers";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default async function Home() {
  const cookieStore = await cookies();
  const initialTheme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";

  return (
    <>
      <Nav initialTheme={initialTheme} />
      <main>
        <Hero />
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
