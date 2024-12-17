import { FaBook, FaCalendarAlt, FaCalendarCheck, FaHome, FaShoppingCart, FaStreetView, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlinePayment, MdRestaurant } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { IoMdMail, IoMdMenu } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();

    //ToDo: get isAdmin value from database
    const [isAdmin] = useAdmin();
    //   const isAdmin = true;
        return (
        <div className="h-screen flex">
            {/* dashboard sidebar  */}
            <div className="w-64 h-screen bg-orange-400">
                <ul className="menu">

                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/adminHome'>
                                        <FaHome />
                                        ADMIN HOME</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/additems'>
                                    <MdRestaurant></MdRestaurant>
                                        ADD ITEMS</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageitems'>
                                    <IoMdMenu></IoMdMenu>
                                        MANAGE ITEMS</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/cart'>
                                    <FaCalendarCheck></FaCalendarCheck>
                                        MANAGE BOOKINGS ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allusers'>
                                    <FaUsers></FaUsers>
                                        ALL USERS</NavLink>
                                </li>
                                
                            </> :
                            <>
                                <li>
                                    <NavLink to='/dashboard/userHome'>
                                        <FaHome />
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reservation'>
                                        <FaCalendarAlt></FaCalendarAlt>
                                        Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/paymentHistory'>
                                        <MdOutlinePayment></MdOutlinePayment>
                                        Payment History</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/cart'>
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addReview'>
                                        <BiCommentDetail />
                                        Add Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/myBooking'>
                                        <FaCalendarCheck></FaCalendarCheck>
                                        My Booking</NavLink>
                                </li>

                            </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome />
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/menu'>
                            <IoMdMenu></IoMdMenu>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to='/shop/salad'>
                            <GiShoppingBag />
                            Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact'>
                            <IoMdMail></IoMdMail>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content  */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;