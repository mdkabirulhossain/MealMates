import React from 'react';
import { Helmet} from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import cover_back_img from '../../../assets/menu/banner3.jpg'
import useMenu from '../../../hooks/useMenu';
import MenuItems from '../../Shared/MenuItems/MenuItems';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Popular from '../Popular/Popular';

const Menu = () => {
    const [menu] = useMenu();
    const offer = menu.filter(item => item.category ==="offered")
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

           <SectionTitle 
           subHeading={"---Don't miss---"}
           heading={"Today's Offer"}
           >

           </SectionTitle>

           <Popular items={offer}></Popular>
         
        </div>
    );
};

export default Menu;