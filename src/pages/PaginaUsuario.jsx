import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function PaginaUsuario() {
  const navigate = useNavigate();
  const userID = sessionStorage.getItem('userID');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userID) {
      navigate('/login');
    } else {
      fetchUserData();
    }
  }, [userID]);

  async function fetchUserData() {
    try {
      const response = await api.get(`/users/${userID}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário', error);
    }
  }

  function logout() {
    sessionStorage.clear();
    navigate('/');
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-gray-900">
        <p>Carregando informações do usuário...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Perfil do Usuário</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400">Nome</label>
            <p className="bg-gray-700 p-2 rounded text-lg">{userData.nome}</p>
          </div>
          <div>
            <label className="block text-gray-400">Email</label>
            <p className="bg-gray-700 p-2 rounded text-lg">{userData.email}</p>
          </div>
          <div>
            <label className="block text-gray-400">Telefone</label>
            <p className="bg-gray-700 p-2 rounded text-lg">{userData.telefone || 'Não informado'}</p>
          </div>
          
          <div>
            <label className="block text-gray-400">Localização</label>
            <p className="bg-gray-700 p-2 rounded text-lg">{userData.localizacao || 'Não informado'}</p>
          </div>
            <div>
                <label className="block text-gray-400">CEP</label>
                <p className="bg-gray-700 p-2 rounded text-lg">{userData.cep || 'Não informado'}</p>
            </div>
            
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => navigate('/editar-usuario')}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
          >
            Editar Conta
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
          >
            Voltar
          </button>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg"
          >
            Sair
          </button>
           
        </div>
      </div>
    </div>
  );
}