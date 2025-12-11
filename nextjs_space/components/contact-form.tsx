"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, User, MessageSquare } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/formulario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? 'Erro ao enviar mensagem');
      }

      setSuccess(true);
      setFormData({ nome: '', email: '', mensagem: '' });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err?.message : 'Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
          Nome
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            id="nome"
            required
            value={formData?.nome ?? ''}
            onChange={(e) => setFormData({ ...formData, nome: e?.target?.value ?? '' })}
            className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
            placeholder="Seu nome"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            id="email"
            required
            value={formData?.email ?? ''}
            onChange={(e) => setFormData({ ...formData, email: e?.target?.value ?? '' })}
            className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      {/* Mensagem */}
      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-300 mb-2">
          Mensagem
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
          <textarea
            id="mensagem"
            required
            rows={5}
            value={formData?.mensagem ?? ''}
            onChange={(e) => setFormData({ ...formData, mensagem: e?.target?.value ?? '' })}
            className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
            placeholder="Sua mensagem..."
          />
        </div>
      </div>

      {/* Mensagens de status */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-500"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Mensagem enviada com sucesso! Obrigado pelo contato.</span>
        </motion.div>
      )}

      {/* Botão Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/20"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Enviar Mensagem
          </>
        )}
      </button>
    </motion.form>
  );
}
