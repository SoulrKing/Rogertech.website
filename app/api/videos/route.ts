import { NextResponse } from 'next/server';
import { readSheet } from '@/lib/google-sheets';
import type { VideoSheet, Video } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Vídeos famosos do RogerTech
const FALLBACK_DATA: Video[] = [
  {
    id: '1',
    titulo: 'Como escolher certo seu notebook!',
    link: 'https://www.tiktok.com/@rogertech1/video/7558593152903351564',
    descricao: 'Dicas essenciais para escolher o notebook ideal',
    data: new Date('2024-01-15'),
    dataFormatada: '15/01/2024'
  },
  {
    id: '2',
    titulo: 'Analisando celular dos seguidores!',
    link: 'https://www.tiktok.com/@rogertech1/video/7557109274678201612',
    descricao: 'Análise técnica dos celulares da galera',
    data: new Date('2024-01-10'),
    dataFormatada: '10/01/2024'
  },
  {
    id: '3',
    titulo: 'Melhorando meu quarto gamer!',
    link: 'https://www.tiktok.com/@rogertech1/video/7452089652686916869',
    descricao: 'Upgrades no setup gamer',
    data: new Date('2023-12-20'),
    dataFormatada: '20/12/2023'
  }
];

export async function GET() {
  try {
    const sheetData = await readSheet('Vídeos/Blog');
    
    if (!sheetData || sheetData.length === 0) {
      return NextResponse.json(FALLBACK_DATA);
    }

    const videos: Video[] = sheetData.map((row: VideoSheet, index: number) => {
      const dataStr = String(row?.data ?? '');
      let data = new Date();
      
      // Tentar parsear a data
      if (dataStr) {
        const parsed = new Date(dataStr);
        if (!isNaN(parsed.getTime())) {
          data = parsed;
        }
      }
      
      return {
        id: `vid-${index}`,
        titulo: String(row?.titulo ?? 'Vídeo'),
        link: String(row?.link ?? '#'),
        descricao: String(row?.descricao ?? ''),
        data,
        dataFormatada: data.toLocaleDateString('pt-BR')
      };
    }).sort((a, b) => (b?.data?.getTime() ?? 0) - (a?.data?.getTime() ?? 0));

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(FALLBACK_DATA);
  }
}
