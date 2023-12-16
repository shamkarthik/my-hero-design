const { withContentlayer } = require("next-contentlayer");
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["user-images.githubusercontent.com"],
  },
};

module.exports = withContentlayer(nextConfig);
