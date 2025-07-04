import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Modal } from './Modal';
import { api } from '../lib/api';

type Project = {
  id: number;
  image_url: string;
  name_project: string;
  descri: string;
  status: string;
};

export const ProjectTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    image_url: '',
    name_project: '',
    descri: '',
    status: '',
  });

  // 🔥 Carregar projetos
  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ➕ Criar projeto
  const createProject = async () => {
    try {
      const response = await api.post('/projects', formData);
      setProjects([...projects, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  };

  // ✏️ Atualizar projeto
  const updateProject = async () => {
    try {
      const response = await api.put(`/projects/${editingProject?.id}`, formData);
      setProjects(
        projects.map(project =>
          project.id === editingProject?.id ? response.data : project
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
    }
  };

  // 🗑️ Deletar projeto
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este projeto?')) {
      try {
        await api.delete(`/projects/${id}`);
        setProjects(projects.filter(project => project.id !== id));
      } catch (error) {
        console.error('Erro ao deletar projeto:', error);
      }
    }
  };

  // 🔄 Abrir modal (criar ou editar)
  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        image_url: project.image_url,
        name_project: project.name_project,
        descri: project.descri,
        status: project.status,
      });
    } else {
      setEditingProject(null);
      setFormData({
        image_url: '',
        name_project: '',
        descri: '',
        status: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateProject();
    } else {
      createProject();
    }
  };

  const filteredProjects = projects.filter(project =>
  (project.name_project || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (project.descri || '').toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" size={20} />
          <input
            type="text"
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-gray-400"
        >
          <Plus size={20} />
          <span>Adicionar Projeto</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Carregando projetos...</div>
      ) : (
        <div className="bg-gray-900 rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Imagem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nome do Projeto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <img src={project.image_url} alt={project.name_project} className="w-10 h-10 rounded object-cover" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-100">{project.name_project}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-400 max-w-xs truncate">{project.descri}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
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
        title={editingProject ? 'Editar Projeto' : 'Adicionar Projeto'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL da Imagem
            </label>
            <input
              type="text"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Projeto
            </label>
            <input
              type="text"
              required
              value={formData.name_project}
              onChange={(e) => setFormData({ ...formData, name_project: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              required
              rows={3}
              value={formData.descri}
              onChange={(e) => setFormData({ ...formData, descri: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <input
              type="text"
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingProject ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
