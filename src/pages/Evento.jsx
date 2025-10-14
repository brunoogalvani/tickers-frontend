import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../services/api.js'
import { id } from "date-fns/locale";
import { useNavigate } from 'react-router-dom'

export default function Evento() {
  const { idEvento } = useParams();
  const [evento, setEvento] = useState(null);
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getEvento();
  }, [idEvento]);

  useEffect(() => {
    getCreator(userId);
  }, [evento]);
  
  async function getEvento() {
    try {
      const response = await api.get(`/eventos/${idEvento}`)
      setEvento(response.data)
      setUserId(response.data.criadoPorId)
    } catch (error) {
      console.error("Erro ao encontrar o evento", error)
    }
  }
  
  async function getCreator(id) {
    try {
      const user = await api.get(`/users/${id}`)
      setUser(user.data)
    } catch (error) {
      console.error("Erro ao encontrar o usuário", error)
    }
  }

 if (!evento) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Carregando evento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      
      <div className="relative h-96 overflow-hidden">
        <img 
          src={evento.imagemCapa} 
          alt={evento.titulo} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
      
        <div className="absolute top-6 right-6 flex gap-3">
          
          
        </div>
      </div>


      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          
          <div className="border-b pb-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
                  {evento.categoria}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {evento.titulo}
                </h1>
                <p className="text-gray-600">Por {user?.nome}</p> 
              </div>
            </div>
          </div>

         
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="bg-purple-100 p-3 rounded-lg text-2xl">
                📅
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Data</p>
                <p className="text-lg font-semibold text-gray-900">{evento.dataInicio}</p>
                <p className="text-sm text-gray-600">{evento.horario}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="bg-blue-100 p-3 rounded-lg text-2xl">
                📍
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Local</p>
                <p className="text-lg font-semibold text-gray-900">{evento.local.nome}</p>
                <p className="text-sm text-gray-600">{evento.local.endereco}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="bg-green-100 p-3 rounded-lg text-2xl">
                👥
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Ingressos Disponíveis</p>
                <p className="text-lg font-semibold text-gray-900">{evento.ingressosDisponiveis} lugares</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="bg-orange-100 p-3 rounded-lg text-2xl">
                💰
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Valor do Ingresso</p>
                <p className="text-lg font-semibold text-gray-900">{evento.preco}</p>
              </div>
            </div>
          </div>

         
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Evento</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {evento.descricao}
            </p>
          </div>

          
          <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => navigate('/')} className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105">              🎟️ Comprar Ingresso
            </button>
            <button className="sm:w-auto px-8 border-2 border-gray-300 hover:border-purple-600 text-gray-700 hover:text-purple-600 font-semibold py-4 rounded-xl transition-all">
              ℹ️ Mais Informações
            </button>
          </div>
        </div>
      </div>

      
      <div className="h-20"></div>
    </div>
  );
}