import { fetchFromPlaylist, TopicView } from "@/features/topics";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ielts = await fetchFromPlaylist("PLcetZ6gSk96-FECmH9l7Vlx5VDigvgZpt");
  const tedVideos = await fetchFromPlaylist("PLZG9T88qSv3mltebr7oJQtkQsnP6q7jhy");
  const dailyconversationsVideos = await fetchFromPlaylist("PLpoe_jMVIqUcdpwR2VLP7a_QVA-VPZ07_");
  const shortmovieVideos = await fetchFromPlaylist("PLpBINXsV2ulXHX8c7P6hOa6WDYT70JZGU");
  const business = await fetchFromPlaylist("PLcetZ6gSk969oGvAI0e4_PgVnlGbm64bp");
  const everydayQa = await fetchFromPlaylist("PL4C632FCF5FCB9C21");

  return (
    <TopicView 
      ielts={ielts}
      tedVideos={tedVideos}
      dailyVideos={dailyconversationsVideos}
      movieVideos={shortmovieVideos}
      business={business}
      everydayQa={everydayQa}
    />
  );
}
