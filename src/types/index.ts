export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Members {
  id: string;
  image: string;
  name: string;
  cpf_cnpj: string;
  category: string;
  email: string;
  bio: string;
}


export interface ImageManager{
  id: string;
  title: string;
  url: string;
  description: string;
  order: number;
};


export type TabType = 'members' | 'projects' | 'imageManager';