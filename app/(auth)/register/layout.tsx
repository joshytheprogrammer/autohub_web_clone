"use client"

export default function RegisterLayout({ children } : { children: React.ReactNode })
{
    return (
      <html lang="en">
        <body className="bg-[#27973f]"
        >
          <main>
            <div>
              {children}
            </div>
          </main>
        </body>
      </html>
    )
}