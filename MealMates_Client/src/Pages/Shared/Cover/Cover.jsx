import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({img,title, text, height}) => {
    return (
        <Parallax className='mb-24'
        blur={{ min: -15, max: 15 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
    >
       <div
            className="hero"
            style={{
                height: `${height}px`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-white text-center w-full">
                <div className="w-4/5 px-20 py-16 bg-[#151515] opacity-40">
                    <h1 className="mb-5 text-2xl font-bold md:text-5xl">{title}</h1>
                    <p className="mb-5">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    </Parallax>
        
    );
};

export default Cover;