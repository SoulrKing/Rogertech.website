"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/recomendacoes', label: 'Recomendações' },
  { href: '/videos', label: 'Vídeos' },
  { href: '/grupos', label: 'Grupos' },
  { href: '/parcerias', label: 'Parcerias' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/80 border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-10">
              <Image
                src="https://cdn.abacus.ai/images/d2646bb1-5202-4585-900b-33803e4faff4.png"
                alt="RogerTech Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-green-500">RogerTech</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link?.href}
                href={link?.href ?? '/'}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-green-500 hover:bg-green-500/10 transition-all"
              >
                {link?.label ?? 'Link'}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-green-500 hover:bg-green-500/10 transition-all"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-green-500/20 bg-black/95 backdrop-blur-lg"
          >
            <nav className="px-4 py-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href ?? '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-green-500 hover:bg-green-500/10 transition-all"
                >
                  {link?.label ?? 'Link'}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
