import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.externals.push('@node-rs/bcrypt');
    return config;
  }
};

export default nextConfig;
