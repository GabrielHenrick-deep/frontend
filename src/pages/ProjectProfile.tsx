import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Project } from '../types/projects';
import { api } from '../lib/api';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  ExternalLink, 
  Github, 
  CheckCircle, 
  Lightbulb,
  TrendingUp,
  Code,
  Zap,
  Clock,
  Target
} from 'lucide-react'; 

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    case 'in_progress':
      return <Clock className="w-5 h-5 text-yellow-400" />;
    case 'planned':
      return <Target className="w-5 h-5 text-blue-400" />;
    default:
      return null;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'border-green-400 text-green-300 bg-green-900/30';
    case 'in_progress':
      return 'border-yellow-400 text-yellow-300 bg-yellow-900/30';
    case 'planned':
      return 'border-blue-400 text-blue-300 bg-blue-900/30';
    default:
      return 'border-gray-500 text-gray-300 bg-gray-800/30';
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'completed':
      return 'Concluído';
    case 'in_progress':
      return 'Em andamento';
    case 'planned':
      return 'Planejado';
    default:
      return 'Desconhecido';
  }
}

const ProjectProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Erro ao buscar projeto:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
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
    
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Botão Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 sm:mb-8 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-base sm:text-lg">Voltar para Projetos</span>
      </button>

      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start mb-6 sm:mb-8">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            {getStatusIcon(project.status)}
            <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${getStatusColor(project.status)}`}>
              {getStatusText(project.status)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 break-words">
            {project.title}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4 break-words">
            {project.long_description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-1 sm:gap-2">
              <Calendar className="w-4 h-4" />
              <span>Iniciado em {new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            {project.completionDate && (
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Concluído em {new Date(project.completionDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center gap-1 sm:gap-2">
              <Users className="w-4 h-4" />
              <span>{project.members.length} membros</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-80 flex-shrink-0">
          <img 
            src={project.image_url} 
            alt={project.title}
            className="w-full h-40 sm:h-48 lg:h-64 object-cover rounded-2xl shadow-2xl border-2 border-gray-800"
          />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-8">
          {/* Key Features */}
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Zap className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Principais Funcionalidades</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200 text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Desafios Técnicos</h2>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base">{challenge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Resultados do Projeto</h2>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {project.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Project Details */}
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800">
            <h3 className="font-bold text-white mb-3 sm:mb-4 text-base sm:text-lg">Detalhes do Projeto</h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400">Categoria</label>
                <p className="text-gray-200 font-medium text-sm sm:text-base">{project.category}</p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400">Linha do tempo</label>
                <p className="text-gray-200 text-sm sm:text-base">
                  {new Date(project.startDate).toLocaleDateString()} - {' '}
                  {project.completionDate 
                    ? new Date(project.completionDate).toLocaleDateString()
                    : 'Em andamento'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-base sm:text-lg">Equipe</h3>
            </div>
            <div className="space-y-1 sm:space-y-2">
              {project.members.map((member) => (
                <div key={member.id} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium border border-gray-700">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <Link
                    to={`/member/${member.id}`}
                    className="text-blue-300 hover:text-blue-500 font-medium transition-colors text-xs sm:text-base"
                  >
                    {member.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Code className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-white text-base sm:text-lg">Tecnologias</h3>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 sm:px-3 py-1 bg-purple-900/60 text-purple-200 text-xs sm:text-sm rounded-full font-medium border border-purple-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-800 flex flex-wrap gap-1 sm:gap-2">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-full font-medium border border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 sm:space-y-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
              >
                <Github className="w-4 h-4" />
                Ver Código Fonte
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProjectProfile;
