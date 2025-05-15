import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from 'react-hot-toast';
import HeaderNavigation from '../../components/shared/HeaderNavigation'
import Footer from '../../components/shared/Footer'
import AutoHubProvider from '../../provider/AutoHubProvider'
// import NetworkStatusProvider from '../../provider/NetworkProvider';

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://eu2.contabostorage.com'),
  openGraph: {
    title: 'AutoHub Africa',
    description: 'AutoHub',
    images: ['https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub//aa/2025-04-16-advert-image-autohub-image67ffcb70149d5-100.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    site: '@eMartiiin94',
    title: 'Title webtsite',
    description: 'this is the desciption',
  }
}

export default function RootLayout(
{
  children,
}: {
  children: React.ReactNode
}) {

      return (
        <html 
            lang="en">
          {/* <head>
              <meta property="og:image" content="" />
              <meta property="og:image:type" content="" />
              <meta property="og:image:width" content="" />
              <meta property="og:image:height" content="" />
              <meta property="og:image:alt" content="About Acme" />
          </head> */}
          <body 
              className={`w-12/12`}
          >
              <Toaster />
              {/* <NetworkStatusProvider> */}
                <AutoHubProvider>                
                  <HeaderNavigation />
                    {children}
                  <Footer />
                </AutoHubProvider>
              {/* </NetworkStatusProvider> */}
          </body>
        </html>
      )
}
