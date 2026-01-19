

import { useNavigate } from 'react-router-dom'

export function useAuth(){
    const navigate = useNavigate()

    const login = async(usuario: string, contrasena: string) => {
        try{
            const respuesta = await fetch(`http://localhost:5000/api/v1/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({usuario, contrasena})
            })
            
            if(!respuesta.ok) {
                throw new Error('Credenciales inválidas')
            }
            
            const data = await respuesta.json()
            console.log(data)
            
            // Guardar token si existe
            if(data.token) {
                localStorage.setItem('token', data.token)
            }
            
            // Alerta de login exitoso
            alert('¡Login exitoso! Redirigiendo...')
            
            // Navegar a home
            navigate('/home')
            
        }catch(error){
            console.error('Error en login:', error)
            throw error 
        }
    }

    return { login }
}