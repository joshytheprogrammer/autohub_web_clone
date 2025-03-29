/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL: 'https://api.autohub.africa',
    SECRET_KEY: '',
    CLOUD_BASE_URL: 'https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub/',
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
