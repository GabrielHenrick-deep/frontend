import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import { Modal } from './Modal';
import { api } from '../lib/api';

type ImageItem = {
  id: number;
  title: string;
  url: string;
  description: string;
  order: number;
};

export const ImageManager: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Omit<ImageItem, 'id'>>({
    title: '',
    url: '',
    description: '',
    order: 1,
  });

  // ✅ Carregar imagens da API
  const fetchImages = async () => {
    try {
      const response = await api.get<ImageItem[]>('/carousel-images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 🔍 Filtrar e ordenar
  const filteredImages = images.filter(
    (img) =>
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedImages = filteredImages.sort((a, b) => a.order - b.order);

  // ➕ Abrir Modal
  const handleOpenModal = (image?: ImageItem) => {
    if (image) {
      setEditingImage(image);
      setFormData({
        title: image.title,
        url: image.url,
        description: image.description,
        order: image.order,
      });
    } else {
      setEditingImage(null);
      setFormData({
        title: '',
        url: '',
        description: '',
        order: images.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  // ❌ Fechar Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingImage(null);
  };

  // ✅ Criar ou Atualizar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingImage) {
        await api.put(`/carousel-images/${editingImage.id}`, formData);
      } else {
        await api.post('/carousel-images', formData);
      }
      await fetchImages();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  // 🗑️ Deletar
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await api.delete(`/carousel-images/${id}`);
        await fetchImages();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Search e botão */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-white bg-gray-100 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow"
        >
          <Plus size={20} />
          <span>Add Image</span>
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-x-auto border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Preview</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">URL</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-950 divide-y divide-gray-800">
            {sortedImages.map((img) => (
              <tr key={img.id} className="hover:bg-gray-900 transition-colors">
                <td className="px-6 py-4 text-gray-400">{img.order}</td>
                <td className="px-6 py-4">
                  {img.url ? (
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-16 h-16 object-cover rounded-md border border-gray-700"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-md">
                      <ImageIcon size={32} className="text-gray-500" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-100">{img.title}</td>
                <td className="px-6 py-4 text-gray-400">{img.description}</td>
                <td className="px-6 py-4 text-blue-400 max-w-xs truncate">
                  <a href={img.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {img.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleOpenModal(img)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingImage ? 'Edit Image' : 'Add New Image'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Image URL</label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Order</label>
            <input
              type="number"
              required
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-white bg-red-700 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingImage ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
