import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { IoIosSend } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
    const onChange =()=>{};
    return (
        <div>
            <SectionTitle
                subHeading={"---Send Us a Message---"}
                heading={"CONTACT FORM"}
            >

            </SectionTitle>
            <div className="card bg-[#F3F3F3] w-full ">
                <form className="card-body">
                    <div className='flex gap-6'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Name*</span>
                            </label>
                            <input type="text" placeholder="Enter your name" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Email*</span>
                            </label>
                            <input type="email" placeholder="Enter your email" className="input input-bordered focus:outline-none" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Phone*</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered focus:outline-none" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Message*</span>
                        </label>
                        <textarea className='pl-6 pt-4 rounded-md outline-none' name="text" placeholder='Write your message here' id="" cols="30" rows="10"></textarea>
                    </div>
                    <ReCAPTCHA
                        sitekey="6LflQ4kqAAAAABfO-MnNaAku0DPps8st3SflNASi"
                        onChange={onChange}
                    />
                    <div className="flex justify-center mt-6">
                        <button className=" flex py-4 px-5 text-white font-bold" style={{ background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}>Send Message <IoIosSend></IoIosSend></button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ContactForm;