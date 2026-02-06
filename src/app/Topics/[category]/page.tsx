// app/Topics/[category]/page.tsx

import fetchAllPlaylist from '@/app/lib/fetchAll';
import DetailAll from '@/components/DetailAll';
import { notFound } from 'next/navigation';

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

  // အကယ်၍ URL က PLAYLIST_MAP ထဲမှာမရှိရင် 404 ပြမယ်
  const playlistId = PLAYLIST_MAP[category];
  
  if (!playlistId) {
    notFound();
  }

  const videos = await fetchAllPlaylist(playlistId);

  // Title ကို ပိုလှအောင် format လုပ်ခြင်း (e.g., dailyEnglish -> Daily English)
  const displayTitle = category.replace(/([A-Z])/g, ' $1').trim();

  return (
    <DetailAll 
      videos={videos} 
      title={displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1)} 
    />
  );
}