import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';

const SingleCard = ({ item }) => {
    const { name, image, recipe, price, _id } = item;
    const user = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigation = useNavigate();
    const location = useLocation();
    //we only use refetch
    //const[ , refethc] = .... is also currect bcz here we use only refetch
    const[cart, refetch] = useCart();
    
    const handleCardButton = () =>{
        // console.log(food, user, user.user.email)
        if(user && user.user.email){
            //send cart item to database
            // console.log(food)
            const cartItem ={
                menuId :_id,
                email: user.user.email,
                name, 
                image,
                price
            }
            // axios.post('https://meal-mates-server-mu.vercel.app/carts', cartItem)
            //Call axiossSecure hook
            axiosSecure.post('/carts', cartItem)
            .then(res =>{
                console.log(res.data);
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${name} is added to cart`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  //refetch the cart to update cart
                  refetch();
            })
        }
        else{
            Swal.fire({
                title: "Please Login first",
                text: "You won't be able to add",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
              }).then((result) => {
                if (result.isConfirmed) {
                  //Send log in page
                    navigation('/login', {state:{from:location}})
                }
              });
        }
        
    }
    return (
        <div className="card card-compact bg-base-100 w-80 shadow-xl mx-auto md:w-96">
            <figure>
                <img
                    src={image}
                    alt={name} />
            </figure>
            <p className='bg-slate-900 absolute right-0 text-white mr-4 mt-4 px-2'>${price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                <button
                onClick={handleCardButton}
                className="btn btn-outline text-[#BB8506] bg-[#E8E8E8] border-[#BB8506] border-b-2 border-0 uppercase">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default SingleCard;