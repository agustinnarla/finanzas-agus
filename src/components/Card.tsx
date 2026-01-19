
import type { ReactNode } from 'react'

interface Props{
    titulo: string;
    icono: ReactNode;
    monto: number;
    porcentaje: number;
}

export const Card = ({titulo, icono, monto, porcentaje}: Props) => {
    const getBarColor = () => {
        if (titulo.toLowerCase() === 'ingresos') return 'bg-green-500'
        if (titulo.toLowerCase() === 'egresos') return 'bg-red-500'
        return 'bg-amber-600' 
    }

  return (
    <div className="mt-20 w-100 border border-gray-200 rounded-xl p-6 shadow-sm ">
        <div className="flex flex-row justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-800">{titulo}</h3>
            <div className="text-cyan-600">
                {icono}
            </div>
        </div>
        
        <p className="text-2xl font-semibold text-slate-900 mb-2">$ {monto.toLocaleString()}</p>
        <p className="text-sm text-slate-500">{porcentaje}% con respecto al mes pasado</p>

        <div className={`mt-4 ${getBarColor()} h-1 w-40`}></div>
    </div>
  )
}
