import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/curriculum",
        destination: "/academy",
        statusCode: 301,
      },
      {
        source: "/curriculum/:slug",
        destination: "/academy/:slug",
        statusCode: 301,
      },
      {
        source: "/milestones",
        destination: "/academy/milestones",
        statusCode: 301,
      },
      {
        source: "/bot",
        destination: "/labs/enforcer",
        statusCode: 301,
      },
      {
        source: "/track-record",
        destination: "/labs/enforcer/track-record",
        statusCode: 301,
      },
      {
        source: "/calculator",
        destination: "/labs/calculator",
        statusCode: 301,
      },
      {
        source: "/martingale-calculator",
        destination: "/labs/martingale-calculator",
        statusCode: 301,
      },
      {
        source: "/volatility-75-strategy",
        destination: "/labs/volatility-75",
        statusCode: 301,
      },
      {
        source: "/deriv-bot",
        destination: "/labs/deriv-bot",
        statusCode: 301,
      },
      {
        source: "/partner",
        destination: "/partners",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
