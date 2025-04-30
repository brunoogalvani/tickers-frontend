import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


function Register() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#F5D87F,_#E37C6D)]">
            <div className="flex flex-col items-center space-y-6 border-2 border-none p-6 bg-gray-800/30 rounded-lg shadow-lg h-[570px] w-[400px]">
                <p className="text-2xl font-semibold">Criar Conta</p>
                <input
                    className="w-[300px] bg-white/10 backdrop-blur-sm rounded text-white-300 text-[14px] placeholder-white/65 outline-none px-4 py-2"
                    type="text"
                    placeholder="Digite seu e-mail ou Usuário"
                />
                <input
                    className="w-[300px] bg-white/10 backdrop-blur-sm rounded text-white-300 text-[14px] placeholder-white/65 outline-none px-4 py-2"
                    type="text"
                    placeholder="Digite seu nome completo"
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      }}

                />
                    <input
                    className="w-[300px] bg-white/10 backdrop-blur-sm rounded text-white-300 text-[14px] placeholder-white/65 outline-none px-4 py-2"
                    type="text"
                    placeholder="Digite seu telefone"
                    maxLength={15}
                    onInput={(e) => {
                        let value = e.target.value.replace(/\D/g, ''); 
                        value = value.slice(0, 11); 

                        if (value.length >= 1) {
                        value = '(' + value;
                        }
                        if (value.length >= 3) {
                        value = value.slice(0, 3) + ') ' + value.slice(3);
                        }
                        if (value.length >= 10) {
                        value = value.slice(0, 10) + '-' + value.slice(10);
                        }

                        e.target.value = value;
                    }}
                    />
                <input
                    className="w-[300px] bg-white/10 backdrop-blur-sm rounded text-white-300 text-[14px] placeholder-white/65 outline-none px-4 py-2"
                    type="text"
                    placeholder="Digite seu CPF"
                    maxLength={11}
                    onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                />


                <input

                    className="w-[300px] bg-white/10 backdrop-blur-sm rounded text-white-300 text-[14px] placeholder-white/65 outline-none px-4 py-2"
                    type="password"
                    placeholder="Digite sua senha"
                />
                <input
                    className="w-[300px] bg-white/10 backdrop-blur-sm rounded text-white-300 text-[14px] placeholder-white/65 outline-none px-4 py-2"
                    type="password"
                    placeholder="Confirme sua senha"    
                />
                <button

                        className="flex items-center justify-center px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] transform translate-x-[0px] translate-y-[-3px]"
                        id="criar-conta"
                        
                    >
                        Criar conta
                    </button>

                    <button onClick={() => navigate('/Login')}

                        className="flex items-center justify-center px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] transform translate-x-[0px] translate-y-[-3px]"
                        id="voltar-register"

                        >
                        Voltar
                        </button> 
            </div>
        </div>
    )
}

export default Register