import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItems from '../../Shared/MenuItems/MenuItems';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    // const[menu, setMenu] = useState([]);
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data =>{
    //         const popularItems = data.filter(item => item.category ==="popular");
    //         setMenu(popularItems);
    //     })

    // }, [])

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')
    return (
        <section className='mb-24'>
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            >

            </SectionTitle>
            <div className='grid md:grid-cols-2 gap-4'>
                {
                    popular.map(item => <MenuItems
                        key={item._id}
                        item={item}
                    >
                    </MenuItems>)
                }
            </div>
            <div className='flex justify-center pt-10'>
                <button className="btn btn-outline text-black border-black border-b-2 border-0 uppercase">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;