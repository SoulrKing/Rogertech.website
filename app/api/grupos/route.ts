import { NextResponse } from 'next/server';
import { readSheet } from '@/lib/google-sheets';
import type { GrupoSheet, Grupo } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Grupo fixo do Telegram
const FALLBACK_DATA: Grupo[] = [
  {
    id: 'telegram',
    tipo: 'Telegram',
    link: 'https://t.me/rogertechpromo',
    membros: 0
  }
];

export async function GET() {
  try {
    const sheetData = await readSheet('Grupos');
    
    if (!sheetData || sheetData.length === 0) {
      return NextResponse.json(FALLBACK_DATA);
    }

    const grupos: Grupo[] = sheetData.map((row: GrupoSheet, index: number) => {
      const membrosNum = parseInt(String(row?.membros ?? '0').replace(/[^0-9]/g, '')) || 0;
      
      return {
        id: `grupo-${index}`,
        tipo: String(row?.tipo ?? 'WhatsApp'),
        link: String(row?.link ?? '#'),
        membros: membrosNum
      };
    });

    return NextResponse.json(grupos);
  } catch (error) {
    console.error('Error fetching grupos:', error);
    return NextResponse.json(FALLBACK_DATA);
  }
}
