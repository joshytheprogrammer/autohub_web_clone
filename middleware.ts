import { NextResponse, NextRequest } from 'next/server'
import { cookies } from "next/headers";

export default function middleware(request: NextRequest)
{
    const cookieStore = cookies();
    console.log("2222222222222222222222222222222222222")
    const token = request.cookies.get('user-in-use')
    console.log(token)
    console.log("2222222222222222222222222222222222222")
    console.log("1####################################");
    console.log("3333333333333333333333333333333333333333333")
    const user = cookieStore.get("user-in-use");
    console.log(user)
    console.log("3333333333333333333333333333333333333333333")
    console.log("1####################################")
    console.log("44444444444444444444444444444444444444444444")
    const laravel_session = cookieStore.get("user-in-use");
    console.log(laravel_session)
    console.log("44444444444444444444444444444444444444444444")
    console.log("1####################################")
    console.log("55555555555555555555555555555555555555")
    const cooking = request.cookies.get('user-in-use');
    console.log(cooking)
    console.log("55555555555555555555555555555555555555")
    console.log("1####################################")
    console.log("666666666666666666666666666666666666666")
    const fire = request.cookies.get('user-in-use');
    console.log(fire)
    console.log("666666666666666666666666666666666666666")
    console.log("1####################################")
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