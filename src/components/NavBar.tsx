import { Link } from "react-router-dom"

export const NavBar = () => {
    return(
        <nav className="bg-slate-50 h-full p-6 border-r border-slate-200">
            <h1 className="text-xl font-light text-slate-800 mb-16">Finanzas Agus</h1>
            <ul className="flex flex-col gap-8">
                <li> 
                    <Link 
                        to="/home" 
                        className="text-slate-600 hover:text-cyan-800 transition-colors duration-200 text-sm"
                    >
                        Home
                    </Link>
                </li>
                <li> 
                    <Link 
                        to="/transacciones" 
                        className="text-slate-600 hover:text-cyan-800 transition-colors duration-200 text-sm"
                    >
                        Transacciones
                    </Link>
                </li>
                <li> 
                    <Link 
                        to="/ingresos" 
                        className="text-slate-600 hover:text-cyan-800 transition-colors duration-200 text-sm"
                    >
                        Ingresos
                    </Link>
                </li>
                <li> 
                    <Link 
                        to="/egresos" 
                        className="text-slate-600 hover:text-cyan-800 transition-colors duration-200 text-sm"
                    >
                        Egresos
                    </Link>
                </li>
                <li> 
                    <Link 
                        to="/balances" 
                        className="text-slate-600 hover:text-cyan-800 transition-colors duration-200 text-sm"
                    >
                        Balances
                    </Link>
                </li>
                <li> 
                    <Link 
                        to="/reportes" 
                        className="text-slate-600 hover:text-cyan-800 transition-colors duration-200 text-sm"
                    >
                        Reportes
                    </Link>
                </li>
            </ul>
        </nav>
    )
}