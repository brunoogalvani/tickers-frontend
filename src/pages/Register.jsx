import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

export default function Register() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cep, setCep] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  async function registrar(){
    try {
      const response = await api.post('/users', {
        nome,
        telefone,
        cep,
        senha,
        email,
      })
      console.log(response.data)
      Swal.fire({
        icon: 'success',
        title: 'Conta criada!',
        text: 'Sua conta foi registrada com sucesso!',
        confirmButtonColor: '#E37C6D',
      })
    } catch (error) {
      console.error('Erro ao registrar:', error)
      Swal.fire({
        icon: 'error',
        title: 'Erro ao criar conta',
        text: 'Verifique os dados e tente novamente.',
        confirmButtonColor: '#E37C6D',
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    const telefoneLimpo = telefone.replace(/\D/g, '')
    const cepLimpo = cep.replace(/\D/g, '')

    if (!email || !email.includes('@')) newErrors.email = 'Email é inválido'
    if (nome.trim() === '') newErrors.nome = 'Nome é obrigatório'
    if (telefoneLimpo.length < 11) newErrors.telefone = 'Telefone é incompleto'
    if (cepLimpo.length < 8 ) newErrors.cep = 'Cep é inválido'
    if (senha.length < 6) newErrors.senha = 'Senha muito curta'
    if (senha !== confirmarSenha) newErrors.confirmarSenha = 'As senhas não coincidem'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    registrar()

    Swal.fire({
      icon: 'success',
      title: 'Conta criada!',
      text: 'Sua conta foi registrada com sucesso!',
      confirmButtonColor: '#E37C6D',
    })
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

  const inputClass =
    'w-[300px] bg-white/10 backdrop-blur-sm rounded text-white text-sm placeholder-white/65 outline-none px-4 py-2 transition duration-200 focus:ring-2 focus:ring-yellow-300'

  const errorClass = 'text-red-400 font-bold text-sm -mt-2 mb-2 pl-1'

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6}}
      className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#F5D87F,_#E37C6D)]"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-2 border-2 border-none p-6 bg-gray-800/30 rounded-lg shadow-lg h-auto w-[400px]"
      >
        <p className="text-2xl font-semibold mb-2">Criar Conta</p>

        <input
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value); 
            setErrors((prev) => ({ ...prev, email: '' }))
          }}
          className={inputClass}
          type="email"
          placeholder="Digite seu e-mail"
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}

        <input
          name="nome"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value) 
            setErrors((prev) => ({ ...prev, nome: '' }))
          }}
          className={inputClass}
          type="text"
          placeholder="Digite seu nome completo"
        />
        {errors.nome && <p className={errorClass}>{errors.nome}</p>}

        <input
          name="telefone"
          value={formatTelefone(telefone)}
          onChange={(e) => {
            setTelefone(e.target.value)
            setErrors((prev) => ({ ...prev, telefone: '' }))
          }}
          className={inputClass}
          type="text"
          placeholder="Digite seu telefone"
          maxLength={16}
        />
        {errors.telefone && <p className={errorClass}>{errors.telefone}</p>}

        <input
          name="cep"
          value={formatCep(cep)}
          onChange={(e) => {
            setCep(e.target.value)
            setErrors((prev) => ({ ...prev, cep: '' }))
          }}
          className={inputClass}
          type="text"
          placeholder="Digite seu CEP"
          maxLength={11}
        />
        {errors.cep && <p className={errorClass}>{errors.cep}</p>}

        <input
          name="senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value)
            setErrors((prev) => ({ ...prev, senha: '' }))
          }}
          className={inputClass}
          type="password"
          placeholder="Digite sua senha"
        />
        {errors.senha && <p className={errorClass}>{errors.senha}</p>}

        <input
          name="confirmarSenha"
          value={confirmarSenha}
          onChange={(e) => {
            setConfirmarSenha(e.target.value)
            setErrors((prev) => ({ ...prev, confirmarSenha: '' }))
          }}
          className={inputClass}
          type="password"
          placeholder="Confirme sua senha"
        />
        {errors.confirmarSenha && <p className={errorClass}>{errors.confirmarSenha}</p>}

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] hover:scale-105 active:scale-95"
        >
          Criar conta
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-2 px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] hover:scale-105 active:scale-95"
        >
          Voltar
        </button>
      </form>
    </motion.div>
  )
}
