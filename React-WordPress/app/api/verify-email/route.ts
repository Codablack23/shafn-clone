import crypto  from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"

interface Body extends ReadableStream<Uint8Array>{
    email:string,
    name:string,
}

interface ServerResponse {
    status:number,
    error?:unknown | null | string,
    code?:string | number
}

export function POST(req:NextRequest) {
    const responseData:ServerResponse = {
        status:500,

    }
    const { name, email } = req.body as Body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_USER,
            pass: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_PASSWORD,
        },
    });

    const code = crypto.randomInt(0, 1000000).toString().padStart(6, "0");

    const message = {
        from: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_USER,
        to: email,
        subject: "ShafN - Verification Code",
        html: `
                    <h3> Hello, ${name} </h3>
                    <p>Your email verification code is <strong>${code}</strong></p>

                    <p>Thanks, <br /> ShafN Team</p>
                  `,
    };

    transporter.sendMail(message, function (err, info) {
        if (err) {

            console.log(err);
            // res.status(err.responseCode || 500).json(err);
            responseData.status = 500;
            responseData.error = err;
        } else {
            responseData.status = 200
            responseData.code = code;
        }
    });
    
    return NextResponse.json(
        {
            error:responseData.
            error,code:responseData.code
        },
        {status:responseData.status})
}
