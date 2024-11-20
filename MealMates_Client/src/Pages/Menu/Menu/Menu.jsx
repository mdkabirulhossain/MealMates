import React from 'react';
import { Helmet} from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import cover_back_img from '../../../assets/menu/banner3.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Popular from '../Popular/Popular';
import dessert_back_img from '../../../assets/menu/dessert-bg.jpeg'

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
           {/* Dessert  */}
           <Cover 
           img={dessert_back_img}
           title={"Desserts"}
           text={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
           height={"700"}
           ></Cover>
        </div>
    );
};

export default Menu;