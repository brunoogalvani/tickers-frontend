import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function PaginaUsuario() {
  const [nome, setNome] = useState('');
  const [nomeAtualizado, setNomeAtualizado] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [cep, setCep] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    if (isEditing && userID) {
      async function getUser() {
        try {
          const response = await api.get(`/users/${userID}`);
          const { nome, email, telefone, localizacao, cep } = response.data;
          setNome(nome);
          setEmail(email);
          setTelefone(telefone || '');
          setLocalizacao(localizacao || '');
          setCep(cep || '');
        } catch (error) {
          console.error('Erro ao buscar dados do usuário', error);
        }
      }

      getUser();
    }
  }, [isEditing, userID]);

  async function fetchUserData() {
    try {
      const response = await api.get(`/users/${userID}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário', error);
    }
  }

  async function userUpdate() {
    try {
      if (!nome || !email) {
        alert('Nome e email são obrigatórios');
        return;
      }

      await api.put(`/users/${userID}`, {
        nome,
        email,
        telefone,
        localizacao,
        cep,
        password,
      });

      setPassword('');
      setNomeAtualizado(nome);
      setEmailAtualizado(email);
      setNome('');
      setEmail('');
      setIsEditing(false);
      fetchUserData();
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário', error);
    }
  }

  async function userDelete() {
    try {
      await api.delete(`/users/${userID}`);
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Erro ao excluir usuário', error);
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
          {/* Nome */}
          <div>
            <label className="block text-gray-400">Nome</label>
            {isEditing ? (
              <input value={nome} onChange={e => setNome(e.target.value)} className="w-full p-2 rounded text-black" />
            ) : (
              <p className="bg-gray-700 p-2 rounded text-lg">{userData.nome}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-400">Email</label>
            {isEditing ? (
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 rounded text-black" />
            ) : (
              <p className="bg-gray-700 p-2 rounded text-lg">{userData.email}</p>
            )}
          </div>


          <div>
            <label className="block text-gray-400">Telefone</label>
            {isEditing ? (
              <input value={telefone} onChange={e => setTelefone(e.target.value)} className="w-full p-2 rounded text-black" />
            ) : (
              <p className="bg-gray-700 p-2 rounded text-lg">{userData.telefone || 'Não informado'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400">Localização</label>
            {isEditing ? (
              <input value={localizacao} onChange={e => setLocalizacao(e.target.value)} className="w-full p-2 rounded text-black" />
            ) : (
              <p className="bg-gray-700 p-2 rounded text-lg">{userData.localizacao || 'Não informado'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400">CEP</label>
            {isEditing ? (
              <input value={cep} onChange={e => setCep(e.target.value)} className="w-full p-2 rounded text-black" />
            ) : (
              <p className="bg-gray-700 p-2 rounded text-lg">{userData.cep || 'Não informado'}</p>
            )}
          </div>

          {isEditing && (
            <div>
              <label className="block text-gray-400">Nova Senha (opcional)</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-2 rounded text-black"
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-4">
          {isEditing ? (
            <>
              <button
                onClick={userUpdate}
                className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 hover:bg-gray-700 transition text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
            >
              Editar Conta
            </button>
          )}

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
          <button
            onClick={userDelete}
            className="bg-red-700 hover:bg-red-800 transition text-white px-4 py-2 rounded-lg"
          >
            Excluir Conta
          </button>
        </div>
      </div>
    </div>
  );
}
