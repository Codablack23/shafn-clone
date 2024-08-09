"use client";
import React, { useEffect,useState } from 'react';
import WPLayoutHomeDefault from '~/wp-components/layouts/WPLayoutHomeDefault';
import ModalCookie from '~/app/components/elements/modalCookie';
import { motion } from 'framer-motion';

export default function PrivacyPolicy(){
    const [opacity,setOpacity] = useState(0)
    useEffect(()=>{

          setTimeout(()=>{
            setOpacity(1)
          },5000)
    },[])
    return(
        <WPLayoutHomeDefault title="Multipurpose Marketplace React Ecommerce Template">
            <div className="ps__privacy-policy-page container mb-[100px]">
                <br />
                <h2 style={{fontSize:"36px"}} className="text-center text-3xl font-semibold">Return Policy and Conditions</h2><br />
                <div className="ps__policy-section">
                  <p className='title'>Why do we collect cookies?</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, necessitatibus eligendi officiis dolore numquam doloremque nam earum nostrum vitae assumenda rerum quae, ducimus possimus dolorum corporis unde nemo expedita sequi. Odio pariatur eligendi enim quaerat distinctio accusantium deleniti vero nam eum perspiciatis, dolorum repellat voluptatum reprehenderit quod quas facere eaque aliquid, doloribus veniam quasi ab omnis eveniet. Delectus obcaecati totam facilis accusantium id magni possimus itaque quaerat fugiat quasi. Facilis magni a natus? Inventore sint quos asperiores, ad quibusdam dolorem labore illum iure minima, delectus id aliquid? Dicta, voluptas ullam labore facere quis, iure doloremque quidem beatae animi neque repellendus.</p>
                </div>
                <div className="ps__policy-section">
                  <p className='title'>What we use cookies for</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, necessitatibus eligendi officiis dolore numquam doloremque nam earum nostrum vitae assumenda rerum quae, ducimus possimus dolorum corporis unde nemo expedita sequi. Odio pariatur eligendi enim quaerat distinctio accusantium deleniti vero nam eum perspiciatis, dolorum repellat voluptatum reprehenderit quod quas facere eaque aliquid, doloribus veniam quasi ab omnis eveniet. Delectus obcaecati totam facilis accusantium id magni possimus itaque quaerat fugiat quasi. Facilis magni a natus? Inventore sint quos asperiores, ad quibusdam dolorem labore illum iure minima, delectus id aliquid? Dicta, voluptas ullam labore facere quis, iure doloremque quidem beatae animi neque repellendus.</p>
                </div>
                <div className="ps__policy-section">
                  <p className='title'>What information we collect</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, necessitatibus eligendi officiis dolore numquam doloremque nam earum nostrum vitae assumenda rerum quae, ducimus possimus dolorum corporis unde nemo expedita sequi. Odio pariatur eligendi enim quaerat distinctio accusantium deleniti vero nam eum perspiciatis, dolorum repellat voluptatum reprehenderit quod quas facere eaque aliquid, doloribus veniam quasi ab omnis eveniet. Delectus obcaecati totam facilis accusantium id magni possimus itaque quaerat fugiat quasi. Facilis magni a natus? Inventore sint quos asperiores, ad quibusdam dolorem labore illum iure minima, delectus id aliquid? Dicta, voluptas ullam labore facere quis, iure doloremque quidem beatae animi neque repellendus.</p>
                </div>
                  <div className="ps__policy-section">
                  <p className='title'>Are your Information Safe?</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, necessitatibus eligendi officiis dolore numquam doloremque nam earum nostrum vitae assumenda rerum quae, ducimus possimus dolorum corporis unde nemo expedita sequi. Odio pariatur eligendi enim quaerat distinctio accusantium deleniti vero nam eum perspiciatis, dolorum repellat voluptatum reprehenderit quod quas facere eaque aliquid, doloribus veniam quasi ab omnis eveniet. Delectus obcaecati totam facilis accusantium id magni possimus itaque quaerat fugiat quasi. Facilis magni a natus? Inventore sint quos asperiores, ad quibusdam dolorem labore illum iure minima, delectus id aliquid? Dicta, voluptas ullam labore facere quis, iure doloremque quidem beatae animi neque repellendus.</p>
                </div>
            </div>
        <motion.div animate={{opacity:opacity}}>
          <div>
              <ModalCookie/>
          </div>
        </motion.div>
    </WPLayoutHomeDefault>
    )
}