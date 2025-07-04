import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';

interface Blog {
  title: string;
  slug: string;
  image: string;
  category: string;
  author: string;
  content: string;
  date: string;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Blog | null>(null);

  useEffect(() => {
    api.get(`/blogs/${slug}`)
      .then(response => setArticle(response.data))
      .catch(() => setArticle(null));
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-xl text-gray-200">loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8 rounded-lg px-4 py-2 bg-gray-800/70 hover:bg-gray-700/80 shadow-lg"
        >
          <ArrowLeft className="mr-2 w-5 h-5" /> Voltar para o blog
        </button>

        <article className="rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-8">
            <div className="flex justify-between mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-700 text-xs font-semibold text-white uppercase tracking-wide shadow">
                {article.category}
              </span>
              <span className="text-gray-400 text-sm">
                {new Date(article.date).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="text-sm text-gray-400 mb-8">
              Por <span className="font-semibold text-indigo-400">{article.author}</span>
            </div>

            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-indigo-400 prose-a:underline">
              {article.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
