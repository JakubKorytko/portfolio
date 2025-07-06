"use client";

import appData from "@/appData.ts";
import type { Ref } from "react";

export default function Stats({
  gitHubStats,
  ref,
}: {
  gitHubStats: {
    mergedPRs: number;
    totalCommits: number;
  };
  ref?: Ref<HTMLDivElement>;
}) {
  const today = new Date();

  const totalDays = Math.floor(
    (today.getTime() - appData.firstJobDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const devDays = Math.floor(
    (today.getTime() - appData.firstDevJobDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const nonDevDays = totalDays - devDays;

  const { headers } = appData.stats;

  return (
    <div
      ref={ref}
      className="flex xl:flex-row flex-col justify-between gap-18 p-8 bg-[var(--bg-black-400)] rounded-4xl xl:w-auto w-full opacity-0"
    >
      <div className="flex flex-col gap-4">
        <span className="text-white border-b-1 border-white pb-3">
          {headers.mergedPRs}
        </span>
        <span className="text-2xl counter" data-value={gitHubStats.mergedPRs}>
          0
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-white border-b-1 border-white pb-3">
          {headers.totalCommits}
        </span>
        <span
          className="text-2xl counter"
          data-value={gitHubStats.totalCommits}
        >
          0
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-white border-b-1 border-white pb-3">
          {headers.commercialExperience}
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-2xl">
            <span className="counter" data-value={totalDays}>
              0
            </span>
            &nbsp;days in the industry
          </span>
          <span className="text-2xl">
            <span className="counter" data-value={devDays}>
              0
            </span>
            &nbsp;days as a developer
          </span>

          <span className="text-2xl">
            <span className="counter" data-value={nonDevDays}>
              0
            </span>
            &nbsp;days in non-dev IT roles
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-white border-b-1 border-white pb-3">
          {headers.adoptedCats}
        </span>
        <span className="text-2xl counter" data-value={appData.adoptedCats}>
          0
        </span>
      </div>
    </div>
  );
}
