import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    return (
        <div className='mx-4 mt-4'>
            <h2 className='text-2xl font-bold pb-3'>Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='bg-orange-500'>
                            <th className='font-bold'>Serial</th>
                            <th className='font-bold'>Price</th>
                            <th className='font-bold'>Transaction Id</th>
                            <th className='font-bold'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payments.map((payment, index)=><tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>${payment.price}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.status}</td>
                        </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;