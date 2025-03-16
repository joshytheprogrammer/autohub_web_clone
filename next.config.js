/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  reactStrictMode: false,
  env: {
    URL: 'https://api.autohub.africa',
    ASTURL: 'https://server.trustedmiddleman.app/',
    SECRET_KEY: '',
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
