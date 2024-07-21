const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['@/components', '@/pages', '@/layouts'],
    prependData: `@import '@/styles/_main.scss';`,
  },
};

export default nextConfig;
