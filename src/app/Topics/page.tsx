import { fetchFromPlaylist, TopicView, CURATED_MOVIES } from "@/features/topics";

export const dynamic = "force-dynamic";

export default async function Page() {
  const shortmovieVideos = await fetchFromPlaylist("PLA7lNLNvxTzig5dqfGl8DGbLOvUI08yXg");
  const dailyconversationsVideos = await fetchFromPlaylist("PLlcQE71Tw-F3bKWJtsNGhHKXfjIFvo4g1");
  const business = await fetchFromPlaylist("PLcetZ6gSk969oGvAI0e4_PgVnlGbm64bp");
  const ielts = await fetchFromPlaylist("PLDPk0CoasyhXHRNiB93BcH91XfJbNe3Cr");

  return (
    <TopicView 
      movieVideos={shortmovieVideos} 
      dailyVideos={dailyconversationsVideos}
      business={business}
      ielts={ielts}
      curatedMovies={CURATED_MOVIES}
    />
  );
}
