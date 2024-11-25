import React from 'react';
import Cover from '../../Shared/Cover/Cover';
import contact_bg_img from '../../../assets/contact/banner.jpg'
const ContactBanner = () => {
    return (
        <div>
            <Cover 
           img={contact_bg_img}
           title={"CONTACT US"}
           text={"WOULD YOU LIKE TO TRY A DISH?"}
           height={"800"}
           ></Cover>
        </div>
    );
};

export default ContactBanner;