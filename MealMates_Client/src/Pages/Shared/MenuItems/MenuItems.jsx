import React from 'react';

const MenuItems = ({item}) => {
    const {image, name, price, recipe} = item;
    
    return (
        <div className='flex space-x-2'>
            <img style={{borderRadius: '0 200px 200px 200px'}} src={image} className='w-[100px]' alt="" />
            <div>
                <h3 className='uppercase'>{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-600'>${price}</p>
        </div>
    );
};

export default MenuItems;