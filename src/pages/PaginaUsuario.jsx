import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2'

export default function PaginaUsuario() {
  const [nome, setNome] = useState('');
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

        await api.patch(`/users/${userID}`, {
            nome,
            email,
            telefone,
            cep,
            senha: password,
        });

        setPassword('');
        setIsEditing(false);
        fetchUserData();
        Swal.fire({
            icon: 'success',
            title: 'Dados atualizados!',
            confirmButtonColor: '#FF0000',
        })
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário', error);
    }
  }

  async function userDelete() {
    try {
        await api.delete(`/users/${userID}`);
        sessionStorage.clear();
        Swal.fire({
            icon: 'success',
            title: 'Conta deletada!',
            text: 'Sua conta foi deletada com sucesso!',
            confirmButtonColor: '#FF0000',
        }).then(() => {
            navigate('/');
        })
    } catch (error) {
      console.error('Erro ao excluir usuário', error);
    }
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-gradient-to-br from-gray-800 to-gray-900">
        <p>Carregando informações do usuário...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <div className="w-full max-w-4xl bg-gray-800 rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">Perfil do Usuário</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Nome</label>
            {isEditing ? (
              <input value={nome} onChange={e => setNome(e.target.value)} className="w-full p-3 rounded-lg text-black" />
            ) : (
              <p className="bg-gray-700 p-3 rounded-lg text-lg">{userData.nome}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            {isEditing ? (
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-lg text-black" />
            ) : (
              <p className="bg-gray-700 p-3 rounded-lg text-lg">{userData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Telefone</label>
            {isEditing ? (
              <input value={telefone} onChange={e => setTelefone(e.target.value)} className="w-full p-3 rounded-lg text-black" />
            ) : (
              <p className="bg-gray-700 p-3 rounded-lg text-lg">{userData.telefone || 'Não informado'}</p>
            )}
          </div>

          

          <div>
            <label className="block text-sm text-gray-300 mb-1">CEP</label>
            {isEditing ? (
              <input value={cep} onChange={e => setCep(e.target.value)} className="w-full p-3 rounded-lg text-black" />
            ) : (
              <p className="bg-gray-700 p-3 rounded-lg text-lg">{userData.cep || 'Não informado'}</p>
            )}
          </div>

          {isEditing && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Nova Senha (opcional)</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg text-black"
              />
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap justify-between items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl text-white"
          >
            Voltar
          </button>

          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={userUpdate}
                  className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-xl text-white"
                >
                  Salvar
                </button>
                <button
                  onClick={() => {setIsEditing(false); setPassword('')}}
                  className="bg-gray-600 hover:bg-gray-700 transition px-5 py-2 rounded-xl text-white"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 transition px-5 py-2 rounded-xl text-white"
              >
                Editar Conta
              </button>
            )}

            <button
              onClick={userDelete}
              className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl text-white"
            >
              Excluir Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
