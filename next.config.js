/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  reactStrictMode: false,
  env: {
    URL: '',
    SECRET_KEY: '',
    ENV: ''
  },
  images: {
    remotePatterns: [
      {
        protocol: '',
        hostname: '',
        port: '',
        pathname: '/**'
      }
    ]
  },
  
}

module.exports = nextConfig
