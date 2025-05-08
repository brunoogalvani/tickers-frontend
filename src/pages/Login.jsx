import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ModalLogin from '../components/ModalLogin'
import user from '../assets/img/usuario-de-perfil.png'
import api from '../services/api'
import Swal from 'sweetalert2'



function Login() {
    const inputClass =
    'w-[300px] bg-white/10 backdrop-blur-sm rounded text-white text-sm placeholder-white/65 outline-none px-4 py-2 transition duration-200 focus:ring-2 focus:ring-yellow-300'
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [errors, setErrors] = useState({})
    

    async function autenticar() {
    try {
        
        const response = await api.post('/users/login', {
            email,
            senha,
        
        })
        
        sessionStorage.setItem('userID', response.data.id)

        navigate('/')
    } catch (error) {
        console.error('Erro ao autenticar:', error)
              Swal.fire({
                icon: 'error',
                title: 'Erro ao entrar na conta',
                text: 'Verifique os dados e tente novamente.',
                confirmButtonColor: '#E37C6D',
              })
    }
   
        
    }

    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>

            
            <div className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#F5D87F,_#E37C6D)]">
                
              
                <div className="flex flex-col items-center space-y-6 border-2 border-none p-6 bg-gray-800/30 rounded-lg shadow-lg h-[450px] w-[400px]">
                    <p className="text-2xl font-semibold">Login</p>
            
                    <img className="w-[75px] h-[75px]" src={user} alt="User" />
                    
                    <input
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value); 
                            setErrors((prev) => ({ ...prev, email: '' }))
                        }}
                        className={inputClass}
                        type="email"
                        placeholder="Digite seu e-mail"
                        />
                        {errors.email && <p className={errorClass}>{errors.email}</p>}

                    <input
                        name="senha"
                        value={senha}
                        onChange={(e) => {setSenha(e.target.value); setErrors((prev) => ({ ...prev, senha: '' }))}}
                        className={inputClass}
                        type="password"
                        placeholder="Digite sua senha"
                         />

                    <button 
                    onClick={autenticar}
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
