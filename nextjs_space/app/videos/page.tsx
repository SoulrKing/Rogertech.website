import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { VideoCard } from '@/components/video-card';
import { Play } from 'lucide-react';
import type { Video } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getVideos(): Promise<Video[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/videos`, {
      cache: 'no-store',
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="w-full">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium">
              <Play className="w-4 h-4" />
              Conteúdo
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-green-500">Vídeos</span> & Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Confira todos os vídeos e conteúdos do RogerTech sobre tecnologia e humor
            </p>
          </div>
        </section>

        {/* Grid de Vídeos */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {videos && videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <VideoCard key={video?.id ?? index} video={video} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-4">
                <div className="text-6xl">🎥</div>
                <h3 className="text-2xl font-bold text-white">Nenhum vídeo disponível</h3>
                <p className="text-gray-400">Novos conteúdos em breve!</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Redes Sociais */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Quer mais <span className="text-green-500">conteúdo</span>?
            </h2>
            <p className="text-xl text-gray-300">
              Me siga nas redes sociais para não perder nenhum vídeo novo!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.tiktok.com/@rogertech1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-pink-500/20"
              >
                TikTok
              </a>
              <a
                href="https://www.instagram.com/rogertech1_/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-pink-500/20"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@RogerTech1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-red-500/20"
              >
                YouTube
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
