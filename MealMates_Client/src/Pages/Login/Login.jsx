import React, { useContext, useEffect, useRef, useState } from 'react';
import './Login.css';
import login_img from '../../assets/others/authentication2.png';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'

const Login = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log('Email:', email, 'Password:', password);
        form.reset(); // Reset form inputs
        signIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("User:", user)
                // ...
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCaptchaChange = (event) => {
        event.preventDefault(); // Prevent default behavior (if needed)
        const captcha = captchaRef.current.value; // Get captcha value
        console.log('Captcha Entered:', captcha);

        if (validateCaptcha(captcha)) {
            setDisabled(false); // Enable Login button
        } else {
            setDisabled(true); // Keep Login button disabled
            alert('Captcha did not match. Please try again.');
        }
    };

    return (
        <div>
            <Helmet>
                <title>MealMates | Sign In</title>
            </Helmet>
            <div className='login px-32 py-10'>
                <div className='login-form flex justify-center items-center border-[#00000040] border-4 p-10'
                    style={{ boxShadow: '10px 10px 10px 10px #00000040' }}>
                    <div className='w-1/2'>
                        <img src={login_img} alt="login img" />
                    </div>
                    <div className='w-1/2'>
                        <form onSubmit={handleLogin} className="card-body">
                            <h2 className='text-2xl font-bold text-center'>Login</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Email" className="input input-bordered focus:outline-none" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="Enter your password" className="input input-bordered focus:outline-none" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    type="text"
                                    ref={captchaRef}
                                    name='captcha'
                                    placeholder="Type here"
                                    className="input input-bordered focus:outline-none"
                                />
                                <button
                                    type="button" // Ensure it's not a submit button
                                    onClick={handleCaptchaChange}
                                    className='text-white bg-[#D1A054B2] w-20 rounded-sm mt-6'
                                >
                                    Validate
                                </button>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    disabled={disabled}
                                    className={`text-white bg-[#D1A054B2] py-3 rounded-lg font-bold ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Login
                                </button>
                            </div>
                            <div>
                                <Link to='/signup'><p className='text-center text-[#D1A054]'>New here? <span className='font-bold'>Create a New Account</span></p></Link>
                            </div>
                            <div>
                                <p className='text-center '>Or sign in with</p>
                            </div>
                            <div className='flex justify-center items-center gap-x-12'>
                                <div className='w-10 h-10 border-2 border-black rounded-full flex justify-center items-center'>
                                    <FaFacebookF />
                                </div>
                                <div className='w-10 h-10 border-2 border-black rounded-full flex justify-center items-center'>
                                    <FaGoogle />
                                </div>
                                <div className='w-10 h-10 border-2 border-black rounded-full flex justify-center items-center'>
                                    <FaGithub />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
