import React from 'react';

const ContactForm = () => (
    <div className="ps-contact-form">
        <div className="container">
            <form className="ps__contact-form" action="/" method="get">
                <h3>Contact Us</h3>
                        <div className="form-group">
                            <input
                                className="form-control w3-light-grey"
                                type="text"
                                placeholder="Name *"
                                style={{
                                    border:"none"
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control w3-light-grey"
                                type="text"
                                placeholder="Email *"
                                style={{
                                    border:"none"
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control w3-light-grey"
                                type="text"
                                placeholder="Subject *"
                                style={{
                                    border:"none"
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                className="form-control w3-light-grey"
                                rows="5"
                                style={{
                                    border:"none"
                                }}
                                placeholder="Message"></textarea>
                        </div>
                <div className="form-group submit text-center">
                    <button className="ps-btn">Send message</button>
                </div>
            </form>
        </div>
    </div>
);

export default ContactForm;
