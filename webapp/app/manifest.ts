import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Guia Digital do Obstetra',
    short_name: 'Guia do Obstetra',
    description: 'Guia digital interativo para obstetras — Dra. Morgana Kummer.',
    // '/' (não '/app') porque decide server-side, pelo cookie de sessão, pra
    // onde mandar quem abre pelo ícone fixado na tela — mais confiável do
    // que entrar direto numa rota protegida sem ainda saber se há sessão.
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#5B4BB8',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
