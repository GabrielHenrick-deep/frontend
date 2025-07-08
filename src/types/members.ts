export interface Project {
  id: number;
  title: string;
}

export type MemberCategory = 'Mestrando(a)' | 'Doutorando(a)' | 'Pós-Doutorando(a)' | 'Iniciação Científica';

export interface Member {
  id: number;
  name: string;
  foto: string;
  cell: string;
  email: string;
  category: MemberCategory;
  pesquisa: string;
  lattes: string;
  linkedin: string;
  orcid: string;
  link: string;
  created_at: string;
  updated_at: string;
  projects: Project[];
}
