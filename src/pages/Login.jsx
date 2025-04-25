import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ModalLogin from '../components/ModalLogin'

function Login() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <body
                className="min-h-screen text-white flex items-center justify-center
                           bg-[radial-gradient(circle_at_center,_#F5D87F,_#E37C6D)]"
            >
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-2xl font-semibold">Página de Login não Feita</p>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center px-4 py-2 bg-white text-black rounded hover:bg-gray-800 transition"
                    >
                        Voltar para Home
                    </button>

                    <button 
                        className="flex items-center px-4 py-2 bg-white text-black rounded hover:bg-gray-800 transition"
                        id="login"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Abrir Modal
                    </button>
                </div>
            </body>

            <main>
                {isModalOpen && <ModalLogin onClose={() => setIsModalOpen(false)} />}
            </main>
        </>
    )
}

export default Login
