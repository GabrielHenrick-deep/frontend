import { Mail } from 'lucide-react';
import { useState } from 'react';
import { api } from '../lib/api';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/contact', { name, email, message });
      setStatus('Mensagem enviada com sucesso!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('Erro ao enviar. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-white mb-12 text-center">
          Entre em Contato
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder-gray-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder-gray-500"
                />
              </div>

              <div>
                <textarea
                  placeholder="Mensagem"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder-gray-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Enviar
              </button>

              {status && (
                <p className="text-sm text-center text-green-400 mt-4">
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-10">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a 
                  href="mailto:grvaufu@gmail.com" 
                  className="text-white hover:text-blue-600 transition-colors"
                >
                  grvaufu@gmail.com
                </a>
              </div>
            </div>

            {/* Location Map */}
            <div className="flex flex-col items-end w-full">
              <iframe
              className="w-full max-w-xs sm:max-w-sm md:max-w-md h-48 rounded-lg shadow-lg border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2748834457443!2d-48.26172178883213!3d-18.919223207557796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a445b55d53092f%3A0x2704333d3b0c784e!2sGrupo%20de%20Realidade%20Virtual%20e%20Aumentada%20(GRVA%20-%20UFU)!5e0!3m2!1spt-PT!2sbr!4v1743617444211!5m2!1spt-PT!2sbr"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização GRVA"
              ></iframe>
              <div className="mt-3 text-sm text-gray-300 text-right w-full">
              <p>Av. João Naves de Ávila, 212</p>
              <p>Uberlândia - MG, 38408-100</p>
              </div>
            </div>

            {/* Logo */}
            <div className="flex justify-center mt-8">
              <img
              src={`${import.meta.env.VITE_BACKEND_URL}/storage/logo/LogoGRVA_secundaria_fundo_escuro.svg`}
              alt="Logo GRVA"
              className="w-40 h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
