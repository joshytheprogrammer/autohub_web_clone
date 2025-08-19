import { NextResponse, NextRequest } from 'next/server'
import { cookies } from "next/headers";

export default function middleware(request: NextRequest)
{
    const cookieStore = cookies();
    // if(!user)
    // {
    //     return NextResponse.redirect(new URL('/register', request.url))
    // }
    return NextResponse.next()
}

// export const config = 
// {
//     matcher: ['/user/:path*', '/blog', ]
// }