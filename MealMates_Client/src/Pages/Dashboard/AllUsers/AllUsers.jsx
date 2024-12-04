import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash, FaUsers } from 'react-icons/fa';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');

            return res.data;
        },
    })
    return (
        <div>
            <SectionTitle
                heading={"Manage All Users"}
                subHeading={"---How Many??---"}
            >

            </SectionTitle>
            <div>
                <h2>Total Users: {users.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>NAME</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.name}</td>
                                        <td>

                                            <FaUsers></FaUsers>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(user._id)} className="btn text-red-600 btn-ghost btn-lg">

                                                <FaTrash></FaTrash>
                                            </button>
                                        </td>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AllUsers;