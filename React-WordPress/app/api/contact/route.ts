import { EmailTemplates } from "@/utilities/EmailGenerator";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"


interface Body extends ReadableStream<Uint8Array>{
    email:string,
    name:string,
    message:string,
    subject:string,
}


interface MailerResponse {
    status:number,
    error?:unknown | null | string,
    err_code?:string | null,
    message?:string | null,
}

type MailerHandler = (to:string | string [],html:string)=>Promise<MailerResponse>


const SMTPAuth = {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASSWORD,
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
            from: process.env.NODEMAILER_AUTH_USER,
            to,
            subject: "ShafN - Contact Enquiry",
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
    })
}

export async function POST(req:NextRequest) {
    const data = await req.json() as Body;
    const {email,name,subject,message:emailMessage} = data

    const userHTMLMail = EmailTemplates.userConfirmationHtml(name)
    const notificationMail = EmailTemplates.ownerNotificationHtml(name,email,subject,emailMessage)
    try {

        await sendMail("info@shafn.com",notificationMail)
        await sendMail(email,userHTMLMail)

        return NextResponse.json({
            status:"success",
            message:"Contact mail recieved successfully, We will get back to you as soon as we can"
        },{status:201})

    } catch (error) {
        console.log(error)
         return NextResponse.json(
            {
                status:"failed",
                message:(error as Error).message ?? "Sorry could not send your mail please try again later"
            },
            {status:500}
        )
    }
  
   
}
