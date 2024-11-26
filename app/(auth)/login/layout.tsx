export const metadata = {
  title: 'AutoHub - Login',
  description: 'Autohub',
}

export default function LoginLayout({ children } : { children: React.ReactNode })
{
    return (
      <html lang="en">
        <body
        >
          {children}
        </body>
      </html>
    )
}