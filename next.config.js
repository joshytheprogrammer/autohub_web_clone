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
  }
  
}

module.exports = nextConfig
