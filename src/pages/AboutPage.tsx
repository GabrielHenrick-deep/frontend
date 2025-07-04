import { Award, BookOpen, FlaskRound as Flask, Users } from 'lucide-react';
import { ContactPage } from './ContactPage';

export function AboutPage() {
  return (
    <div className="bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sobre o LabResearch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Somos um centro de excelência dedicado à pesquisa científica e inovação,
            reunindo mentes brilhantes em busca de soluções para os desafios do futuro.
          </p>
        </div>
        {/* Founding Directors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Diretores Fundadores</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <div className="aspect-w-3 aspect-h-4">
          <img
            src="img/professor1.jpg"
            alt="Dra. Maria Santos"
            className="w-full h-[400px] object-cover"
          />
              </div>
              <div className="p-6">
          <h3 className="text-xl font-semibold text-white">Dr. Alexandre Cardoso</h3>
          <p className="text-white mt-1">Diretor de Pesquisa e Desenvolvimento</p>
          <p className="text-white mt-4">
            Pioneiro em pesquisas de biotecnologia, liderou importantes descobertas
            na área de genética molecular. Sua visão inovadora foi fundamental
            para estabelecer o LabResearch como referência em pesquisa.
          </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <div className="aspect-w-3 aspect-h-4">
          <img
            src="img/professor2.jpg"
            alt="Dr. Carlos Mendes"
            className="w-full h-[400px] object-cover"
          />
              </div>
              <div className="p-6">
          <h3 className="text-xl font-semibold text-white">Dr. Edgard Lamounier</h3>
          <p className="text-white mt-1">Diretor de Inovação Científica</p>
          <p className="text-white mt-4">
            Reconhecido internacionalmente por suas contribuições em bioinformática,
            estabeleceu parcerias estratégicas que impulsionaram o crescimento
            e reconhecimento global do laboratório.
          </p>
              </div>
            </div>
          </div>
        </div>
        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Nossa Missão</h2>
            <p className="text-gray-400">
              Promover a excelência em pesquisa científica, formando profissionais
              qualificados e desenvolvendo soluções inovadoras que contribuam para
              o avanço do conhecimento e o bem-estar da sociedade.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Nossa Visão</h2>
            <p className="text-gray-400">
              Ser reconhecido internacionalmente como um centro de referência em
              pesquisa e inovação, atraindo talentos e estabelecendo parcerias
              estratégicas para o desenvolvimento científico global.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white mb-1">50+</div>
            <div className="text-gray-400">Pesquisadores</div>
          </div>
          <div className="text-center">
            <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white mb-1">200+</div>
            <div className="text-gray-400">Publicações</div>
          </div>
          <div className="text-center">
            <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white mb-1">15+</div>
            <div className="text-gray-400">Prêmios</div>
          </div>
          <div className="text-center">
            <Flask className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white mb-1">8</div>
            <div className="text-gray-400">Laboratórios</div>
          </div>
        </div>

        {/* History */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Nossa História</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700"></div>
            <div className="space-y-12">
              <div className="relative">
          <div className="ml-6 md:ml-0 md:flex md:items-center">
            <div className="md:w-1/2 md:pr-8 md:text-right">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold text-white mb-2">2015</h3>
                <p className="text-gray-400">Fundação do LabResearch com foco inicial em biotecnologia</p>
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 mt-6 md:mt-0 -ml-3 md:-ml-1.5">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            </div>
          </div>
              </div>
              <div className="relative">
          <div className="ml-6 md:ml-0 md:flex md:items-center">
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold text-white mb-2">2018</h3>
                <p className="text-gray-400">Expansão para novas áreas de pesquisa e inauguração de novos laboratórios</p>
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 mt-6 md:mt-0 -ml-3 md:-ml-1.5">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            </div>
          </div>
              </div>
              <div className="relative">
          <div className="ml-6 md:ml-0 md:flex md:items-center">
            <div className="md:w-1/2 md:pr-8 md:text-right">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold text-white mb-2">2020</h3>
                <p className="text-gray-400">Reconhecimento internacional e estabelecimento de parcerias globais</p>
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 mt-6 md:mt-0 -ml-3 md:-ml-1.5">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            </div>
          </div>
              </div>
              <div className="relative">
          <div className="ml-6 md:ml-0 md:flex md:items-center">
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold text-white mb-2">2023</h3>
                <p className="text-gray-400">Liderança em pesquisas inovadoras e formação de novos talentos</p>
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 mt-6 md:mt-0 -ml-3 md:-ml-1.5">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            </div>
          </div>
              </div>
            </div>
          </div>
        </div>
        <ContactPage/>
      </div>
    </div>
  );
}


