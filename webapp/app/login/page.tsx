'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { KIWIFY_CHECKOUT_URL } from '@/lib/kiwifyCheckoutUrl';
import './login.css';

export default function LoginPage() {
  const [mode, setMode] = useState<'entrar' | 'criar'>('entrar');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const router = useRouter();

  async function handleGoogleLogin() {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError('Não foi possível continuar com o Google. Tente novamente.');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const supabase = createClient();

    if (mode === 'entrar') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError('E-mail ou senha incorretos.');
        return;
      }
      router.push('/app');
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message === 'User already registered'
          ? 'Esse e-mail já tem uma conta — tente entrar.'
          : 'Não foi possível criar a conta. Verifique os dados.');
        return;
      }
      setInfo('Conta criada! Verifique seu e-mail para confirmar antes de entrar.');
    }
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <h1 className="login-title">Guia Digital do Obstetra</h1>
        <p className="login-subtitle">
          Entre com o e-mail usado na sua compra para acessar os 14 temas clínicos.
        </p>

        <div className="login-tabs">
          <button
            type="button"
            className={`login-tab${mode === 'entrar' ? ' active' : ''}`}
            onClick={() => { setMode('entrar'); setError(null); setInfo(null); }}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`login-tab${mode === 'criar' ? ' active' : ''}`}
            onClick={() => { setMode('criar'); setError(null); setInfo(null); }}
          >
            Criar conta
          </button>
        </div>

        {error && <div className="login-message error">{error}</div>}
        {info && <div className="login-message info">{info}</div>}

        <button type="button" className="login-google" onClick={handleGoogleLogin}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62Z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18Z"/>
            <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33Z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58Z"/>
          </svg>
          Continuar com Google
        </button>

        <div className="login-divider"><span>ou</span></div>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'entrar' ? 'current-password' : 'new-password'}
            />
          </div>
          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? 'Aguarde…' : mode === 'entrar' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="login-buy">
          <span>Ainda não tem acesso?</span>
          <a href={KIWIFY_CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            Garantir meu acesso
          </a>
        </div>
      </div>
    </div>
  );
}
