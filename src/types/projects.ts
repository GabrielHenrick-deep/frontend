export interface Member {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  title: string;
  resumo: string;
  image_url: string;
  video: string;
  members: Member[];
  artigo: { title: string; url: string }[];
}
