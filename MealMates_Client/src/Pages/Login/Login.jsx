import React from 'react';
import './Login.css'
import login_img from '../../assets/others/authentication2.png'
const Login = () => {
    const handleLogin = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        form.reset();
    }
    return (
        <div className='login px-32 py-10'>
            <div className='login-form flex justify-center items-center border-[#00000040] border-4 p-10'
                style={{ boxShadow: '10px 10px 10px 10px #00000040' }}>

                <div className='w-1/2'>
                    <img src={login_img} alt="login img" />
                </div>
                <div className='w-1/2'>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Enter your password" className="input input-bordered focus:outline-none" required />
                        </div>
                        <div className="form-control mt-6">
                            <input type="text" placeholder="U A G I U O" className="input input-bordered focus:outline-none" />
                            <label className="label">
                                <span className="label-text font-bold text-blue-700">Reload Captcha</span>
                            </label>
                        </div>
                        <div className="form-control">
                            <input type="text" placeholder="" className="input input-bordered focus:outline-none" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="text-white bg-[#D1A054B2] py-3 rounded-lg font-bold">Login</button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default Login;