

export const getGastosTotales = async () => {
    try{
        const respuesta = await fetch(`http://localhost:5000/api/v1/get/gastos`)
        const data = await respuesta.json()

        return Number(data.total) || 0
    }catch(error){
        console.error('Error al obtener gastos totales:', error)
    }
}
    
export const getIngresosTotales = async () => {
    try{
        const respuesta = await fetch(`http://localhost:5000/api/v1/get/ingresos`)
        const data = await respuesta.json()

        return Number(data.total) || 0
    }catch(error){
        console.error('Error al obtener ingresos totales:', error)
    }
}

export const getBalance = async () => {
    try{
        const respuesta = await fetch(`http://localhost:5000/api/v1/get/balance`)
        const data = await respuesta.json()

        return Number(data.balance) || 0
    }catch(error){
        console.error('Error al obtener balance:', error)
    }
}

export const getAvg = async () => {
    try{
        const respuesta = await fetch(`http://localhost:5000/api/v1/get/avg`)
        const data = await respuesta.json()

        return data.respuesta || []
    }catch(error){
        console.error('Error al obtener promedios:', error)
        return []
    }
}