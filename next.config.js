/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  reactStrictMode: false,
  env: {
    URL: 'https://api.autohub.africa/',
    SECRET_KEY: 'kHbSN.%_&Pf4D}(V9-}X2,?23K0m=U5zGe#7yhLe6(dQtxi%R{92zC1tya31JTB5Lbf*b?h.G;L7#KGML?*rc)H,E?3F%F=N/Hg}',
    ENV: 'production'
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
