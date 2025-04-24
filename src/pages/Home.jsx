import TickersLogo from '../assets/img/tickers.png'
import Lupa from '../assets/img/lupa.png'
import Conta from '../assets/img/account-circle.png'
import { useNavigate } from 'react-router-dom'
import local from '../assets/img/local.png'
import Modal from '../components/modal.jsx'
import { useState } from 'react'

function Home() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className='flex justify-between items-center bg-red-900 text-white p-4 h-[100px]'>
        <div className='flex justify-between items-center w-[600px]'>
          <img className='h-[50px]' src={TickersLogo} />
          <div className='h-[35px] flex items-center gap-2 border border-[#aa692d] rounded-[15px] p-2 bg-white'>
            <img className='h-[15px]' src={Lupa} />
            <input className='w-[350px] text-black text-[14px] outline-none' type="text" />
          </div>
        </div>
        <div className='flex justify-evenly items-center w-[600px]'>
          <button className='flex items-center' id='local' onClick={() => setIsModalOpen(true)}>
            <img className='w-[35px] h-[35px]' src={local} />
            <div>
              <p className='text-white'>Seu Local</p>
            </div>
          </button>
          <button onClick={() => navigate('/login')} className='flex gap-1 items-center'>
            <img className='w-[35px] h-[35px]' src={Conta} />
            <div className='text-start'>
              <p className='text-white'>Entrar</p>
              <span className='text-[#e7b75c]'>Cadastrar-se</span>
            </div>
          </button>
        </div>
      </header>

      <main></main>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default Home
