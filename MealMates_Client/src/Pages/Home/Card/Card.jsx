import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import SingleCard from './SingleCard';

const Card = () => {
    const [items, setItems] = useState([]);
    useEffect(()=>{
        fetch('card.json')
        .then(res => res.json())
        .then(data =>setItems(data))
    }, [])
    return (
        <div>
            <SectionTitle
            subHeading={"---Should Try---"}
            heading={"CHEF RECOMMENDS"}
            >

            </SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16'>
                {
                    items.map(item=><SingleCard
                    key={item._id}
                    item={item}
                    >

                    </SingleCard>)
                }
            </div>
        </div>
    );
};

export default Card;