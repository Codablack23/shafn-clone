import React, { useEffect, useRef } from 'react';
import ContactInfo from '~/components/partials/page/ContactInfo';
import ContactForm from '~/components/partials/page/ContactForm';
import ContactMap from '~/components/partials/page/ContactMap';
import WPLayout from '~/wp-components/layouts/WPLayout';

const ContactUsPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout title="Contact">
                <div className="ps-page--single" id="contact-us">
                    <ContactMap />
                    <ContactInfo />
                    <ContactForm />
                </div>
            </WPLayout>
        </div>
    );
};

export default ContactUsPage;
