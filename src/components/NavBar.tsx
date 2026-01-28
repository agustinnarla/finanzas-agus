import { Link, useLocation } from "react-router-dom"
import { 
    FaHome, 
    FaExchangeAlt, 
    FaBalanceScale, 
    FaChartBar 
} from "react-icons/fa"

export const NavBar = () => {
    const location = useLocation()
    
    const menuItems = [
        { to: "/home", label: "Home", icon: FaHome },
        { to: "/transacciones", label: "Transacciones", icon: FaExchangeAlt },
        { to: "/balances", label: "Balances", icon: FaBalanceScale },
        { to: "/reportes", label: "Reportes", icon: FaChartBar }
    ]

    const isActive = (path: string) => location.pathname === path

    return(
        <nav className=" bg-slate-50 h-full p-6 border-r border-slate-200 shadow-sm">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Finanzas Agus</h1>
                <p className="text-xs text-slate-500">Gestiona tu dinero</p>
            </div>
            
            <ul className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <li key={item.to}>
                            <Link 
                                to={item.to}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                                    ${isActive(item.to) 
                                        ? 'bg-cyan-600 text-white shadow-md' 
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }
                                `}
                            >
                                <Icon size={18} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            
        </nav>
    )
}