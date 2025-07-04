import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-200 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-white">
          © {currentYear} Grupo de Realiadade Virtual e Aumentada GRVA. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}