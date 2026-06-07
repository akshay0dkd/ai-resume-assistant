import { createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/Components/Protected.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/Interview.jsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element:  <Protected> <Home/> </Protected>
    },
    {
        path: "/register",
        element: <Register />
    },

    {
        path: "/interview/:interviewId",
        element: <Protected> <Interview/> </Protected>
    },
 

    

])
