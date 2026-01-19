import { createBrowserRouter } from "react-router-dom";
import { Login } from "../page/Login";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <h1>Home</h1>
    }
])
