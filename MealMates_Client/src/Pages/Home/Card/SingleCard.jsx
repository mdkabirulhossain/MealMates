import React from 'react';

const SingleCard = ({ item }) => {
    const { name, image, recipe } = item;
    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt={name} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                <button className="btn btn-outline text-[#BB8506] bg-[#E8E8E8] border-[#BB8506] border-b-2 border-0 uppercase">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default SingleCard;