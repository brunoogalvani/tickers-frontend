import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'
import { format } from 'date-fns'

export default function RegisterEvent() {
  const navigate = useNavigate()

  const userId = sessionStorage.getItem('userID')
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')
  const [dataInicio, setdataInicio] = useState('')
  const [hora, setHora] = useState('')
  const [dataFim, setdataFim] = useState('')
  const [nomeLocal, setNomeLocal] = useState('')
  const [endereco, setEndereco] = useState('')
  const [numero, setNumero] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [cep, setCep] = useState('')
  const [preco, setPreco] = useState(0)
  const [imagemCapa, setImagemCapa] = useState('')
  const [qtdIngressos, setQtdIngressos] = useState(0)
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

  function formatarData(valor) {

    valor = valor.replace(/\D/g, '');

    if (valor.length > 2 && valor.length <= 4) {
      valor = valor.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    } else if (valor.length > 4) {
      valor = valor.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    }

    return valor;
  }
  
  function formatarHora(valor) {

    valor = valor.replace(/\D/g, '')

    if (valor.length > 2) {
      valor = valor.replace(/(\d{2})(\d{1,2})/, '$1:$2')
    }

    return valor
  }

  function formatarPreco(valor) {
    const numero = parseFloat(valor) || 0

    return numero.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
  }

  function desformatarPreco(valor) {
    return Number(valor.replace(/\D/g, '')) / 100
  }

  const handleSubmit = async (e) => {
    // e.preventDefault()
    // const newErrors = {}

    // if (!titulo.trim()) newErrors.titulo = 'Título é obrigatório'
    // if (!descricao.trim()) newErrors.descricao = 'Descrição é obrigatória'
    // if (!categoria.trim()) newErrors.categoria = 'Categoria é obrigatória'
    // if (!dataInicio) newErrors.dataInicio = 'Data de início é obrigatória'
    // if (!dataFim) newErrors.dataFim = 'Data de fim é obrigatória'
    // if (!nomeLocal.trim()) newErrors.nomeLocal = 'Nome do local é obrigatório'
    // if (!endereco.trim()) newErrors.endereco = 'Endereço é obrigatório'
    // if (!cidade.trim()) newErrors.cidade = 'Cidade é obrigatória'
    // if (!estado.trim()) newErrors.estado = 'Estado é obrigatório'
    // if (cep.replace(/\D/g, '').length < 8) newErrors.cep = 'CEP inválido'
    // if (!preco || preco <= 0) newErrors.preco = 'Preço inválido'
    // if (!qtdIngressos || qtdIngressos <= 0) newErrors.qtdIngressos = 'Quantidade inválida'

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors)
    //   return
    // }

    const enderecoFinal = `${endereco}, ${numero}`

    try {

      const formData = new FormData()

      const localObj = {
        nome: nomeLocal,
        endereco: enderecoFinal,
        cidade,
        estado,
        cep
      }

      formData.append('titulo', titulo)
      formData.append('descricao', descricao)
      formData.append('categoria', categoria)
      formData.append('dataInicio', dataInicio)
      formData.append('horaInicio', hora)
      formData.append('dataFim', dataFim)
      formData.append('local', JSON.stringify(localObj))
      formData.append('preco', preco)
      formData.append('imagemCapa', imagemCapa)
      formData.append('criadoPorId', userId)
      formData.append('qtdIngressos', qtdIngressos)

      await api.post('/eventos', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
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

        <div className="grid grid-cols-5 gap-6 w-full">
          <input className={`${inputClass} col-span-3`} type="text" placeholder="Título do evento" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <select className="w-full col-span-2 cursor-pointer bg-[#606070] text-white text-sm px-4 rounded transition duration-200 focus:ring-2 focus:ring-yellow-300" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Selecione a categoria</option>
            <option value="Música">Música</option>
            <option value="Esporte">Esporte</option>
            <option value="Festival">Festival</option>
            <option value="Moda">Moda</option>
            <option value="Artes">Artes</option>
            <option value="Turismo">Turismo</option>
            <option value="Cultura">Cultura</option>
            <option value="Gastronomia">Gastronomia</option>
            <option value="Entretenimento">Entretenimento</option>
            <option value="Teste">Teste</option>
          </select>
          <textarea className={`${inputClass} col-span-5`} placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          
          <div className='col-span-5 grid grid-cols-3 gap-6 w-full'>  
            <input className={`${inputClass} col-span-1`} type="text" value={dataInicio} onChange={(e) => setdataInicio(formatarData(e.target.value))} placeholder='Data de Início' maxLength={10} />
            <input className={`${inputClass} col-span-1`} type="text" value={hora} onChange={(e) => setHora(formatarHora(e.target.value))} placeholder='Horário de Início' maxLength={5} />
            <input className={`${inputClass} col-span-1`} type="text" value={dataFim} onChange={(e) => setdataFim(formatarData(e.target.value))} placeholder='Data do Fim' maxLength={10} />
          </div>
          
          <div className='col-span-5 grid grid-cols-3 gap-6 w-full'>
            <input className={`${inputClass} col-span-1`} type="text" placeholder="CEP" value={formatCep(cep)} onChange={(e) => setCep(e.target.value)} />
            
            <input className={`${inputClass} col-span-2`} type="text" placeholder="Nome do local" value={nomeLocal} onChange={(e) => setNomeLocal(e.target.value)} />

            <input className={`${inputClass} col-span-2`} type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
            <input className={`${inputClass} col-span-1`} type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
            <input className={inputClass} type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />

            <input className={`${inputClass} col-span-1`} type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
          </div>

          <div className='col-span-5 grid grid-cols-3 gap-6 w-full'>
            <input className={`${inputClass} col-span-1`} type="text" placeholder="Preço (R$)" value={formatarPreco(preco)} onChange={(e) => {const valorNumerico = desformatarPreco(e.target.value); setPreco(valorNumerico)}} />
            <input className={`${inputClass} col-span-1`} type="number" placeholder="Quantidade de Ingressos" value={qtdIngressos} onChange={(e) => setQtdIngressos(e.target.value)} />
            <input className={`${inputClass} col-span-1`} type="file" accept="image/*" onChange={(e) => setImagemCapa(e.target.files[0])} />
          </div>
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