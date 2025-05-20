import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from 'react-hot-toast';
import HeaderNavigation from '../../components/shared/HeaderNavigation'
import Footer from '../../components/shared/Footer'
import AutoHubProvider from '../../provider/AutoHubProvider'
// import NetworkStatusProvider from '../../provider/NetworkProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://eu2.contabostorage.com')
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
          {/* className={`w-12/12 ${inter}` } */}
          <body 
              className={`w-12/12` }
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
