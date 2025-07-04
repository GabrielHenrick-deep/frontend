import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

export function Research() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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
          {
            id: '5',
            title: 'Projeto Extra para Teste',
            description: 'Descrição do projeto extra',
            imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
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

  // Configurações do slider
    const settings = {
      dots: true,
      infinite: true,      // para rodar infinitamente, voltar ao início
      speed: 500,          // velocidade da animação de transição
      slidesToShow: 4,     // 4 imagens visíveis
      slidesToScroll: 1,   // scroll de 1 em 1
      arrows: false,        // setas ativadas
      autoplay: true,      // roda sozinho
      autoplaySpeed: 3000, // troca a cada 3 segundos
      pauseOnHover: false, // NÃO pausa quando o mouse passar em cima
      pauseOnFocus: false, // NÃO pausa quando o slider estiver em foco
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl">
            Linhas de Pesquisa
          </p>
        </div>

        {loading ? (
          <p className="text-white text-center mt-8">Carregando...</p>
        ) : (
          <div className="mt-12">
            <Slider {...settings}>
              {projects.map((project) => (
                <div key={project.id} className="px-2">
                  <div className="relative group">
                    <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-800 group-hover:opacity-75 sm:h-64">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-400">
                      <a href={project.link || '#'} className="hover:underline">
                        Projeto
                      </a>
                    </h3>
                    <p className="text-lg font-semibold text-white">{project.title}</p>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
