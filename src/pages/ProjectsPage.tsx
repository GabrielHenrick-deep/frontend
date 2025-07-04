import { Search, Calendar, Users, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types/projects';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';

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
                console.error('Erro ao buscar projetos:', err);
                setError('Erro ao carregar projetos.');
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    if (loading) return <div className="text-white text-center py-20">Carregando projetos...</div>;
    if (error) return <div className="text-red-500 text-center py-20">{error}</div>;

    const filteredProjects = projects.filter(project => {
        const search = searchTerm.toLowerCase();
        return (
            project.title.toLowerCase().includes(search) ||
            project.description.toLowerCase().includes(search) ||
            project.tags.some(tag => tag.toLowerCase().includes(search))
        );
    });

    const getStatusColor = (status: Project['status']) => {
        switch (status) {
            case 'completed': return 'bg-green-900/30 text-green-300';
            case 'in-progress': return 'bg-blue-900/30 text-blue-300';
            case 'planning': return 'bg-yellow-900/30 text-yellow-300';
            default: return 'bg-gray-800 text-gray-300';
        }
    };

    const getStatusText = (status: Project['status']) => {
        switch (status) {
            case 'completed': return 'Completed';
            case 'in-progress': return 'In Progress';
            case 'planning': return 'Planning';
            default: return 'Unknown';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4 drop-shadow">My Projects</h1>
                    <p className="text-lg text-gray-400">Explore my portfolio of innovative solutions</p>
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 bg-gray-800/80 text-gray-100 placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Projects List */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-12">
                        <Search className="w-16 h-16 mx-auto mb-4 text-gray-700" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects found</h3>
                        <p className="text-gray-500">Try adjusting your search term</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredProjects.map(project => (
                            <div
                                key={project.id}
                                className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border border-gray-800/60"
                                onClick={() => navigate(`/projects/${project.id}`)}
                            >
                                <div className="flex flex-col lg:flex-row">
                                    <div className="lg:w-80 h-48 lg:h-auto">
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <span className="text-sm font-medium text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                                                {getStatusText(project.status)}
                                            </span>
                                        </div>

                                        <p className="text-gray-300 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(project.startDate).getFullYear()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>{project.members.length} members</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 4).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-700 text-gray-200 text-sm rounded-full font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 4 && (
                                                <span className="px-3 py-1 bg-gray-700 text-gray-400 text-sm rounded-full">
                                                    +{project.tags.length - 4} more
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <button className="text-blue-400 hover:text-blue-200 font-semibold transition-colors">
                                                View Details →
                                            </button>

                                            <div className="flex gap-3">
                                                {project.demoUrl && (
                                                    <button
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            window.open(project.demoUrl, '_blank');
                                                        }}
                                                        className="flex items-center gap-2 px-3 py-1 text-blue-400 hover:text-blue-200 transition-colors"
                                                        title="View Demo"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        <span className="text-sm">Demo</span>
                                                    </button>
                                                )}
                                                {project.githubUrl && (
                                                    <button
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            window.open(project.githubUrl, '_blank');
                                                        }}
                                                        className="flex items-center gap-2 px-3 py-1 text-gray-300 hover:text-white transition-colors"
                                                        title="View Code"
                                                    >
                                                        <Github className="w-4 h-4" />
                                                        <span className="text-sm">Code</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
