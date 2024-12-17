import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageItems = () => {

    const [menu] = useMenu();
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
                                        <button className="btn text-orange-600 btn-ghost btn-lg">

                                            <FaEdit></FaEdit>
                                        </button>

                                    </td>
                                    <th>
                                        <button onClick={() => handleDeleteItem(user)} className="btn text-red-600 btn-ghost btn-lg">

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