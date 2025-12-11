import { NextResponse } from 'next/server';
import { readSheet } from '@/lib/google-sheets';
import type { RecomendacaoSheet, Recomendacao } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Dados fallback caso Google Sheets não esteja configurado
const FALLBACK_DATA: Recomendacao[] = [
  {
    id: '1',
    categoria: 'Notebook',
    nome: 'Notebook Gamer XYZ',
    descricao: 'Perfeito para jogos e trabalho pesado',
    preco: 4500,
    precoFormatado: 'R$ 4.500,00',
    link: '#',
    imagem: 'https://cdn.abacus.ai/images/21306e54-8ead-4224-9651-a236b4929642.png',
    uso: ['jogos', 'trabalho']
  },
  {
    id: '2',
    categoria: 'PC',
    nome: 'Setup Gamer Completo',
    descricao: 'PC gamer com RGB e alto desempenho',
    preco: 7800,
    precoFormatado: 'R$ 7.800,00',
    link: '#',
    imagem: 'https://cdn.abacus.ai/images/6ff40abf-1478-41e8-aad2-a983b291a899.png',
    uso: ['jogos', 'streaming']
  },
  {
    id: '3',
    categoria: 'Periféricos',
    nome: 'Kit Periféricos Gamer',
    descricao: 'Mouse, teclado e headset mecânicos RGB',
    preco: 1200,
    precoFormatado: 'R$ 1.200,00',
    link: '#',
    imagem: 'https://cdn.abacus.ai/images/c43fa7ca-fdfa-4b76-ba61-5dbf0f98e267.png',
    uso: ['jogos']
  }
];

export async function GET() {
  try {
    const sheetData = await readSheet('Recomendações');
    
    // Se não há dados do Google Sheets, usar fallback
    if (!sheetData || sheetData.length === 0) {
      return NextResponse.json(FALLBACK_DATA);
    }

    // Processar dados do Google Sheets
    const recomendacoes: Recomendacao[] = sheetData.map((row: RecomendacaoSheet, index: number) => {
      const precoNum = parseFloat(String(row?.preco ?? '0').replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
      const usoArray = String(row?.uso ?? '').split(',').map((u: string) => u.trim().toLowerCase()).filter(Boolean);
      
      return {
        id: `rec-${index}`,
        categoria: String(row?.categoria ?? 'Geral'),
        nome: String(row?.nome ?? 'Produto'),
        descricao: String(row?.descricao ?? ''),
        preco: precoNum,
        precoFormatado: `R$ ${precoNum.toFixed(2).replace('.', ',')}`,
        link: String(row?.link ?? '#'),
        imagem: String(row?.imagem ?? 'https://cdn.abacus.ai/images/21306e54-8ead-4224-9651-a236b4929642.png'),
        uso: usoArray.length > 0 ? usoArray : ['geral']
      };
    });

    return NextResponse.json(recomendacoes);
  } catch (error) {
    console.error('Error fetching recomendacoes:', error);
    return NextResponse.json(FALLBACK_DATA);
  }
}
