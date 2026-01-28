
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

    const getPorcentajeColor = () => {
        if (titulo.toLowerCase() === 'ingresos') return 'text-green-500'
        if (titulo.toLowerCase() === 'egresos') return 'text-red-500'
        return 'text-amber-600' 
    }

  return (
    <div className="mt-20 w-100 border border-cyan-300 rounded-xl p-6 shadow-sm hover:scale-110 transition-all duration-300">
        <div className="flex flex-row justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-800">{titulo}</h3>
            <div className="text-cyan-600">
                {icono}
            </div>
        </div>
        
        <p className="text-2xl font-semibold text-slate-900 mb-2">$ {monto.toLocaleString()}</p>
        <p className={`text-sm ${getPorcentajeColor()}`}>{porcentaje}% <span> con respecto al mes pasado </span></p>

        <div className={`mt-4 ${getBarColor()} h-1 w-40`}></div>
    </div>
  )
}
