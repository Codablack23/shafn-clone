import React from 'react';
import OurTeam from '~/app/components/partials/page/about-us/OurTeam';
import AboutAwards from '~/app/components/partials/page/about-us/AboutAwards';
import WPLayout from '~/wp-components/layouts/WPLayout';

const AboutUsPage = () => (
    <div>
        <WPLayout title="About us">
            <div className="ps-page--single">
                <img src="/static/img/bg/about-us.jpg" alt="" />
                <OurTeam />
                <AboutAwards />
            </div>
        </WPLayout>
    </div>
);

export default AboutUsPage;
