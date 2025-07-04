import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: string;
  author: string;
  excerpt: string;
  date: string;
}

export function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Erro ao carregar blog:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1720] via-[#1a2636] to-[#18191a] text-gray-200 px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center tracking-tight text-gray-200">
        <span className="bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
          Blog LabResearch
        </span>
      </h1>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {blogs.map((article) => (
          <div
            key={article.id}
            className="relative bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-blue-900/40 transition-all cursor-pointer overflow-hidden border border-gray-800 hover:border-cyan-900 group"
            onClick={() => navigate(`/blog/${article.slug}`)}
          >
            <div className="relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-56 object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <span className="absolute top-4 left-4 bg-cyan-950/90 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                {article.category}
              </span>
            </div>
            <div className="p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-cyan-900 rounded-full"></span>
                  {article.author}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-100 group-hover:text-cyan-300 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-400 line-clamp-3">{article.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
