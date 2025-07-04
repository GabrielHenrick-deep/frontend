export interface Project {
  id: number;
  title: string;
}

export type MemberCategory = 'Mestrado' | 'Doutorado' | 'Pós-Doutorado' | 'Graduação';

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
