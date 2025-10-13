  import TickersLogo from '../assets/img/tickers.png'
  import { useNavigate } from 'react-router-dom'
  import Modal from '../components/Modal.jsx'
  import { useEffect, useRef, useState } from 'react'
  import api from '../services/api.js'
  import Carousel from '../components/Carousel.jsx'
  import ModalEventos from '../components/ModalEventos.jsx'
 

  function Home() {
     const [modalOpen, setModalOpen] = useState(false);
      const [eventoSelecionado, setEventoSelecionado] = useState(null);

      const abrirModal = (evento) => {
        setEventoSelecionado(evento);
        setModalOpen(true);
      };

      const fecharModal = () => {
        setModalOpen(false);
        setEventoSelecionado(null);
      };

    const userRole = sessionStorage.getItem('userRole')
    const userID = sessionStorage.getItem('userID')
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [eventos, setEventos] = useState([])
    const imagensCapa = eventos.map((evento) => evento.imagemCapa)
    const [username, setUsername] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownContainerRef = useRef()
    const dropdownRef = useRef()
    const [busca, setBusca] = useState('')
    const [eventosFiltrados, setEventosFiltrados] = useState([])
    const [isRotated, setIsRotated] = useState(false)
    const [categorias, setCategorias] = useState([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('')

    const nomesEstados = {
      "AC": "no Acre",
      "AL": "em Alagoas",
      "AP": "no Amapá",
      "AM": "no Amazonas",
      "BA": "na Bahia",
      "CE": "no Ceará",
      "DF": "no Distrito Federal",
      "ES": "em Espírito Santo",
      "GO": "em Goiás",
      "MA": "no Maranhão",
      "MT": "no Mato Grosso",
      "MS": "no Mato Grosso do Sul",
      "MG": "em Minas Gerais",
      "PA": "no Pará",
      "PB": "em Paraíba",
      "PR": "no Paraná",
      "PE": "em Pernambuco",
      "PI": "no Piauí",
      "RJ": "no Rio de Janeiro",
      "RN": "no Rio Grande do Norte",
      "RS": "no Rio Grande do Sul",
      "RO": "em Rondônia",
      "RR": "em Roraima",
      "SC": "em Santa Catarina",
      "SP": "em São Paulo",
      "SE": "em Sergipe",
      "TO": "em Tocantins"
    };



    const eventosAgrupadosPorEstado = eventosFiltrados.reduce((acc, evento) => {
      const estado = evento.local.estado;  
      if (!acc[estado]) acc[estado] = [];
      acc[estado].push(evento);
      return acc;
    }, {});


    useEffect(() => {
      const filtrados = eventos.filter(evento => evento.titulo.toLowerCase().includes(busca) && (categoriaSelecionada === '' || evento.categoria === categoriaSelecionada))
      setEventosFiltrados(filtrados)
    }, [busca, eventos, categoriaSelecionada]);

    useEffect(() => {
      const categoriasUnicas = [...new Set(eventos.map(evento => evento.categoria))]
      setCategorias(categoriasUnicas)
    }, [eventos]);

    useEffect(() => {
      getEventos()
    }, []);

    useEffect(() => {
      getUser()
    }, [userID]);

    useEffect(() => {
      function handleOutClick(e) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !dropdownContainerRef.current.contains(e.target)) {
          setIsDropdownOpen(false)
        }
      }

      document.addEventListener('mousedown', handleOutClick)
      
      return () => {
        document.removeEventListener('mousedown', handleOutClick)
      }
    }, []);

    async function getEventos() {
      try {
        const response = await api.get('/eventos')
        setEventos(response.data)
      } catch (error) {
        console.error("Erro ao retornar os eventos", error)
      }
    }

    async function getUser() {
      if (!userID) return
      try {
        const response = await api.get(`/users/${userID}`)
        setUsername(response.data.nome)
       
      } catch (error) {
        console.error("Erro ao retornar usuário", error)
      }
    }

    function toggleDropdown() {
      setIsDropdownOpen(!isDropdownOpen)
    }

    function logout() {
      navigate('/')
      sessionStorage.setItem('userID', '')
      sessionStorage.setItem('userRole', '')
    }

    return (
  <div className="min-h-screen text-white bg-[radial-gradient(circle_at_center,_#1a1a2e,_#16213e)]">
    <header className='flex justify-between items-center text-white p-4 h-[80px] bg-gray-500/70  shadow-lg shadow-black/30'>
      <div className='flex justify-between items-center w-[750px]'>
        <img className='h-[50px]' src={TickersLogo} />
        <div className='h-[35px] flex items-center gap-2 border border-transparent rounded-[15px] p-2 bg-gray-800/30'>
          <svg className="h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
          <input className='w-[350px] bg-transparent text-gray-300 text-[14px] outline-none' type="text" onChange={(e) => setBusca(e.target.value.toLowerCase())} />
        </div>
        <div className="relative w-[150px] group">
          <div className="relative">
            <select
              name="categoria"
              className="cursor-pointer block appearance-none w-[150px] bg-gray-600 text-white py-3 px-4 pr-10 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
              onChange={(e) => {
                setCategoriaSelecionada(e.target.value);
                // Aguarda o menu fechar para reverter a rotação
                setTimeout(() => setIsRotated(false), 150);
              }}
              onFocus={() => setIsRotated(true)}
              onBlur={() => setIsRotated(false)}
            >
              <option value="">Categorias</option>
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria}>{categoria}</option>
              ))}
            </select>

            {/* Ícone da seta */}
            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 transition-transform duration-300 ${isRotated ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-evenly items-center w-[350px]'>
        
      
        <div className='flex'>
          {
            userID ? (
              <div className='relative' ref={dropdownContainerRef}>
                <button onClick={toggleDropdown} className='flex gap-1 items-center rounded-lg hover:bg-gray-800/35 transition px-4 py-2 h-[60px]'>
                  <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
                  <div className='text-start'>
                    <p className='text-black font-bold'>Bem-vindo!</p>
                    <span className='text-white font-bold'>{username}</span>
                  </div>
                </button>
                {
                  isDropdownOpen ? (
                    <div className='absolute bg-gray-600 flex flex-col inset-x-0 items-start z-50 rounded-xl' ref={dropdownRef}>
                      {userRole=="admin" ? (
                        <button onClick={() => navigate('/admin')} className='hover:bg-black/20 transition w-full px-4 py-3 text-left rounded-t-xl'>Área do Admin</button>
                      ) : null}
                      {userRole=="admin"||userRole=="promoter" ? (
                        <button onClick={() => navigate('/eventos')} className='hover:bg-black/20 transition w-full px-4 py-3 text-left'>Meus eventos</button>
                      ) : null}
                      <button onClick={() => navigate('/pagina-usuario')} className='hover:bg-black/20 transition w-full px-4 py-3 text-left'>Editar conta</button>
                      <button onClick={logout} className='hover:bg-black/20 w-full px-4 py-3 text-left rounded-b-xl'>Sair</button>
                    </div>
                  ) : null
                }
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className='flex gap-1 items-center rounded-lg hover:bg-gray-800/35 transition px-4 py-2 h-[60px]'>
                <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
                <div className='text-start'>
                  <p className='text-gray-300 font-bold'>Entrar</p>
                  <span className='text-black font-bold'>Cadastrar-se</span>
                </div>
              </button>
            )
          }
        </div>
        <button onClick={() => navigate("/Carrinho")} className='hover:opacity-75 transition'>
          <svg className="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
          </svg>
        </button>
      </div>
    </header>
          
    {imagensCapa.length > 0 && <Carousel imagens={imagensCapa} titulo={eventos.titulo} />}

    <main>
      <div className="p-10 mx-auto max-w-screen-xl">
        {Object.entries(eventosAgrupadosPorEstado).map(([estado, eventosEstado]) => (
          <section key={estado} className="mb-10">
            <h2 className="text-white text-2xl font-bold mb-4">Eventos {nomesEstados [estado] || estado}</h2>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))' }}
            >
              {eventosEstado.map(evento => (
                <div key={evento.id}  onClick={() => navigate(`/evento/${evento.id}`)} style={{cursor: 'pointer'}} className="w-[360px] h-[250px] bg-gray-400/30 rounded-lg cursor-pointer hover:scale-[103%] duration-150">
                  <div className="relative">
                    <img src={evento.imagemCapa} className="rounded-lg rounded-b-none w-[360px] h-[160px]" />
                    <h1 className="absolute top-2 left-2 bg-white/80 text-black font-bold text-xs px-2 py-1 rounded">{evento.categoria}</h1>
                  </div>

                  <div className="flex flex-col justify-evenly h-[90px] ml-3">
                    <h1 className="text-zinc-200 text-[14px]">{evento.dataInicio}</h1>
                    <h1 className="w-[330px] font-bold truncate">{evento.titulo}</h1>
                    <h1>{evento.local.nome}, {evento.local.cidade}</h1>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>

   
  </div>
  )
}

export default Home
