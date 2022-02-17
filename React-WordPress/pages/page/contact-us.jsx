import React from 'react';
import ContactInfo from '~/components/partials/page/ContactInfo';
import ContactForm from '~/components/partials/page/ContactForm';
import ContactMap from '~/components/partials/page/ContactMap';
import WPLayout from '~/wp-components/layouts/WPLayout';

const ContactUsPage = () => {
    return (
        <WPLayout title="Contact">
            <div className="ps-page--single" id="contact-us">
                <ContactMap />
                <ContactInfo />
                <ContactForm />
            </div>
        </WPLayout>
    );
};

export default ContactUsPage;
