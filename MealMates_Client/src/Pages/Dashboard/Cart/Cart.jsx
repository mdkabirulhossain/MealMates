import React from 'react';
import useCart from '../../../hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price;
    }, 0);

    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        //if we see console data then we ge a deletedCount
                        // console.log(res)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });
    }
    return (
        <div className='px-10 py-10'>
            <div className='flex justify-between'>
                <h2 className='text-2xl'>Items: {cart.length}</h2>
                <h2 className='text-2xl'>Total Price: ${totalPrice} </h2>
                
               {
                cart.length? 
                <Link to='/dashboard/payment'>
                <button className='bg-orange-400 px-4 py-1 rounded-md'>Pay</button>
                </Link> :
                <><button disabled className='bg-orange-400 px-4 py-1 rounded-md'>Pay</button></>
               }
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{item.name}</div>

                                    </div>
                                </td>
                                <td>${item.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn text-red-600 btn-ghost btn-lg">

                                        <FaTrash></FaTrash>
                                    </button>
                                </th>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Cart;