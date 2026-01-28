import { createBrowserRouter } from "react-router-dom";
import { Login } from "../page/Login";
import { Home } from "../page/Home";
import { Transacciones } from "../page/Transacciones";
import { Balance } from "../page/Balance";
import { Reportes } from "../page/Reportes";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/transacciones",
        element: <Transacciones />
    },
    {
        path: "/balances",
        element: <Balance />
    },
    {
        path: "/reportes",
        element: <Reportes />
    }
])
