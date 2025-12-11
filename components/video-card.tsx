"use client";

import { motion } from 'framer-motion';
import { Play, Calendar, ExternalLink } from 'lucide-react';
import type { Video } from '@/lib/types';

interface VideoCardProps {
  video: Video;
  index?: number;
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  // Extrair ID do TikTok da URL
  const getTikTokId = (url: string): string | null => {
    const match = url?.match(/video\/(\d+)/);
    return match?.[1] ?? null;
  };

  const tiktokId = getTikTokId(video?.link ?? '');
  const isTikTok = video?.link?.includes('tiktok.com');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-gray-900/50 border border-green-500/20 rounded-lg overflow-hidden hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
    >
      {/* Preview / Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-green-900/20 to-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all" />
        <Play className="relative z-10 w-16 h-16 text-green-500 group-hover:scale-110 transition-transform" />
      </div>

      {/* Conteúdo */}
      <div className="p-5 space-y-3">
        {/* Título */}
        <h3 className="text-lg font-bold text-white group-hover:text-green-500 transition-colors line-clamp-2">
          {video?.titulo ?? 'Vídeo'}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-gray-400 line-clamp-2">
          {video?.descricao ?? 'Descrição do vídeo'}
        </p>

        {/* Data */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{video?.dataFormatada ?? 'Data'}</span>
        </div>

        {/* Botão Assistir */}
        <a
          href={video?.link ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all shadow-lg hover:shadow-green-500/20"
        >
          <Play className="w-4 h-4" />
          Assistir no TikTok
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
