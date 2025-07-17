import React, { useState } from 'react'
import { Glasses, Search, Menu, User, Calendar, Clock, ArrowRight, X, Youtube, Mail, Facebook, Twitter, Instagram, Phone, MapPin, Brain, GraduationCap, Globe2, Linkedin, LinkedinIcon } from 'lucide-react'
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider  from "react-slick";
export function FooterSection() {
    return (
                  <footer className="bg-gray-800 text-white w-full">
            <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start justify-between">
                
                {/* Logo and Copyright - EXTREMO ESQUERDO */}
                <div className="flex flex-col items-start w-full">
                  <div className="mb-4 self-start">
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/logo/LogoGRVA_secundaria_fundo_escuro.svg`} className="h-20 w-auto" alt="Logo GRVA" />
                  </div>
                </div>
      
                {/* Quick Links */}
                  <div>
                  <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                  <ul className="space-y-2">
                    <li>
                    <Link 
                      to="/about"
                      className="text-white hover:text-gray-300 transition"
                    >
                      Sobre
                    </Link>
                    </li>
                    <li>
                    <Link 
                      to="/contact"
                      className="text-white hover:text-gray-300 transition"
                    >
                      Contato
                    </Link>
                    </li>
                  </ul>
                  </div>
      
                {/* Social Media */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
                    <div className="flex flex-col space-y-4">
                      {/* Redes Sociais */}
                      <div className="flex space-x-4">
                        <a href="https://www.youtube.com/@grvaufu" className="text-white hover:text-white transition">
                          <Youtube className="h-6 w-6" />
                        </a>
                        <a href="https://www.linkedin.com/company/grva-ufu/posts/?feedView=all" className="text-white hover:text-white transition">
                          <LinkedinIcon className="h-6 w-6" />
                        </a>
                        {/* <a href="#" className="text-white hover:text-white transition">
                          <Twitter className="h-6 w-6" />
                        </a> */}
                        <a href="https://www.instagram.com/grvaufu/" className="text-white hover:text-white transition">
                          <Instagram className="h-6 w-6" />
                        </a>
                      </div>
      
                      {/* E-mail */}
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-white" />
                        <span className="text-white">grvaufu@gmail.com</span>
                      </div>
      
                      {/* Telefone */}
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-white" />
                        <span className="text-white">(34) 3239-4000</span>
                      </div>
                    </div>
                  </div>
      
                {/* Mapa - EXTREMO DIREITO */}
                <div className="w-full flex flex-col items-end">
                  <iframe 
                    className="w-full max-w-[300px] h-[200px] rounded-lg shadow-lg" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2748834457443!2d-48.26172178883213!3d-18.919223207557796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a445b55d53092f%3A0x2704333d3b0c784e!2sGrupo%20de%20Realidade%20Virtual%20e%20Aumentada%20(GRVA%20-%20UFU)!5e0!3m2!1spt-PT!2sbr!4v1743617444211!5m2!1spt-PT!2sbr"  
                    loading="lazy"
                  ></iframe>
                  <div className="mt-4 text-sm text-white text-right">
                    <p>Av. João Naves de Ávila, 212</p>
                    <p>Uberlândia - MG, 38408-100</p>
                  </div>
                </div>
              </div>
            </div>
            </footer>
    )
    

}    