import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../services/api'
import ModalLogin from '../components/ModalLogin'

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  async function criarUsuario() {
    const { value: formValues } = await Swal.fire({
      title: 'Criar novo usuário',
      html:
        '<input id="swal-email" class="swal2-input" placeholder="Email">' +
        '<input id="swal-senha" class="swal2-input" placeholder="Senha" type="password">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          email: document.getElementById('swal-email').value,
          senha: document.getElementById('swal-senha').value,
        }
      },
    })

    if (formValues) {
      try {
        await api.post('/usuarios', {
          email: formValues.email,
          senha: formValues.senha,
        })
        Swal.fire('Usuário criado com sucesso!', '', 'success')
      } catch (error) {
        Swal.fire('Erro ao criar usuário', '', 'error')
      }
    }
  }

  async function excluirUsuario() {
    const { value: email } = await Swal.fire({
      title: 'Excluir usuário',
      input: 'email',
      inputLabel: 'Digite o e-mail do usuário',
    })

    if (email) {
      try {
        await api.delete(`/usuarios/${email}`)
        Swal.fire('Usuário excluído com sucesso!', '', 'success')
      } catch (error) {
        Swal.fire('Erro ao excluir usuário', '', 'error')
      }
    }
  }

  async function criarEvento() {
    const { value: titulo } = await Swal.fire({
      title: 'Criar novo evento',
      input: 'text',
      inputLabel: 'Título do evento',
      inputPlaceholder: 'Digite o nome do evento',
    })

    if (titulo) {
      try {
        await api.post('/eventos', { titulo })
        Swal.fire('Evento criado com sucesso!', '', 'success')
      } catch (error) {
        Swal.fire('Erro ao criar evento', '', 'error')
      }
    }
  }

  function logout() {
    sessionStorage.removeItem('userID')
    navigate('/Admin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-950 text-white flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Painel do Administrador</h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={criarUsuario}
            className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition"
          >
            Criar Usuário
          </button>

          <button
            onClick={excluirUsuario}
            className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition"
          >
            Excluir Usuário
          </button>

          <button
            onClick={criarEvento}
            className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition"
          >
            Criar Evento
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded transition"
          >
            Sair
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ModalLogin onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
