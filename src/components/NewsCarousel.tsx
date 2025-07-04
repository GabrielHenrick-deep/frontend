import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronRight } from 'lucide-react';
import { NewsArticle } from '../types/news';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface NewsCarouselProps {
  news: NewsArticle[];
}

export function NewsCarousel({ news }: NewsCarouselProps) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Últimas Notícias</h2>
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            Ver todas
            <ChevronRight className="ml-1 h-5 w-5" />
          </button>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {news.map((article) => (
            <SwiperSlide key={article.id}>
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-full flex flex-col"
                onClick={() => navigate(`/blog/${article.slug}`)}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex-grow">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                    <span className="mx-2">•</span>
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}