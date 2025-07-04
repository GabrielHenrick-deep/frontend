import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { Link } from 'react-router-dom';
import 'keen-slider/keen-slider.min.css';

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link?: string;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 16 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 24 },
      },
      '(min-width: 1280px)': {
        slides: { perView: 4, spacing: 32 },
      },
    },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/projects');
        const data = await response.json();
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
        <div className="lg:text-center mb-12">
          <p className="text-4xl font-extrabold text-white sm:text-5xl">
            Projetos
          </p>
        </div>

        {loading ? (
          <p className="text-white text-center">Carregando...</p>
        ) : (
        <div ref={sliderRef} className="keen-slider">
          {projects.map((project) => (
            <div
              key={project.id}
              className="keen-slider__slide bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105"
            >
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white text-lg font-bold">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.description}</p>

                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-500 hover:underline text-sm mt-2 inline-block"
                >
                  Ver mais
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
