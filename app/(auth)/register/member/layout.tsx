export const metadata = {
  title: 'AutoHub - Member Registration',
  description: 'Autohub',
}


export default function MemberLayout({ children } : { children: React.ReactNode })
{
    return (
      <html lang="en">
        <body
        >
            {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
            <main>
                {children}
            </main>
        </body>
      </html>
    )
}