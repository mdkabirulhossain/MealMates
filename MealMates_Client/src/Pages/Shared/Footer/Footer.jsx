import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <div className="flex ">
                <div className='bg-[#1F2937] text-white w-full p-10 flex flex-col justify-center items-center'>
                    <h3 className='uppercase text-2xl font-bold'>Contact us</h3>
                    <p>123 ABS Street, Uni 21, Bangladesh</p>
                    <p>+88 123456786</p>
                    <p>Mon - Fri: 08:00 - 22:00</p>
                    <p>Sat - Sun: 10:00 - 23:00</p>
                </div>
                <div className='bg-[#111827] text-white w-full'>
                    <div className='flex flex-col justify-center items-center p-10'>
                        <h3 className='text-2xl font-bold'>Follow us</h3>
                        <p className='py-6'>Join us on social media</p>
                        <div className='flex gap-3'>
                            <FaFacebookF></FaFacebookF>
                            <FaInstagram />
                            <FaYoutube></FaYoutube>
                        </div>
                    </div>
                </div>

            </div>
            <footer className="footer text-white footer-center bg-[#151515] p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by MealMates Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;