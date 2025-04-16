import TickersLogo from '../assets/img/tickers.png'
import Lupa from '../assets/img/lupa.png'
import Conta from '../assets/img/account-circle.png'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()

    return (
    <>
        <header className='flex justify-evenly items-center bg-red-900 text-white p-4 h-[100px]'>
        <img className='h-[50px]' src={TickersLogo} />
        <div className='flex items-center gap-2 border border-[#aa692d] rounded-[20px] p-2'>
            <img className='w-[25px] h-[25px]' src={Lupa} />
            <input className='bg-transparent outline-none' type="text" />
        </div>
        <button onClick={() => navigate('/login')} className='flex gap-1 items-center'>
            <img className='w-[35px] h-[35px]' src={Conta} />
            <div className='text-start'>
            <p className='text-white'>Entrar</p>
            <span className='text-[#e7b75c]'>Cadastrar-se</span>
            </div>
        </button>
        </header>
        <main>

        </main>
    </>
    )
}

export default Home
