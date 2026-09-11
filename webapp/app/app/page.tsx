'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { KIWIFY_CHECKOUT_URL } from '@/lib/kiwifyCheckoutUrl';
import { SHELL_HTML } from './shellMarkup';
import './app.css';

type LoadState = 'loading' | 'sem-licenca' | 'pronto' | 'erro';

// Opção 1 em teste: tela de abertura com a marca, por um tempo mínimo, antes
// de mostrar qualquer conteúdo (mesmo que os dados já tenham carregado).
// Trocar pra false pra comparar com a opção 2 (cabeçalho de marca no Índice,
// sem nenhum atraso).
const SHOW_SPLASH = true;
const SPLASH_MIN_MS = 900;

export default function AppPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initedRef = useRef(false);
  const dataRef = useRef<{ modulos: unknown; temas: unknown } | null>(null);
  const [state, setState] = useState<LoadState>('loading');
  const [splashDone, setSplashDone] = useState(!SHOW_SPLASH);
  const router = useRouter();

  useEffect(() => {
    if (!SHOW_SPLASH) return;
    const t = setTimeout(() => setSplashDone(true), SPLASH_MIN_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch('/api/temas');
      if (cancelled) return;

      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (res.status === 403) {
        setState('sem-licenca');
        return;
      }
      if (!res.ok) {
        setState('erro');
        return;
      }

      dataRef.current = await res.json();
      setState('pronto');
    }

    load();
    return () => { cancelled = true; };
  }, [router]);

  // Roda depois que o React realmente confirma o innerHTML do shell no DOM
  // (garantido pelo efeito disparar após o commit de `state`) — diferente de
  // um `queueMicrotask` logo após o setState, que não garante essa ordem e
  // podia deixar containerRef.current nulo, resultando no app em branco.
  useEffect(() => {
    if (state !== 'pronto' || initedRef.current || !containerRef.current || !dataRef.current) return;
    initedRef.current = true;
    const { modulos, temas } = dataRef.current;
    import('./appLogic.js').then(({ initApp }) => initApp(modulos, temas));
  }, [state]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  if (!splashDone) {
    return (
      <div
        style={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          background: 'linear-gradient(180deg, #9585E8, #5B4BB8)',
        }}
      >
        <img src="/apple-icon.png" alt="" width={84} height={84} style={{ borderRadius: 20 }} />
        <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Guia Digital do Obstetra</div>
      </div>
    );
  }

  if (state === 'loading') {
    return <div style={{ padding: 40, textAlign: 'center', color: '#6F6E76' }}>Carregando…</div>;
  }

  if (state === 'erro') {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#6F6E76' }}>
        Não foi possível carregar o conteúdo agora. Tente novamente em instantes.
      </div>
    );
  }

  if (state === 'sem-licenca') {
    return (
      <div style={{ padding: '48px 24px', maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Acesso ainda não liberado</h1>
        <p style={{ fontSize: 14, color: '#45444B', lineHeight: '20px', marginBottom: 20 }}>
          Não encontramos uma compra ativa para este e-mail. Se você já comprou, confirme que
          usou o mesmo e-mail no checkout e no cadastro aqui — o acesso é liberado automaticamente
          em poucos minutos após a compra.
        </p>
        <a
          href={KIWIFY_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', border: 'none', background: '#8B7AE0', color: '#fff', borderRadius: 12, padding: '10px 20px', fontWeight: 700, textDecoration: 'none', marginBottom: 12 }}
        >
          Garantir meu acesso
        </a>
        <div>
          <button
            onClick={handleLogout}
            style={{ border: 'none', background: 'transparent', color: '#6F6E76', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 16px', flexShrink: 0 }}>
        <button
          onClick={handleLogout}
          style={{ border: 'none', background: 'transparent', color: '#6F6E76', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
        >
          Sair
        </button>
      </div>
      <div ref={containerRef} style={{ flex: 1, minHeight: 0 }} dangerouslySetInnerHTML={{ __html: SHELL_HTML }} />
    </div>
  );
}
