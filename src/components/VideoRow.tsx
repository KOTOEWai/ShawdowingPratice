import { VideoRowProps } from "@/app/Types/Type";

import Topic from "./Topic";
import Link from "next/link";

export  const VideoRow = ({ title, link, videos }: VideoRowProps) => (
  <section className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">
        {title} 
        <span className="text-blue-400 text-sm font-normal ml-2">(100+ lessons)</span>
      </h2>
      <Link href={link} className="text-blue-400 text-sm hover:underline">
        View all &gt;
      </Link>
    </div>
    <Topic videos={videos} />
  </section>
);
