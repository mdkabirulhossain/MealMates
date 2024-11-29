import React, { useContext, useEffect } from 'react';
import './SignUp.css'
import login_img from '../../assets/others/authentication2.png'
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaGithub } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = data =>{
        console.log(data);
        createUser(data.email, data.password)
        .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user)
                    updateUserProfile(data.name, data.PhotoURL)
                    .then(()=>{
                        console.log("User profile info updated")
                        reset();
                    })
                    // ...
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Sign Up Successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/');
                    //   If i want then here I can use logout then navigate login page 
                  })
                  
    }

    
    // const handleLogin = (event) => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     console.log(name, email, password);
    //     form.reset();
    //     createUser(email, password)
    //     .then((userCredential) => {
    //         // Signed up 
    //         const user = userCredential.user;
    //         console.log(user)
    //         // ...
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ..
    //       });
    // }
    return (
        <div>
            <Helmet>
                <title>MealMates | Sign Up</title>
            </Helmet>
            <div className='signUp px-32 py-10'>
                <div className='login-form flex flex-row-reverse justify-center items-center border-[#00000040] border-4 p-10'
                    style={{ boxShadow: '10px 10px 10px 10px #00000040' }}>

                    <div className='w-1/2'>
                        <img src={login_img} alt="login img" />
                    </div>
                    <div className='w-1/2'>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input type="text" {...register("name")} name='name' placeholder="Enter your email" className="input input-bordered focus:outline-none" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Photo URL</span>
                                </label>
                                <input type="text" {...register("PhotoURL", { required: true })} name='PhotoURL' placeholder="Enter your email" className="input input-bordered focus:outline-none" />
                                {errors.PhotoURL && <span className='text-red-600'>Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered focus:outline-none" />
                                {errors.email && <span className='text-red-600'>email is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input type="password" {...register("password")} name='password' placeholder="Enter your password" className="input input-bordered focus:outline-none" required />
                            </div>

                            <div className="form-control mt-6">
                                <button className="text-white bg-[#D1A054B2] py-3 rounded-lg font-bold">Sign Up</button>
                            </div>
                            <div>
                                <Link to='/login'><p className='text-center text-[#D1A054]'>Already registered? <span className='font-bold'>Go to log in page</span></p></Link>
                            </div>
                            <div>
                                <p className='text-center '>Or sign up with</p>
                            </div>
                            <div className='flex justify-center items-center gap-x-12'>
                                <div className='w-10 h-10 border-2 border-black rounded-full flex justify-center items-center'>
                                    <FaFacebookF />
                                </div>
                                <div className='w-10 h-10 border-2 border-black rounded-full flex justify-center items-center'>
                                    <FaGoogle></FaGoogle>
                                </div>
                                <div className='w-10 h-10 border-2 border-black rounded-full flex justify-center items-center'>
                                    <FaGithub></FaGithub>
                                </div>

                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default SignUp;