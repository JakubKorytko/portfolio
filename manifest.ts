import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jakub Korytko Developer",
    short_name: "Jakub Korytko",
    description:
      "Portfolio of Jakub Korytko, Software Engineer specializing in JavaScript, TypeScript, and React.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
