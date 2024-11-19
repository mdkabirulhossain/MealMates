import React from 'react';
import { Helmet} from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import cover_back_img from '../../../assets/menu/banner3.jpg'

const Menu = () => {
    return (
        <div>
           <Helmet>
                <title>MealMates | Menu</title>
           </Helmet>
           <Cover 
           img={cover_back_img}
           title={"OUR MENU"}
           text={"Would you like to try a dish?"}
           height={"800"}
           ></Cover>
        </div>
    );
};

export default Menu;