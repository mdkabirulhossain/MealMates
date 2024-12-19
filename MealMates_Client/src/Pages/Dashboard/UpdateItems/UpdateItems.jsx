import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdatItems = () => {
    const { name, category, recipe, price, _id } = useLoaderData();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const menuItem = {
            name: data.name,
            recipe: data.recipe,
            category: data.category,
            price: parseFloat(data.price),
        };

        // Send updated data to the database
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
        if (menuRes.data.modifiedCount > 0) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: `${data.name} is updated in menu items`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div>
            <div>
                <SectionTitle subHeading={"---What's new?---"} heading={"Update ITEM"} />
            </div>
            <div className='bg-[#F3F3F3] px-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Name*</span>
                        </div>
                        <input {...register("name")} defaultValue={name} type="text" placeholder="Food Name" className="input input-bordered w-full" required />
                    </label>
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <label htmlFor="">Category*</label>
                            <select {...register("category")} defaultValue={category} className="select select-bordered w-full" required>
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
                                <input {...register("price")} defaultValue={price} type="text" placeholder="Price" className="input input-bordered w-full" required />
                            </label>
                        </div>
                    </div>
                    <div className='my-6'>
                        <label htmlFor="">Recipe Details*</label>
                        <textarea
                            {...register("recipe")}
                            defaultValue={recipe}
                            className="textarea textarea-bordered w-full"
                            placeholder="Recipes Details"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="flex items-center py-4 px-5 text-white font-bold" style={{ background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}>Update Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatItems;
