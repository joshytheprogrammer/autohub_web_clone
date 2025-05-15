import { Suspense } from "react"
import Loading from "../loading"

export const metadata = {
  title: 'AutoHub - Member Registration',
  description: 'Autohub',
}


export default function MemberLayout({ children } : { children: React.ReactNode })
{
    return (
      <Suspense fallback={<Loading />}>{children}</Suspense>
    )
}