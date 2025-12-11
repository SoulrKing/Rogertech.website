import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MessageCircle, Users, ArrowRight, ExternalLink } from 'lucide-react';
import type { Grupo } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getGrupos(): Promise<Grupo[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/grupos`, {
      cache: 'no-store',
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching grupos:', error);
    return [];
  }
}

export default async function GruposPage() {
  const grupos = await getGrupos();

  // Grupo fixo do Telegram
  const telegramGroup = {
    id: 'telegram-main',
    tipo: 'Telegram',
    link: 'https://t.me/rogertechpromo',
    membros: 0,
  };

  // Separar grupos por tipo
  const whatsappGroups = (grupos ?? []).filter((g) => 
    g?.tipo?.toLowerCase()?.includes('whatsapp') ?? false
  );
  const telegramGroups = [telegramGroup, ...(grupos ?? []).filter((g) => 
    g?.tipo?.toLowerCase()?.includes('telegram') ?? false
  )];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="w-full">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
              <MessageCircle className="w-4 h-4" />
              Comunidade RogerTech
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Grupos de <span className="text-green-500">Promoções</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Participe dos nossos grupos e não perca nenhuma promoção de produtos tech!
            </p>
          </div>
        </section>

        {/* Grupos Telegram */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-blue-500" />
                Telegram
              </h2>
              <p className="text-gray-400">Grupo principal de promoções no Telegram</p>
            </div>

            <div className="grid gap-6">
              {telegramGroups.map((grupo, index) => (
                <div
                  key={grupo?.id ?? index}
                  className="group bg-gray-800/50 border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <MessageCircle className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Grupo Telegram</h3>
                      </div>
                      <p className="text-gray-400 mb-3">
                        Receba promoções exclusivas de produtos tech diretamente no Telegram
                      </p>
                      {grupo?.membros ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{(grupo?.membros ?? 0).toLocaleString('pt-BR')} membros</span>
                        </div>
                      ) : null}
                    </div>
                    <a
                      href={grupo?.link ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 whitespace-nowrap"
                    >
                      Entrar no Grupo
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grupos WhatsApp */}
        {whatsappGroups && whatsappGroups.length > 0 && (
          <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                  WhatsApp
                </h2>
                <p className="text-gray-400">Grupos de promoções no WhatsApp</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whatsappGroups.map((grupo, index) => (
                  <div
                    key={grupo?.id ?? index}
                    className="group bg-gray-900/50 border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <MessageCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {grupo?.tipo ?? 'Grupo WhatsApp'}
                        </h3>
                      </div>

                      {grupo?.membros ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{(grupo?.membros ?? 0).toLocaleString('pt-BR')} membros</span>
                        </div>
                      ) : null}

                      <a
                        href={grupo?.link ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all shadow-lg hover:shadow-green-500/20"
                      >
                        Entrar no Grupo
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Não perca as melhores <span className="text-green-500">promoções</span>!
            </h2>
            <p className="text-xl text-gray-300">
              Entre agora nos nossos grupos e seja o primeiro a saber de ofertas imperdíveis
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
