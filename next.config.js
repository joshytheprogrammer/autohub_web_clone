/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL: 'https://api.autohub.africa',
    SECRET_KEY: '',
    CLOUD_BASE_URL: 'https://server.trustedmiddleman.app/',
    LIVE_URL: 'https://server.trustedmiddleman.app/',
    ENV: ''
  },
  images: {
   unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.autohub.africa',
        port: '',
        pathname: '/**'
      }
    ]
  }
  
}

module.exports = nextConfig
