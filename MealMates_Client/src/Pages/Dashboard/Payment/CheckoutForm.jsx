import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const[error, setError] = useState(" ");
    const [clientSecret, setClientSecret] = useState(" ");
    const [transactionId, setTransactionId] = useState(' ');
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const user = useAuth();
    const TotalPrice = cart.reduce((total, item)=> total + item.price, 0)

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent', {price: TotalPrice})
        .then(res=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
    },[axiosSecure, TotalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message)
        } else {
            console.log('payment method', paymentMethod);
            setError(" ");
        }

        //confirm payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous@example.com',
                    name: user?.displayName || 'Anonymous',
                },
            },
        });
       
        if(confirmError){
            console.log('confirm error')
        }
        else{
            console.log("payment Intent:", paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('Transaction Id:', paymentIntent.id)
                setTransactionId(paymentIntent.id)
            }
        }
    };

    return (
        <div className="px-4">
            <form onSubmit={handleSubmit}>
                {/* Wrapper for the CardElement */}
                <div
                    style={{
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        padding: '10px',
                    }}
                >
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <div className='flex items-center'>
                    <p className='font-bold mr-2'>Total: ${TotalPrice}</p>
                    <button
                    className="bg-orange-600 my-2 px-4 py-1 rounded-md"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
                </div>
                
                <p className='text-red-700'>{error}</p>
                {transactionId && <p className='text-green-500'>Your Transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
