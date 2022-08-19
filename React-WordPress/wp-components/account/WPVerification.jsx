import { useState } from "react"

export default function WPVerification({email}){
    function checkLength(e){
        console.log(e)
      if(e.target.value.length > 0){
       e.target.value = e.target.value[0]
       if(e.target.nextElementSibling){
        e.target.nextElementSibling.focus()
       }
      }else{
        if(e.target.previousElementSibling){
            e.target.previousElementSibling.focus()
        }
       
      }
    }
    function censorEmail(email){
       const atPart = email.slice(email.indexOf("@"))  
       const restpart = email.slice(0,email.indexOf("@"))  
       const restPartArr = restpart.split("")  
       const censoredArr = restPartArr.map((item,index,arr)=>{
          if((arr.length-1) == index || (arr.length-2) == index || (arr.length-3) == index || (arr.length-4) == index){
             return "*"
          }
          else{
            return item
          }
       })
       return censoredArr.join("").toString() + atPart

    }
    return(
        <div className="ps__verify-widget w3-card">
            <h3 className="ps__icon">
            <i class="bi bi-shield-lock"></i>
            </h3>
            <h3 className="ps__title">Authenticate your Account</h3>
            <p className="ps__desc">Protecting your account is our top priority. Please confirm your account by entering the code sent to <span>{censorEmail(email?email:"")}</span>
            </p>
            <form className="ps__code-form">
                <input type="number" className="ps__verify-input" onChange={checkLength} max={9}  maxLength={1} />
                <input type="number" className="ps__verify-input" onChange={checkLength} max={9} maxLength={1} />
                <input type="number" className="ps__verify-input" onChange={checkLength} max={9}maxLength={1} />
                <input type="number" className="ps__verify-input" onChange={checkLength} max={9}maxLength={1} />
                <input type="number" className="ps__verify-input" onChange={checkLength} max={9} maxLength={1} />
                <input type="number" className="ps__verify-input" onChange={checkLength} max={9} maxLength={1} />
            </form><br />
            <div className="ps__footer">
                <div>
                    <p>it may take a while to recieve your code</p>
                    <p>Haven't recieved it <a className="ps__resend-link">Resend a new code</a></p>
                </div>
                <button className="ps__submit-btn">Submit</button>
            </div>
        </div>
    )
}