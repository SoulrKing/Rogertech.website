import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { SocialMetrics } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Valores padrão (podem ser atualizados no banco)
const DEFAULT_METRICS: SocialMetrics = {
  tiktok: 50000,
  instagram: 30000,
  youtube: 15000
};

export async function GET() {
  try {
    // Buscar métricas do banco
    const metrics = await prisma.socialMetrics.findMany();
    
    const result: SocialMetrics = {
      tiktok: DEFAULT_METRICS.tiktok,
      instagram: DEFAULT_METRICS.instagram,
      youtube: DEFAULT_METRICS.youtube
    };

    // Atualizar com valores do banco se existirem
    metrics.forEach((metric) => {
      if (metric?.platform === 'tiktok') {
        result.tiktok = metric?.followers ?? DEFAULT_METRICS.tiktok;
      } else if (metric?.platform === 'instagram') {
        result.instagram = metric?.followers ?? DEFAULT_METRICS.instagram;
      } else if (metric?.platform === 'youtube') {
        result.youtube = metric?.followers ?? DEFAULT_METRICS.youtube;
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching social metrics:', error);
    return NextResponse.json(DEFAULT_METRICS);
  }
}

// Rota para atualizar métricas (protegida - pode adicionar auth depois)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { platform, followers } = body ?? {};

    if (!platform || typeof followers !== 'number') {
      return NextResponse.json(
        { error: 'Platform e followers são obrigatórios' },
        { status: 400 }
      );
    }

    // Upsert - criar ou atualizar
    const metric = await prisma.socialMetrics.upsert({
      where: { platform },
      update: { followers },
      create: { platform, followers }
    });

    return NextResponse.json({ success: true, metric });
  } catch (error) {
    console.error('Error updating social metrics:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar métricas' },
      { status: 500 }
    );
  }
}
