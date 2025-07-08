import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= 0 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`bg-black shadow-sm fixed w-full top-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Links */}
          <div className="flex space-x-8">
            <Link
              to="/projects"
              className={`${
                isActive('/projects')
                  ? 'text-white border-b-2 border-blue-600'
                  : 'text-white hover:text-gray-300'
              } px-1 py-2 text-base font-medium`}
            >
              Projetos
            </Link>
            <Link
              to="/members"
              className={`${
                isActive('/members')
                  ? 'text-white border-b-2 border-blue-600'
                  : 'text-white hover:text-gray-300'
              } px-1 py-2 text-base font-medium`}
            >
              Equipe
            </Link>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="img/LogoGRVA_secundaria_fundo_escuro.svg"
                className="h-20 w-20"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Right Links */}
          <div className="flex space-x-8">
            <Link
              to="/contact"
              className={`${
                isActive('/contact')
                  ? 'text-white border-b-2 border-blue-600'
                  : 'text-white hover:text-gray-300'
              } px-1 py-2 text-base font-medium`}
            >
              Contato
            </Link>
            <Link
              to="/blog"
              className={`${
                isActive('/blog')
                  ? 'text-white border-b-2 border-blue-600'
                  : 'text-white hover:text-gray-300'
              } px-1 py-2 text-base font-medium`}
            >
              Eventos
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}