import React from 'react';

import WPLayout from '@/wp-components/layouts/WPLayout';
import Newsletters from '@/app/components/partials/commons/Newletters';
import ContactForm from '@/app/components/partials/page/ContactForm';

const ContactUsPage = () => (
    <div>
        <WPLayout title="Contact">
            <div className="ps-page--single" id="contact-us">
                {/* <ContactMap />
                <ContactInfo /> */}
                <ContactForm />
            </div>
            <Newsletters layout="container" />
        </WPLayout>
    </div>
);

export default ContactUsPage;
