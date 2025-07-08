import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import {Blog} from '../types/blogs';

export function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Erro ao carregar blog:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-gray-100">
        Publicações
      </h1>

      <div className="max-w-4xl mx-auto space-y-10">
        {blogs.map((article) => (
          <div
            key={article.id}
            className="flex flex-col md:flex-row bg-gray-800 border border-gray-700 rounded-2xl shadow hover:shadow-lg transition-all duration-200 cursor-pointer group"
            // onClick={() => navigate(`/blog/${article.link}`)}
              onClick={e => { e.stopPropagation();
                window.open(article.link, '_blank');
              }}
            >
            <img
              src={article.image}
              alt={article.title}
              className="w-full md:w-64 h-52 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none group-hover:scale-105 transition-transform duration-200"
            />
            <div className="p-7 flex flex-col justify-between flex-1">
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 bg-gray-700 rounded-full font-semibold uppercase tracking-wide">
                    {article.category}
                  </span>
                  <span className="text-gray-600">·</span>
                  <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-100 group-hover:text-gray-300 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-300 mt-3 line-clamp-3">{article.excerpt}</p>
              </div>
              <div className="text-sm text-gray-400 mt-4">
                <span className="font-medium">Por {article.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
