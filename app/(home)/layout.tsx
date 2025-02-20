import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from 'react-hot-toast';
import HeaderNavigation from '../../components/shared/HeaderNavigation'
import Footer from '../../components/shared/Footer'
import AutoHubProvider from '../../provider/AutoHubProvider'
// import NetworkStatusProvider from '../../provider/NetworkProvider';

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoHub Home Page',
  description: 'AutoHub',
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
