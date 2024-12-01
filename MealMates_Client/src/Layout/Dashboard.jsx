import { FaCalendarAlt, FaCalendarCheck, FaHome, FaShoppingCart, FaStreetView } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";

const Dashboard = () => {
    return (
        <div className="h-screen flex">
            {/* dashboard sidebar  */}
            <div className="w-64 h-screen bg-orange-400">
                <ul className="menu">
                    <li>
                        <NavLink to='/dashboard/userHome'>
                            <FaHome/>
                            User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/userHome'>
                        <FaCalendarAlt></FaCalendarAlt>
                            Reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/userHome'>
                        <MdOutlinePayment></MdOutlinePayment>
                            Payment History</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/cart'>
                            <FaShoppingCart></FaShoppingCart>
                            My Cart</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/addReview'>
                            <BiCommentDetail/>
                            Add Review</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/myBooking'>
                        <FaCalendarCheck></FaCalendarCheck>
                            My Booking</NavLink>
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