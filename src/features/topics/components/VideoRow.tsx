import { VideoRowProps } from "../types";
import TopicGrid from "./TopicGrid";
import Link from "next/link";

export const VideoRow = ({ title, link, videos }: VideoRowProps) => (
  <section className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
        {title}
        <span className="text-[#A667E4] text-xs font-mono font-normal ml-2.5">(100+ lessons)</span>
      </h2>
      <Link href={link} className="text-[#A667E4] hover:text-white text-xs font-medium transition-colors">
        View all →
      </Link>
    </div>
    <TopicGrid videos={videos} />
  </section>
);
