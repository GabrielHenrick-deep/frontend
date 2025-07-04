import { Mail, MapPin } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-white mb-12 text-center">
          Entre em Contato
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder-gray-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder-gray-500"
                />
              </div>

              <div>
                <textarea
                  placeholder="Mensagem"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder-gray-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-10">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a 
                  href="mailto:contato@labresearch.com" 
                  className="text-white hover:text-blue-600 transition-colors"
                >
                  contato@labresearch.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-400">Endereço</p>
                <p className="text-white">
                  Av. Pesquisador, 1000<br />
                  São Paulo - SP
                </p>
              </div>
            </div>

            <div className="aspect-[16/9] mt-8">
              <img
                src="img/LogoGRVA_secundaria_fundo_escuro_desc.svg"
                alt="Localização"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}