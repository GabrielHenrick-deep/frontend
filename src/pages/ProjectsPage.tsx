import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export interface Artigo {
  title: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  resumo: string;
  image_url: string;
  video: string;
  artigo: Artigo[];
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Erro ao carregar projetos.');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const search = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(search) ||
      project.resumo.toLowerCase().includes(search) ||
      project.artigo.some(a => a.title.toLowerCase().includes(search))
    );
  });

  if (loading)
    return <div className="text-white text-center py-20">Carregando projetos...</div>;

  if (error)
    return <div className="text-red-500 text-center py-20">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md">Nossos Projetos</h1>
          <p className="text-gray-400 text-lg mt-2">Explore as soluções desenvolvidas</p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Lista Vertical */}
        <div className="flex flex-col gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:shadow-2xl transition-transform hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">


                <h3 className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-base">
                  {project.resumo.length > 250
                    ? project.resumo.slice(0, 250) + '...'
                    : project.resumo}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.artigo.slice(0, 4).map((artigo, idx) => (
                    <span
                      key={idx}
                      title={artigo.url}
                      onClick={e => {
                        e.stopPropagation();
                        window.open(artigo.url, '_blank');
                      }}
                      className="bg-blue-600/20 text-blue-300 text-sm px-3 py-1 rounded-full hover:underline cursor-pointer"
                    >
                      {artigo.title}
                    </span>
                  ))}
                  {project.artigo.length > 4 && (
                    <span className="bg-gray-700 text-gray-400 text-sm px-3 py-1 rounded-full">
                      +{project.artigo.length - 4} mais
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-blue-400 text-sm font-medium">
                    Ver detalhes →
                  </span>
                  {project.video && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        window.open(project.video, '_blank');
                      }}
                      className="text-blue-300 hover:text-blue-200 text-sm"
                    >
                      🎥 Vídeo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center mt-12">
            <Search className="w-16 h-16 mx-auto text-gray-600" />
            <h3 className="text-xl text-gray-400 mt-4">Nenhum projeto encontrado</h3>
            <p className="text-gray-500">Tente outro termo de busca</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
