import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { appendToSheet } from '@/lib/google-sheets';
import type { FormularioData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body: FormularioData = await request.json();
    
    const { nome, email, mensagem } = body ?? {};

    // Validação básica
    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Salvar no Postgres
    const formulario = await prisma.formulario.create({
      data: {
        nome,
        email,
        mensagem,
        status: 'novo',
        formType: 'contato'
      }
    });

    // Tentar salvar também no Google Sheets (não-bloqueante)
    try {
      const dataAtual = new Date().toLocaleString('pt-BR');
      await appendToSheet('Formulário', [
        [nome, email, mensagem, dataAtual]
      ]);
    } catch (sheetsError) {
      console.error('Error saving to Google Sheets (non-critical):', sheetsError);
      // Continua mesmo se falhar no Sheets
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso!',
      id: formulario?.id
    });

  } catch (error) {
    console.error('Error saving formulario:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
