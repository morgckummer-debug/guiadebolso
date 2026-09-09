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
