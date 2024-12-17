import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from "react-icons/fa";


const UpdatItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async(data) => {
        console.log(data);
        
    }
    return (
        <div>
            <div>
                <SectionTitle subHeading={"---What's new?---"}
                    heading={"Update ITEM"}
                >

                </SectionTitle>

            </div>
            <div className='bg-[#F3F3F3] px-5'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Name*</span>

                        </div>
                        <input {...register("name")} type="text" placeholder="Food Name" className="input input-bordered w-full" required />

                    </label>
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <label htmlFor="">Category*</label>
                            <select {...register("category")} className="select select-bordered w-full " required>
                                
                                <option value="salad">salad</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                                <option value="dessert">dessert</option>
                                <option value="drinks">drinks</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <label className="form-control w-full">
                                <label htmlFor="">Price*</label>
                                <input {...register("price")} type="number" placeholder="Price" className="input input-bordered w-full" required />

                            </label>
                        </div>

                    </div>
                    <div className='my-6'>
                        <label htmlFor="">Recipe Details*</label>
                        <textarea
                            {...register("recipe")}
                            className="textarea textarea-bordered w-full" placeholder="Recipes Details" required >

                        </textarea>
                    </div>
                    
                    <div className="flex justify-center  mt-6">
                        <button className=" flex items-center py-4 px-5 text-white font-bold" style={{ background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}>Add Item <FaUtensils></FaUtensils> </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatItems;