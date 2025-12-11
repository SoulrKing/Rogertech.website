"use client";

import { motion } from 'framer-motion';
import { Youtube, Instagram } from 'lucide-react';

interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

const SOCIAL_LINKS = [
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@rogertech1',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    color: 'hover:text-pink-500',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/rogertech1_/',
    icon: <Instagram className="w-full h-full" />,
    color: 'hover:text-pink-500',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@RogerTech1',
    icon: <Youtube className="w-full h-full" />,
    color: 'hover:text-red-500',
  },
];

const SIZE_MAP = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function SocialLinks({ size = 'md', showLabels = false }: SocialLinksProps) {
  const sizeClass = SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <div className="flex items-center gap-4">
      {SOCIAL_LINKS.map((social, index) => (
        <motion.a
          key={social?.name}
          href={social?.url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${sizeClass} text-gray-400 ${social?.color ?? 'hover:text-green-500'} transition-colors`}
          aria-label={social?.name ?? 'Social'}
        >
          <div className="flex items-center gap-2">
            {social?.icon}
            {showLabels && <span className="text-sm">{social?.name}</span>}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
