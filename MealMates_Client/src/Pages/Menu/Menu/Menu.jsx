import React from 'react';
import { Helmet} from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import cover_back_img from '../../../assets/menu/banner3.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Popular from '../Popular/Popular';
import dessert_back_img from '../../../assets/menu/dessert-bg.jpeg'
import pizza_back_img from '../../../assets/menu/pizza-bg.jpg'
import salad_back_img from '../../../assets/menu/salad-bg.jpg'
import soup_back_img from '../../../assets/menu/soup-bg.jpg'

const Menu = () => {
    const [menu] = useMenu();
    const offer = menu.filter(item => item.category ==="offered")
    const desserts = menu.filter(item => item.category ==="dessert")
    const Pizza = menu.filter(item => item.category ==="pizza")
    const Salad = menu.filter(item => item.category ==="salad")
    const Soup = menu.filter(item => item.category ==="soup")
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

           <Popular items={offer} title={"salad"}></Popular>
           {/* Dessert  */}
           <Cover 
           img={dessert_back_img}
           title={"DESSERTS"}
           text={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
           height={"700"}
           ></Cover>

           {/* dessert food list  */}

           <Popular items={desserts} title={"dessert"} ></Popular>
           {/* Pizza  */}
           <Cover 
           img={pizza_back_img}
           title={"PIZZA"}
           text={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
           height={"700"}
           ></Cover>

           {/*Pizza food list  */}

           <Popular items={Pizza} title={"pizza"}></Popular>

           {/* Salad  */}
           <Cover 
           img={salad_back_img}
           title={"SALAD"}
           text={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
           height={"700"}
           ></Cover>

           {/*Salad food list  */}

           <Popular items={Salad} title={"salad"}></Popular>

           {/* soup */}
           <Cover 
           img={soup_back_img}
           title={"SOUP"}
           text={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
           height={"700"}
           ></Cover>

           {/*soup food list  */}

           <Popular items={Soup} title={"soup"}></Popular>
        </div>
    );
};

export default Menu;