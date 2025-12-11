"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Tag } from 'lucide-react';
import type { Recomendacao } from '@/lib/types';

interface ProductCardProps {
  product: Recomendacao;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-gray-900/50 border border-green-500/20 rounded-lg overflow-hidden hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
    >
      {/* Imagem */}
      <div className="relative aspect-video bg-gray-800">
        <Image
          src={product?.imagem ?? 'https://cdn.abacus.ai/images/21306e54-8ead-4224-9651-a236b4929642.png'}
          alt={product?.nome ?? 'Produto'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge Categoria */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-black text-xs font-bold rounded-full">
          {product?.categoria ?? 'Geral'}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5 space-y-3">
        {/* Nome */}
        <h3 className="text-lg font-bold text-white group-hover:text-green-500 transition-colors line-clamp-1">
          {product?.nome ?? 'Produto'}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-gray-400 line-clamp-2">
          {product?.descricao ?? 'Descrição do produto'}
        </p>

        {/* Tags de Uso */}
        {product?.uso && product.uso.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.uso.map((uso, i) => (
              <span
                key={`${uso}-${i}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 text-green-500 text-xs rounded-full"
              >
                <Tag className="w-3 h-3" />
                {uso}
              </span>
            ))}
          </div>
        )}

        {/* Preço e Link */}
        <div className="flex items-center justify-between pt-3 border-t border-green-500/20">
          <span className="text-2xl font-bold text-green-500">
            {product?.precoFormatado ?? 'R$ 0,00'}
          </span>
          <a
            href={product?.link ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all shadow-lg hover:shadow-green-500/20"
          >
            Ver Oferta
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
