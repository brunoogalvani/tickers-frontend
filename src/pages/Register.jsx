import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
    email: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    const telefoneLimpo = form.telefone.replace(/\D/g, '')
    const cpfLimpo = form.cpf.replace(/\D/g, '')

    if (!form.email || !form.email.includes('@')) newErrors.email = 'Email é inválido'
    if (form.nome.trim() === '') newErrors.nome = 'Nome é obrigatório'
    if (telefoneLimpo.length < 11) newErrors.telefone = 'Telefone é incompleto'
    if (cpfLimpo.length !== 11) newErrors.cpf = 'CPF é inválido'
    if (form.senha.length < 6) newErrors.senha = 'Senha muito curta'
    if (form.senha !== form.confirmarSenha) newErrors.confirmarSenha = 'As senhas não coincidem'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log('Formulário enviado:', form)

    Swal.fire({
      icon: 'success',
      title: 'Conta criada!',
      text: 'Sua conta foi registrada com sucesso!',
      confirmButtonColor: '#E37C6D',
    })
  }

  const formatTelefone = (telefone) => {
    const cleaned = telefone.replace(/\D/g, '').slice(0, 11)
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
    if (!match) return telefone
    const [, ddd, parte1, parte2] = match
    return [ddd && `(${ddd}`, parte1, parte2 && `-${parte2}`].filter(Boolean).join(' ')
  }

  const inputClass =
    'w-[300px] bg-white/10 backdrop-blur-sm rounded text-white text-sm placeholder-white/65 outline-none px-4 py-2 transition duration-200 focus:ring-2 focus:ring-yellow-300'

  const errorClass = 'text-red-400 font-bold text-sm -mt-2 mb-2 pl-1'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#F5D87F,_#E37C6D)]"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-2 border-2 border-none p-6 bg-gray-800/30 rounded-lg shadow-lg h-auto w-[400px]"
      >
        <p className="text-2xl font-semibold mb-2">Criar Conta</p>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          type="email"
          placeholder="Digite seu e-mail"
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}

        <input
          name="nome"
          value={form.nome}
          onChange={(e) => {
            const nomeLimpo = e.target.value.replace(/[^a-zA-Z\s]/g, '')
            setForm((prev) => ({ ...prev, nome: nomeLimpo }))
            setErrors((prev) => ({ ...prev, nome: '' }))
          }}
          className={inputClass}
          type="text"
          placeholder="Digite seu nome completo"
        />
        {errors.nome && <p className={errorClass}>{errors.nome}</p>}

        <input
          name="telefone"
          value={formatTelefone(form.telefone)}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, '')
            setForm((prev) => ({ ...prev, telefone: raw }))
            setErrors((prev) => ({ ...prev, telefone: '' }))
          }}
          className={inputClass}
          type="text"
          placeholder="Digite seu telefone"
          maxLength={15}
        />
        {errors.telefone && <p className={errorClass}>{errors.telefone}</p>}

        <input
          name="cpf"
          value={form.cpf.replace(/\D/g, '').slice(0, 11)}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, '')
            setForm((prev) => ({ ...prev, cpf: raw }))
            setErrors((prev) => ({ ...prev, cpf: '' }))
          }}
          className={inputClass}
          type="text"
          placeholder="Digite seu CPF"
          maxLength={11}
        />
        {errors.cpf && <p className={errorClass}>{errors.cpf}</p>}

        <input
          name="senha"
          value={form.senha}
          onChange={handleChange}
          className={inputClass}
          type="password"
          placeholder="Digite sua senha"
        />
        {errors.senha && <p className={errorClass}>{errors.senha}</p>}

        <input
          name="confirmarSenha"
          value={form.confirmarSenha}
          onChange={handleChange}
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
          onClick={() => navigate('/Login')}
          className="mt-2 px-4 py-2 bg-white/50 text-black rounded-3xl hover:bg-gray-800 hover:text-white transition w-[300px] hover:scale-105 active:scale-95"
        >
          Voltar
        </button>
      </form>
    </motion.div>
  )
}
