/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/plumbers',
        destination: '/',
        permanent: true,
      },
      {
        source: '/podcastcasestudy',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
