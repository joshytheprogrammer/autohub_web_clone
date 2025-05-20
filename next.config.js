/** @type {import('next').NextConfig} */
const nextConfig = 
{
  reactStrictMode: false,
  env: {
    URL: 'http://127.0.0.1:8888',
    SECRET_KEY: 'kHbSN.%_&Pf4D}(V9-}X2,?23K0m=U5zGe#7yhLe6(dQtxi%R{92zC1tya31JTB5Lbf*b?h.G;L7#KGML?*rc)H,E?3F%F=N/Hg}',
    CLOUD_BASE_URL: 'https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub/',
    ENV: 'development'
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



/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   env: {
//     URL: 'https://api.autohub.africa',
//     SECRET_KEY: '',
//     CLOUD_BASE_URL: 'https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub/',
//     ENV: ''
//   },
//   images: {
//    unoptimized: true,
//    formats: ['image/webp'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'eu2.contabostorage.com',
//         port: '',
//         pathname: '/**'
//       }
//     ]
//   }
  
// }
// module.exports = nextConfig