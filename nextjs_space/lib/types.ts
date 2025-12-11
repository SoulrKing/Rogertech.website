// Tipos do Google Sheets
export interface RecomendacaoSheet {
  categoria: string;
  nome: string;
  descricao: string;
  preco: string;
  link: string;
  imagem: string;
  uso: string;
}

export interface ParceriaSheet {
  empresa: string;
  logo: string;
  descricao: string;
  link: string;
  prioridade: string;
}

export interface VideoSheet {
  titulo: string;
  link: string;
  descricao: string;
  data: string;
}

export interface GrupoSheet {
  tipo: string;
  link: string;
  membros: string;
}

// Tipos processados para o frontend
export interface Recomendacao {
  id: string;
  categoria: string;
  nome: string;
  descricao: string;
  preco: number;
  precoFormatado: string;
  link: string;
  imagem: string;
  uso: string[];
}

export interface Parceria {
  id: string;
  empresa: string;
  logo: string;
  descricao: string;
  link: string;
  prioridade: number;
}

export interface Video {
  id: string;
  titulo: string;
  link: string;
  descricao: string;
  data: Date;
  dataFormatada: string;
}

export interface Grupo {
  id: string;
  tipo: string;
  link: string;
  membros: number;
}

export interface SocialMetrics {
  tiktok: number;
  instagram: number;
  youtube: number;
}

export interface FormularioData {
  nome: string;
  email: string;
  mensagem: string;
}
