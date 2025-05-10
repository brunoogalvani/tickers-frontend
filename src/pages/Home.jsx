import TickersLogo from '../assets/img/tickers.png'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/modal.jsx'
import { useEffect, useState } from 'react'
import api from '../services/api.js'

function Home() {
  const userID = sessionStorage.getItem('userID')
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    getEventos()
  }, [eventos]);

  async function getEventos() {
    try {
      const response = await api.get('/eventos')
      setEventos(response.data)
    } catch (error) {
      console.error("Erro ao retornar os eventos", error)
    }
  }

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(circle_at_center,_#F5D87F,_#E37C6D)]">
      <header className='flex justify-between   items-center text-white p-4 h-[80px] bg-[#9C554D]/50'>
        <div className='flex justify-between items-center w-[600px]'>
          <img className='h-[50px]' src={TickersLogo} />
          <div className='h-[35px] flex items-center gap-2 border border-[#aa692d] rounded-[15px] p-2 bg-gray-800/30'>
          <svg className="h-[20px] text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>

            <input className='w-[350px] bg-transparent text-gray-300 text-[14px] outline-none' type="text" />
          </div>
        </div>
        <div className='flex justify-evenly items-center w-[600px]'>
          <button className='flex gap-1 items-center rounded-lg hover:bg-gray-800/35 transition px-4 py-2 h-[60px]' id='local' onClick={() => setIsModalOpen(true)}>
          <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
          </svg>

            <div>
              <p className='text-black font-bold'>Seu Local</p>
            </div>
          </button>
          <div className='flex'>
            {
              userID ? null : 
              <button onClick={() => navigate('/login')} className='flex gap-1 items-center rounded-lg hover:bg-gray-800/35 transition px-4 py-2 h-[60px]'>
                <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>

                <div className='text-start'>
                  <p className='text-black font-bold'>Entrar</p>
                  <span className='text-white font-bold'>Cadastrar-se</span>
                </div>
              </button>
            }
          </div>
        </div>
      </header>

      <main>
        <div className='flex flex-wrap justify-start'>
          {eventos.length!==0 ? (
            eventos.map((evento) => (
              <div key={evento.id} className='w-[360px] h-[250px] m-3 bg-[#9C554D]/40 rounded-lg cursor-pointer'>
                <div className='relative'>
                  <img src={evento.imagemCapa} className='rounded-lg rounded-b-none w-[360px] h-[160px]' />
                  <h1 className='absolute top-2 left-2 bg-white/80 text-black font-bold text-xs px-2 py-1 rounded'>{evento.categoria}</h1>
                </div>

                <div className='flex flex-col justify-evenly h-[90px] ml-3'>
                  <h1 className='text-zinc-200 text-[14px]'>{evento.dataInicio}</h1>
                  <h1 className='w-[330px] font-bold truncate'>{evento.titulo}</h1>
                  <h1>{evento.local.nome}, {evento.local.cidade}</h1>
                </div>

              </div>
            ))
          ) : null}
        </div>
      </main>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Home
