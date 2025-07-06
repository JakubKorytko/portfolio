import { useRef } from "react";
import { PhotoRefs } from "@/components/Main/Photo.tsx";
import useGitHubStats from "@/libs/useGitHubStats.ts";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

const useContainerAnimations = (
  gitHubStats: ReturnType<typeof useGitHubStats>,
) => {
  const aboutMeContainer = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<PhotoRefs>({
    container: null,
    image: null,
  });
  const statsContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!aboutMeContainer.current) return;

    const aboutMeContainerTimeline = gsap
      .timeline({
        paused: true,
        scrollTrigger: {
          trigger: aboutMeContainer.current,
          onEnter: () => {
            aboutMeContainerTimeline.play();
          },
          onEnterBack: () => {
            aboutMeContainerTimeline.play();
          },
          onLeave: () => {
            aboutMeContainerTimeline.pause(0);
          },
          onLeaveBack: () => {
            aboutMeContainerTimeline.pause(0);
          },
        },
      })
      .to(aboutMeContainer.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        aboutMeContainer.current.parentNode?.querySelector(".icons") ?? null,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
      )
      .to(aboutMeContainer.current.querySelector(".text-content"), {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
  }, []);

  useGSAP(() => {
    if (!photoRefs.current.container || !photoRefs.current.image) return;

    const split = new SplitText(photoRefs.current.container, {
      type: "chars",
      reduceWhiteSpace: false,
    });

    const photoContainerTimeLine = gsap
      .timeline({
        paused: true,
        scrollTrigger: {
          trigger: photoRefs.current.container,
          onEnter: () => {
            photoContainerTimeLine.play();
          },
          onEnterBack: () => {
            photoContainerTimeLine.play();
          },
          onLeave: () => {
            photoContainerTimeLine.pause(0);
          },
          onLeaveBack: () => {
            photoContainerTimeLine.pause(0);
          },
        },
      })
      .to(photoRefs.current.container, {
        opacity: 1,
        duration: 0.3,
      })
      .from(split.chars, {
        display: "none",
        stagger: 0.005,
      })
      .set(photoRefs.current.image, {
        visibility: "visible",
        filter: "blur(20px)",
      })
      .to(photoRefs.current.image, {
        filter: "blur(0px)",
        duration: 0.3,
      });
  }, []);

  useGSAP(() => {
    const areGithubStatsReady =
      !!gitHubStats.mergedPRs && !!gitHubStats.totalCommits;

    if (!areGithubStatsReady || !statsContainer.current) {
      return;
    }

    const statsChildren =
      statsContainer.current.querySelectorAll<HTMLSpanElement>(".counter");

    statsChildren.forEach((child) => {
      child.innerText = child.getAttribute("data-value") || "0";
    });

    const statsContainerTimeline = gsap
      .timeline({
        paused: true,
        scrollTrigger: {
          trigger: statsContainer.current,
          onEnter: () => {
            statsContainerTimeline.play();
          },
          onEnterBack: () => {
            statsContainerTimeline.play();
          },
          onLeave: () => {
            statsContainerTimeline.pause(0);
          },
          onLeaveBack: () => {
            statsContainerTimeline.pause(0);
          },
        },
      })
      .to(statsContainer.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      .from(statsChildren, {
        innerText: 0,
        duration: 1,
        snap: {
          innerText: 1,
        },
      });
  }, [gitHubStats]);

  return {
    aboutMeContainer,
    photoRefs,
    statsContainer,
  };
};

export default useContainerAnimations;
