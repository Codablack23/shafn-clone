import { Divider } from "antd";
import { useState } from "react";
import HomepageLayout from "~/components/layouts/HomePageLayout";

export default function Register(){
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
                 <p className="title mb-2">Register an account</p>
                 <input 
                    type="text" 
                    placeholder="Username"
                    className="input"/>
                   <input 
                    type="text" 
                    placeholder="First Name"
                    className="input"/>
                     <input 
                    type="text" 
                    placeholder="Last Name"
                    className="input"/>
                     <input 
                    type="text" 
                    placeholder="Store Name"
                    className="input"/>
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
                 <button className="register-btn">Register</button>
                 <Divider>OR</Divider>
                 <button className="oauth-btn">
                       <p>
                         <span></span>
                         <span>Continue with Google</span>
                       </p>
                 </button>
                 <button className="oauth-btn">
                     <p>
                         <span></span>
                         <span>Continue with Facebook</span>
                     </p>
                 </button>
               </form>
            </div>
        </HomepageLayout>
    )
}