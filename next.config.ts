import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images:{
        remotePatterns: [{
          protocol: 'https',
          hostname: "encrypted-tbn0.gstatic.com",
        },{
          protocol: "https",
          hostname: "i.ytimg.com",
        }],
  },
  
};

export default nextConfig;
