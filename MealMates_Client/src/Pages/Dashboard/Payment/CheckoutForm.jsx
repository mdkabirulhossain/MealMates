import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const[error, setError] = useState(" ");
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
                <button
                    className="bg-orange-600 my-2 px-4 py-1 rounded-md"
                    type="submit"
                    disabled={!stripe}
                >
                    Pay
                </button>
                <p className='text-red-700'>{error}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;
