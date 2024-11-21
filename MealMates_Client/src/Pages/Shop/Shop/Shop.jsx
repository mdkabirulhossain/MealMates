import React from 'react';
import { Helmet } from 'react-helmet-async';
import ShopBanner from '../ShopBanner/ShopBanner';
import React_Tabs from '../Tabs/React_Tabs';
import useMenu from '../../../hooks/useMenu';
import SingleCard from '../../Home/Card/SingleCard';

const Shop = () => {
    
    return (
        <div>
            <Helmet>
                <title>MealMates | Our Shop</title>
            </Helmet>
            <ShopBanner></ShopBanner>
            <React_Tabs></React_Tabs>
            
        </div>
    );
};

export default Shop;