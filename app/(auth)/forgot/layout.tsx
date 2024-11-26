export const metadata = {
  title: 'AutoHub - Forgot Password',
  description: 'Autohub',
}

export default function RootLayout(
{
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <html 
        lang="en"
    >
      <body>{children}</body>
    </html>
  )
}
