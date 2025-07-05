"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import tsParticlesConfig from "./config.ts";

function calculateResponsiveValue(
  { value: base, min, max }: { value: number; min: number; max: number },

  width: number,
  height: number,
) {
  const scale = Math.min(
    width / tsParticlesConfig.base.width,
    height / tsParticlesConfig.base.height,
  );
  return Math.max(min, Math.min(max, base * scale));
}

export default function Background() {
  const [init, setInit] = useState(false);
  const [size, setSize] = useState(tsParticlesConfig.base.size.value);
  const [repulseDistance, setRepulseDistance] = useState(
    tsParticlesConfig.base.distance.value,
  );

  useEffect(() => {
    initParticlesEngine(loadSlim).then(() => setInit(true));
  }, []);

  useEffect(() => {
    const updateResponsiveValues = () => {
      const { innerWidth: width, innerHeight: height } = window;
      setSize(
        calculateResponsiveValue(tsParticlesConfig.base.size, width, height),
      );
      setRepulseDistance(
        calculateResponsiveValue(
          tsParticlesConfig.base.distance,
          width,
          height,
        ),
      );
    };

    updateResponsiveValues();
    window.addEventListener("resize", updateResponsiveValues);

    const dprMediaQuery = window.matchMedia(
      `(resolution: ${window.devicePixelRatio}dppx)`,
    );
    dprMediaQuery.addEventListener("change", updateResponsiveValues);

    return () => {
      window.removeEventListener("resize", updateResponsiveValues);
      dprMediaQuery.removeEventListener("change", updateResponsiveValues);
    };
  }, []);

  const config = {
    ...tsParticlesConfig,
    particles: { ...tsParticlesConfig.particles, size: { value: size } },
    interactivity: {
      ...tsParticlesConfig.interactivity,
      modes: {
        ...tsParticlesConfig.interactivity.modes,
        repulse: {
          ...tsParticlesConfig.interactivity.modes?.repulse,
          distance: repulseDistance,
        },
      },
    },
  };

  return init && <Particles options={config} />;
}
