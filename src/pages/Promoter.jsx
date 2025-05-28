import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

export default function RegisterEvent() {
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [nomeLocal, setNomeLocal] = useState('')
  const [endereco, setEndereco] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [cep, setCep] = useState('')
  const [preco, setPreco] = useState('')
  const [imagemCapa, setImagemCapa] = useState('')
  const [errors, setErrors] = useState({})

  function formatCep(cep) {
    const cepClean = cep.replace(/\D/g, '').slice(0, 8)
    const cepMatch = cepClean.match(/^(\d{0,5})(\d{0,3})$/)
    if (!cepMatch) return cep
    const [, part1, part2] = cepMatch
    const formatted = []
    if (part1) {
      formatted.push(part2 ? `${part1}-${part2}` : part1)
    }
    return formatted.join('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!titulo.trim()) newErrors.titulo = 'Título é obrigatório'
    if (!descricao.trim()) newErrors.descricao = 'Descrição é obrigatória'
    if (!dataInicio) newErrors.dataInicio = 'Data de início é obrigatória'
    if (!dataFim) newErrors.dataFim = 'Data de fim é obrigatória'
    if (!nomeLocal.trim()) newErrors.nomeLocal = 'Nome do local é obrigatório'
    if (!endereco.trim()) newErrors.endereco = 'Endereço é obrigatório'
    if (!cidade.trim()) newErrors.cidade = 'Cidade é obrigatória'
    if (!estado.trim()) newErrors.estado = 'Estado é obrigatório'
    if (cep.replace(/\D/g, '').length < 8) newErrors.cep = 'CEP inválido'
    if (!preco.trim() || isNaN(preco)) newErrors.preco = 'Preço inválido'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {

    const formData = new FormData()

    formData.append('titulo', titulo)
    formData.append('descricao', descricao)
    formData.append('dataInicio', dataInicio)
    formData.append('dataFim', dataFim)
    formData.append('local[nome]', nomeLocal)
    formData.append('local[endereco]', endereco)
    formData.append('local[cidade]', cidade)
    formData.append('local[estado]', estado)
    formData.append('local[cep]', cep)
    formData.append('preco', preco)
    formData.append('imagemCapa', imagemCapa) 

      await api.post('/eventos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
       
        }),
        
      

      Swal.fire({
        icon: 'success',
        title: 'Evento criado!',
        text: 'Seu evento foi registrado com sucesso!',
        confirmButtonColor: '#E37C6D',
      }).then(() => {
        navigate('/')
      })
    } catch (error) {
      console.error('Erro ao registrar evento:', error)
      Swal.fire({
        icon: 'error',
        title: 'Erro ao criar evento',
        text: 'Verifique os dados e tente novamente.',
        confirmButtonColor: '#E37C6D',
      })
    }
  }

  const inputClass =
    'w-full bg-white/10 backdrop-blur-md rounded text-white text-sm placeholder-white/65 outline-none px-4 py-2 transition duration-200 focus:ring-2 focus:ring-yellow-300'

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen text-white flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#1a1a2e,_#16213e)]"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-6 p-8 rounded-2xl shadow-lg w-[1000px] bg-white/10 backdrop-blur-lg border border-white/20"
      >
        <p className="text-2xl font-semibold mb-2">Criar Evento</p>

        <div className="grid grid-cols-2 gap-6 w-full">
          <input className={inputClass} type="text" placeholder="Título do evento" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <input className={inputClass} type="text" placeholder="Nome do local" value={nomeLocal} onChange={(e) => setNomeLocal(e.target.value)} />

          <textarea className={`${inputClass} col-span-2`} placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

          <input className={inputClass} type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          <input className={inputClass} type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />

          <input className={inputClass} type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          <input className={inputClass} type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />

          <input className={inputClass} type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
          <input className={inputClass} type="text" placeholder="CEP" value={formatCep(cep)} onChange={(e) => setCep(e.target.value)} />

          <input className={inputClass} type="number" placeholder="Preço (R$)" value={preco} onChange={(e) => setPreco(e.target.value)} />

          <input className={inputClass} type="file" accept="image/*" onChange={(e) => setImagemCapa(e.target.files[0])} />

        </div>


        <div className="flex gap-4 mt-6">
          <button type="submit" className="px-6 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition">
            Publicar Evento
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-white text-black rounded-xl hover:bg-gray-800 hover:text-white transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </motion.div>
  )
}