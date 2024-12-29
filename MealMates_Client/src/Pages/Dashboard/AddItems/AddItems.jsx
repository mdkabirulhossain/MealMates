import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'

const imgbb_key = import.meta.env.VITE_imgbb_key
const imgbb_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_key}`

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        //image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imgbb_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price),

            }
            //send data in database
            //here use axiosSecure bcz only admin can able to add item
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${data.name} is added in menu Item`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }
        //console.log(res.data);

    }
    return (
        <div>
            <div>
                <SectionTitle subHeading={"---What's new?---"}
                    heading={"ADD AN ITEM"}
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
                                <option value="popular">popular</option>
                                <option value="offered">offered</option>
                                
                            </select>
                        </div>
                        <div className='w-full'>
                            <label className="form-control w-full">
                                <label htmlFor="">Price*</label>
                                <input {...register("price")} type="text" placeholder="Price" className="input input-bordered w-full" required />

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
                    <div>
                        <input {...register("image")} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <div className="flex justify-center  mt-6">
                        <button className=" flex items-center py-4 px-5 text-white font-bold" style={{ background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}>Add Item <FaUtensils></FaUtensils> </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;