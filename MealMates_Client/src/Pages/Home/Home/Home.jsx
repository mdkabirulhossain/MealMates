import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Feature from '../Feature/Feature';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Category></Category>
           <PopularMenu></PopularMenu>
           <Feature></Feature>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;