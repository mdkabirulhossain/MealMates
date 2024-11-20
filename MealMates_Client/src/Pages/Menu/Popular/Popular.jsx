import React from 'react';
import MenuItems from '../../Shared/MenuItems/MenuItems';

const Popular = ({items}) => {
    return (
        <div className='grid md:grid-cols-2 gap-4 mb-24'>
            {
                items.map(item => <MenuItems
                key={item._id}
                item ={item}
                > 
                </MenuItems>)
            }
        </div>
    );
};

export default Popular;