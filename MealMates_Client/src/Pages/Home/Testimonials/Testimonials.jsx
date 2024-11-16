import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        fetch('review.json')
        .then(res => res.json())
        .then(data =>setReviews(data))
    }, [])
    return (
        <div>
            <div>
                <SectionTitle
                    subHeading="---What Our Clients Say---"
                    heading={"TESTIMONIALS"}  //It also okay
                >

                </SectionTitle>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                
                {
                    reviews.map(review =><SwiperSlide
                        key={review._id}
                        >
                        <div className='m-24'>
                            <p className='text-center'>{review.details}</p>
                            <h3 className='text-2xl text-center text-orange-400'>{review.name}</h3>
                            </div>   
                        </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;