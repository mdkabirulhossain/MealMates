import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import feature from '../../../assets/home/featured.jpg'
import './Feature.css'
import { Link } from 'react-router-dom';

const Feature = () => {
    return (
        <div className='feature-items bg-fixed bg-gray-500 bg-opacity-20'>
            <div className='pt-32'>
            <SectionTitle 
            subHeading="---Check it out---"
            heading="FROM OUR MENU"
            >
            </SectionTitle>
            </div>
            <div className='md:flex justify-center items-center gap-14 px-8 pt-12 pb-32'>
                <div>
                    <img src={feature} alt="" />
                </div>
                <div className='text-white '>
                    <p>March 20, 2023</p>
                    <p>WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <Link to='/shop'>
                    <button className="btn btn-outline text-white border-white border-b-2 border-t-0 border-x-0 uppercase">Order Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Feature;