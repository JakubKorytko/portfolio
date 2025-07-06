"use client";

import AboutMe from "@/components/Main/AboutMe.tsx";
import Photo from "@/components/Main/Photo.tsx";
import Stats from "@/components/Main/Stats.tsx";
import useGitHubStats from "@/libs/useGitHubStats.ts";
import useContainerAnimations from "@/components/Main/useContainerAnimations.ts";

export default function Main() {
  const gitHubStats = useGitHubStats();
  const { aboutMeContainer, photoRefs, statsContainer } =
    useContainerAnimations(gitHubStats);

  return (
    <section className="flex flex-col items-center justify-center w-full gap-16 p-16">
      <div className="flex flex-row items-center justify-center gap-16 w-full flex-wrap-reverse">
        <AboutMe ref={aboutMeContainer} />
        <Photo ref={photoRefs} />
      </div>
      <Stats gitHubStats={gitHubStats} ref={statsContainer} />
    </section>
  );
}
