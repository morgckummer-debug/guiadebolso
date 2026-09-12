'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { SHELL_HTML } from './shellMarkup';
import { initApp } from './appLogic.js';
import './app.css';

type LoadState = 'loading' | 'pronto' | 'erro';

// Tela de abertura com a marca, por um tempo mínimo, antes de mostrar
// qualquer conteúdo (mesmo que os dados já tenham carregado).
const SHOW_SPLASH = true;
const SPLASH_MIN_MS = 2000;

export default function AppPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initedRef = useRef(false);
  const dataRef = useRef<{ modulos: unknown; temas: unknown; acesso: unknown } | null>(null);
  const [state, setState] = useState<LoadState>('loading');
  const [splashDone, setSplashDone] = useState(!SHOW_SPLASH);
  const [demorando, setDemorando] = useState(false);
  const router = useRouter();

  // Se o carregamento travar (ex.: no modo standalone do iOS, ao abrir pelo
  // ícone fixado na tela, a primeira requisição pode não responder), mostra
  // uma saída em vez de deixar a tela parecendo travada/em branco.
  useEffect(() => {
    if (state !== 'loading') return;
    const t = setTimeout(() => setDemorando(true), 8000);
    return () => clearTimeout(t);
  }, [state]);

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
  // `initApp` é importado normalmente (não com `import()` dinâmico) porque
  // é sempre necessário aqui — um chunk carregado à parte é só mais uma
  // requisição de rede que pode falhar silenciosamente (sem `.catch`) no
  // modo standalone do iOS, deixando a tela em branco sem nenhum erro visível.
  //
  // Também precisa depender de `splashDone`: o container só existe no DOM
  // quando splashDone && state === 'pronto'. Se os dados chegam antes do
  // splash terminar (comum em conexão rápida), `state` vira 'pronto'
  // enquanto o splash ainda está na tela — esse efeito dispara, acha
  // containerRef.current nulo (o container real nem montou ainda) e sai sem
  // marcar erro. Sem `splashDone` nas deps, quando o splash finalmente some
  // e o container monta, esse efeito não roda de novo (só reagia a `state`,
  // que não mudou outra vez) — initApp() nunca é chamado e o app fica com o
  // shell vazio pra sempre: exatamente a tela branca depois do splash.
  useEffect(() => {
    if (!splashDone || state !== 'pronto' || initedRef.current || !containerRef.current || !dataRef.current) return;
    initedRef.current = true;
    const { modulos, temas, acesso } = dataRef.current;
    try {
      initApp(modulos, temas, acesso);
    } catch (err) {
      console.error('[app] initApp falhou:', err);
      queueMicrotask(() => setState('erro'));
    }
  }, [state, splashDone]);

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
          gap: 6,
          padding: '0 32px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #9585E8, #5B4BB8)',
        }}
      >
        <img src="/icon-hero.png" alt="" style={{ width: 260, height: 'auto', marginBottom: 8 }} />
        <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Guia Digital do Obstetra</div>
        <div style={{ color: 'rgba(255,255,255,.85)', fontSize: 13 }}>Sua mentoria digital em ultrassom fetal</div>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div
        style={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          padding: '0 32px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #9585E8, #5B4BB8)',
        }}
      >
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Carregando…</div>
        {demorando && (
          <>
            <div style={{ color: 'rgba(255,255,255,.85)', fontSize: 13, lineHeight: '19px' }}>
              Isso está demorando mais que o esperado.
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{ border: 'none', background: '#fff', color: '#5B4BB8', borderRadius: 12, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
            >
              Tentar novamente
            </button>
            <button
              onClick={() => router.push('/login')}
              style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,.85)', fontSize: 12, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Ir para o login
            </button>
          </>
        )}
      </div>
    );
  }

  if (state === 'erro') {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#6F6E76' }}>
        Não foi possível carregar o conteúdo agora. Tente novamente em instantes.
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
