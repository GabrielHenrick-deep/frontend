import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link} from 'react-router-dom';
import { api } from '../lib/api';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Project } from '../types/projects';


function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com');
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl font-medium">
        Carregando...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-xl font-semibold">
        Projeto não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200 px-4 py-12 flex flex-col items-center">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 w-full max-w-5xl"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Voltar</span>
      </button>

      <div className="w-full max-w-5xl bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 space-y-8">
        {/* Imagem (opcional) */}
        {project.image_url?.trim() !== '' && (
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover object-center transition duration-300 hover:scale-105"
            />
          </div>
        )}


        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
          {project.title}
        </h1>

        {/* Resumo */}
        <p className="text-lg text-gray-300 leading-relaxed">
          {project.resumo}
        </p>

        {/* Vídeo */}
        {project.video && !isGoogleDriveUrl(project.video) && (
          <div className="rounded-xl overflow-hidden border border-gray-700">
            <ReactPlayer
              src={project.video}
              controls
              width="100%"
              height="360px"
            />
          </div>
        )}


        {/* Artigos */}
        {project.artigo && project.artigo.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Artigos relacionados
            </h2>
            <ul className="space-y-3">
              {project.artigo.map((art, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ExternalLink className="w-5 h-5 mt-1 text-blue-400" />
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline break-words"
                  >
                    {art.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Membros relacionados */}
        {project.members && project.members.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Membros Relacionados
            </h2>
            <ul className="flex flex-wrap gap-4">
              {project.members.map((member) => (
                <li key={member.id}>
                  <Link
                    to={`/member/${member.id}`}
                    className="text-blue-400 hover:underline font-medium"
                  >
                    {member.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectProfile;
