import { useState, useEffect } from "react"
import { useBalance } from "../hooks/useBalance"


interface ModalProps {
  onClose: () => void
}

export default function ModalBalance({ onClose }: ModalProps) {

const { newBalance } = useBalance()
const [ form, setForm] = useState({
    monto: 0,
    fecha: "",
  })

  const handleNewBalance = (e: React.FormEvent): void => {
        e.preventDefault();
        const fechaDate = form.fecha ? new Date(form.fecha) : new Date();
        newBalance(form.monto, fechaDate)
         alert('Balance registrado exitosamente')
         onClose()
  }
  

  

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          Ingresar un nuevo balance
        </h2>

        <form  className="space-y-3">
          
          <input
            name="monto"
            value={form.monto}
            onChange={(e) => setForm({ ...form, monto: Number(e.target.value) })}
            type="number"
            placeholder="Monto"
            className="w-full border p-2 rounded"
          />

         <input
            type="date"
            value={form.fecha}
            onChange={(e) =>
                setForm({ ...form, fecha: e.target.value })
            }
            className="w-full border p-2 rounded"
            />

         

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              onClick={handleNewBalance}
              className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
