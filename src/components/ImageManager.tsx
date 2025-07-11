// components/ImageManager.tsx
import React, { useEffect, useState } from 'react';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { Modal } from './Modal';
import { api } from '../lib/api';
import { Publication } from '../types/publications';

export const ImageManager: React.FC = () => {
  const [images, setImages] = useState<Publication[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Publication, 'id'>>({
    image_url: '',
  });

  const fetchImages = async () => {
    try {
      const response = await api.get<Publication[]>('/publications');
      setImages(response.data);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({ image_url: '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/publications', formData);
      await fetchImages();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar esta imagem?')) {
      try {
        await api.delete(`/publications/${id}`);
        await fetchImages();
      } catch (error) {
        console.error('Erro ao deletar imagem:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleOpenModal}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Adicionar Imagem</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-700">
            {img.image_url ? (
              <img
                src={img.image_url}
                alt="Imagem"
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                <ImageIcon size={32} className="text-gray-500" />
              </div>
            )}
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Nova Imagem">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">URL da Imagem</label>
            <input
              type="url"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ image_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-white bg-red-700 rounded-md hover:bg-red-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
