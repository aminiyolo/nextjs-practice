/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'], // 해당 옵션을 사용하면, Next.js의 서버 사이드 렌더링 기능을 사용할 때, 서버 측에서 필요한 외부 패키지를 지정하고 번들링하여 사용하게 된다.
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
