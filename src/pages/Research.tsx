import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export interface Project {
  id: string;
  title: string;
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
            title: 'Interfaces Avançadas do Usuário para Operação Crítica de Sistemas',
            imageUrl: 'http://localhost:8000/storage/areasPesquisa/lp1.png',
            link: '#',
          },
          {
            id: '2',
            title: 'Reabilitação e Jogos Sérios',
            
            imageUrl: 'http://localhost:8000/storage/areasPesquisa/lp2.png',
            link: '#',
          },
          {
            id: '3',
            title: 'Visualização da Informação',
            imageUrl: 'http://localhost:8000/storage/areasPesquisa/lp3.png',
            link: '#',
          },
          {
            id: '4',
            title: 'Ensino e Aprendizado',
            imageUrl: 'http://localhost:8000/storage/areasPesquisa/lp4.png',
            link: '#',
          },
          {
            id: '5',
            title: 'Sistemas de Computação Holográfica e Medicina',
            imageUrl: 'http://localhost:8000/storage/areasPesquisa/lp5.png',
            link: '#',
          },
          {
            id: '6',
            title: 'Computer-Aided Design e Building Information Modeling',
            imageUrl: 'http://localhost:8000/storage/areasPesquisa/lp6.png',
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
