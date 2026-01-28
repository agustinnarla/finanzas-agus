import { useEffect, useState } from "react";
import { Card } from "../components/Card"
import { NavBar } from "../components/NavBar"
import { FaWallet } from "react-icons/fa"
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getAvg, getBalance, getGastosTotales, getIngresosTotales } from "../hooks/useDashboard";


export const Home = () => {

    const [gastos, setGastos] = useState(0)
    const [ingresos, setIngresos] = useState(0)
    const [balance, setBalance] = useState(0)
    const [porcentajes, setPorcentajes] = useState<any[]>([])


    useEffect(() => {
        const fetchData = async () => {
            try{
                const gastosTotales = await getGastosTotales()
                const ingresosTotales = await getIngresosTotales()
                const balanceTotal = await getBalance()
                const promedioData = await getAvg()

                setBalance(Number(balanceTotal))
                setIngresos(Number(ingresosTotales))
                setGastos(Number(gastosTotales))
                setPorcentajes(promedioData)
                
                console.log('Datos de promedio:', promedioData)
            }catch(error){
                console.log(error)
            }
            
        }
        fetchData()
    }, [])

    // Función para obtener el porcentaje por tipo
    const getPorcentajeByTipo = (idTipo: number) => {
        const porcentajeData = porcentajes.find((p: any) => p.id_tipo === idTipo)
        return porcentajeData ? porcentajeData.porcentaje : 0
    }
    
  return (
    <div className="flex h-screen bg-white">
        <aside className="w-64">
            <NavBar />
        </aside>
        <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-slate-800">Bienvenido</h1>
            <p className="text-[15px] text-gray-500 mb-8">Resumen de mi actividad financiera del mes actual</p>
            
            <div className="flex gap-6 justify-center">
                <Card 
                    titulo="Ingresos" 
                    icono={<FaArrowUp size={24} />}  
                    monto={ingresos} 
                    porcentaje={getPorcentajeByTipo(1)} 
                />
                <Card 
                    titulo="Egresos" 
                    icono={<FaArrowDown size={24} />}  
                    monto={gastos} 
                    porcentaje={getPorcentajeByTipo(2)} 
                />
                <Card 
                    titulo="Balance" 
                    icono={<FaWallet size={24} />}  
                    monto={balance} 
                    porcentaje={0} 
                />
            </div>
        </div>
    </div>
  )
}
