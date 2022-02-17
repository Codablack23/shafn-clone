import React from 'react';
import OurTeam from '~/components/partials/page/about-us/OurTeam';
import AboutAwards from '~/components/partials/page/about-us/AboutAwards';
import WPLayout from '~/wp-components/layouts/WPLayout';

const AboutUsPage = () => {
    return (
        <WPLayout title="About us">
            <div className="ps-page--single">
                <img src="/static/img/bg/about-us.jpg" alt="" />
                <OurTeam />
                <AboutAwards />
            </div>
        </WPLayout>
    );
};
export default AboutUsPage;
