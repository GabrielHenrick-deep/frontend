import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import ReactPlayer from 'react-player';
export interface Project {
  id: number;
  title: string;
  resumo: string;
  image_url: string;
  video: string;
  artigo: string[];
}

const ProjectProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(err => console.error('Erro ao buscar projeto:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-center text-white flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 text-center text-red-500 flex items-center justify-center">
        Projeto não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar</span>
      </button>
      <div className="bg-gray-900/80 rounded-xl p-4 shadow-lg border border-gray-800 w-full max-w-xl flex flex-col gap-4">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-40 object-cover rounded-xl border border-gray-800 mb-2"
        />
        <h1 className="text-2xl font-bold text-white">{project.title}</h1>
        <p className="text-gray-300 text-base mb-2">
          {project.resumo.length > 200 ? project.resumo.slice(0, 200) + '...' : project.resumo}
        </p>
        <ReactPlayer
          src={project.video}
          controls={true}
          width="100%"
          height="315px"
          className="rounded-xl"
        />
        {project.artigo && project.artigo.length > 0 && (
          <ul className="list-disc list-inside space-y-1">
            {project.artigo.map((art, idx) => (
              <li key={idx}>
                <a
                  href={art}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  {art}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectProfile;
