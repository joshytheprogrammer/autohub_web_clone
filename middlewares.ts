import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default function middlename(request: Request)
{
    const cookieStore = cookies();
    const user = cookieStore.get("user");
    if(user)
    {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

export const config = 
{
    matcher: ['/user/:path*', '/blog', ]
}