import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { metadata } from '../../../../layout';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface Body extends ReadableStream<Uint8Array>{
    orderId:string,
    order_session_id:string,
}

interface Params{
    params:{
        id:string,
    }
}

export async function POST(req:NextRequest,{params}:Params) {
    try {
        const {id} = params
        const data = await req.json() as Body;
        const {orderId} = data

        if(!id) throw new Error("Invalid Payment Intent Id");
        const paymentIntent = await stripe.paymentIntents.update(id,{
            metadata:{
                orderId,
            }
        })
        const clientSecret =  paymentIntent.client_secret
        return NextResponse.json({clientSecret},{status:200})
    } catch (error) {
        console.log(error)
        if(error instanceof Error) {
            return NextResponse.json({error: `Internal Server Error: ${error.message}` },{status:500})
        }

        return NextResponse.json({error: `Internal Server Error` },{status:500})
    }
}
