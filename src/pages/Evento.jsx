import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../services/api.js'

export default function Evento() {
  const { idEvento } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    getEvento();
  }, [idEvento]);

  async function getEvento() {
      try {
        const response = await api.get(`/eventos/${idEvento}`)
        setEvento(response.data)
      } catch (error) {
        console.error("Erro ao encontrar o evento", error)
      }
    }

  if (!evento) return <p>Carregando...</p>;

  return (
    <div className="evento-detalhes">
      <img src={evento.imagemCapa} alt={evento.titulo} />
      <h1>{evento.titulo}</h1>
      <p><strong>Data:</strong> {evento.dataInicio}</p>
      <p><strong>Local:</strong> {evento.local.nome}</p>
      <p><strong>Descrição:</strong> {evento.descricao}</p>
    </div>
  );
}

