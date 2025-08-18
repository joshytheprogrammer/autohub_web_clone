import { NextResponse, NextRequest } from "next/server";



export async function GET()
{
   return NextResponse.json(
     {
        name: "Grace 1"
     }
   )
}

export async function POST(request: NextRequest)
{
   const data: any = await request.json()
   console.log("Got Here On Time")
   // return NextResponse.json({ data: "Navigation" }, { status: 200 })
   return NextResponse.json({ data: data }, { status: 200 })
}

export async function PUT(request: Request)
{
   const data: any = request.json()
   return NextResponse.json(
     {
        name: "Grace 2"
     }
   )
}

export async function DELETE(request: Request)
{
   const data: any = request.json()
   return NextResponse.json(
     {
        name: "Grace 3"
     }
   )
}