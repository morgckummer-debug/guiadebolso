'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { KIWIFY_CHECKOUT_URL } from '@/lib/kiwifyCheckoutUrl';
import { SHELL_HTML } from './shellMarkup';
import './app.css';

type LoadState = 'loading' | 'sem-licenca' | 'pronto' | 'erro';

export default function AppPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initedRef = useRef(false);
  const dataRef = useRef<{ modulos: unknown; temas: unknown } | null>(null);
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
