import { useEffect, useState } from "react"
import { NavBar } from "../components/NavBar"
import Modal from "../components/Modal"
import { useTransaction } from "../hooks/useTransaction"
import { TransactionHistory } from "../components/TransactionHistory"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export const Reportes = () => {
  const [openModal, setOpenModal] = useState(false)
  const [transacciones, setTransacciones] = useState<any>([])

  const {getTransaction} = useTransaction()

  const loadTransactions = async () => {
    try{
      const transaccionTotales = await getTransaction()
      setTransacciones(transaccionTotales)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  // Debug: ver qué datos llegan
  console.log('Transacciones cargadas:', transacciones)
  console.log('Tipos encontrados:', [...new Set(transacciones.map((t: any) => t.tipo_detalle))])
  console.log('IDs tipo encontrados:', [...new Set(transacciones.map((t: any) => t.id_tipo))])

  // Procesar datos para gráficos
  const datosPorCategoria = transacciones.reduce((acc: any, trans: any) => {
    const categoria = trans.categoria_detalle
    if (!acc[categoria]) {
      acc[categoria] = { categoria, ingresos: 0, gastos: 0 }
    }
    // Verificar si es ingreso (considerando diferentes casos)
    const isIngreso = trans.tipo_detalle?.toLowerCase() === 'ingreso' || 
                     trans.tipo_detalle === 'Ingreso' ||
                     trans.id_tipo === 1 // si id_tipo 1 es ingreso
    
    if (isIngreso) {
      acc[categoria].ingresos += trans.monto
    } else {
      acc[categoria].gastos += trans.monto
    }
    return acc
  }, {})

  const datosCategoriaArray = Object.values(datosPorCategoria)

  // Datos para gráfico de pastel - ingresos vs gastos
  const totales = transacciones.reduce((acc: any, trans: any) => {
    const isIngreso = trans.tipo_detalle?.toLowerCase() === 'ingreso' || 
                     trans.tipo_detalle === 'Ingreso' ||
                     trans.id_tipo === 1
    
    if (isIngreso) {
      acc.ingresos += trans.monto
    } else {
      acc.gastos += trans.monto
    }
    return acc
  }, { ingresos: 0, gastos: 0 })

  const datosPastel = [
    { name: 'Ingresos', value: totales.ingresos, color: '#10b981' },
    { name: 'Gastos', value: totales.gastos, color: '#ef4444' }
  ]

  
  return (
    <div className="flex h-screen bg-white">
      <aside className="w-64 border-r">
        <NavBar />
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Reportes
            </h1>
            <p className="text-gray-500 mt-1">Análisis visual de tus finanzas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Ingresos vs Gastos por Categoría</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosCategoriaArray}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Legend />
                <Bar dataKey="ingresos" fill="#10b981" name="Ingresos" />
                <Bar dataKey="gastos" fill="#ef4444" name="Gastos" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de pastel - Distribución */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Distribución General</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datosPastel}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datosPastel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-green-800 font-semibold">Total Ingresos</h4>
            <p className="text-2xl font-bold text-green-600">${totales.ingresos.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="text-red-800 font-semibold">Total Gastos</h4>
            <p className="text-2xl font-bold text-red-600">${totales.gastos.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-blue-800 font-semibold">Balance Neto</h4>
            <p className="text-2xl font-bold text-blue-600">${(totales.ingresos - totales.gastos).toLocaleString()}</p>
          </div>
        </div>

      </main>

    </div>
  )
}
