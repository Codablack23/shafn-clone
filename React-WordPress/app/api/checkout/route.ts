import crypto  from "crypto";
import { NextRequest, NextResponse } from "next/server";


interface Body extends ReadableStream<Uint8Array>{
    products:any[],
    user_email:string,
    amount:number
}


export async function POST(req:NextRequest) {
    const data = await req.json() as Body;
    const {products,user_email,amount} = data

    
    return NextResponse.json(
        {},
        {status:200}
    )
}
