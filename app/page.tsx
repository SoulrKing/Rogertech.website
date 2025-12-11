import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SocialLinks } from '@/components/social-links';
import { ProductCard } from '@/components/product-card';
import { VideoCard } from '@/components/video-card';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Recomendacao, Video } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getPreviewData() {
  try {
    const [recomendacoesRes, videosRes] = await Promise.all([
      fetch(`${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/recomendacoes`, { cache: 'no-store' }),
      fetch(`${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/videos`, { cache: 'no-store' }),
    ]);

    const recomendacoes: Recomendacao[] = await recomendacoesRes.json();
    const videos: Video[] = await videosRes.json();

    return {
      recomendacoes: recomendacoes?.slice(0, 3) ?? [],
      videos: videos?.slice(0, 3) ?? [],
    };
  } catch (error) {
    console.error('Error fetching preview data:', error);
    return { recomendacoes: [], videos: [] };
  }
}

export default async function HomePage() {
  const { recomendacoes, videos } = await getPreviewData();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background com parallax */}
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <Image
                src="https://cdn.abacus.ai/images/ec3628a8-7add-4fa3-9faa-1728c15c2681.png"
                alt="Hero Background"
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Criador de Conteúdo
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-7xl font-bold">
                Oi, sou o <span className="text-green-500">RogerTech</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                  (não é Rogério!!!)
                </span>
              </h1>

              {/* Descrição */}
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Tecnologia + Humor = RogerTech 🚀
                <br />
                <span className="text-gray-400">Dicas, análises e recomendações sobre tech que você pode confiar</span>
              </p>

              {/* Social Links */}
              <div className="flex justify-center">
                <SocialLinks size="lg" />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/recomendacoes"
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all shadow-lg hover:shadow-green-500/20 inline-flex items-center gap-2"
                >
                  Ver Recomendações
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/sobre"
                  className="px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-green-500/20 hover:border-green-500 text-white font-semibold rounded-lg transition-all"
                >
                  Conhecer Mais
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Recomendações */}
        {recomendacoes && recomendacoes.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Recomendações Top
                  </h2>
                  <p className="text-gray-400">
                    Produtos testados e aprovados pelo RogerTech
                  </p>
                </div>
                <Link
                  href="/recomendacoes"
                  className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500 text-green-500 font-semibold rounded-lg transition-all"
                >
                  Ver Todas
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recomendacoes.map((produto, index) => (
                  <ProductCard key={produto?.id ?? index} product={produto} index={index} />
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-8 sm:hidden text-center">
                <Link
                  href="/recomendacoes"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500 text-green-500 font-semibold rounded-lg transition-all"
                >
                  Ver Todas
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Preview Vídeos */}
        {videos && videos.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Vídeos Recentes
                  </h2>
                  <p className="text-gray-400">
                    Confira os últimos conteúdos
                  </p>
                </div>
                <Link
                  href="/videos"
                  className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500 text-green-500 font-semibold rounded-lg transition-all"
                >
                  Ver Todos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <VideoCard key={video?.id ?? index} video={video} index={index} />
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-8 sm:hidden text-center">
                <Link
                  href="/videos"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500 text-green-500 font-semibold rounded-lg transition-all"
                >
                  Ver Todos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Parcerias */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              Parcerias
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Quer fazer uma <span className="text-green-500">parceria</span>?
            </h2>

            <p className="text-xl text-gray-300">
              Entre em contato e vamos conversar sobre colaborações, reviews e parcerias comerciais!
            </p>

            <Link
              href="/sobre#contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all shadow-lg hover:shadow-green-500/20"
            >
              Entrar em Contato
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
