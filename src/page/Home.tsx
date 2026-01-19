import { Card } from "../components/Card"
import { NavBar } from "../components/NavBar"
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa"

export const Home = () => {
  return (
    <div className="flex h-screen bg-white">
        <aside className="w-64">
            <NavBar />
        </aside>
        <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-slate-800">Bienvenido</h1>
            <p className="text-[15px] text-gray-500 mb-8">Resumen de mi actividad financiera del mes actual</p>
            
            <div className="flex gap-6 items-center justify-center">
                <Card 
                    titulo="Ingresos" 
                    icono={<FaArrowUp size={24} />}  
                    monto={15000} 
                    porcentaje={12} 
                />
                <Card 
                    titulo="Egresos" 
                    icono={<FaArrowDown size={24} />}  
                    monto={8500} 
                    porcentaje={-5} 
                />
                <Card 
                    titulo="Balance" 
                    icono={<FaWallet size={24} />}  
                    monto={6500} 
                    porcentaje={8} 
                />
            </div>
        </div>
    </div>
  )
}
