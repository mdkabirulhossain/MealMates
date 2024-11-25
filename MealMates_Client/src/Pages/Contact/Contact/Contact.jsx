import React from 'react';
import ContactBanner from '../ContactBanner/ContactBanner';
import { Helmet } from 'react-helmet-async';
import Location from '../Location/Location';
import ContactForm from '../ContactForm/ContactForm';

const Contact = () => {
    return (
        <div>
            <Helmet>
            <title>MealMates | Contact Us</title>
            </Helmet>
            <ContactBanner></ContactBanner>
            <Location></Location>
            <ContactForm></ContactForm>
        </div>
    );
};

export default Contact;