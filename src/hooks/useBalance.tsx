export function useBalance() {

    const getBalance = async() => {
        try{
            const respuesta = await fetch(`http://localhost:5000/api/v1/get/balance/all`)
            const data = await respuesta.json()
            return data
        }catch(error){
            console.log(error)
        }
    }

    const newBalance = async (monto: number, fecha: Date) => {
        try{
            const respuesta = await fetch(`http://localhost:5000/api/v1/post/balance`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ monto, fecha })
                }
            )
            const data = await respuesta.json()
            return data
        }catch(error){
            console.log(error)
        }
    }
    return { getBalance, newBalance }
}