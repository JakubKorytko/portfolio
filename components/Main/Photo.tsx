"use client";

import Image from "next/image";
import PhotoBackground from "@/components/Main/PhotoBackground.tsx";
import { useImperativeHandle, useRef } from "react";
import type { Ref } from "react";

export type PhotoRefs = {
  container: HTMLDivElement | null;
  image: HTMLImageElement | null;
};

export default function Photo({ ref }: { ref?: Ref<PhotoRefs> }) {
  const container = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useImperativeHandle(ref, () => ({
    container: container.current,
    image: image.current,
  }));

  return (
    <div
      className="flex flex-col gap-4 text-4xl items-center justify-center opacity-0"
      ref={container}
    >
      <span className="text-white">
        {"<"}
        <span className="text-[var(--primary)]">MyPhoto</span>
        {">"}
      </span>
      <div className="relative overflow-hidden">
        <Image
          src={"/images/me.png"}
          alt={"Photo of me"}
          width={400}
          ref={image}
          height={400}
          className={`bg-[var(--bg-black-400)] rounded-4xl border-4 shadow-lg select-none pointer-events-none relative z-10 invisible`}
        />
        <PhotoBackground className="absolute top-0 p-1 opacity-60 overflow-hidden w-full h-full" />
      </div>
      <span className="text-white">
        {"</"}
        <span className="text-[var(--primary)]">MyPhoto</span>
        {">"}
      </span>
    </div>
  );
}
