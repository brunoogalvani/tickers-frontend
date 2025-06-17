import { useEffect, useState } from 'react'
import api from '../services/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Eventos() {
    const navigate = useNavigate()
    const userId = sessionStorage.getItem('userID')
    const [eventos, setEventos] = useState([])
    const userRole = sessionStorage.getItem('userRole')
  
    useEffect(() => {
        if(!userId) {
            navigate('/')
        }
        if (userRole !== "admin" && userRole !== "promoter") {
            navigate('/');
        }
    }, [userRole]);

    useEffect(() => {
        getEventosFromUser()
    }, [eventos]);

    async function getEventosFromUser() {
        try {
            const response = await api.get(`/users/${userId}/eventos`)
            setEventos(response.data)
        } catch (error) {
            console.error("Erro ao retornar os eventos", error)
        }
    }

    async function deleteEvento(eventoId) {
        if (eventoId) {
            Swal.fire({
                title: 'Deseja excluir este evento?',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Excluir',
                color: 'white',
                confirmButtonColor: '#a30000',
                background: '#16213e'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.delete(`/eventos/${eventoId}`)
                            Swal.fire({
                                icon: 'success',
                                title: 'Evento excluído com sucesso!',
                                color: 'white',
                                confirmButtonColor: '#db9d00',
                                background: '#16213e'
                            })     
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro ao excluir evento',
                            color: 'white',
                            confirmButtonColor: '#db9d00',
                            background: '#16213e'
                        })
                    }
                }
            })
        }
    }

    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#1a1a2e,_#16213e)]">
            <div className="w-[1300px] flex flex-col items-center gap-6 p-8 rounded-2xl shadow-lg bg-white/10 backdrop-blur-lg border border-white/20">
                <h1 className="text-3xl font-bold mb-6">Meus Eventos</h1>
        
                <div className="flex flex-col items-center gap-4">
                    <div className='h-[510px] overflow-auto pr-4'>
                        {eventos.length>0 ? (
                            eventos.map(evento => (
                                <div key={evento.id} className='w-[1200px] px-[20px] py-[15px] gap-[20px] bg-white/10 rounded-lg mb-2 last:mb-0 flex justify-between items-center'>
                                    <div className="flex gap-[20px]">
                                        <div className='flex relative w-[380px]'>
                                            {evento.imagemCapa ? (
                                                <img src={evento.imagemCapa} className="rounded-lg w-[380px]" />
                                            ) : (
                                                <div className='w-[380px] h-[220px] rounded-lg bg-[#374151] text-[#9ca3af] flex justify-center items-center text-sm italic'>Sem imagem</div>
                                            )}
                                            <h1 className="absolute top-2 left-2 bg-white/80 text-black font-bold text-xs px-2 py-1 rounded">{evento.categoria}</h1>
                                        </div>

                                        <div className='flex flex-col gap-[30px] w-[700px]'>
                                            <div className='flex flex-col gap-[5px]'>
                                                <h2 className='font-bold text-[28px]'>{evento.titulo}</h2>
                                                <p>
                                                    {evento.dataFim ? (
                                                        `${evento.horaInicio} ${evento.dataInicio} - ${evento.dataFim}`
                                                    ) : (
                                                        `${evento.horaInicio} ${evento.dataInicio}`
                                                    )}
                                                </p>
                                                <p className='text-base'>{evento.descricao}</p>
                                                <p>{evento.preco==0 ? (
                                                    "Ingresso Gratuito" 
                                                ) : (
                                                    Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(evento.preco)
                                                )}</p>
                                            </div>
                                            <div className='flex flex-col'>
                                                {evento.local ? (
                                                    <>
                                                        <p><strong>Local:</strong> {evento.local.nome}</p>
                                                        <p><strong>Endereço:</strong> {evento.local.endereco}, {evento.local.cidade} - {evento.local.estado}, {evento.local.cep}</p>
                                                    </>
                                                ) : (
                                                    <p>Local não informado.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteEvento(evento.id)}>
                                        <svg className="w-8 h-8 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                        </svg>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className='w-[1200px] h-[500px] rounded-lg mb-2 last:mb-0 flex justify-center items-center'>
                                <h1 className='text-3xl'>Você não possui nenhum evento</h1>
                            </div>
                        )}
                    </div>
                    <button
                        type='button'
                        onClick={() => navigate('/promoter')}
                        className="flex flex-col items-center space-y-6 border-2 border-none px-6 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-600 transition w-[300px]">
                        Criar Evento
                    </button>
            
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-white text-black rounded-xl hover:bg-white/70 transition
                        w-[300px]">
                        Voltar
                    </button>
                </div>
            </div> 
        </div>

    )
}