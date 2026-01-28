import { useState } from "react";
import { useTransaction } from "../hooks/useTransaction";

import ModalModi from "./ModalModi";

interface Props {
    id_transaccion: number
    detalle: string;
    monto: number;
    fecha: string,
    tipo: string,
    categoria: string,
}

export const TransactionHistory = ({id_transaccion, detalle, monto, fecha, tipo, categoria}: Props) => {
  const [ openModal, setOpenModal] = useState(false)
  const isIncome = tipo.toLowerCase() === 'ingreso';
  
  const {deleteTransaction} = useTransaction()

  const handleEliminarTransaccion = (e: React.FormEvent): void => {
        e.preventDefault();
        deleteTransaction(id_transaccion)
        alert('Transacción eliminada')
    }

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow duration-200">
        <div className="flex-1">
            <p className="font-medium text-gray-900">{detalle}</p>
            <div className="flex gap-4 mt-1">
                <span className="text-sm text-gray-500">{fecha}</span>
                <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">{categoria}</span>
            </div>
        </div>
        
        <div className="flex items-center gap-4">
            <p className={`font-semibold text-lg ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                {isIncome ? '+' : '-'}${monto.toLocaleString()}
            </p>
            
            <div className="flex gap-2">
                <button onClick={() => setOpenModal(true)} className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200">
                    Editar
                </button>
                <button onClick={handleEliminarTransaccion} className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200">
                    Eliminar
                </button>
            </div>
        </div>
         {openModal && (
        <ModalModi 
            onClose={() => {
            setOpenModal(false)
            }} 
            id_transaccion={id_transaccion}
        />
          )}
    </div>
  )
}
