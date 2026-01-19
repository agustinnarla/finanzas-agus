import { 
   useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {

  //Estado del Formulario
    const [ form, setForm] = useState({
        usuario: "",
        contrasena: ""
    })

    const { login } = useAuth()

    //Función de Login
    const handleLogin = (e: React.FormEvent): void => {
        e.preventDefault();
        login(form.usuario, form.contrasena)
    }

    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg p-6">

        <h1 className="text-xl font-semibold text-gray-800 text-center">
          Ingresá tus credenciales
        </h1>

        <form>
            <div className="flex flex-col mb-2">
                <label className="mb-1 text-sm text-gray-600">Usuario</label>
                <input
                    value={form.usuario}
                    onChange={(e) => setForm({ ...form, usuario: e.target.value })}
                    type="text"
                    placeholder="Usuario"
                    className="border border-gray-300 rounded-xl p-2 transition
                            focus:outline-none focus:ring-2 focus:ring-cyan-600
                            hover:border-cyan-600"
                />
            </div>
            <div className="flex flex-col mb-2">
                <label className="mb-1 text-sm text-gray-600">Contraseña</label>
                <input
                    value={form.contrasena}
                    onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                    type="password"
                    placeholder="Contraseña"
                    className="border border-gray-300 rounded-xl p-2 transition
                        focus:outline-none focus:ring-2 focus:ring-cyan-600
                        hover:border-cyan-600"
                />
                <button
                type="submit"
                onClick={handleLogin}
                className="mt-2 bg-cyan-900 hover:bg-cyan-800 text-white
                            rounded-xl py-2 font-medium text-lg
                            transition-transform hover:scale-[1.02] active:scale-95"
                >
                Ingresar
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

