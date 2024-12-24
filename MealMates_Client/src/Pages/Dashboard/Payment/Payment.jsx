import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    //ToDo set the pk
    const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk_key);
    return (
        <div>
            <SectionTitle
                heading={"Payment"}
                subHeading={"Please Pay ---"}
            >

            </SectionTitle>

            <div>
                <Elements stripe={stripePromise}>
                   <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;