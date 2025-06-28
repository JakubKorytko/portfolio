"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import alea from "alea";

type AnimatedBackgroundProps = {
  zIndex?: number;
};

type Point = { x: number; y: number; offset: number };
type Impulse = { x: number; y: number; age: number };

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  zIndex = -1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(undefined);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const clickImpulses = useRef<Impulse[]>([]);

  const config = useMemo(
    () => ({
      gridSpacing: 80,
      colors: ["#000000", "#d55900", "#ffab6e"],
      influenceRadius: 120,
      impulseMaxAge: 60,
      impulseRadius: 150,
    }),
    [],
  );

  const generatePoints = useCallback(
    (width: number, height: number, rand: () => number) => {
      const points: Point[] = [];
      for (let x = 0; x < width; x += config.gridSpacing) {
        for (let y = 0; y < height; y += config.gridSpacing) {
          points.push({ x, y, offset: rand() * 1000 });
        }
      }
      return points;
    },
    [config.gridSpacing],
  );

  const applyCursorEffect = useCallback(
    (px: number, py: number): [number, number] => {
      if (!mouseRef.current) return [px, py];

      const dist = Math.hypot(px - mouseRef.current.x, py - mouseRef.current.y);
      if (dist < config.influenceRadius) {
        const strength = (1 - dist / config.influenceRadius) * 30;
        px += ((px - mouseRef.current.x) / dist) * strength;
        py += ((py - mouseRef.current.y) / dist) * strength;
      }
      return [px, py];
    },
    [config.influenceRadius],
  );

  const applyImpulseEffects = useCallback(
    (px: number, py: number): [number, number] => {
      for (const impulse of clickImpulses.current) {
        const dist = Math.hypot(px - impulse.x, py - impulse.y);
        if (dist < config.impulseRadius) {
          const intensity =
            (1 - dist / config.impulseRadius) *
            (1 - impulse.age / config.impulseMaxAge);
          const strength = intensity * 50;
          px += ((px - impulse.x) / dist) * strength;
          py += ((py - impulse.y) / dist) * strength;
        }
      }
      return [px, py];
    },
    [config.impulseRadius, config.impulseMaxAge],
  );

  const renderPoint = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      px: number,
      py: number,
      t: number,
      offset: number,
      noise3D: (x: number, y: number, z: number) => number,
    ) => {
      const n = noise3D(px * 0.002, py * 0.002, t * 0.0005 + offset);
      const radius = Math.abs(n) * 4 + 1;
      const colorIndex =
        Math.floor(Math.abs(n) * config.colors.length) % config.colors.length;

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = config.colors[colorIndex];
      ctx.fill();
    },
    [config.colors],
  );

  const updateImpulses = useCallback(() => {
    clickImpulses.current = clickImpulses.current.filter(
      (impulse) => ++impulse.age < config.impulseMaxAge,
    );
  }, [config.impulseMaxAge]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = alea("my-seed");
    const noise3D = createNoise3D(rand);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let points = generatePoints(width, height, rand);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points = generatePoints(width, height, rand);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        let [px, py] = applyCursorEffect(p.x, p.y);
        [px, py] = applyImpulseEffects(px, py);
        renderPoint(ctx, px, py, t, p.offset, noise3D);
      }

      updateImpulses();
      animationRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener(
      "mousemove",
      (e) => (mouseRef.current = { x: e.clientX, y: e.clientY }),
    );
    window.addEventListener("mouseleave", () => (mouseRef.current = null));
    window.addEventListener("click", (e) =>
      clickImpulses.current.push({ x: e.clientX, y: e.clientY, age: 0 }),
    );

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener(
        "mousemove",
        (e) => (mouseRef.current = { x: e.clientX, y: e.clientY }),
      );
      window.removeEventListener("mouseleave", () => (mouseRef.current = null));
      window.removeEventListener("click", (e) =>
        clickImpulses.current.push({ x: e.clientX, y: e.clientY, age: 0 }),
      );
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [
    generatePoints,
    applyCursorEffect,
    applyImpulseEffects,
    renderPoint,
    updateImpulses,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex,
        width: "100%",
        height: "100%",
        background: "#000",
        pointerEvents: "auto",
      }}
    />
  );
};

export default AnimatedBackground;
