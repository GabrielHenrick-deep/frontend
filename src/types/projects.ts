export interface Member {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  long_description: string;
  status: 'completed' | 'in-progress' | 'planning';
  category: string;
  image_url: string;
  startDate: string;
  completionDate?: string;
  members: Member[]; // 👈 aqui
  features: string[];
  challenges: string[];
  outcomes: string[];
  technologies: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}
