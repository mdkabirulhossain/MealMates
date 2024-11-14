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

const Category = () => {
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <img src={slide_img_01} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_img_02} alt="" />
                <h2 className='text-4xl uppercase text-center'></h2>
                </SwiperSlide>
            <SwiperSlide><img src={slide_img_03} alt="" /></SwiperSlide>
            <SwiperSlide><img src={slide_img_04} alt="" /></SwiperSlide>
            <SwiperSlide><img src={slide_img_05} alt="" /></SwiperSlide>
                      
        </Swiper>
    );
};

export default Category;