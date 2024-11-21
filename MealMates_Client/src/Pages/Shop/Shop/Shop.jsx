import React from 'react';
import { Helmet } from 'react-helmet-async';
import ShopBanner from '../ShopBanner/ShopBanner';

const Shop = () => {
    return (
        <div>
            <Helmet>
                <title>MealMates | Our Shop</title>
            </Helmet>
            <ShopBanner></ShopBanner>
        </div>
    );
};

export default Shop;