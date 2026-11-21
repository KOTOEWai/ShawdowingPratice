import { fetchAllPlaylist, DetailAll } from "@/features/topics";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// Playlist IDs mapping
const PLAYLIST_MAP: Record<string, string> = {
  ielts: "PLcetZ6gSk96-FECmH9l7Vlx5VDigvgZpt",
  tedTalks: "PLZG9T88qSv3mltebr7oJQtkQsnP6q7jhy",
  dailyEnglish: "PLpoe_jMVIqUcdpwR2VLP7a_QVA-VPZ07_",
  shortMovies: "PLpBINXsV2ulXHX8c7P6hOa6WDYT70JZGU",
  business: "PLcetZ6gSk969oGvAI0e4_PgVnlGbm64bp",
  everydayQa: "PL4C632FCF5FCB9C21",
};

const TITLE_MAP: Record<string, string> = {
  ielts: "IELTS & 6-Minute English",
  tedTalks: "TED Talks & Inspiring Ideas",
  dailyEnglish: "Daily English Conversation",
  shortMovies: "Movie Short Clips",
  business: "Business English & Job Interview",
  everydayQa: "Everyday English Q&A",
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
  const displayTitle =
    TITLE_MAP[category] ||
    category.replace(/([A-Z])/g, " $1").trim().replace(/^./, (c) => c.toUpperCase());

  return (
    <DetailAll 
      videos={videos} 
      title={displayTitle} 
    />
  );
}
