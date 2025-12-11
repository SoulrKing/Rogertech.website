"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { Search, Filter, X } from 'lucide-react';
import type { Recomendacao } from '@/lib/types';

export default function RecomendacoesPage() {
  const [produtos, setProdutos] = useState<Recomendacao[]>([]);
  const [filteredProdutos, setFilteredProdutos] = useState<Recomendacao[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todas');
  const [selectedUso, setSelectedUso] = useState<string>('todos');
  const [loading, setLoading] = useState(true);

  // Buscar produtos
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch('/api/recomendacoes');
        const data = await res.json();
        setProdutos(data ?? []);
        setFilteredProdutos(data ?? []);
      } catch (error) {
        console.error('Error fetching produtos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  // Filtrar produtos
  useEffect(() => {
    let result = produtos ?? [];

    // Filtro de busca
    if (searchTerm) {
      result = result.filter((p) => {
        const term = searchTerm.toLowerCase();
        return (
          p?.nome?.toLowerCase()?.includes(term) ??
          p?.descricao?.toLowerCase()?.includes(term) ??
          p?.categoria?.toLowerCase()?.includes(term)
        );
      });
    }

    // Filtro de categoria
    if (selectedCategoria !== 'todas') {
      result = result.filter((p) => 
        p?.categoria?.toLowerCase() === selectedCategoria.toLowerCase()
      );
    }

    // Filtro de uso
    if (selectedUso !== 'todos') {
      result = result.filter((p) => 
        p?.uso?.some((u) => u?.toLowerCase() === selectedUso.toLowerCase())
      );
    }

    setFilteredProdutos(result);
  }, [searchTerm, selectedCategoria, selectedUso, produtos]);

  // Extrair categorias únicas
  const categorias = ['todas', ...new Set((produtos ?? []).map((p) => p?.categoria ?? '').filter(Boolean))];
  const usos = ['todos', ...new Set((produtos ?? []).flatMap((p) => p?.uso ?? []).filter(Boolean))];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategoria('todas');
    setSelectedUso('todos');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="w-full">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-green-500">Recomendações</span> do RogerTech
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Produtos testados e aprovados. Confira as melhores opções para montar seu setup!
            </p>
          </div>
        </section>

        {/* Filtros */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 border-b border-green-500/20">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Busca */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value ?? '')}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400 font-medium">Filtros:</span>
              </div>

              {/* Categoria */}
              <select
                value={selectedCategoria}
                onChange={(e) => setSelectedCategoria(e?.target?.value ?? 'todas')}
                className="px-4 py-2 bg-gray-800 border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'todas' ? 'Todas Categorias' : cat}
                  </option>
                ))}
              </select>

              {/* Uso */}
              <select
                value={selectedUso}
                onChange={(e) => setSelectedUso(e?.target?.value ?? 'todos')}
                className="px-4 py-2 bg-gray-800 border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
              >
                {usos.map((uso) => (
                  <option key={uso} value={uso}>
                    {uso === 'todos' ? 'Todos os Usos' : uso}
                  </option>
                ))}
              </select>

              {/* Reset */}
              {(searchTerm || selectedCategoria !== 'todas' || selectedUso !== 'todos') && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500 text-red-500 rounded-lg transition-all inline-flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Limpar Filtros
                </button>
              )}
            </div>

            {/* Contador */}
            <div className="text-sm text-gray-400">
              Mostrando <span className="text-green-500 font-bold">{filteredProdutos?.length ?? 0}</span> de{' '}
              <span className="text-white font-bold">{produtos?.length ?? 0}</span> produtos
            </div>
          </div>
        </section>

        {/* Grid de Produtos */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-400">Carregando produtos...</p>
              </div>
            ) : filteredProdutos && filteredProdutos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProdutos.map((produto, index) => (
                  <ProductCard key={produto?.id ?? index} product={produto} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-2xl font-bold text-white">Nenhum produto encontrado</h3>
                <p className="text-gray-400">Tente ajustar os filtros ou buscar por outro termo</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
