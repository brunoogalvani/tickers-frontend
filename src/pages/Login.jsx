import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ModalLogin from '../components/ModalLogin'
import user from '../assets/img/usuario-de-perfil.png'



function Login() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>

            
            <div className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#F5D87F,_#E37C6D)]">
                
              
                <div className="flex flex-col items-center space-y-6 border-2 border-none p-6 bg-gray-800/30 rounded-lg shadow-lg h-[450px] w-[400px]">
                    <p className="text-2xl font-semibold">Login</p>
            
                    <img className="w-[75px] h-[75px]" src={user} alt="User" />
                    
                    <input 
                        className="w-[300px] bg-white/10 backdrop-blur-sm rounded text-white-300 text-[14px] placeholder-white/65 outline-none px-4 py-2"
                        type="text"
                        placeholder="Digite seu e-mail ou Usuário"
                    />
                    <input 
                        className="w-[300px] bg-white/10 backdrop-blur-sm rounded text-white-300 text-[14px] placeholder-white/65 outline-none px-4 py-2"
                        type="password"
                        placeholder="Digite sua senha"
                    />

                    <button 
                    className="mt-2 px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] hover:scale-105 active:scale-95"
                    id="entrar"
                                        
                    >
                        Entrar
                    </button>
                    <button onClick={() => navigate('/Register')}
                        className="mt-2 px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] hover:scale-105 active:scale-95"
                        id="criar-conta"
                        
                    >
                        Criar conta
                    </button>
                </div>

          
                <button
                    onClick={() => navigate('/')}
                    className="mt-2 px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] hover:scale-105 active:scale-95"
                    id="voltar-home">
                    Voltar para Home
                </button>
            </div>

            <main>
                {isModalOpen && <ModalLogin onClose={() => setIsModalOpen(false)} />}
            </main>
        </>
    )
}

export default Login
