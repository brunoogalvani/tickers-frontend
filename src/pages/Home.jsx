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

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);  
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

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

    async function getEventos() {
      try {
        const response = await api.get('/eventos')
        setEventos(response.data.filter(evento => evento.status === 'ativo'))
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
  <div className="min-h-screen bg-light-background text-light-text-main">

<header className={`fixed top-0 left-0 right-0 z-50 flex  items-center h-[60px] px-8 bg-black backdrop-blur-sm shadow-lg shadow-light-secondary/30 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>

    
  <img className='h-40 -ml-3' src={TickersLogo} alt="Logotipo Tickers" />
  
      <div className='flex justify-start items-center gap-8 ml-[200]'>
        
        <div className='h-[40px] w-[450px] flex justify-start  items-center gap-2 border-gray-200 rounded-lg p-2 bg-gray-200/40 focus-within:ring-2 focus-within:ring-light-primary'>
          <svg className="h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
          <input className='w-[350px] bg-transparent text-white text-[16px] outline-none' type="text" onChange={(e) => setBusca(e.target.value.toLowerCase())} />
        </div>


        
      </div>

      <div className='flex justify-evenly items-center ml-[620px] w-[350px] gap-1'>
          <div className="flex items-center w-[150px] group ml-4">
          <div className="relative">
            <select
              name="categoria"
              className="cursor-pointer block appearance-none w-full bg-white border-gray-200 text-light-main py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-light-primary"
              defaultValue=""
              onChange={(e) => {
                setCategoriaSelecionada(e.target.value);
                
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

            
            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 transition-transform duration-300 ${isRotated ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      
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
          
    {imagensCapa.length > 0 && <Carousel eventos={eventos} />}

    <main>
      <div className="p-10 mx-auto max-w-screen-xl">
        {Object.entries(eventosAgrupadosPorEstado).map(([estado, eventosEstado]) => (
          <section key={estado} className="mb-10">
            <h2 className="text-gray-900 text-2xl font-bold mb-4">Eventos {nomesEstados [estado] || estado}</h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {eventosEstado.map(evento => (
                <div key={evento.id}  onClick={() => navigate(`/evento/${evento.id}`)} style={{cursor: 'pointer'}} className="
                bg-transparent shadow-xl shadow-black-500/20 rounded-lg text-black/90 cursor-pointer hover:scale-[103%] duration-150 overflow-hidden flex flex-col">
                  <div className="relative flex-shrink-0">
                    <img src={evento.imagemCapa} className="rounded-lg  rounded-b-none w-full h-[160px] object-cover rounded-t-lg" />
                    <h1 className="absolute top-2 left-2 bg-white/80 text-black font-bold text-xs px-2 py-1 rounded">{evento.categoria}</h1>
                  </div>

                  <div className="flex flex-col gap-1 p-3 flex-1">
                    <h1 className="text-zinc-900 text-[14px]">{evento.dataInicio}</h1>
                    <h1 className="font-bold truncate">{evento.titulo}</h1>
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
