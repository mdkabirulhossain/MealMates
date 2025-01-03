import React from 'react';
import MenuItems from '../../Shared/MenuItems/MenuItems';
import { Link } from 'react-router-dom';


const Popular = ({ items, title }) => {

    return (
        <div className='mb-24'>
            <div className='grid px-2 md:grid-cols-2 gap-4 '>
                {
                    items.map(item => <MenuItems
                        key={item._id}
                        item={item}
                    >
                    </MenuItems>)
                }
            </div>
            <div className='flex justify-center pt-10'>
                <Link to={`/shop/${title}`}>
                <button className="btn btn-outline text-black border-black border-b-2 border-0 uppercase">ORDER YOUR FAVOURITE FOOD</button>
                </Link>
            </div>
        </div>
    );
};

export default Popular;