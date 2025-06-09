import { useState } from "react"
import api from '../services/api'
import Swal from 'sweetalert2'

export default function ModalUser({ onClose }) {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cep, setCep] = useState('')
  const [role, setRole] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')


  async function criarUsuario(){
    try {
      await api.post('/users', {
        nome,
        telefone,
        cep,
        role,
        senha,
        email,
      })
      
      Swal.fire({
        icon: 'success',
        title: 'Conta criada!',
        text: 'Usuário registrado com sucesso!',
        color: 'white',
        confirmButtonColor: '#db9d00',
        background: '#16213e'
      })

    } catch (error) {
      console.error('Erro ao registrar:', error)
      Swal.fire({
        icon: 'error',
        title: 'Erro ao criar conta',
        text: 'Verifique os dados e tente novamente.',
        color: 'white',
        confirmButtonColor: '#db9d00',
        background: '#16213e'
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    criarUsuario()
  }

  const formatCep = (cep) => {
    const cepClean = cep.replace(/\D/g, '').slice(0, 8)
    const cepMatch = cepClean.match(/^(\d{0,5})(\d{0,3})$/)
    if (!cepMatch) return cep
    const [, part1, part2] = cepMatch
    const formatted = []
    if (part1){
      formatted.push(part2 ? `${part1}-${part2}`: part1)
    }
    return formatted
  }

  const formatTelefone = (telefone) => {
    const cleaned = telefone.replace(/\D/g, '').slice(0, 11)
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
    if (!match) return telefone
    const [, ddd, parte1, parte2] = match
    const formatted = []
    if (parte2) return `(${ddd}) ${parte1}-${parte2}`
    if (parte1) return `(${ddd}) ${parte1}`
    if (ddd) return `(${ddd}`
    return ''
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSubmit();
    }
  }

  const inputClass =
    'w-[300px] bg-white/20 backdrop-blur-sm rounded text-white text-sm placeholder-white/65 outline-none px-4 py-2 transition duration-200 focus:ring-2 focus:ring-yellow-300'


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-center bg-black bg-opacity-50">
      <div className="bg-[#1c1d3f] rounded-xl p-6 max-w-md w-full relative">
        <h1 className="text-white font-bold text-3xl">Criar Usuário</h1>
        <form
        onKeyDown={handleKeyPress}
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2 border-2 border-none p-6 rounded-2xl h-auto w-[400px]"
      >

        <input
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value); 
          }}
          className={inputClass}
          type="email"
          placeholder="Digite seu e-mail"
        />

        <input
          name="nome"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value) 
          }}
          className={inputClass}
          type="text"
          placeholder="Digite seu nome completo"
        />

        <input
          name="telefone"
          value={formatTelefone(telefone)}
          onChange={(e) => {
            setTelefone(e.target.value)
          }}
          className={inputClass}
          type="text"
          placeholder="Digite seu telefone"
          maxLength={16}
        />

        <select className="w-[300px] h-[35px] cursor-pointer bg-[#4d4d61] text-white text-sm px-4 rounded transition duration-200 focus:ring-2 focus:ring-yellow-300" value={role} onChange={(e) => setRole(e.target.value)} defaultValue=''>
          <option value="" disabled hidden>Cargo do Usuário</option>
          <option value="user">USER</option>
          <option value="admin">ADMIN</option>
          <option value="promoter">PROMOTER</option>
        </select>

        <input
          name="cep"
          value={formatCep(cep)}
          onChange={(e) => {
            setCep(e.target.value)
          }}
          className={inputClass}
          type="text"
          placeholder="Digite seu CEP"
          maxLength={11}
        />

        <input
          name="senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value)
          }}
          className={inputClass}
          type="password"
          placeholder="Digite sua senha"
        />

        <button type="submit" className="mt-4 px-4 py-2 text-black bg-yellow-400 rounded-xl hover:bg-yellow-600 transition w-[250px]">Criar conta</button>
      </form>
        <button
          onClick={onClose}
          className="w-[250px] px-6 py-2 bg-white text-black rounded-xl hover:bg-white/70 transition"
            >
          Fechar
        </button>
      </div>
    </div>
  );
}
  