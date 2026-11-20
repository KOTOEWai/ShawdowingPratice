import { fetchAllPlaylist, DetailAll } from "@/features/topics";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// Playlist IDs mapping
const PLAYLIST_MAP: Record<string, string> = {
  shortMovies: "PLA7lNLNvxTzig5dqfGl8DGbLOvUI08yXg",
  dailyEnglish: "PLlcQE71Tw-F3bKWJtsNGhHKXfjIFvo4g1",
  business: "PLcetZ6gSk969oGvAI0e4_PgVnlGbm64bp",
  ielts: "PLDPk0CoasyhXHRNiB93BcH91XfJbNe3Cr",
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  const playlistId = PLAYLIST_MAP[category];

  if (!playlistId) {
    notFound();
  }

  const videos = await fetchAllPlaylist(playlistId);
  const displayTitle = category.replace(/([A-Z])/g, " $1").trim();

  return (
    <DetailAll 
      videos={videos} 
      title={displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1)} 
    />
  );
}
