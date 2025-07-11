import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Modal } from './Modal';
import { api } from '../lib/api';
import { Member } from '../types/members';

export const MembersTable: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    foto: '',
    category: '',
    email: '',
  });

  // 🔥 Carregar membros
  const fetchMembers = async () => {
    try {
      const response = await api.get('/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
const buildFormData = () => {
  const data = new FormData();
  if (formData.foto) {
    data.append('foto', formData.foto);
  }
  data.append('name', formData.name);
  data.append('category', formData.category);
  data.append('email', formData.email);
  return data;
};

  // ➕ Criar membro
const createMember = async () => {
  try {
    const data = buildFormData();
    const response = await api.post(`/members`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setMembers([...members, response.data]);
    handleCloseModal();
  } catch (error) {
    console.error('Erro ao criar membro:', error);
  }
};


const updateMember = async () => {
  try {
    const data = buildFormData();
    const response = await api.post(`/members/${editingMember?.id}?_method=PUT`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setMembers(
      members.map((m) => (m.id === response.data.id ? response.data : m))
    );
    handleCloseModal();
  } catch (error) {
    console.error('Erro ao atualizar membro:', error);
  }
};


  // 🗑️ Deletar membro
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este membro?')) {
      try {
        await api.delete(`/members/${id}`);
        setMembers(members.filter(member => member.id !== id));
      } catch (error) {
        console.error('Erro ao deletar membro:', error);
      }
    }
  };

  // 🔄 Abrir modal (criar ou editar)
  const handleOpenModal = (member?: Member) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        foto: member.foto,
        name: member.name,
        category: member.category,
        email: member.email,
      });
    } else {
      setEditingMember(null);
      setFormData({
        foto: '',
        name: '',
        category: '',
        email: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMember();
    } else {
      createMember();
    }
  };

  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleCsvInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile) {
      alert('Selecione um arquivo CSV primeiro.');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      await api.post('/import-members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('CSV importado com sucesso!');
      fetchMembers(); // Atualiza a tabela
      setCsvFile(null); // Limpa o estado
    } catch (err) {
      console.error('Erro ao importar CSV:', err);
      alert('Erro ao importar CSV');
    }
  };


  const filteredMembers = members.filter(member =>
    (member.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar membros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
      </div>

      {/* Upload de CSV */}
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleCsvInput}
          className="text-white"
        />
        <button
          onClick={handleCsvUpload}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Importar CSV</span>
        </button>
      </div>
    </div>


      {loading ? (
      <div className="text-center text-gray-400">Carregando membros...</div>
      ) : (
      <div className="bg-gray-900 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800">
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Imagem
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Nome
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            CPF/CNPJ
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Categoria
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Bio
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-100 uppercase tracking-wider">
            Ações
          </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {filteredMembers.map((member) => (
          <tr key={member.id} className="hover:bg-gray-800">
            <td className="px-6 py-4">
            <img src={member.foto} alt={member.name} className="w-10 h-10 rounded object-cover" />
            </td>
            <td className="px-6 py-4">
            <div className="text-sm font-medium text-gray-100">{member.name}</div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-200">{member.category}</td>
            <td className="px-6 py-4 text-sm text-gray-200">{member.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex items-center justify-end space-x-2">
              <button
              onClick={() => handleOpenModal(member)}
              className="text-blue-400 hover:text-blue-200 transition-colors"
              >
              <Edit size={16} />
              </button>
              <button
              onClick={() => handleDelete(member.id)}
              className="text-red-400 hover:text-red-200 transition-colors"
              >
              <Trash2 size={16} />
              </button>
            </div>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
      </div>
      )}

      <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={editingMember ? 'Editar Membro' : 'Adicionar Membro'}
      >
      <form onSubmit={handleSubmit} className="space-y-4">
       <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          URL da Imagem
        </label>
        <input
          type="text"
          value={formData.foto}
          onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
          placeholder=" "
          required
        />
        </div>

        <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Nome</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Categoria</label>
        <input
          type="text"
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={handleCloseModal}
          className="px-4 py-2 text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {editingMember ? 'Atualizar' : 'Criar'}
        </button>
        </div>
      </form>
      </Modal>
    </div>
  );
};

