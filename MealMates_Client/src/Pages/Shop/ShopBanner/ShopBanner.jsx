import React from 'react';
import Cover from '../../Shared/Cover/Cover';
import shop_bg_img from '../../../assets/shop/banner2.jpg'
const ShopBanner = () => {
    return (
        <div>
            <Cover 
           img={shop_bg_img}
           title={"OUR SHOP"}
           text={"WOULD YOU LIKE TO TRY A DISH?"}
           height={"800"}
           ></Cover>
            
        </div>
    );
};

export default ShopBanner;