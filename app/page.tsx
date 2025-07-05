import Main from "@/components/Main";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex flex-col items-center text-[var(--primary)] w-full relative p-4 gap-14">
      <Main />
      <Timeline />
      <Projects />
    </main>
  );
}
