'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { SHELL_HTML } from './shellMarkup';
import './app.css';

type LoadState = 'loading' | 'sem-licenca' | 'pronto' | 'erro';

export default function AppPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initedRef = useRef(false);
  const [state, setState] = useState<LoadState>('loading');
  const router = useRouter();

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

      const { modulos, temas } = await res.json();
      setState('pronto');

      // aguarda o innerHTML (setado no render abaixo) existir no DOM antes
      // de inicializar a lógica de navegação/renderização portada.
      queueMicrotask(async () => {
        if (initedRef.current || !containerRef.current) return;
        initedRef.current = true;
        const { initApp } = await import('./appLogic.js');
        initApp(modulos, temas);
      });
    }

    load();
    return () => { cancelled = true; };
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
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
        <button
          onClick={handleLogout}
          style={{ border: 'none', background: '#8B7AE0', color: '#fff', borderRadius: 12, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
        <button
          onClick={handleLogout}
          style={{ border: 'none', background: 'transparent', color: '#6F6E76', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
        >
          Sair
        </button>
      </div>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: SHELL_HTML }} />
    </div>
  );
}
