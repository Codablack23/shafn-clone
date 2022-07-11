import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    LinkedinShareButton,
} from 'react-share';

const SocialShareButtons = ({ url }) => (
    <>
        <FacebookShareButton url={url}>
            {/* <a className="social-link">
                <i className="bi bi-facebook"></i>
            </a> */}
            <span>Facebook</span>
        </FacebookShareButton>
        <TwitterShareButton url={url}>
            {/* <a className="social-link">
                <i className="bi bi-twitter"></i>
            </a> */}
            <span>Twitter</span>
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
            <a className="social-link">
                <i className="bi bi-linkedin" style={{ color: '#0073B1' }}></i>
            </a>
        </LinkedinShareButton>
        <PinterestShareButton url={url}>
            <a className="social-link">
                <i className="bi bi-pinterest"></i>
            </a>
        </PinterestShareButton>
    </>
);

export default SocialShareButtons;
