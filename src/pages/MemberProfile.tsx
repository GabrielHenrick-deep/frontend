import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { Member } from '../types/members'; // Removido 'Project' se não for usado aqui
import { api } from '../lib/api';

export function MemberProfile() {
  const { id } = useParams<{ id: string }>(); // Tipagem para o id
  const navigate = useNavigate();

  // Estado simplificado: não precisamos mais da lista completa de membros
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect simplificado para buscar apenas um membro
  useEffect(() => {
    // Se não houver ID, não faz nada
    if (!id) return;

    const fetchMember = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/members/${id}`);
        setMember(response.data);
      } catch (error) {
        console.error(`Erro ao buscar o membro com id ${id}:`, error);
        setMember(null); // Define como nulo em caso de erro (ex: 404)
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]); // O hook agora só depende do 'id'

  if (loading) {
    return <div className="text-center text-white py-10">Carregando...</div>;
  }

  if (!member) {
    return (
      <div className="text-center text-white py-10">
        <p>Membro não encontrado.</p>
        <button
          onClick={() => navigate('/members')}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/members')}
          className="flex items-center text-gray-400 hover:text-gray-200 mb-8"
        >
          <ArrowLeft className="mr-2" />
          Voltar para lista de membros
        </button>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">
          {/* Coluna da Direita (Foto e Projetos) */}
          <div className="md:w-1/3 flex flex-col items-center justify-start bg-gray-900 p-6">
            <img
              // AQUI ESTÁ A MUDANÇA PRINCIPAL!
              src={member.foto} 
              alt={member.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-600 shadow-lg"
            />
            
            {member.projects && member.projects.length > 0 && (
              <div className="w-full mt-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-2 text-center">Projetos</h3>
                <ul className="text-blue-400 underline space-y-1 text-center">
                  {member.projects.map((project) => ( // Removido o tipo 'Project' daqui
                    <li key={project.id}>
                      <Link
                        to={`/projects/${project.id}`} className="hover:text-blue-600 transition-colors">
                        {project.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Coluna da Esquerda (Informações) */}
          <div className="p-8 md:w-2/3 flex flex-col gap-8">
            {/* Seção Sobre */}
            <section>
              <h1 className="text-3xl font-bold text-gray-100">{member.name}</h1>
              <span className="inline-block px-3 py-1 mt-2 text-sm font-medium text-white bg-blue-600 rounded-full">
                {member.category}
              </span>
              <p className="mt-4 text-gray-400">{member.pesquisa}</p>
            </section>

            {/* Seção Contato */}
            <section>
              <h2 className="text-xl font-semibold text-gray-200 mb-2">Contato</h2>
              <div className="flex items-center gap-4 text-gray-400">
                <Mail className="h-5 w-5" />
                <a href={`mailto:${member.email}`} className="hover:text-blue-400">
                  {member.email}
                </a>
              </div>
              <div className="mt-2 text-gray-400">
                <span className="font-medium text-gray-300">Telefone:</span> {member.cell || 'Não informado'}
              </div>
            </section>

            {/* Seção Links */}
            <section>
              <h2 className="text-xl font-semibold text-gray-200 mb-2">Links</h2>
              <ul className="space-y-2 text-sm">
                {member.lattes && <li><strong>Lattes:</strong> <a href={member.lattes} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">{member.lattes}</a></li>}
                {member.linkedin && <li><strong>LinkedIn:</strong> <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">{member.linkedin}</a></li>}
                {member.orcid && <li><strong>ORCID:</strong> <a href={member.orcid} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">{member.orcid}</a></li>}
                {member.link && <li><strong>Website:</strong> <a href={member.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">{member.link}</a></li>}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}