import crypto  from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"
import { makeStore } from '../../../redux-store/store';

interface Body extends ReadableStream<Uint8Array>{
    email:string,
    name:string,
}


interface MailerResponse {
    status:number,
    error?:unknown | null | string,
    err_code?:string | null,
    message?:string | null,
}

type MailerHandler = (to:string | string [],html:string)=>Promise<MailerResponse>


const SMTPAuth = {
    user: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_USER,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_PASSWORD,
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: SMTPAuth,
});



const sendMail:MailerHandler=(to:string | string [],html:string)=>{
    return new Promise((resolve,reject)=>{
        const mailerResponse:MailerResponse = {
            status:200,
            error:null,
            message:"Mail sent successfully",
            err_code:null,
        }
        const message = {
            from: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_USER,
            to,
            subject: "ShafN - Verification Code",
            html,
        };
    
        transporter.sendMail(message, function (err, info) {
            if (err) {
                reject(err);
            }
            mailerResponse.status = 200;
            mailerResponse.message = info.response
            resolve(mailerResponse)
        })
        return mailerResponse
    })
}

export async function POST(req:NextRequest) {
    const data = await req.json() as Body;
    const {email,name} = data

    const code = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
    const html = `
            <h3> Hello, ${name} </h3>
            <p>Your email verification code is <strong>${code}</strong></p>

            <p>Thanks, <br /> ShafN Team</p>
    `
    const {message,err_code,error,status} = await sendMail(email,html)
    return NextResponse.json(
        {error,err_code,message,code},
        {status}
    )
}
