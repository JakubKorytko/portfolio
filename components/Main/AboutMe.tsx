"use client";

import Image from "next/image";
import Link from "next/link";
import appData from "@/appData.ts";
import { Fragment } from "react";
import useBreakpoint from "@/libs/useBreakpoint.ts";
import type { Ref } from "react";

export default function AboutMe({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const currentBreakpoint = useBreakpoint();

  const transformedText = appData.aboutMe.map((text, mainIndex) => {
    const newText = text.split("**").map((part, index) =>
      index % 2 === 1 ? (
        <span key={`${part}-${index}`} className="text-[var(--primary)]">
          {part}
        </span>
      ) : (
        part
      ),
    );

    if (mainIndex === 0) return newText;

    return (
      <Fragment key={`divider-${mainIndex}`}>
        <div className="h-1 w-full my-4 mx-0" />
        {newText}
      </Fragment>
    );
  });

  const iconBaseSize = ["xl", "2xl"].includes(currentBreakpoint ?? "")
    ? appData.baseIconSize
    : appData.baseMobileIconSize;

  const icons = appData.icons.map(({ name, url, icon, increaseSizeValue }) => (
    <Link key={name} href={url} target="_blank">
      <Image
        src={icon}
        alt={name}
        width={iconBaseSize + (increaseSizeValue || 0)}
        height={iconBaseSize + (increaseSizeValue || 0)}
        style={{ transition: "filter 0.3s" }}
        onMouseOver={(e) =>
          e.currentTarget.style.setProperty("filter", "brightness(5)")
        }
        onMouseOut={(e) => e.currentTarget.style.removeProperty("filter")}
      />
    </Link>
  ));

  return (
    <div className="flex flex-col items-center gap-4 max-w-4xl text-2xl text-white">
      <div
        className="text-white relative bg-[var(--bg-black-400)] rounded-4xl leading-10 origin-left scale-x-0"
        ref={ref}
      >
        <div className="py-8 px-16">
          <div className="text-content opacity-0 ">{transformedText}</div>
          <div className="absolute top-0 left-0 h-3/4 w-1/2 border-l-2 border-t-2 rounded-tl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-3/4 w-1/4 border-r-2 border-b-2 rounded-br-xl pointer-events-none"></div>
        </div>
      </div>
      <div className="flex gap-8 xl:gap-4 flex-row items-center justify-center xl:justify-end w-full xl:pt-0 pt-4 xl:pr-4 opacity-0 icons">
        {icons}
      </div>
    </div>
  );
}
