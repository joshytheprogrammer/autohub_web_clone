// import { Suspense } from "react";
// import Loading from "../loading";

export default function MemberLayout({ children } : { children: React.ReactNode })
{
    return (
      <html lang="en">
        <body className="bg-[#27973f]"
        >
            {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
            <main 
                className="bg-[#27973f] flex md:d-flex xl:flex-row bg-[#27973f]"
            >
              {children}
            </main>
        </body>
      </html>
    )
}