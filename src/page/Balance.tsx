import { useEffect, useState } from "react"
import { NavBar } from "../components/NavBar"

import ModalBalance from "../components/ModalBalance"
import { useBalance } from "../hooks/useBalance"
import { BalanceHistory } from "../components/BalanceHistory"

export const Balance = () => {
  const [openModal, setOpenModal] = useState(false)
  const [balances, setBalance] = useState<any>([])

  const {getBalance} = useBalance()

  const loadTransactions = async () => {
    try{
      const balance = await getBalance()
      setBalance(balance)
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
              Balance
            </h1>
            <p className="text-[15px] text-gray-500">
              ABM - Balance
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            + Agregar balance
          </button>
        </div>

        <div>
          {
            balances.map((balance:any)=> {  
              return (
                <BalanceHistory 
                  id_balance={balance.id_balance}
                  key={balance.id_balance}
                  monto={balance.monto} 
                  fecha={balance.fecha}
                />
              )
            })
          }
        </div>
      </main>

    </div>
  )
}
