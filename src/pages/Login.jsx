import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ModalLogin from '../components/ModalLogin'
import api from '../services/api'
import Swal from 'sweetalert2'

function Login() {
    const inputClass =
    'w-[300px] bg-white/10 backdrop-blur-sm rounded text-white text-sm placeholder-white/65 outline-none px-4 py-2 transition duration-200 focus:ring-2 focus:ring-yellow-300'
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    return (
        <>
            <div className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#F5D87F,_#E37C6D)]">
        
                <div className="flex flex-col items-center space-y-6 border-2 border-none p-6 bg-gray-800/30 rounded-lg shadow-lg h-[450px] w-[400px]">
                    <p className="text-2xl font-semibold">Login</p>
            
                    <svg className="w-[75px] h-[75px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
                    </svg>

                    
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
                    <button 
                        onClick={() => navigate('/register')}
                        className="mt-2 px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] hover:scale-105 active:scale-95"
                        id="criar-conta"  
                    >
                        Criar conta
                    </button>
                </div>
          
                <button
                    onClick={() => navigate('/')}
                    className="mt-2 px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] hover:scale-105 active:scale-95"
                    id="voltar-home"
                >
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
