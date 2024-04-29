import React from 'react';

const FooterCopyright = () => (
    <div className="ps-footer__copyright" style={{display:"flex", justifyContent: "center"}}>
        <p className="text-center">&copy; Shafn {new Date().getFullYear()} All Rights Reserved</p>
    </div>
);

export default FooterCopyright;
