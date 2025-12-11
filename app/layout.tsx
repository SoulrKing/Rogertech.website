import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RogerTech - Humor + Tecnologia',
  description: 'Criador de conteúdo com humor e foco em tecnologia. Dicas, análises e recomendações sobre PCs, notebooks, periféricos e muito mais!',
  keywords: ['RogerTech', 'tecnologia', 'humor', 'gaming', 'notebooks', 'PCs', 'periféricos', 'reviews'],
  authors: [{ name: 'RogerTech' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rogertech.com.br',
    title: 'RogerTech - Humor + Tecnologia',
    description: 'Criador de conteúdo com humor e foco em tecnologia',
    siteName: 'RogerTech',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'RogerTech',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RogerTech - Humor + Tecnologia',
    description: 'Criador de conteúdo com humor e foco em tecnologia',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
