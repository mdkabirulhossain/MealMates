import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {

   const [menu,loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                 console.log(`${item._id}`)
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} is deleted`,
                        icon: "success"
                    });
                }

                console.log(res.data);
            }
        });
    }
    return (
        <div>
            <SectionTitle
                heading="Manage All Items" subHeading={"Hurry up---"}
            ></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* {menu.length} */}
                            {/* row 1 */}
                            {
                               
                                menu.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name} />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{item.name}</div>

                                        </div>
                                    </td>
                                    <td>
                                        ${item.price}
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updateitems/${item._id}`}>
                                            <button className="btn text-orange-600 btn-ghost btn-lg">

                                                <FaEdit></FaEdit>
                                            </button>
                                        </Link>

                                    </td>
                                    <th>
                                        <button onClick={() => handleDeleteItem(item)} className="btn text-red-600 btn-ghost btn-lg">

                                            <FaTrash></FaTrash>
                                        </button>
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;