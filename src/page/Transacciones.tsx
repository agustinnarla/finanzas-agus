import { useEffect, useState } from "react"
import { NavBar } from "../components/NavBar"
import Modal from "../components/Modal"
import { useTransaction } from "../hooks/useTransaction"
import { TransactionHistory } from "../components/TransactionHistory"

export const Transacciones = () => {
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

  
  return (
    <div className="flex h-screen bg-white">
      <aside className="w-64 border-r">
        <NavBar />
      </aside>

      <main className="flex-1 p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Transacciones
            </h1>
            <p className="text-[15px] text-gray-500">
              ABM - Transacciones
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
          >
            + Agregar transacción
          </button>
        </div>

        <div>
          {
            transacciones.map((transaccion:any)=> {
              return (
                <TransactionHistory 
                  id_transaccion={transaccion.id_transaccion}
                  key={transaccion.id_transaccion}
                  detalle={transaccion.detalle} 
                  monto={transaccion.monto} 
                  fecha={transaccion.fecha} 
                  tipo={transaccion.tipo_detalle} 
                  categoria={transaccion.categoria_detalle} 
                />
              )
            })
          }
        </div>
      </main>

      {openModal && (
        <Modal 
          onClose={() => {
            setOpenModal(false)
            loadTransactions()
          }} 
        />
      )}
    </div>
  )
}
