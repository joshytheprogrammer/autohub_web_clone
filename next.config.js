/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  reactStrictMode: false,
  env: {
    URL: 'https://api.autohub.africa/',
    SECRET_KEY: '',
    ENV: ''
  },
  images: {
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