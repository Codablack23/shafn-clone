import React from 'react';
import OurTeam from '~/app/components/partials/page/about-us/OurTeam';
import AboutAwards from '~/app/components/partials/page/about-us/AboutAwards';
import WPLayout from '~/wp-components/layouts/WPLayout';
import { scrollPageToTop } from '~/utilities/common-helpers';

const AboutUsPage = () => (
    <div ref={scrollPageToTop}>
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
