export const metadata = {
  title: 'AutoHub - Registration : Passport Upload',
  description: 'Autohub',
}

export default function PassportLayout({ children } : { children: React.ReactNode })
{
    return (
      <html lang="en">
        <body suppressHydrationWarning={true}
        >
          {children}
        </body>
      </html>
    )
}