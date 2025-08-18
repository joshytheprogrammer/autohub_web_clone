import { NextResponse, NextRequest } from 'next/server'
import { cookies } from "next/headers";

export default function middleware(request: NextRequest)
{
    console.log("111111111111111111111111111111111")
    const cookieStore = cookies();
    console.log("111111111111111111111111111111111")
    console.log("1####################################")
    console.log("111111111111111111111111111111111")
    console.log("1####################################")
    const token = request.cookies.get('autohub-maceos-vehicle');
    console.log(token)
    console.log("111111111111111111111111111111111")
    console.log("1####################################")
    const user = cookieStore.get("autohub-maceos-vehicle");
    console.log(token)
    console.log("111111111111111111111111111111111")
    console.log("1####################################")
    const laravel_session = cookieStore.get("laravel_session");
    console.log(laravel_session)
    console.log("111111111111111111111111111111111")
    console.log("1####################################")
    const cooking = request.cookies.get('autohub-maceos-vehicle');
    console.log(cooking)
    console.log("111111111111111111111111111111111")
    console.log("1####################################")
    const fire = request.cookies.get('laravel_session');
    console.log(fire)
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