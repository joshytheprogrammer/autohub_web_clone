import { NextResponse } from "next/server";

export function middlename()
{
    const a = true
    if(a)
    {
        return NextResponse.redirect(
            new URL('/')
        )
    }
    return NextResponse.next()
}