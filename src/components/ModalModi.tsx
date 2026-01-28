import { useState, useEffect } from "react"
import { useTransaction } from "../hooks/useTransaction"

interface ModalProps {
  onClose: () => void
  id_transaccion?: number
}

export default function Modal({ onClose, id_transaccion }: ModalProps) {

const [ form, setForm] = useState({
    id_transaccion: 0,
    detalle: "",
    monto: 0,
    id_tipo: 0,
    fecha: "",
    id_categoria: 0,
    estado: true
  })

  const [categorias, setCategorias] = useState<any[]>([])
  const [tipo, setTipo] = useState<any[]>([])
  const { updateTransaction, getCategoria, getTipo, getTransactionForId } = useTransaction()

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const data = await getCategoria()
        setCategorias(data)
      } catch (error) {
        console.error('Error al cargar categorías:', error)
      }
    }
    loadCategorias()
  }, [])

  useEffect(() => {
    const loadTipo = async () => {
      try {
        const data = await getTipo()
        setTipo(data)
      } catch (error) {
        console.error('Error al obtener tipo:', error)
      }
    }
    loadTipo()
  }, [])

  const handleUpdateTransaction = (e: React.FormEvent): void => {
        e.preventDefault();
        const fechaDate = form.fecha ? new Date(form.fecha) : new Date();
        updateTransaction(form.id_transaccion, form.detalle, form.monto, form.id_tipo, fechaDate, form.id_categoria, form.estado)
        alert('Transacción modificada')
  }
    
  useEffect(() => {
    if (!id_transaccion) return

    const loadForm = async () => {
      const response = await getTransactionForId(id_transaccion)

      const data = Array.isArray(response) ? response[0] : response

      if (!data?.fecha) return

      setForm({
        id_transaccion: data.id_transaccion ?? 0,
        detalle: data.detalle ?? "",
        monto: Number(data.monto) || 0,
        id_categoria: Number(data.id_categoria) || 0,
        id_tipo: Number(data.id_tipo) || 0,
        estado: Boolean(data.estado),
        fecha: data.fecha instanceof Date ? data.fecha.toISOString().split('T')[0] : data.fecha
      })
    }

    loadForm()
  }, [id_transaccion])

  

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
          Ingresar nueva transacción
        </h2>

        <form  className="space-y-3">
          <input
            name="detalle"
            value={form.detalle}
            onChange={(e) => setForm({ ...form, detalle: e.target.value })}
            placeholder="Detalle"
            className="w-full border p-2 rounded"
          />

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

          <select
            name="tipo"
            value={form.id_tipo}
            onChange={(e) => setForm({ ...form, id_tipo: Number(e.target.value) })}
            className="w-full border p-2 rounded"
          >
            <option  value={0}>
              Selecciona un tipo
            </option>
            {tipo.map((tipo) => (
              <option key={tipo.id_tipo} value={tipo.id_tipo}>
                {tipo.detalle}
              </option>
            ))}
          </select>

          <select
            name="categoria"
            value={form.id_categoria}
            onChange={(e) => setForm({ ...form, id_categoria: Number(e.target.value) })}
            className="w-full border p-2 rounded"
          >
            <option value={0}>Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.detalle}
              </option>
            ))}
          </select>

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
              onClick={handleUpdateTransaction}
              className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
            >
              Modificar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
