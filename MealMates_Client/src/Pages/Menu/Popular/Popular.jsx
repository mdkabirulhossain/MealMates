import React from 'react';
import MenuItems from '../../Shared/MenuItems/MenuItems';

const Popular = ({ items }) => {
    return (
        <div className='mb-24'>
            <div className='grid md:grid-cols-2 gap-4 '>
                {
                    items.map(item => <MenuItems
                        key={item._id}
                        item={item}
                    >
                    </MenuItems>)
                }
            </div>
            <div className='flex justify-center pt-10'>
                <button className="btn btn-outline text-black border-black border-b-2 border-0 uppercase">ORDER YOUR FAVOURITE FOOD</button>
            </div>
        </div>
    );
};

export default Popular;