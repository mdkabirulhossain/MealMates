import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import slide_img_01 from '../../../assets/home/slide1.jpg'
import slide_img_02 from '../../../assets/home/slide2.jpg'
import slide_img_03 from '../../../assets/home/slide3.jpg'
import slide_img_04 from '../../../assets/home/slide4.jpg'
import slide_img_05 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div>
            <SectionTitle
                subHeading="---From 11:00am to 10:00pm---"
                heading="Order Online"
            >
            
            </SectionTitle>
            <Swiper
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper mb-24"
        >
            <SwiperSlide>
                <img src={slide_img_01} alt="" />
                <h3 className='text-4xl uppercase text-center text-white -mt-16'>Salads</h3>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_img_02} alt="" />
                <h3 className='text-4xl uppercase text-center text-white -mt-16'>Pizzas</h3>
                </SwiperSlide>
            <SwiperSlide>
                <img src={slide_img_03} alt="" />
                <h3 className='text-4xl uppercase text-center text-white -mt-16'>soups</h3>
            </SwiperSlide>
            <SwiperSlide><img src={slide_img_04} alt="" />
            <h3 className='text-4xl uppercase text-center text-white -mt-16'>Desserts</h3>
            </SwiperSlide>
            <SwiperSlide><img src={slide_img_05} alt="" />
            <h3 className='text-4xl uppercase text-center text-white -mt-16'>Salads</h3>
            </SwiperSlide>
                      
        </Swiper>
        </div>
    );
};

export default Category;