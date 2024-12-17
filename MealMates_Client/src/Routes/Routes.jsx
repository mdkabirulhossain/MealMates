import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Shop from "../Pages/Shop/Shop/Shop";
import Contact from "../Pages/Contact/Contact/Contact";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Secret from "../Pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path: "/",
            element:<Home></Home>
        },
        {
          path:"menu",
          element:<Menu></Menu>
        },
        {
          path:"shop/:category",
          element:<Shop />
        },
        {
          path:"contact",
          element:<Contact></Contact>
        },
        {
          path:"login",
          element:<Login></Login>
        },
        {
          path:"signup",
          element:<SignUp></SignUp>
        },
        {
          path:"secret",
          element:<PrivateRoutes><Secret></Secret></PrivateRoutes>
        },
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children: [

        //All are the normal users
        {
          path:'cart',
          element:<Cart></Cart>
        },

        // All are the admin routes
        {
          path:'allusers',
          element:<AdminRoute> <AllUsers/> </AdminRoute>
        },
        {
          path:'additems',
          element:<AdminRoute> <AddItems/> </AdminRoute>
        },
        {
          path:'manageitems',
          element:<AdminRoute> <ManageItems></ManageItems> </AdminRoute>
        },
      ]
    },
  ]);