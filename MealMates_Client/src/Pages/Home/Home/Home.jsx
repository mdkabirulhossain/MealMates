import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Feature from '../Feature/Feature';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Category></Category>
           <PopularMenu></PopularMenu>
           <Feature></Feature>
        </div>
    );
};

export default Home;