import { message } from "antd";
import axios, { AxiosError } from "axios";

interface ContactFormReq{
    name:string,
    email:string,
    subject:string,
    message:string,
}
interface ContactFormRes{
    status:"failed" | "success",
    message:string,
}

class EmailRepository{
    async sendContactMail(formData:ContactFormReq){
        try {
            const res = await axios.post<ContactFormRes>("/api/contact",formData)
            return res.data
        } catch (error) {
            if(error instanceof AxiosError){
                return error.response?.data as ContactFormRes
            }
            return {
                status:"failed",
                message:(error as Error).message ?? "Sorry could not send mail please try again later"
            } as ContactFormRes
        }
    }
}
const EmailApiService = new EmailRepository()

export default EmailApiService;