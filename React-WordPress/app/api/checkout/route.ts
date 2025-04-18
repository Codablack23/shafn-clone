import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface Body extends ReadableStream<Uint8Array>{
    products:any[],
    user_email:string,
    amount:number
}


export async function POST(req:NextRequest) {
    try {
        const data = await req.json() as Body;
        const {amount} = data

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:"usd",
            automatic_payment_methods:{enabled: true},
        })
        const clientSecret =  paymentIntent.client_secret
        const id =  paymentIntent.id
        return NextResponse.json({clientSecret,id},{status:200})
    } catch (error) {
        console.log(error)
        if(error instanceof Error) {
            return NextResponse.json({error: `Internal Server Error: ${error.message}` },{status:500})
        }

        return NextResponse.json({error: `Internal Server Error` },{status:500})
    }
}
