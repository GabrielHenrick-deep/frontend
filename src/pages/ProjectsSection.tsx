import React, { useEffect, useState } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulação de fetch (substituir pelo fetch real da sua API)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Aqui você faria um fetch real, por exemplo:
        // const response = await fetch('https://suaapi.com/projects');
        // const data = await response.json();
        const data: Project[] = [
          {
            id: '1',
            title: 'Simulador de Operações Offshore',
            description: 'Projeto de Realidade Virtual',
            imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d',
            link: '#',
          },
          {
            id: '2',
            title: 'Visualização de Dados em RA',
            description: 'Projeto de Realidade Aumentada',
            imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac',
            link: '#',
          },
          {
            id: '3',
            title: 'Modelagem 3D com Blender',
            description: 'Modelagem para ambientes virtuais',
            imageUrl: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519',
            link: '#',
          },
          {
            id: '4',
            title: 'Desenvolvimento de IA e Digital Twin',
            description: 'Integração de IA com gêmeos digitais',
            imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
            link: '#',
          },
        ];

        setProjects(data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl">
            Projetos
          </p>
        </div>

        {loading ? (
          <p className="text-white text-center mt-8">Carregando...</p>
        ) : (
          <div className="mt-12">
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-10 md:gap-y-12">
              {projects.map((project) => (
                <div key={project.id} className="relative group">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-800 group-hover:opacity-75 sm:h-80">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-400">
                    <a href={project.link || '#'} className="hover:underline">
                      Projeto
                    </a>
                  </h3>
                  <p className="text-lg font-semibold text-white">{project.title}</p>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
