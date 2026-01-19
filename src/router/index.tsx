import { createBrowserRouter } from "react-router-dom";
import { Login } from "../page/Login";
import { Home } from "../page/Home";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />
    }
])
