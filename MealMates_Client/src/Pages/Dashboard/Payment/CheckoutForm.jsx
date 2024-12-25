import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const user = useAuth();

    // Calculate total price
    const TotalPrice = cart.reduce((total, item) => total + item.price, 0);

    const [clientSecret, setClientSecret] = useState('');

    // Fetch client secret when total price changes
    useEffect(() => {
        if (TotalPrice > 0) {
            axiosSecure
                .post('/create-payment-intent', { price: TotalPrice })
                .then((res) => {
                    if (res.data?.clientSecret) {
                        setClientSecret(res.data.clientSecret);
                    }
                })
                .catch((err) => {
                    console.error('Error fetching client secret:', err);
                });
        }
    }, [axiosSecure, TotalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError('Stripe is not loaded. Please try again.');
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setError('Card element is not available.');
            return;
        }

        // Create payment method
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            return;
        } else {
            console.log(paymentMethod);
            setError(''); // Clear previous error if any
        }

        // Confirm card payment
        try {
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: user?.email || 'anonymous@example.com',
                        name: user?.displayName || 'Anonymous',
                    },
                },
            });

            if (confirmError) {
                setError(confirmError.message);
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                console.log(paymentIntent.id);
                setError(''); // Clear errors on success
            }
        } catch (err) {
            console.error('Error confirming card payment:', err);
            setError('An unexpected error occurred. Please try again.');
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
                <div className="flex items-center">
                    <p className="font-bold mr-2">Total: ${TotalPrice.toFixed(2)}</p>
                    <button
                        className="bg-orange-600 my-2 px-4 py-1 rounded-md"
                        type="submit"
                        disabled={!stripe || !clientSecret}
                    >
                        Pay
                    </button>
                </div>

                {error && <p className="text-red-700">{error}</p>}
                {transactionId && (
                    <p className="text-green-500">Your Transaction ID: {transactionId}</p>
                )}
            </form>
        </div>
    );
};

export default CheckoutForm;
