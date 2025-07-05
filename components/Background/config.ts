import { IParticlesProps } from "@tsparticles/react";

const BASE_SIZE = 100;
const BASE_DISTANCE = 200;

const tsParticlesConfig = {
  base: {
    width: 2560,
    height: 1305,
    size: {
      min: 40,
      max: 300,
      value: BASE_SIZE,
    },
    distance: {
      min: 80,
      max: 250,
      value: BASE_DISTANCE,
    },
  },
  fpsLimit: 30,
  style: {
    filter: "blur(40px)",
    opacity: "0.8",
  },
  particles: {
    size: {
      value: BASE_SIZE,
    },
    opacity: {
      value: 0.02,
    },
    number: {
      value: 1500,
    },
    reduceDuplicates: true,
    color: {
      value: "#ffab6e",
    },
    move: {
      enable: true,
      speed: 1.3,
      random: true,
      straight: true,
      outModes: {
        default: "out",
      },
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: ["bubble"],
      },
      onHover: {
        enable: true,
        mode: ["repulse"],
      },
    },
    modes: {
      repulse: {
        distance: BASE_DISTANCE,
        duration: 0.5,
      },
    },
  },
  responsive: [
    {
      maxWidth: 6000,
      options: {
        particles: {
          number: {
            value: 800,
          },
        },
      },
    },
  ],
  detectRetina: true,
  smooth: true,
} satisfies IParticlesProps["options"];

export default tsParticlesConfig;
