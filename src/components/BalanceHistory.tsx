import { useState } from "react";


interface Props {
    id_balance: number
    monto: number;
    fecha: string,
}

export const BalanceHistory = ({id_balance, monto, fecha}: Props) => {
  const [ openModal, setOpenModal] = useState(false)
  
  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow duration-200">
        <div className="flex-1">
            <p className="font-medium text-gray-900">Balance</p>
            <div className="flex gap-4 mt-1">
                <span className="text-sm text-gray-500">{fecha}</span>
            </div>
        </div>
        
        <div className="flex items-center gap-4">
            <p className={`font-semibold text-lg `}>
                ${monto.toLocaleString()}
            </p>
            
           
        </div>
         
    </div>
  )
}
