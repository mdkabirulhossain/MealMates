import React from 'react';

const Cover = ({img,title, text, height}) => {
    return (
        <div
            className={`hero h-[${height}px]`}
            style={{
                backgroundImage: `url(${img})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-white text-center">
                <div className="px-96 py-16 bg-[#151515] opacity-40">
                    <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                    <p className="mb-5">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cover;