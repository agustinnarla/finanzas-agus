export function   useTransaction(){
    

    const newTransaction = async(detalle: string, monto: number, id_tipo: number, fecha: Date, id_categoria: number, estado: boolean) => {
        try{
            const respuesta = await fetch(`http://localhost:5000/api/v1/post/transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({detalle, monto, id_tipo, fecha, id_categoria, estado})
            })
            
            console.log(respuesta)
            if(!respuesta.ok) {
                throw new Error('Datos error inválidas')
            }
            
            const data = await respuesta.json()
            console.log(data)
            
            alert('¡Transacción creada exitosamente!')
            
            
        }catch(error){
            console.error('Error al crear transacción:', error)
            throw error 
        }
    }
    const getCategoria = async() => {
        try{
        const respuesta = await fetch(`http://localhost:5000/api/v1/get/categoria`)
        const data = await respuesta.json()

        return data
    }catch(error){
        console.error('Error al obtener categoria', error)
    }
    
    }
    const getTipo = async() => {
        try{
        const respuesta = await fetch(`http://localhost:5000/api/v1/get/tipo`)
        const data = await respuesta.json()

        return data
    }catch(error){
        console.error('Error al obtener tipo', error)
    }
    
    }
    const getTransaction = async() => {
        try{
            const respuesta = await fetch(`http://localhost:5000/api/v1/get/transaction`)
            const data = await respuesta.json()
            return data
        }catch(error){
            console.error('Error al obtener transacción', error)
        }

    }
    const deleteTransaction = async(id_transaccion: number) => {
        try{
            const respuesta = await fetch(`http://localhost:5000/api/v1/put/transaction/delete/${id_transaccion}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id_transaccion})
                }
                
            )
            console.log(respuesta)
            if(!respuesta.ok) {
                throw new Error('Datos error inválidas')
            }
            
            const data = await respuesta.json()
            console.log(data)
            
        }catch(error){
            console.error('Error al eliminar transacción', error)
        }
    }
    const getTransactionForId = async (id_transaccion: number) => {
        try{
            const respuesta = await fetch(`http://localhost:5000/api/v1/get/transaction/${id_transaccion}`)
            const data = await respuesta.json()
            return data
        }catch(error){
            console.error('Error al obtener transacción', error)
        }
    }
    const updateTransaction = async(id_transaccion: number, detalle: string, monto: number, id_tipo: number, fecha: Date, id_categoria: number, estado: boolean ) => {
        try{
            const respuesta = await fetch(`http://localhost:5000/api/v1/put/transaction/${id_transaccion}`,
                {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id_transaccion, detalle, monto, id_tipo, fecha, id_categoria, estado})
                }

            )
            const data = respuesta.json()
            console.log(data)
            return data;
        }catch(error){
            console.log(error)
        }
    }
    return { newTransaction, getCategoria, getTipo, getTransaction, deleteTransaction, getTransactionForId, updateTransaction }
}