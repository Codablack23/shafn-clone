import React from 'react';

const FooterCopyright = () => (
    <div className="ps-footer __copyright" style={{display:"flex", justifyContent: "center"}}>
        <p className="text-center">&copy; Shafn {new Date().getFullYear()} All Rights Reserved</p> 
        {/* <p>
            <span>We Using Safe Payment For:</span>
            <a href="#">
                <img src="/img/payment-method/1.jpg" alt="Shafn" />
            </a>
            <a href="#">
                <img src="/img/payment-method/2.jpg" alt="Shafn" />
            </a>
            <a href="#">
                <img src="/img/payment-method/3.jpg" alt="Shafn" />
            </a>
            <a href="#">
                <img src="/img/payment-method/4.jpg" alt="Shafn" />
            </a>
            <a href="#">
                <img src="/img/payment-method/5.jpg" alt="Shafn" />
            </a>
        </p> */}
    </div>
);

export default FooterCopyright;
