import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { Link } from 'react-router-dom';
import 'keen-slider/keen-slider.min.css';
import {api} from '../lib/api';

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
  const [error, setError] = useState<string | null>(null);
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

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <p className="text-4xl font-extrabold text-white sm:text-5xl">
            Projetos
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-52 w-full skeleton"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 skeleton"></div>
                  <div className="h-3 w-full skeleton"></div>
                  <div className="h-3 w-1/2 skeleton"></div>
                </div>
              </div>
            ))}
          </div>
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
