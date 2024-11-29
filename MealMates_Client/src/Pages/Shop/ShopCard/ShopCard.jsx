import React from 'react';
import SingleCard from '../../Home/Card/SingleCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';


const ShopCard = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    // Function to chunk the items array into groups of 6
    const chunkItem = (array, size) =>{
        const result =[];
        for(let i=0; i<array.length; i+=size){
            result.push(array.slice(i, i+size));
        }
        return result;
    };

    const chunkedItems = chunkItem(items, 6);
    return (
        <div >

            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"

            >
                {
                    chunkedItems.map((chunk, index) => (
                        <SwiperSlide key={index}>
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16'>
                        {
                            chunk.map(item => <SingleCard
                                key={item._id}
                                item={item}
                            >

                            </SingleCard>)
                        }
                    </div>
                </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
};

export default ShopCard;