import React, { useEffect, useRef } from 'react';
import OurTeam from '~/components/partials/page/about-us/OurTeam';
import AboutAwards from '~/components/partials/page/about-us/AboutAwards';
import WPLayout from '~/wp-components/layouts/WPLayout';

const AboutUsPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            setTimeout(() => {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 250);
        }
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout title="About us">
                <div className="ps-page--single">
                    <img src="/static/img/bg/about-us.jpg" alt="" />
                    <OurTeam />
                    <AboutAwards />
                </div>
            </WPLayout>
        </div>
    );
};
export default AboutUsPage;
