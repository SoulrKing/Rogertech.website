import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SocialLinks } from '@/components/social-links';
import { ContactForm } from '@/components/contact-form';
import { TrendingUp, Heart, Zap, Users, Play, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { SocialMetrics } from '@/lib/types';

export const dynamic = 'force-dynamic';

const FAMOUS_VIDEOS = [
  {
    title: 'Como escolher certo seu notebook!',
    url: 'https://www.tiktok.com/@rogertech1/video/7558593152903351564',
    description: 'Dicas essenciais para escolher o notebook ideal',
  },
  {
    title: 'Analisando celular dos seguidores!',
    url: 'https://www.tiktok.com/@rogertech1/video/7557109274678201612',
    description: 'Análise do celular da galera',
  },
  {
    title: 'Melhorando meu quarto gamer!',
    url: 'https://www.tiktok.com/@rogertech1/video/7452089652686916869',
    description: 'Upgrades no quarto gaymer',
  },
];

async function getSocialMetrics(): Promise<SocialMetrics> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/social-metrics`, {
      cache: 'no-store',
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching social metrics:', error);
    return { tiktok: 0, instagram: 0, youtube: 0 };
  }
}

export default async function SobrePage() {
  const metrics = await getSocialMetrics();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="w-full">
        {/* Hero */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <Image
                src="https://cdn.abacus.ai/images/7472072a-1d4e-4716-b37d-b28d44d2950e.png"
                alt="About Background"
                fill
                className="object-cover opacity-20"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Sobre o <span className="text-green-500">RogerTech</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Criador de conteúdo com humor e foco em tecnologia
            </p>
          </div>
        </section>

        {/* Métricas das Redes Sociais */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* TikTok */}
              <div className="p-6 bg-gray-900/50 border border-green-500/20 rounded-lg text-center space-y-3">
                <div className="w-12 h-12 mx-auto text-pink-500">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {(metrics?.tiktok ?? 0).toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-400">Seguidores no TikTok</div>
                </div>
              </div>

              {/* Instagram */}
              <div className="p-6 bg-gray-900/50 border border-green-500/20 rounded-lg text-center space-y-3">
                <Users className="w-12 h-12 mx-auto text-pink-500" />
                <div>
                  <div className="text-3xl font-bold text-white">
                    {(metrics?.instagram ?? 0).toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-400">Seguidores no Instagram</div>
                </div>
              </div>

              {/* YouTube */}
              <div className="p-6 bg-gray-900/50 border border-green-500/20 rounded-lg text-center space-y-3">
                <Play className="w-12 h-12 mx-auto text-red-500" />
                <div>
                  <div className="text-3xl font-bold text-white">
                    {(metrics?.youtube ?? 0).toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-400">Inscritos no YouTube</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biografia */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Mini Biografia */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
                <Zap className="w-4 h-4" />
                Quem sou eu
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Mini Biografia
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Oi meu nome é Roger (não é Rogério!!!) Sou criador de conteúdo, com humor com foco em tecnologia.
              </p>
            </div>

            {/* Como Comecei */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Minha jornada
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Como Comecei
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Des de pequeno, sempre foi uma paixão criar conteúdo e fazer algo que envolva trabalhar no PC e jogar games. 
                Mas quando eu comecei de verdade foi em 2023, aonde foquei nisso de verdade e estou até hoje aqui divertindo 
                várias pessoas, e passando informação!
              </p>
            </div>

            {/* Por Que Crio Conteúdo */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
                <Heart className="w-4 h-4" />
                Minha missão
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Por Que Crio Conteúdo
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Não é simplesmente um sonho, e uma história, e também mostrar pro mundo e pra quem me ama, que é capaz 
                de fazer qualquer um rir com oque mais gosta de fazer. (e também pelo dinheiro né o homi não é de ferro kkkkk)
              </p>
            </div>
          </div>
        </section>

        {/* Vídeos Mais Famosos */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Vídeos Mais <span className="text-green-500">Famosos</span>
              </h2>
              <p className="text-gray-400">
                Confira os conteúdos que mais bombaram
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FAMOUS_VIDEOS.map((video, index) => (
                <div
                  key={index}
                  className="group bg-gray-900/50 border border-green-500/20 rounded-lg overflow-hidden hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-green-900/20 to-gray-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all" />
                    <Play className="relative z-10 w-16 h-16 text-green-500 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-green-500 transition-colors">
                      {video?.title ?? 'Vídeo'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {video?.description ?? 'Descrição'}
                    </p>
                    <a
                      href={video?.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 text-sm font-medium transition-colors"
                    >
                      Assistir no TikTok
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Redes Sociais */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Me acompanhe nas <span className="text-green-500">redes sociais</span>
            </h2>
            <div className="flex justify-center">
              <SocialLinks size="lg" />
            </div>
          </div>
        </section>

        {/* Formulário de Contato */}
        <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Parcerias & Contato
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Entre em <span className="text-green-500">Contato</span>
              </h2>
              <p className="text-gray-400">
                Preencha o formulário abaixo para parcerias, colaborações ou dúvidas
              </p>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
