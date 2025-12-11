import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-green-500/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link 
              href="/sobre" 
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              Sobre
            </Link>
            <Link 
              href="/recomendacoes" 
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              Recomendações
            </Link>
            <Link 
              href="/grupos" 
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              Grupos
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>© {currentYear} RogerTech</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Feito com <Heart className="w-3 h-3 text-green-500 fill-green-500" /> e humor
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
