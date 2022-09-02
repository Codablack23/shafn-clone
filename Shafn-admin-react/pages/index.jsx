import React,{useEffect,useState} from "react"
import Testimonials from "~/components/home/testimonials";
import FAQS from "~/components/home/faqs";
import Hero from "~/components/home/hero";
import WhySell from "~/components/home/why-sell";
import Fees from "~/components/home/fees";
import HomepageLayout from "~/components/layouts/HomePageLayout";




const Contact = ()=> (
   <div className="contact-section ps__page-container">
     <div className="contact-content">
      <p>Still have more questions? Feel free to contact us.</p>
      <button>Contact Us</button>
     </div>
   </div>
)
const Index = () => {
  const [isShowing,setIsShowing] = useState(false)
  const [isCookiesShowing,setIsCookiesShowing] = useState(false) 
  useEffect(() => {
    setTimeout(()=>{
        setIsShowing(true)
    },4000)
    setTimeout(()=>{
      setIsCookiesShowing(true)
    },5000)
},[])

  return (
   <HomepageLayout>
      <Hero/>
      <WhySell/>
      <Fees/>
      <Testimonials/>
      <FAQS/>
      <hr />
      <Contact/>
   </HomepageLayout>

  )
}

export default Index
