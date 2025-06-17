import { useEffect, useState } from 'react'
import api from '../services/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Carrinho() {
    const navigate = useNavigate()
    const userId = sessionStorage.getItem('userID')
    const [carrinho, setCarrinho] = useState([])

    useEffect(() => {
        if (!userId) {
            navigate('/')
        }
        fetchCarrinho()
    }, [])

    async function fetchCarrinho() {
        try {
            const response = await api.get(`/users/${userId}/carrinho`)
            setCarrinho(response.data)
        } catch (error) {
            console.error("Erro ao buscar o carrinho", error)
        }
    }

    async function removerItem(eventoId) {
        Swal.fire({
            title: 'Remover este evento do carrinho?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Remover',
            color: 'white',
            confirmButtonColor: '#a30000',
            background: '#16213e'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/users/${userId}/carrinho/${eventoId}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Item removido!',
                        color: 'white',
                        confirmButtonColor: '#db9d00',
                        background: '#16213e'
                    })
                    fetchCarrinho()
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao remover item',
                        color: 'white',
                        confirmButtonColor: '#db9d00',
                        background: '#16213e'
                    })
                }
            }
        })
    }

    async function finalizarCompra() {
        Swal.fire({
            title: 'Finalizar compra?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Finalizar',
            color: 'white',
            confirmButtonColor: '#28a745',
            background: '#16213e'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.post(`/users/${userId}/finalizar-compra`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Compra finalizada com sucesso!',
                        color: 'white',
                        confirmButtonColor: '#db9d00',
                        background: '#16213e'
                    })
                    navigate('/meus-eventos')
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao finalizar compra',
                        color: 'white',
                        confirmButtonColor: '#db9d00',
                        background: '#16213e'
                    })
                }
            }
        })
    }

    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#1a1a2e,_#16213e)]">
            <div className="w-[1300px] flex flex-col items-center gap-6 p-8 rounded-2xl shadow-lg bg-white/10 backdrop-blur-lg border border-white/20">
                <h1 className="text-3xl font-bold mb-6">Meu Carrinho</h1>

                <div className="flex flex-col items-center gap-4">
                    <div className='h-[510px] overflow-auto pr-4'>
                        {carrinho.length > 0 ? (
                            carrinho.map(item => (
                                <div key={item.id} className='w-[1200px] px-[20px] py-[15px] gap-[20px] bg-white/10 rounded-lg mb-2 flex justify-between items-center'>
                                    <div className="flex gap-[20px]">
                                        <div className='flex relative w-[380px]'>
                                            {item.imagemCapa ? (
                                                <img src={item.imagemCapa} className="rounded-lg w-[380px]" />
                                            ) : (
                                                <div className='w-[380px] h-[220px] rounded-lg bg-[#374151] text-[#9ca3af] flex justify-center items-center text-sm italic'>Sem imagem</div>
                                            )}
                                            <h1 className="absolute top-2 left-2 bg-white/80 text-black font-bold text-xs px-2 py-1 rounded">{item.categoria}</h1>
                                        </div>

                                        <div className='flex flex-col gap-[10px] w-[700px]'>
                                            <h2 className='font-bold text-[24px]'>{item.titulo}</h2>
                                            <p>{item.preco == 0 ? (
                                                "Ingresso Gratuito" 
                                            ) : (
                                                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)
                                            )}</p>
                                            <p className='text-sm'>{item.descricao}</p>
                                        </div>
                                    </div>

                                    <button onClick={() => removerItem(item.id)}>
                                        <svg className="w-8 h-8 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                        </svg>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className='w-[1200px] h-[500px] rounded-lg flex justify-center items-center'>
                                <h1 className='text-3xl'>Seu carrinho está vazio</h1>
                            </div>
                        )}
                    </div>

                    {carrinho.length > 0 && (
                        <button
                            onClick={finalizarCompra}
                            className="flex items-center justify-center border-none px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition w-[300px]">
                            Finalizar Compra
                        </button>
                    )}

                    <button
                        onClick={() => navigate('/eventos')}
                        className="px-6 py-2 bg-white text-black rounded-xl hover:bg-white/70 transition w-[300px]">
                        Voltar aos Eventos
                    </button>
                </div>
            </div>
        </div>
    )
}
