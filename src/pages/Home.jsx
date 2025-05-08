import TickersLogo from '../assets/img/tickers.png'
import Lupa from '../assets/img/lupa.png'
import Conta from '../assets/img/account-circle.png'
import { useNavigate } from 'react-router-dom'
import local from '../assets/img/local.png'
import Modal from '../components/modal.jsx'
import { useState } from 'react'

function Home() {
  const userID = sessionStorage.getItem('userID')
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(circle_at_center,_#F5D87F,_#E37C6D)]">
      <header className='flex justify-between   items-center text-white p-4 h-[80px] bg-[#9C554D]/50'>
        <div className='flex justify-between items-center w-[600px]'>
          <img className='h-[50px]' src={TickersLogo} />
          <div className='h-[35px] flex items-center gap-2 border border-[#aa692d] rounded-[15px] p-2 bg-gray-800/30'>
            <img className='h-[15px]' src={Lupa} />
            <input className='w-[350px] bg-transparent text-gray-300 text-[14px] outline-none' type="text" />
          </div>
        </div>
        <div className='flex justify-evenly items-center w-[600px]'>
          <button className='flex gap-1 items-center rounded-lg hover:bg-gray-800/35 transition px-4 py-2 h-[60px]' id='local' onClick={() => setIsModalOpen(true)}>
            <img className='w-[35px] h-[35px]' src={local} />
            <div>
              <p className='text-black font-bold'>Seu Local</p>
            </div>
          </button>
          <div className='flex'>
            {
              userID ? null: 

            <button onClick={() => navigate('/login')} className='flex gap-1 items-center rounded-lg hover:bg-gray-800/35 transition px-4 py-2 h-[60px]'>
                  <img className='w-[35px] h-[35px]' src={Conta} />
              <div className='text-start'>
                  <p className='text-black font-bold'>Entrar</p>
                  <span className='text-white font-bold'>Cadastrar-se</span>
              </div>
              </button>
            }
          
          </div>
        </div>
      </header>

      <main></main>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Home
