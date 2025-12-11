import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Handshake, ExternalLink, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Parceria } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getParcerias(): Promise<Parceria[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/parcerias`, {
      cache: 'no-store',
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching parcerias:', error);
    return [];
  }
}

export default async function ParceriasPage() {
  const parcerias = await getParcerias();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="w-full">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
              <Handshake className="w-4 h-4" />
              Colaborações
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Nossas <span className="text-green-500">Parcerias</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empresas e marcas que confiam no trabalho do RogerTech
            </p>
          </div>
        </section>

        {/* Grid de Parcerias */}
        {parcerias && parcerias.length > 0 ? (
          <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parcerias.map((parceria, index) => (
                  <div
                    key={parceria?.id ?? index}
                    className="group bg-gray-800/50 border border-green-500/20 rounded-lg overflow-hidden hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                  >
                    {/* Logo */}
                    <div className="relative aspect-video bg-gray-900 flex items-center justify-center p-8">
                      <div className="relative w-full h-full">
                        <Image
                          src={parceria?.logo ?? 'https://cdn.abacus.ai/images/d2646bb1-5202-4585-900b-33803e4faff4.png'}
                          alt={parceria?.empresa ?? 'Parceiro'}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-green-500 transition-colors">
                        {parceria?.empresa ?? 'Empresa'}
                      </h3>

                      <p className="text-sm text-gray-400 line-clamp-3">
                        {parceria?.descricao ?? 'Descrição da parceria'}
                      </p>

                      <a
                        href={parceria?.link ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 text-sm font-medium transition-colors"
                      >
                        Visitar Site
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <div className="text-6xl">🤝</div>
              <h3 className="text-2xl font-bold text-white">Em breve, novas parcerias!</h3>
              <p className="text-gray-400">Estamos sempre buscando colaborações incríveis</p>
            </div>
          </section>
        )}

        {/* CTA Parceria */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              Oportunidade
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Quer fazer uma <span className="text-green-500">parceria</span>?
            </h2>

            <p className="text-xl text-gray-300">
              Entre em contato comigo para discutir colaborações, reviews de produtos e parcerias comerciais
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sobre#contato"
                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all shadow-lg hover:shadow-green-500/20"
              >
                Entrar em Contato
              </Link>
              <a
                href="mailto:contato@rogertech.com.br"
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-green-500/20 hover:border-green-500 text-white font-semibold rounded-lg transition-all"
              >
                Enviar Email
              </a>
            </div>

            <div className="pt-8 border-t border-green-500/20">
              <h3 className="text-lg font-bold text-white mb-4">Por que fazer parceria comigo?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-4 bg-gray-900/50 border border-green-500/20 rounded-lg">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold text-white mb-1">Engajamento Real</h4>
                  <p className="text-sm text-gray-400">Comunidade ativa e engajada em todas as plataformas</p>
                </div>
                <div className="p-4 bg-gray-900/50 border border-green-500/20 rounded-lg">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-white mb-1">Público Tech</h4>
                  <p className="text-sm text-gray-400">Seguidores interessados em tecnologia e hardware</p>
                </div>
                <div className="p-4 bg-gray-900/50 border border-green-500/20 rounded-lg">
                  <div className="text-3xl mb-2">⭐</div>
                  <h4 className="font-semibold text-white mb-1">Conteúdo de Qualidade</h4>
                  <p className="text-sm text-gray-400">Reviews honestos e conteúdo divertido</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
