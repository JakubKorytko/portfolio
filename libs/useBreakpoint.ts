import { useEffect, useState } from "react";
import defaultTheme from "tailwindcss/defaultTheme";

type Breakpoint = keyof typeof defaultTheme.screens | null;

const breakpoints = Object.fromEntries(
  Object.entries(defaultTheme.screens).map(([key, value]) => [
    key,
    `(min-width: ${value})`,
  ]),
);

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(null);

  useEffect(() => {
    const mediaQueries = Object.entries(breakpoints).map(([key, query]) => ({
      key,
      mql: window.matchMedia(query),
    }));

    const detect = () => {
      const active = mediaQueries
        .filter(({ mql }) => mql.matches)
        .map(({ key }) => key);
      setBreakpoint((active as Breakpoint[]).slice(-1)[0] || null);
    };

    mediaQueries.forEach(({ mql }) => mql.addEventListener("change", detect));
    detect();

    return () => {
      mediaQueries.forEach(({ mql }) =>
        mql.removeEventListener("change", detect),
      );
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
