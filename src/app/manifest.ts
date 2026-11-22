import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shadowing English Practice",
    short_name: "ShadowingApp",
    description: "Master English speaking fluency through sentence-by-sentence shadowing with real videos and voice analysis.",
    start_url: "/",
    display: "standalone",
    background_color: "#2E2E2E",
    theme_color: "#1F132A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
