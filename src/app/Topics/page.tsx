import { fetchFromPlaylist, TopicView } from "@/features/topics";

export const dynamic = "force-dynamic";

export default async function Page() {
  const shortmovieVideos = await fetchFromPlaylist("PLpBINXsV2ulXHX8c7P6hOa6WDYT70JZGU");
  const dailyconversationsVideos = await fetchFromPlaylist("PLpoe_jMVIqUcdpwR2VLP7a_QVA-VPZ07_");
  const business = await fetchFromPlaylist("PLcetZ6gSk969oGvAI0e4_PgVnlGbm64bp");
  const ielts = await fetchFromPlaylist("PLcetZ6gSk96-FECmH9l7Vlx5VDigvgZpt");

  return (
    <TopicView 
      movieVideos={shortmovieVideos} 
      dailyVideos={dailyconversationsVideos}
      business={business}
      ielts={ielts}
    />
  );
}
