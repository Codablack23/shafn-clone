import React from 'react';

const FooterCopyright = () => {
    return (
        <div className="ps-copyright">
            <img src="/img/logo.png" alt="" />
            <p>
                &copy;ShafN {new Date().getFullYear()} All Rights Reserved 
            </p>
        </div>
    );
};

export default FooterCopyright;
