const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ['sfwstksbcsjpgmmwletg.supabase.co']
  },
};

const config = withPlugins(
  [
    [
      optimizedImages,
      {
        // optimisation disabled by default, to enable check https://github.com/cyrilwanner/next-optimized-images
        optimizeImages: false,
      },
    ],
  ],
  nextConfig
);