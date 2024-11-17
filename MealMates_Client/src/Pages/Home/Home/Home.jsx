import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Feature from '../Feature/Feature';
import Testimonials from '../Testimonials/Testimonials';
import Services from '../Services/Services';
import Contact from '../contact/Contact';
import Card from '../Card/Card';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Category></Category>
           <Services></Services>
           <PopularMenu></PopularMenu>
           <Contact></Contact>
           <Card></Card>
           <Feature></Feature>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;