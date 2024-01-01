import { withContentlayer } from "next-contentlayer";
import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["user-images.githubusercontent.com"],
  },
};

export default withContentlayer(nextConfig);
