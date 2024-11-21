import React from 'react';
import SingleCard from '../../Home/Card/SingleCard';

const ShopCard = ({items}) => {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16'>
            {
                items.map(item => <SingleCard
                    key={item._id}
                    item={item}
                >

                </SingleCard>)
            }
        </div>
    );
};

export default ShopCard;