import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItems from '../../Shared/MenuItems/MenuItems';

const PopularMenu = () => {
    const[menu, setMenu] = useState([]);
    useEffect(()=>{
        fetch('menu.json')
        .then(res => res.json())
        .then(data =>{
            const popularItems = data.filter(item => item.category ==="popular");
            setMenu(popularItems);
        })

    }, [])
    return (
       <section className='mb-24'>
        <SectionTitle 
        heading="From Our Menu"
        subHeading="Popular Items"
        >
          
        </SectionTitle>
        <div className='grid md:grid-cols-2 gap-4'>
            {
                menu.map(item => <MenuItems
                key={item._id}
                item ={item}
                > 
                </MenuItems>)
            }
        </div>
       </section>
    );
};

export default PopularMenu;