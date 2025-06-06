import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../services/api'
import ModalUser from '../components/ModalUser'

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  const navigate = useNavigate()
  const userId = sessionStorage.getItem('userID')
  const userRole = sessionStorage.getItem('userRole')

  useEffect(() => {
    if (userRole !== "admin") {
      navigate('/');
    }
  }, [userRole]);

  useEffect(() => {
    listarUsuários()
  }, [usuarios]);

  async function listarUsuários() {
   try {
        const response = await api.get('/users')
        setUsuarios(response.data)
      } catch (error) {
        console.error("Erro ao retornar os Usuários", error)
      } 
    
  }

  async function excluirUsuario(id) {
    if (id) {
      try {
        await api.delete(`/users/${id}`)
        Swal.fire('Usuário excluído com sucesso!', '', 'success')
      } catch (error) {
        Swal.fire('Erro ao excluir usuário', '', 'error')
      }
    }
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#1a1a2e,_#16213e)]">
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl shadow-lg w-[500px] bg-white/10 backdrop-blur-lg border border-white/20">
        <h1 className="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>

        <div className="flex flex-col items-center gap-4">
          <div className='h-[250px] w-[450px] overflow-auto p-2'>
            {usuarios.map(usuario => (
              <div key={usuario.id} className='bg-white/10 mb-2 p-[10px] rounded-xl ring-1 ring-yellow-300 last:mb-0 flex justify-between items-center'>
                <div className='flex flex-col'>
                  <h1><strong>Nome: </strong>{usuario.nome}</h1>
                  <h1><strong>Email: </strong>{usuario.email}</h1>
                  <h1><strong>Cargo: </strong>{usuario.role}</h1>
                </div>

                {usuario.id.toString()===userId ? null : (
                  <button onClick={() => excluirUsuario(usuario.id)}>
                    <svg className="w-8 h-8 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center space-y-6 border-2 border-none px-6 py-2 bg-gray-500/30 rounded-xl shadow-lg w-[300px]">
            Criar Usuário
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-white text-black rounded-xl hover:bg-gray-800 hover:text-white transition
             w-[300px]">
            Voltar
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ModalUser onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
