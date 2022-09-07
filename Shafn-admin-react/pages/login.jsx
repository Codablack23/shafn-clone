import { Checkbox, Divider } from "antd";
import { useState } from "react";
import Link from "next/link";
import HomepageLayout from "~/components/layouts/HomePageLayout";

export default function Login(){
    const [isPassword,setIsPassword] = useState(true)
    const handleShowPassword =(e)=>{
        setIsPassword(prev=>!prev)
        e.target.classList.toggle("bi-eye-fill")
        e.target.classList.toggle("bi-eye-slash-fill")
    }
    return(
        <HomepageLayout title={"login"} page={"accounts"}>
            
            <div className="account-container">
                <div className="logo">
                <img src={"/img/logo_light.png"} alt="logo"/>
                </div>
               <form action="">
                 <p className="title mb-2">Sign in</p>
                   
                    <input 
                    type="email" 
                    placeholder="Email address"
                    className="input"/>
                   
                 <div className="input-container">
                    <input type={isPassword?"password":"text"} placeholder="Password" name="" id="" />
                    <span style={{cursor:"pointer",width:"9%"}} >
                        <i className="bi bi-eye-fill" 
                        style={{fontSize:"18px"}}
                        onClick={handleShowPassword}></i>
                    </span>
                 </div>
                 <div className="d-flex justify-content-between align-items-centr">
                    <Checkbox>
                        <p>Remember Me</p>
                    </Checkbox>
                    <div>
                        <Link href={"/"}>
                        <a><b>Forgot Password</b></a>
                        </Link>
                    </div>
                 </div>
                 <button className="register-btn"><b>Continue</b></button>
                 <Divider>OR</Divider>
                 <button className="oauth-btn">
                       <p>
                         <span><img src="/icons8-google.svg" width={20} height={20}/></span>
                         <span>Continue with Google</span>
                       </p>
                 </button>
                 <button className="oauth-btn">
                     <p>
                         <span><i className="bi bi-facebook"></i></span>
                         <span>Continue with Facebook</span>
                     </p>
                 </button>
               </form>
            </div>
        </HomepageLayout>
    )
}