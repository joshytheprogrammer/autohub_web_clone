import { Suspense } from "react"
import Loading from "../loading"

export const metadata = {
  title: 'AutoHub - Registration : Passport Upload',
  description: 'Autohub',
}

export default function PassportLayout({ children } : { children: React.ReactNode })
{
    return (
      <Suspense fallback={<Loading />}>{children}</Suspense>
    )
}