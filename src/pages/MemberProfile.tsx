import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { Member, Project } from '../types/members';
import { api } from '../lib/api';


export function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [member, setMember] = useState<Member | null>(null);

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

  useEffect(() => {
    if (members.length > 0 && id) {
      const foundMember = members.find((m) => m.id.toString() === id);
      setMember(foundMember || null);
    }
  }, [members, id]);

  if (loading) {
    return <div className="text-center text-white">Carregando...</div>;
  }

  if (!member) {
    return (
      <div className="text-center text-white">
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
          {/* Foto à direita + projetos abaixo */}
          <div className="md:w-1/3 flex flex-col items-center justify-center bg-gray-900 p-4">
            <img
              src={member.foto}
              alt={member.name}
              className="w-48 h-48 rounded-full object-cover m-8 border-4 border-blue-600 shadow-lg"
            />
            
          {member.projects && member.projects.length > 0 && (
            <div className="w-full mt-4">
              <h3 className="text-lg font-semibold text-gray-200 mb-2 text-center">Projetos</h3>
              <ul className="text-blue-400 underline space-y-1 text-center">
                {member.projects.map((projects: Project) => (
                  <li key={projects.id}>
                    <Link
                    to ={`/projects/${projects.id}`} className="hover:text-blue-600 transition-colors">
                      {projects.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

          {/* Conteúdo à esquerda */}
          <div className="p-8 md:w-2/3 flex flex-col gap-8">
            {/* Sobre */}
            <section>
              <h1 className="text-3xl font-bold text-gray-100">{member.name}</h1>
              <span className="inline-block px-3 py-1 mt-2 text-sm font-medium text-white bg-blue-600 rounded-full">
                {member.category}
              </span>
              <p className="mt-4 text-gray-400">{member.pesquisa}</p>
            </section>

            {/* Contato */}
            <section>
              <h2 className="text-xl font-semibold text-gray-200 mb-2">Contato</h2>
              <div className="flex items-center gap-4">
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-400 hover:text-blue-400"
                  title="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
                <span>{member.email}</span>
              </div>
              <div className="mt-2">
                <span className="font-medium">Telefone:</span> {member.cell}
              </div>
            </section>

            {/* Links */}
            <section>
              <h2 className="text-xl font-semibold text-gray-200 mb-2">Links</h2>
              <ul className="space-y-1 text-sm">
                <li>
                  <strong>Lattes:</strong>{' '}
                  <a href={member.lattes} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    {member.lattes}
                  </a>
                </li>
                <li>
                  <strong>LinkedIn:</strong>{' '}
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    {member.linkedin}
                  </a>
                </li>
                <li>
                  <strong>ORCID:</strong>{' '}
                  <a href={member.orcid} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    {member.orcid}
                  </a>
                </li>
                <li>
                  <strong>Website:</strong>{' '}
                  <a href={member.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    {member.link}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
