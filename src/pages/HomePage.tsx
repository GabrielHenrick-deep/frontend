import React, { useEffect, useState } from 'react'
import { Glasses, Search, Menu, User, Calendar, Clock, ArrowRight, X, Youtube, Mail, Facebook, Twitter, Instagram, Phone, MapPin, Brain, GraduationCap, Globe2 } from 'lucide-react'
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider  from "react-slick";
import { Research } from './Research';
import { ProjectsSection } from './ProjectsSection';
import { FooterSection } from './FooterSection';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../lib/api';
import { Plus, Trash2,  Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {Publication} from '../types/publications';


export function HomePage() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = React.useState('home');
  const [publication, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
   

      // ✅ Carregar imagens da API
      useEffect(() => {
        async function fetchPublication() {
          try {
            const response = await api.get('/publications');
            setPublications(response.data);
          } catch (err) {
            console.error('Erro ao buscar Uploads:', err);
            setError('Erro ao carregar Uploads. ');
          } finally{
            setLoading(false);
          }
        }
        fetchPublication();
      }, []);
  const renderPage = () => {
    switch (currentPage) {
       
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-50"
          >
           {/* Hero Section */}
            <div className="relative overflow-hidden min-h-[600px]" >
            
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={3000}
                fade={true}
                className="absolute inset-0 w-full h-full"
              >
                {publication.map((img, index) => (
              <div key={index} className="w-full h-[600px] flex justify-center items-center">
                <img src={img.image_url} alt={`Slide ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
              </Slider>
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="max-w-7xl mx-auto relative z-10 py-3">
                <div className="relative pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
                  <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                      <div className="sm:text-center lg:text-left">
                      <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                        <span className="block xl:inline">Bem-vindo ao</span>{' '}
                        <span className="block text-white xl:inline">GRVA</span>
                      </h1>
                      <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Grupo de Pesquisa em Realidade Virtual e Aumentada
                      </p>
                      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                        <Link
                          to="/members"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-600 hover:scale-105 transform transition-transform duration-300 md:py-4 md:text-lg md:px-10"
                        >
                          Conheça nossos pesquisadores
                        </Link>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link
                          to="/contact"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 hover:scale-105 transform transition-transform duration-300 md:py-4 md:text-lg md:px-10"
                        >
                          Entre em contato
                        </Link>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          {/* Featured areas de pesquisa*/}
          <Research/>
          {/* Featured Projects Section */}
          <ProjectsSection/>
          {/* Footer */}
          <FooterSection/>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence>
      {renderPage()}
    </AnimatePresence>
  );
}

