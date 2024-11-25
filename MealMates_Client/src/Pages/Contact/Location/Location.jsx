import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { BsTelephoneOutbound } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
const Location = () => {
    return (
        <div>
            <SectionTitle
                subHeading={"---Visit Us---"}
                heading={"OUR LOCATION"}
            >

            </SectionTitle>

            <div className='flex justify-between gap-6 mx-40'>
                <div className="flex flex-col justify-center items-center w-96 border-[#E8E8E8] border-2">
                    <button className="flex justify-center items-center bg-[#D1A054] text-white w-full py-2">
                        <BsTelephoneOutbound className="text-2xl" />
                    </button>
                    <div className='bg-white w-full pt-0 p-6'>
                    <div className="bg-[#F3F3F3] py-10">
                        <h2 className="uppercase text-center font-bold">Phone</h2>
                        <p className="text-center">+38 (012) 34 56 789</p>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-96 border-[#E8E8E8] border-2">
                    <button className="flex justify-center items-center bg-[#D1A054] text-white w-full py-2">
                        <FaLocationDot className="text-2xl" />
                    </button>
                    <div className='bg-white w-full pt-0 p-6'>
                    <div className="bg-[#F3F3F3] py-10">
                        <h2 className="uppercase text-center font-bold">Address</h2>
                        <p className="text-center">Bashundhara, Dhaka</p>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-96 border-[#E8E8E8] border-2">
                    <button className="flex justify-center items-center bg-[#D1A054] text-white w-full py-2">
                        <FaClock className="text-2xl" />
                    </button>
                    <div className='bg-white w-full pt-0 p-6'>
                    <div className="bg-[#F3F3F3] py-10">
                        <h2 className="uppercase text-center font-bold">Working Hour</h2>
                        <p className="text-center">Mon - Fri: 08:00 - 22:00 <br />
                        Sat - Sun: 10:00 - 23:00</p>
                    </div>
                    </div>
                </div>
                

            </div>
        </div>
    );
};

export default Location;