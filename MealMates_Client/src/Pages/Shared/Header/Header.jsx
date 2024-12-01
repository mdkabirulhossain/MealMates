import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaShoppingCart } from "react-icons/fa";
import useCart from '../../../hooks/useCart';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const[cart] = useCart();
  const handleLogout = () => {
    logOut()
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        // ...

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => console.log(error))
  }
  const nav = (
    <>
      <li className="uppercase"><Link to="/">Home</Link></li>
      <li className="uppercase"><Link to="/contact">Contact Us</Link></li>
      <li className="uppercase"><Link to="/secret">Secret</Link></li>
      <li className="uppercase"><Link to="/menu">Our Menu</Link></li>
      <li className="uppercase"><Link to="/shop/salad">Our Shop</Link></li>
      <li className="uppercase"><Link to="/dashboard/cart">
        <button className="btn">
          <FaShoppingCart />
          <div className="badge badge-secondary">+{cart.length}</div>
        </button>
      </Link></li>

      {
        user ?
          <>
            {/* <li className='uppecase'>{user.displayName}</li> */}
            <li onClick={handleLogout} className="uppercase"><Link>Logout</Link></li>
          </>
          :
          <>
            <li className="uppercase"><Link to="/login">Login</Link></li>
          </>
      }
    </>
  );

  return (
    <div>
      {/* Fixed Navbar */}
      <div className="navbar max-w-screen-xl mx-auto fixed top-0 w-full z-10 bg-opacity-30 bg-black text-white lg:flex">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-opacity-30 bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
            >
              {nav}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" to="/">MealMates</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{nav}</ul>
        </div>

      </div>


    </div>
  );
};

export default Header;
``
