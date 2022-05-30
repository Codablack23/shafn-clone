import React from 'react';
import ContactInfo from '~/components/partials/page/ContactInfo';
import ContactForm from '~/components/partials/page/ContactForm';
import ContactMap from '~/components/partials/page/ContactMap';
import WPLayout from '~/wp-components/layouts/WPLayout';
import Newsletters from '~/components/partials/commons/Newletters';
import { scrollPageToTop } from '~/utilities/common-helpers';

const ContactUsPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout title="Contact">
            <div className="ps-page--single" id="contact-us">
                <ContactMap />
                <ContactInfo />
                <ContactForm />
            </div>
            <Newsletters layout="container" />
        </WPLayout>
    </div>
);

export default ContactUsPage;
