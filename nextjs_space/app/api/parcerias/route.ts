import { NextResponse } from 'next/server';
import { readSheet } from '@/lib/google-sheets';
import type { ParceriaSheet, Parceria } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Dados fallback
const FALLBACK_DATA: Parceria[] = [
  {
    id: '1',
    empresa: 'TechBrand',
    logo: 'https://cdn.abacus.ai/images/d2646bb1-5202-4585-900b-33803e4faff4.png',
    descricao: 'Parceiro oficial para hardware',
    link: '#',
    prioridade: 1
  }
];

export async function GET() {
  try {
    const sheetData = await readSheet('Parcerias');
    
    if (!sheetData || sheetData.length === 0) {
      return NextResponse.json(FALLBACK_DATA);
    }

    const parcerias: Parceria[] = sheetData
      .map((row: ParceriaSheet, index: number) => ({
        id: `parc-${index}`,
        empresa: String(row?.empresa ?? 'Empresa'),
        logo: String(row?.logo ?? 'https://cdn.abacus.ai/images/d2646bb1-5202-4585-900b-33803e4faff4.png'),
        descricao: String(row?.descricao ?? ''),
        link: String(row?.link ?? '#'),
        prioridade: parseInt(String(row?.prioridade ?? '99')) || 99
      }))
      .sort((a, b) => (a?.prioridade ?? 99) - (b?.prioridade ?? 99));

    return NextResponse.json(parcerias);
  } catch (error) {
    console.error('Error fetching parcerias:', error);
    return NextResponse.json(FALLBACK_DATA);
  }
}
